import { NextRequest, NextResponse } from 'next/server';
import { Demographics, Answer, Scores, DiagnosisType } from '@/types';
import { calculateScores, determineType } from '@/lib/scoring';
import { generateFreeSummary } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { demographics, answers, concern } = body;

    // バリデーション
    if (!demographics || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // スコア計算
    const scores: Scores = calculateScores(answers);
    const type: DiagnosisType = determineType(scores);

    // AI分析テキスト生成
    const summaryText = await generateFreeSummary(
      demographics,
      scores,
      type,
      concern
    );

    return NextResponse.json({
      success: true,
      data: {
        scores,
        type,
        summaryText
      }
    });
  } catch (error) {
    console.error('Analysis API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
