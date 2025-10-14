import { NextRequest } from 'next/server';
import { generateDetailedReportStream } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Demographics, Answer, Scores, DiagnosisType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { diagnosisId } = await request.json();

    if (!diagnosisId) {
      return new Response(
        JSON.stringify({ error: 'diagnosisId is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Firestoreから診断データを取得
    const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
    const diagnosisSnap = await getDoc(diagnosisRef);

    if (!diagnosisSnap.exists()) {
      return new Response(
        JSON.stringify({ error: 'Diagnosis not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const diagnosis = diagnosisSnap.data();

    // 購入済みチェック
    if (!diagnosis.isPaid) {
      return new Response(
        JSON.stringify({ error: 'Payment required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 既に生成済みの場合は返す
    if (diagnosis.detailText) {
      return new Response(
        JSON.stringify({ report: diagnosis.detailText }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ストリーミングレスポンスを作成
    const encoder = new TextEncoder();
    let fullReport = '';

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reportStream = generateDetailedReportStream(
            diagnosis.demographics as Demographics,
            diagnosis.scores as Scores,
            diagnosis.type as DiagnosisType,
            diagnosis.answers as Answer[],
            diagnosis.concern
          );

          for await (const chunk of reportStream) {
            fullReport += chunk;
            // Server-Sent Events形式でストリーミング
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`));
          }

          // 完了を通知
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();

          // Firestoreに保存
          await updateDoc(diagnosisRef, {
            detailText: fullReport,
            detailGeneratedAt: new Date(),
          });
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate report' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
