import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center px-4 py-8">
      <main className="max-w-2xl w-full">

        {/* ヒーローセクション */}
        <div className="text-center mb-8">
          {/* キャッチコピー */}
          <div className="mb-6">
            <p className="text-sm text-pink-600 font-medium mb-2 tracking-wider">
              AIが解き明かす、あなたの恋愛の本質
            </p>
            <h1 className="text-5xl md:text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                恋愛診断
              </span>
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              20問で分かる、あなたの恋愛タイプ
            </p>
          </div>

          {/* メインカード */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 border border-pink-100">

            {/* 統計情報 */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-500">20問</p>
                <p className="text-xs text-gray-500">診断設問</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-500">6タイプ</p>
                <p className="text-xs text-gray-500">恋愛分類</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">3分</p>
                <p className="text-xs text-gray-500">所要時間</p>
              </div>
            </div>

            {/* 診断でわかること */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-700 mb-4 text-center">✨ この診断でわかること</h3>
              <div className="grid md:grid-cols-2 gap-3 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 text-lg">💕</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-700">あなたの恋愛タイプ</p>
                    <p className="text-xs text-gray-500">6つのタイプから診断</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 text-lg">🧠</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-700">深層心理の分析</p>
                    <p className="text-xs text-gray-500">AIが本質を解明</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">📊</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-700">3つの心理スコア</p>
                    <p className="text-xs text-gray-500">依存・自立・理想化</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 text-lg">💡</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-700">具体的なアドバイス</p>
                    <p className="text-xs text-gray-500">今日から実践できる</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/demographics"
              className="block w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-5 px-8 rounded-full transition-all shadow-lg text-lg mb-4 animate-pulse"
            >
              <span className="flex items-center justify-center gap-2">
                無料で診断を始める
                <span className="text-2xl">→</span>
              </span>
            </Link>

            <p className="text-xs text-gray-400">
              ※ 会員登録不要・完全無料で診断できます
            </p>
          </div>

          {/* 6タイプの紹介 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-4">📋 診断できる6つのタイプ</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
                <p className="font-bold text-pink-600">安心型</p>
                <p className="text-xs text-gray-500">安定を求める</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <p className="font-bold text-purple-600">共感依存型</p>
                <p className="text-xs text-gray-500">感情的なつながり</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="font-bold text-blue-600">恋愛過集中型</p>
                <p className="text-xs text-gray-500">情熱的な愛</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                <p className="font-bold text-green-600">自立防衛型</p>
                <p className="text-xs text-gray-500">自己保護の姿勢</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                <p className="font-bold text-yellow-600">理想投影型</p>
                <p className="text-xs text-gray-500">完璧を求める</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                <p className="font-bold text-red-600">感情ジェット型</p>
                <p className="text-xs text-gray-500">感情の起伏</p>
              </div>
            </div>
          </div>

          {/* 有料版の訴求 */}
          <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl p-5 mb-6 border-2 border-yellow-200">
            <p className="text-sm font-bold text-gray-700 mb-2">
              🌟 詳細レポート（¥480）で更に深く
            </p>
            <p className="text-xs text-gray-600">
              2500-3500文字の詳細分析 + 具体的な行動提案 + 根源的な問いかけ
            </p>
          </div>

          {/* フッター情報 */}
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">
              ♡IBJ Matching - AI恋愛診断
            </p>
            <p className="text-xs text-gray-400 mb-3">
              ※ 本診断はAIによる傾向分析であり、医学的・心理学的診断ではありません。
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline">
                利用規約
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 underline">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
