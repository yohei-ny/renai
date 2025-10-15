'use client';

import { useRouter } from 'next/navigation';

export default function TokushoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-romantic py-8 px-4">
      <main className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center border-b-2 border-pink-200 pb-4">
            特定商取引法に基づく表記
          </h1>

          <div className="space-y-8">
            {/* 販売事業者情報 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                販売事業者
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">販売事業者名</dt>
                  <dd className="sm:col-span-2 text-gray-800">恋愛診断サービス</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">運営責任者</dt>
                  <dd className="sm:col-span-2 text-gray-800">能見</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">所在地</dt>
                  <dd className="sm:col-span-2 text-gray-800">〒142-0041 東京都品川区戸越6-6-12</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">お問い合わせ</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    <a href="mailto:yangpingnengwei@gmail.com" className="text-blue-600 hover:underline">
                      yangpingnengwei@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">電話番号</dt>
                  <dd className="sm:col-span-2 text-gray-800">070-1580-2687</dd>
                </div>
              </div>
            </section>

            {/* 商品・サービスについて */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                商品・サービスについて
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">商品名</dt>
                  <dd className="sm:col-span-2 text-gray-800">AI恋愛診断 詳細レポート</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">販売価格</dt>
                  <dd className="sm:col-span-2 text-gray-800">480円（税込）</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">商品内容</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    AIによる恋愛タイプ診断結果の詳細レポート（デジタルコンテンツ）
                  </dd>
                </div>
              </div>
            </section>

            {/* お支払いについて */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                お支払いについて
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">支払方法</dt>
                  <dd className="sm:col-span-2 text-gray-800">クレジットカード決済（Stripe）</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">支払時期</dt>
                  <dd className="sm:col-span-2 text-gray-800">決済は即時処理されます</dd>
                </div>
              </div>
            </section>

            {/* 商品の引渡時期 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                商品の引渡時期
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800">
                  決済完了後、即時ご利用いただけます。画面上で詳細レポートが表示されます。
                </p>
              </div>
            </section>

            {/* 返品・キャンセルについて */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                返品・キャンセルについて
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-800">
                  デジタルコンテンツの性質上、決済完了後の返品・返金は原則として承っておりません。
                </p>
                <p className="text-gray-800">
                  ただし、以下の場合は個別に対応いたします：
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>システムエラーによりレポートが表示されない場合</li>
                  <li>決済は完了したがサービスが提供されない場合</li>
                  <li>その他、サービス提供に重大な不具合がある場合</li>
                </ul>
                <p className="text-gray-800 mt-3">
                  上記の場合は、お問い合わせメールアドレスまでご連絡ください。
                </p>
              </div>
            </section>

            {/* 個人情報の取扱い */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                個人情報の取扱い
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800">
                  お客様の個人情報は、サービス提供および決済処理のみに使用し、適切に管理いたします。
                  詳細は
                  <button
                    onClick={() => router.push('/privacy')}
                    className="text-blue-600 hover:underline mx-1"
                  >
                    プライバシーポリシー
                  </button>
                  をご確認ください。
                </p>
              </div>
            </section>

            {/* 免責事項 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                免責事項
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-800">
                  本サービスはAIによる恋愛傾向の分析であり、医学的・心理学的診断ではありません。
                </p>
                <p className="text-gray-800">
                  診断結果の解釈や活用については、ご自身の判断でお願いいたします。
                </p>
                <p className="text-gray-800">
                  深刻なお悩みがある場合は、専門機関へのご相談をお勧めいたします。
                </p>
              </div>
            </section>
          </div>

          {/* 戻るボタン */}
          <div className="mt-10 text-center">
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
            >
              トップページに戻る
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
