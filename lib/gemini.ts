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
  // Flash 2.5モデルを使用して高速化
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite-preview-09-2025',
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4096,
    },
  });

  const prompt = `
あなたは恋愛心理学と人間理解に精通した、経験豊かなカウンセラーです。
表面的なアドバイスではなく、本質的な気づきと長期的な成長につながる深い洞察を提供してください。

【ユーザー情報】
- 性別: ${getGenderLabel(demographics.gender)}
- 年代: ${getAgeGroupLabel(demographics.ageGroup)}
- 恋愛状況: ${getRelationshipStatusLabel(demographics.relationshipStatus)}

【診断結果の解釈】
- タイプ: ${type}
- 依存傾向: ${scores.anxiety}点（${scores.anxiety > 60 ? '高い - 相手への不安や執着が強い' : '低い - 安定した心の状態'}）
- 自立傾向: ${scores.autonomy}点（${scores.autonomy > 60 ? '高い - 自己完結的な姿勢' : '低い - 相手への依存や配慮'}）
- 理想化傾向: ${scores.idealization}点（${scores.idealization > 60 ? '高い - 完璧を求める傾向' : '低い - 現実的な視点'}）

${concern ? `【ユーザーが抱える悩み】\n${concern}\n` : ''}

【詳細レポート作成指針】

あなたの役割は、ユーザーが「なぜ自分はこう感じるのか」「何が本当に必要なのか」を深く理解し、
具体的な一歩を踏み出せるように支援することです。

以下の4セクション構成で、合計2500〜3500文字のレポートを作成してください：

## 1. あなたの恋愛の本質（What）
**文字数: 800〜1000文字**

このセクションでは、診断結果から見える「恋愛における思考・行動パターンの根源」を明らかにします。

含めるべき内容：
- 3つのスコアの組み合わせから読み取れる、根本的な心理メカニズム
- 幼少期や過去の経験から形成された可能性のある価値観
- 無意識に繰り返してしまうパターン
- 年代・性別特有の社会的プレッシャーとの関連
${concern ? '- ユーザーの悩みの本質的な背景（表面的な問題ではなく、深層にある心理的要因）' : ''}
- なぜその傾向が生まれたのか、どのような意味を持つのか

ポイント：
- 「あなたは〜タイプです」で終わらない
- パターンの「理由」と「意味」を深く掘り下げる
- 決めつけではなく、可能性として提示する

## 2. 今のあなたに必要な視点（Why）
**文字数: 500〜700文字**

このセクションでは、現在のパターンを「問題」として捉えるのではなく、
「そこにはどんな大切なものが隠れているか」を肯定的に再解釈します。

含めるべき内容：
- あなたの傾向の中にある「本当は守ろうとしているもの」
- 一見ネガティブに見える行動の裏にある、ポジティブな意図
- その傾向があったからこそ得られた経験や学び
- 自分を責めるのではなく、自分を理解するための視点転換

ポイント：
- リフレーミング（枠組みの転換）
- 「弱み」を「個性」として捉え直す
- 自己肯定感を育む言葉選び
- 「変えるべきもの」ではなく「理解すべきもの」として提示

## 3. これから試したい3つのアプローチ（How）
**文字数: 700〜900文字**

このセクションでは、実践可能で具体的な行動提案を3つ提示します。
表面的なテクニックではなく、本質的な変化につながるアプローチを提案してください。

各アプローチについて：
1. **アプローチ1: 内面の対話**
   - 自分との関係性を整える実践
   - 具体的なワーク（ジャーナリング、内省の時間など）

2. **アプローチ2: 関係性の実験**
   - 日常の小さな行動変容
   - パートナーや周囲との関わり方の工夫
${concern ? '   - 悩みに対する具体的な解決策' : ''}

3. **アプローチ3: 長期的な習慣**
   - 継続的な成長につながる習慣形成
   - 心の健康を保つためのセルフケア

ポイント：
- 「〜しましょう」ではなく「〜を試してみてもいいかもしれません」
- ハードルが低く、今日から始められるもの
- なぜそれが有効か、理由も添える
- 選択肢として提示し、押し付けない

## 4. 根源的な問いかけ（Essence）
**文字数: 400〜600文字**

このセクションでは、長期的な視点で「恋愛を通じて何を学び、どう成長するか」という
本質的な問いを投げかけます。

含めるべき内容：
- 恋愛という体験の本質的な意味
- あなたが人生で本当に大切にしたい価値観は何か
- パートナーシップを通じて育みたい自分の在り方
- 苦しみや葛藤から得られる深い学び
- 10年後のあなたへのメッセージ

ポイント：
- 抽象度を上げ、人生全体の文脈で捉える
- 答えを与えるのではなく、問いを残す
- 読み終えたときに「もっと自分を知りたい」と思える余韻
- 哲学的で詩的な表現も適度に取り入れる

【全体の執筆スタイル】
- 一人称「あなた」で語りかける
- 断定は避け「〜かもしれません」「〜可能性があります」を使用
- 温かく、共感的で、希望を感じられるトーン
- 医療的・病理的な表現は絶対に使用しない
- 各セクションの見出しはMarkdown形式（## と ###）で明確に
- 専門用語は最小限にし、誰でも理解できる言葉で
- 性別・年代に応じた共感的な言葉選び

さあ、ユーザーの人生に深い気づきをもたらす、魂のこもったレポートを書いてください。
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
 * ストリーミングで詳細レポートを生成（高速レスポンス用）
 */
export async function* generateDetailedReportStream(
  demographics: Demographics,
  scores: Scores,
  type: DiagnosisType,
  answers: Answer[],
  concern?: string
): AsyncGenerator<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite-preview-09-2025',
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4096,
    },
  });

  const prompt = `
あなたは恋愛心理学と人間理解に精通した、経験豊かなカウンセラーです。
表面的なアドバイスではなく、本質的な気づきと長期的な成長につながる深い洞察を提供してください。

【ユーザー情報】
- 性別: ${getGenderLabel(demographics.gender)}
- 年代: ${getAgeGroupLabel(demographics.ageGroup)}
- 恋愛状況: ${getRelationshipStatusLabel(demographics.relationshipStatus)}

【診断結果の解釈】
- タイプ: ${type}
- 依存傾向: ${scores.anxiety}点（${scores.anxiety > 60 ? '高い - 相手への不安や執着が強い' : '低い - 安定した心の状態'}）
- 自立傾向: ${scores.autonomy}点（${scores.autonomy > 60 ? '高い - 自己完結的な姿勢' : '低い - 相手への依存や配慮'}）
- 理想化傾向: ${scores.idealization}点（${scores.idealization > 60 ? '高い - 完璧を求める傾向' : '低い - 現実的な視点'}）

${concern ? `【ユーザーが抱える悩み】\n${concern}\n` : ''}

【詳細レポート作成指針】

あなたの役割は、ユーザーが「なぜ自分はこう感じるのか」「何が本当に必要なのか」を深く理解し、
具体的な一歩を踏み出せるように支援することです。

以下の4セクション構成で、合計2500〜3500文字のレポートを作成してください：

## 1. あなたの恋愛の本質（What）
**文字数: 800〜1000文字**

このセクションでは、診断結果から見える「恋愛における思考・行動パターンの根源」を明らかにします。

含めるべき内容：
- 3つのスコアの組み合わせから読み取れる、根本的な心理メカニズム
- 幼少期や過去の経験から形成された可能性のある価値観
- 無意識に繰り返してしまうパターン
- 年代・性別特有の社会的プレッシャーとの関連
${concern ? '- ユーザーの悩みの本質的な背景（表面的な問題ではなく、深層にある心理的要因）' : ''}
- なぜその傾向が生まれたのか、どのような意味を持つのか

ポイント：
- 「あなたは〜タイプです」で終わらない
- パターンの「理由」と「意味」を深く掘り下げる
- 決めつけではなく、可能性として提示する

## 2. 今のあなたに必要な視点（Why）
**文字数: 500〜700文字**

このセクションでは、現在のパターンを「問題」として捉えるのではなく、
「そこにはどんな大切なものが隠れているか」を肯定的に再解釈します。

含めるべき内容：
- あなたの傾向の中にある「本当は守ろうとしているもの」
- 一見ネガティブに見える行動の裏にある、ポジティブな意図
- その傾向があったからこそ得られた経験や学び
- 自分を責めるのではなく、自分を理解するための視点転換

ポイント：
- リフレーミング（枠組みの転換）
- 「弱み」を「個性」として捉え直す
- 自己肯定感を育む言葉選び
- 「変えるべきもの」ではなく「理解すべきもの」として提示

## 3. これから試したい3つのアプローチ（How）
**文字数: 700〜900文字**

このセクションでは、実践可能で具体的な行動提案を3つ提示します。
表面的なテクニックではなく、本質的な変化につながるアプローチを提案してください。

各アプローチについて：
1. **アプローチ1: 内面の対話**
   - 自分との関係性を整える実践
   - 具体的なワーク（ジャーナリング、内省の時間など）

2. **アプローチ2: 関係性の実験**
   - 日常の小さな行動変容
   - パートナーや周囲との関わり方の工夫
${concern ? '   - 悩みに対する具体的な解決策' : ''}

3. **アプローチ3: 長期的な習慣**
   - 継続的な成長につながる習慣形成
   - 心の健康を保つためのセルフケア

ポイント：
- 「〜しましょう」ではなく「〜を試してみてもいいかもしれません」
- ハードルが低く、今日から始められるもの
- なぜそれが有効か、理由も添える
- 選択肢として提示し、押し付けない

## 4. 根源的な問いかけ（Essence）
**文字数: 400〜600文字**

このセクションでは、長期的な視点で「恋愛を通じて何を学び、どう成長するか」という
本質的な問いを投げかけます。

含めるべき内容：
- 恋愛という体験の本質的な意味
- あなたが人生で本当に大切にしたい価値観は何か
- パートナーシップを通じて育みたい自分の在り方
- 苦しみや葛藤から得られる深い学び
- 10年後のあなたへのメッセージ

ポイント：
- 抽象度を上げ、人生全体の文脈で捉える
- 答えを与えるのではなく、問いを残す
- 読み終えたときに「もっと自分を知りたい」と思える余韻
- 哲学的で詩的な表現も適度に取り入れる

【全体の執筆スタイル】
- 一人称「あなた」で語りかける
- 断定は避け「〜かもしれません」「〜可能性があります」を使用
- 温かく、共感的で、希望を感じられるトーン
- 医療的・病理的な表現は絶対に使用しない
- 各セクションの見出しはMarkdown形式（## と ###）で明確に
- 専門用語は最小限にし、誰でも理解できる言葉で
- 性別・年代に応じた共感的な言葉選び

さあ、ユーザーの人生に深い気づきをもたらす、魂のこもったレポートを書いてください。
`;

  try {
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error('Gemini Streaming Error:', error);
    yield 'エラーが発生しました。しばらく時間をおいて再度お試しください。';
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
