// ユーザー属性
export type Gender = 'female' | 'male' | 'no_answer';
export type AgeGroup = '10s' | '20s_early' | '20s_late' | '30s_early' | '30s_late' | '40s_plus';
export type RelationshipStatus = 'dating' | 'crush' | 'single' | 'complicated';

// 診断タイプ
export type DiagnosisType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

// ユーザー属性
export interface Demographics {
  gender: Gender;
  ageGroup: AgeGroup;
  relationshipStatus: RelationshipStatus;
}

// 回答データ
export interface Answer {
  questionId: number;
  score: number; // 1-5
}

// スコア
export interface Scores {
  anxiety: number;      // 依存スコア
  autonomy: number;     // 自立スコア
  idealization: number; // 理想化スコア
}

// 診断結果
export interface Diagnosis {
  diagnosisId: string;
  userId: string;
  createdAt: Date;
  demographics: Demographics;
  answers: Answer[];
  scores: Scores;
  type: DiagnosisType;
  summaryText: string;       // 無料版テキスト
  detailText: string | null; // 有料版テキスト
  isPaid: boolean;
  paidAt: Date | null;
  paymentId: string | null;
  amount: number | null;
}

// 質問データ
export interface Question {
  id: number;
  category: 'anxiety' | 'autonomy' | 'idealization' | 'past' | 'emotion';
  text: string;
  scoreType: 'anxiety' | 'autonomy' | 'idealization';
}
