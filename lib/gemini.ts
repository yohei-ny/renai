import { GoogleGenerativeAI } from '@google/generative-ai';
import { Demographics, Answer, Scores, DiagnosisType } from '@/types';

const apiKey = process.env.GEMINI_API_KEY || '';
const modelName = process.env.GEMINI_MODEL || 'gemini-pro';
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Gemini APIで無料版の分析テキストを生成
 */
export async function generateFreeSummary(
  demographics: Demographics,
  scores: Scores,
  type: DiagnosisType,
  concern?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
あなたは恋愛心理の専門家です。
以下のユーザー情報と診断結果から、300〜400文字で簡潔な分析を生成してください。

【ユーザー属性】
- 性別: ${getGenderLabel(demographics.gender)}
- 年代: ${getAgeGroupLabel(demographics.ageGroup)}
- 恋愛状況: ${getRelationshipStatusLabel(demographics.relationshipStatus)}

【診断結果】
- タイプ: ${type}
- 依存スコア: ${scores.anxiety}/100
- 自立スコア: ${scores.autonomy}/100
- 理想化スコア: ${scores.idealization}/100

${concern ? `【ユーザーの悩み】\n${concern}\n` : ''}

【出力形式】
「あなたの回答からは〜」で始め、共感と気づきを与える文章。
${concern ? 'ユーザーの悩みにも触れながら、' : ''}具体的で温かいアドバイスを含めてください。
最後に「もっと詳しく知りたい方は、有料版で深い分析をご覧いただけます」という自然な誘導。

【禁止事項】
- 断定表現（「〜です」→「〜傾向があります」）
- 医療的診断（「病気」「障害」等の表現禁止）
- ネガティブな決めつけ
- 300文字未満の短すぎる回答
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    // エラー時はデフォルトテキストを返す
    return getDefaultSummary(demographics, scores, type, concern);
  }
}

/**
 * Gemini APIで有料版の詳細分析テキストを生成
 */
export async function generateDetailedReport(
  demographics: Demographics,
  scores: Scores,
  type: DiagnosisType,
  answers: Answer[],
  concern?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
あなたは恋愛心理の専門家です。
以下のユーザー情報と診断結果から、詳細な分析レポートを生成してください。

【ユーザー属性】
- 性別: ${getGenderLabel(demographics.gender)}
- 年代: ${getAgeGroupLabel(demographics.ageGroup)}
- 恋愛状況: ${getRelationshipStatusLabel(demographics.relationshipStatus)}

【診断結果】
- タイプ: ${type}
- スコア詳細: 依存${scores.anxiety}点、自立${scores.autonomy}点、理想化${scores.idealization}点
- 回答パターン: ${JSON.stringify(answers)}

${concern ? `【ユーザーの悩み】\n${concern}\n` : ''}

【出力形式】
以下の4セクション構成で、合計2500〜3500文字

## 1. あなたの恋愛の本質（Fact）
- 800〜1000文字
- 回答から見える深層心理
- 性別・年代に応じた具体例
${concern ? '- ユーザーの悩みの背景分析' : ''}

## 2. 今のあなたに必要な安心（Accept）
- 500〜700文字
- 肯定的リフレーミング
- 強みの再定義

## 3. これからできる行動（Action）
- 700〜900文字
- 具体的な行動提案3つ
- 実践可能なステップ
${concern ? '- 悩みに対する具体的なアドバイス' : ''}

## 4. 心の整理のヒント（Mind）
- 400〜600文字
- 根本的な視点の転換
- 長期的な成長への示唆

【重要】
- 共感的で温かいトーン
- 断定を避け「〜かもしれません」を使用
- 年代・性別に応じた言葉選び
- 医療的表現は絶対に使用しない
- 各セクションは見出しをMarkdown形式で記述
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'エラーが発生しました。しばらく時間をおいて再度お試しください。';
  }
}

/**
 * デフォルトの分析テキスト（API失敗時）
 */
function getDefaultSummary(
  demographics: Demographics,
  scores: Scores,
  type: DiagnosisType,
  concern?: string
): string {
  let text = 'あなたの回答からは、';

  if (scores.anxiety > 60) {
    text += '相手への不安や気持ちの揺れ';
  } else {
    text += '安定した心の状態';
  }

  text += 'と、';

  if (scores.autonomy > 60) {
    text += '自立した姿勢';
  } else {
    text += '相手への配慮';
  }

  text += 'が見えます。';

  if (concern) {
    text += `\n\n「${concern.substring(0, 50)}...」というお悩みについては、まずは自分の気持ちを大切にすることから始めてみてください。`;
  }

  text += '\n\nもっと詳しく知りたい方は、有料版で深い分析をご覧いただけます。';

  return text;
}

/**
 * ラベル変換関数
 */
function getGenderLabel(gender: string): string {
  const labels: Record<string, string> = {
    female: '女性',
    male: '男性',
    no_answer: '回答なし'
  };
  return labels[gender] || '不明';
}

function getAgeGroupLabel(ageGroup: string): string {
  const labels: Record<string, string> = {
    '10s': '10代',
    '20s_early': '20代前半',
    '20s_late': '20代後半',
    '30s_early': '30代前半',
    '30s_late': '30代後半',
    '40s_plus': '40代以上'
  };
  return labels[ageGroup] || '不明';
}

function getRelationshipStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    dating: '恋人がいる',
    crush: '片思い中',
    single: '恋愛していない',
    complicated: '複雑な関係'
  };
  return labels[status] || '不明';
}
