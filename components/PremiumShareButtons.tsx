'use client';

import { DiagnosisType, Scores } from '@/types';
import { getTypeName } from '@/lib/scoring';

interface PremiumShareButtonsProps {
  type: DiagnosisType;
  scores: Scores;
  diagnosisId: string;
}

export default function PremiumShareButtons({ type, scores, diagnosisId }: PremiumShareButtonsProps) {
  const typeName = getTypeName(type);
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  // シェア用ページのURL（OG画像が表示される）
  const shareUrl = `${url}/share/${diagnosisId}`;

  // スコアを視覚的に表現
  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '🔥';
    if (score >= 60) return '⭐';
    if (score >= 40) return '💫';
    return '✨';
  };

  // 詳細なシェアテキストを生成
  const generateDetailedShareText = () => {
    const parts = [
      `【恋愛診断の結果】`,
      ``,
      `私のタイプ: 「${typeName}」`,
      ``,
      `📊 詳細スコア:`,
      `${getScoreEmoji(scores.anxiety)} 依存度: ${scores.anxiety}点`,
      `${getScoreEmoji(scores.autonomy)} 自立度: ${scores.autonomy}点`,
      `${getScoreEmoji(scores.idealization)} 理想化: ${scores.idealization}点`,
      ``,
      `私の恋愛の本質を深く分析してくれました！`,
      ``,
      `💡 自分でも気づかなかった恋愛パターンが明確に...`,
      `あなたも試してみませんか？`,
    ];
    return parts.join('\n');
  };

  // 短縮版シェアテキスト（Twitter用）
  const generateShortShareText = () => {
    return `【恋愛診断】\n私のタイプは「${typeName}」\n\n📊スコア\n依存${scores.anxiety}|自立${scores.autonomy}|理想${scores.idealization}\n\n恋愛の本質を深掘り！\n自分の恋愛パターンが見えてきた✨\n\nあなたも無料で診断👇`;
  };

  // Twitterシェア
  const handleTwitterShare = () => {
    const text = generateShortShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=恋愛診断,恋愛タイプ,自己理解`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  // LINEシェア
  const handleLineShare = () => {
    const text = generateDetailedShareText();
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(lineUrl, '_blank', 'width=550,height=420');
  };

  // 詳細テキストコピー
  const handleCopyDetailedText = async () => {
    const text = `${generateDetailedShareText()}\n\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('詳細な診断結果をコピーしました！\nSNSやメッセージアプリでシェアできます。');
    } catch (error) {
      console.error('Copy failed:', error);
      // フォールバック
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('詳細な診断結果をコピーしました！');
    }
  };

  // リンクのみコピー
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('リンクをコピーしました！');
    } catch (error) {
      console.error('Copy failed:', error);
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('リンクをコピーしました！');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-5 border-2 border-purple-200 shadow-lg">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✨</span>
          <h3 className="text-lg font-bold text-gray-800">
            詳細診断結果をシェア
          </h3>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
            Premium
          </span>
        </div>
        <p className="text-sm text-gray-600">
          あなたの詳しいスコアと一緒に友達を招待しよう
        </p>
      </div>

      {/* プレビュー */}
      <div className="bg-white/80 rounded-xl p-4 mb-4 border border-purple-200">
        <p className="text-xs text-gray-500 mb-2">📝 シェア内容プレビュー</p>
        <div className="space-y-1 text-sm text-gray-700">
          <p className="font-bold">私のタイプ: 「{typeName}」</p>
          <div className="flex gap-3 text-xs">
            <span>{getScoreEmoji(scores.anxiety)} 依存{scores.anxiety}</span>
            <span>{getScoreEmoji(scores.autonomy)} 自立{scores.autonomy}</span>
            <span>{getScoreEmoji(scores.idealization)} 理想{scores.idealization}</span>
          </div>
          <p className="text-xs text-gray-600 pt-1">
            💡 恋愛の本質を深掘り！あなたも試してみませんか？
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Twitter (X) ボタン */}
        <button
          onClick={handleTwitterShare}
          className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <span className="text-sm">X (Twitter) でスコア付きシェア</span>
        </button>

        {/* LINEボタン */}
        <button
          onClick={handleLineShare}
          className="w-full bg-[#06C755] hover:bg-[#05b04b] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
          <span className="text-sm">LINE で詳細シェア</span>
        </button>

        <div className="flex gap-3">
          {/* 詳細テキストコピー */}
          <button
            onClick={handleCopyDetailedText}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>詳細コピー</span>
          </button>

          {/* リンクのみコピー */}
          <button
            onClick={handleCopyLink}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>リンクのみ</span>
          </button>
        </div>
      </div>

      <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-xs text-gray-600 text-center">
          💎 プレミアム会員限定：詳細スコアと一緒にシェアできます
        </p>
      </div>
    </div>
  );
}
