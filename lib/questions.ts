import { Question } from '@/types';

export const questions: Question[] = [
  // ① 安心軸（不安・愛着傾向）
  {
    id: 1,
    category: 'anxiety',
    text: '相手の反応がないと不安になりますか？',
    scoreType: 'anxiety'
  },
  {
    id: 2,
    category: 'anxiety',
    text: 'LINEの既読がつかないと落ち着かない？',
    scoreType: 'anxiety'
  },
  {
    id: 3,
    category: 'anxiety',
    text: '相手に嫌われたかもと思う瞬間が多い？',
    scoreType: 'anxiety'
  },
  {
    id: 4,
    category: 'anxiety',
    text: '「どうせ私なんて」と感じることがありますか？',
    scoreType: 'anxiety'
  },

  // ② 自己軸（自分の時間・依存度）
  {
    id: 5,
    category: 'autonomy',
    text: '恋愛中も自分の趣味を続けていますか？',
    scoreType: 'autonomy'
  },
  {
    id: 6,
    category: 'autonomy',
    text: '相手の予定を優先して自分を後回しにする？',
    scoreType: 'autonomy'
  },
  {
    id: 7,
    category: 'autonomy',
    text: '相手に合わせすぎて疲れることがありますか？',
    scoreType: 'autonomy'
  },
  {
    id: 8,
    category: 'autonomy',
    text: '恋愛をしていない時の自分は寂しい？',
    scoreType: 'autonomy'
  },

  // ③ 理想軸（恋愛観・期待）
  {
    id: 9,
    category: 'idealization',
    text: '理想の恋人に完璧さを求めてしまう？',
    scoreType: 'idealization'
  },
  {
    id: 10,
    category: 'idealization',
    text: '相手の欠点を見つけると気持ちが冷める？',
    scoreType: 'idealization'
  },
  {
    id: 11,
    category: 'idealization',
    text: '「自分を理解してほしい」と強く思う？',
    scoreType: 'idealization'
  },
  {
    id: 12,
    category: 'idealization',
    text: '相手からの愛情表現が少ないと不安？',
    scoreType: 'idealization'
  },

  // ④ 過去軸（繰り返し・トラウマ）
  {
    id: 13,
    category: 'past',
    text: '似たような人を好きになることが多い？',
    scoreType: 'idealization'
  },
  {
    id: 14,
    category: 'past',
    text: '過去の恋愛で傷ついた経験を引きずる？',
    scoreType: 'anxiety'
  },
  {
    id: 15,
    category: 'past',
    text: '相手を変えようとして失敗した経験がある？',
    scoreType: 'idealization'
  },
  {
    id: 16,
    category: 'past',
    text: '「恋愛で自分が悪い」と思いがち？',
    scoreType: 'anxiety'
  },

  // ⑤ 感情軸（感情処理・回復力）
  {
    id: 17,
    category: 'emotion',
    text: '恋愛の喜びと不安が極端に入れ替わる？',
    scoreType: 'anxiety'
  },
  {
    id: 18,
    category: 'emotion',
    text: '落ち込んだ時に立ち直りが遅い？',
    scoreType: 'autonomy'
  },
  {
    id: 19,
    category: 'emotion',
    text: '感情を人に話すのが苦手？',
    scoreType: 'autonomy'
  },
  {
    id: 20,
    category: 'emotion',
    text: '相手の言葉に強く反応してしまう？',
    scoreType: 'anxiety'
  },
];
