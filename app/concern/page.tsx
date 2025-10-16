'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConcernPage() {
  const router = useRouter();
  const [concern, setConcern] = useState('');
  const [isSkipping, setIsSkipping] = useState(false);

  useEffect(() => {
    // 診断データがない場合は戻す
    const answers = localStorage.getItem('answers');
    if (!answers) {
      router.push('/demographics');
    }
  }, [router]);

  const handleSubmit = () => {
    if (concern.trim()) {
      // 悩みをローカルストレージに保存
      localStorage.setItem('concern', concern);
    }
    // 結果ページへ遷移
    router.push('/result');
  };

  const handleSkip = () => {
    setIsSkipping(true);
    // スキップの場合は空文字を保存
    localStorage.setItem('concern', '');
    router.push('/result');
  };

  return (
    <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center px-4 py-8">
      <main className="max-w-md w-full">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            ♡IBJ Matching
          </h1>
          <h2 className="text-xl font-bold text-gray-600 mb-4">
            最後に...
          </h2>
          <p className="text-sm text-gray-600">
            診断結果をより具体的にするため、<br />
            今の恋愛の悩みがあれば教えてください
          </p>
        </div>

        {/* フォーム */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-4">
              💭 今の恋愛の悩みや気になることはありますか？
            </label>
            <p className="text-sm text-gray-500 mb-4">
              （任意）あなたの回答と合わせて、より具体的なアドバイスを生成します
            </p>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="例：
• 相手の気持ちがわからなくて不安です
• LINEの返信が遅くて気になります
• 自分ばかり頑張っている気がします
• 将来のことを考えると不安になります"
              className="w-full h-48 p-4 border-2 border-gray-300 rounded-2xl focus:border-pink-400 focus:outline-none resize-none text-gray-700"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-400 mt-2">
              {concern.length} / 500文字
            </div>
          </div>

          {/* 送信ボタン */}
          <button
            onClick={handleSubmit}
            disabled={!concern.trim()}
            className={`w-full py-4 rounded-full font-bold text-white transition-all shadow-lg mb-3 ${
              concern.trim()
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {concern.trim() ? '悩みを送信して結果を見る' : '悩みを入力してください'}
          </button>

          {/* スキップボタン */}
          <button
            onClick={handleSkip}
            disabled={isSkipping}
            className="w-full py-4 rounded-full font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            スキップして結果を見る
          </button>
        </div>

        {/* 注意書き */}
        <div className="bg-pink-50 rounded-2xl p-4 border border-pink-200">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-pink-600">💡 入力するとこんなメリットが！</strong><br />
            • あなたの状況に合わせた具体的なアドバイス<br />
            • 今すぐできる行動提案<br />
            • 悩みの背景を分析してくれます
          </p>
        </div>

        {/* プライバシー */}
        <p className="text-xs text-gray-500 text-center mt-6">
          ※ 入力内容は診断結果の生成にのみ使用され、第三者に共有されることはありません
        </p>
      </main>
    </div>
  );
}
