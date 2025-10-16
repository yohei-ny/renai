import { Answer, Scores, DiagnosisType } from '@/types';

/**
 * スコアリング計算
 */
export function calculateScores(answers: Answer[]): Scores {
  let anxietyTotal = 0;
  let autonomyTotal = 0;
  let idealizationTotal = 0;

  // 各質問のスコアタイプに応じて集計
  const anxietyQuestions = [1, 2, 3, 4, 12, 14, 16, 17, 20]; // 依存スコア
  const autonomyQuestions = [5, 6, 7, 8, 18, 19]; // 自立スコア（逆転項目を含む）
  const idealizationQuestions = [9, 10, 11, 13, 15]; // 理想化スコア

  answers.forEach(answer => {
    if (anxietyQuestions.includes(answer.questionId)) {
      anxietyTotal += answer.score;
    }
    if (autonomyQuestions.includes(answer.questionId)) {
      // Q5は逆転項目（高いほど自立）
      if (answer.questionId === 5) {
        autonomyTotal += (6 - answer.score); // 逆転
      } else {
        autonomyTotal += answer.score;
      }
    }
    if (idealizationQuestions.includes(answer.questionId)) {
      idealizationTotal += answer.score;
    }
  });

  // 100点満点に正規化
  const anxiety = Math.round((anxietyTotal / (anxietyQuestions.length * 5)) * 100);
  const autonomy = Math.round((autonomyTotal / (autonomyQuestions.length * 5)) * 100);
  const idealization = Math.round((idealizationTotal / (idealizationQuestions.length * 5)) * 100);

  return { anxiety, autonomy, idealization };
}

/**
 * タイプ判定
 */
export function determineType(scores: Scores): DiagnosisType {
  const { anxiety, autonomy, idealization } = scores;

  // F. 感情ジェットコースター型（最も強い条件を最初に判定）
  if (anxiety > 70 && idealization > 65) {
    return 'F';
  }

  // E. 理想投影型（理想化が非常に高い）
  if (idealization > 70 && anxiety < 65) {
    return 'E';
  }

  // C. 恋愛過集中型（依存+理想化が高い）
  if (anxiety > 60 && idealization > 55 && autonomy < 50) {
    return 'C';
  }

  // B. 共感依存型（依存が高く、自立が低い）
  if (anxiety > 55 && autonomy < 50 && idealization < 60) {
    return 'B';
  }

  // D. 自立防衛型（自立が高く、依存が低く、理想化も高い）
  if (autonomy > 60 && anxiety < 45 && idealization > 50) {
    return 'D';
  }

  // A. 安心型（バランスが良い）
  if (anxiety < 50 && autonomy > 55 && idealization < 55) {
    return 'A';
  }

  // どの条件にも当てはまらない場合は、最も高いスコアで判定
  if (anxiety >= autonomy && anxiety >= idealization) {
    return 'B'; // 依存が最も高い → 共感依存型
  } else if (idealization >= anxiety && idealization >= autonomy) {
    return 'E'; // 理想化が最も高い → 理想投影型
  } else {
    return 'A'; // 自立が最も高い → 安心型
  }
}

/**
 * タイプ名取得
 */
export function getTypeName(type: DiagnosisType): string {
  const typeNames: Record<DiagnosisType, string> = {
    A: '安心型',
    B: '共感依存型',
    C: '恋愛過集中型',
    D: '自立防衛型',
    E: '理想投影型',
    F: '感情ジェットコースター型'
  };
  return typeNames[type];
}

/**
 * タイプ説明取得（無料版用の簡易説明）
 */
export function getTypeDescription(type: DiagnosisType): string {
  const descriptions: Record<DiagnosisType, string> = {
    A: 'バランスが取れて穏やかな関係を築けるタイプです。相手との距離感を大切にしながら、自分の時間も守れています。',
    B: '相手に気を使いすぎるやさしいタイプです。共感力が高く、相手の気持ちを理解する力がありますが、少し自分を後回しにしがちです。',
    C: '恋愛が中心になりがちな情熱型です。好きになると全力で相手に向き合いますが、時に自分を見失いやすい傾向があります。',
    D: '深く関わるのが怖い慎重派です。自立心は強いですが、相手との距離を保ちすぎて孤独を感じることもあるかもしれません。',
    E: '理想を追いすぎて現実に疲れやすいタイプです。完璧な恋愛像を求めるあまり、目の前の相手の良さを見落としがちです。',
    F: '感情の波が激しく愛も苦しみも深いタイプです。喜びと不安が激しく入れ替わり、心が疲れやすい傾向があります。'
  };
  return descriptions[type];
}

/**
 * タイプキャラクター情報取得
 */
export function getTypeCharacter(type: DiagnosisType) {
  const characters: Record<DiagnosisType, { emoji: string; name: string; description: string; color: string; gradient: string; imagePath: string }> = {
    A: {
      emoji: '🐶',
      name: 'まろやか柴犬',
      description: '優しくて頼れる。安定感ある包容系。',
      color: '#E8DDD0',
      gradient: 'from-amber-100 to-orange-50',
      imagePath: '/img/inu.png'
    },
    B: {
      emoji: '🐰',
      name: 'ふわふわうさぎ',
      description: '甘え上手で人想い。少し寂しがり屋。',
      color: '#FFC0CB',
      gradient: 'from-pink-100 to-white',
      imagePath: '/img/usagi.png'
    },
    C: {
      emoji: '🐱',
      name: 'おしゃれ猫',
      description: '魅力的で行動派。恋に一直線タイプ。',
      color: '#FF7F7F',
      gradient: 'from-rose-200 to-pink-200',
      imagePath: '/img/neko.png'
    },
    D: {
      emoji: '🦊',
      name: 'クールなキツネ',
      description: '一歩引いて観察。心は繊細。',
      color: '#B4C7D3',
      gradient: 'from-gray-200 to-sky-100',
      imagePath: '/img/kitune.png'
    },
    E: {
      emoji: '🦉',
      name: '夢見るフクロウ',
      description: 'ロマンチストで考えすぎる知的系。',
      color: '#E6E6FA',
      gradient: 'from-purple-100 to-white',
      imagePath: '/img/fukuro.png'
    },
    F: {
      emoji: '🐿',
      name: '元気なリス',
      description: '感情豊かで表情コロコロ変わる天真爛漫系。',
      color: '#98D8C8',
      gradient: 'from-mint-100 to-orange-100',
      imagePath: '/img/risu.png'
    }
  };
  return characters[type];
}
