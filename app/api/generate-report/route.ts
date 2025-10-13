import { NextRequest, NextResponse } from 'next/server';
import { generateDetailedReport } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Demographics, Answer, Scores, DiagnosisType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { diagnosisId } = await request.json();

    if (!diagnosisId) {
      return NextResponse.json(
        { error: 'diagnosisId is required' },
        { status: 400 }
      );
    }

    // Firestoreから診断データを取得
    const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
    const diagnosisSnap = await getDoc(diagnosisRef);

    if (!diagnosisSnap.exists()) {
      return NextResponse.json(
        { error: 'Diagnosis not found' },
        { status: 404 }
      );
    }

    const diagnosis = diagnosisSnap.data();

    // 購入済みチェック
    if (!diagnosis.isPaid) {
      return NextResponse.json(
        { error: 'Payment required' },
        { status: 403 }
      );
    }

    // 既に生成済みの場合は返す
    if (diagnosis.detailText) {
      return NextResponse.json({
        report: diagnosis.detailText
      });
    }

    // Gemini APIで詳細レポート生成
    const report = await generateDetailedReport(
      diagnosis.demographics as Demographics,
      diagnosis.scores as Scores,
      diagnosis.type as DiagnosisType,
      diagnosis.answers as Answer[],
      diagnosis.concern
    );

    // Firestoreに保存
    await updateDoc(diagnosisRef, {
      detailText: report,
      detailGeneratedAt: new Date(),
    });

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
