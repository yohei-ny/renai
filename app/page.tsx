import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center px-4">
      <main className="max-w-md w-full text-center">
        {/* ロゴ・タイトル */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            ♡IBJ Matching
          </h1>
        </div>

        {/* メインビジュアル */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 mb-6">
          <p className="text-sm text-gray-600 mb-4">
            あなたの恋愛心理を導き出す！
          </p>

          <h2 className="text-4xl font-bold mb-2">
            <span className="text-pink-500">恋愛</span>
            <span className="text-xs align-super text-pink-400">type</span>
          </h2>
          <h2 className="text-4xl font-bold text-gray-700 mb-6">
            診断
          </h2>

          <div className="text-left text-sm text-gray-600 space-y-2 mb-8">
            <p>
              ジョン・アラン・リー「ラブスタイル類型論」と恋愛心理学に基づき、あなたの恋愛タイプを診断！
            </p>
            <p>
              無料で診断結果までこのページでチェックできます。
            </p>
            <p>
              計10個の質問に答えて、あなたの恋愛傾向、相性の合う相手を導きちゃって。
            </p>
          </div>

          <Link
            href="/demographics"
            className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full transition-colors shadow-md"
          >
            診断をはじめる
          </Link>
        </div>

        {/* フッター情報 */}
        <p className="text-xs text-gray-500">
          ※ 本診断はAIによる傾向分析であり、医学的・心理学的診断ではありません。
        </p>
      </main>
    </div>
  );
}
