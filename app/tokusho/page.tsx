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
                  <dd className="sm:col-span-2 text-gray-800">能味</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">運営統括責任者</dt>
                  <dd className="sm:col-span-2 text-gray-800">能味</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">所在地</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    <p>請求があったら遅滞なく開示します</p>
                    <p className="text-sm text-gray-600 mt-1">※ 個人事業主のため、お客様の請求があった場合に開示いたします</p>
                  </dd>
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
                  <dd className="sm:col-span-2 text-gray-800">
                    <p>請求があったら遅滞なく開示します</p>
                    <p className="text-sm text-gray-600 mt-1">※ 個人事業主のため、お客様の請求があった場合に開示いたします</p>
                  </dd>
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
                  <dd className="sm:col-span-2 text-gray-800">
                    <span className="font-bold">480円（税込）</span>
                    <p className="text-sm text-gray-600 mt-1">※ 消費税込みの金額です</p>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">追加手数料</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    なし（商品代金以外の費用は一切かかりません）
                  </dd>
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
                  <dt className="font-bold text-gray-700">受け付け可能な決済手段</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    <p>クレジットカード決済（Stripe）</p>
                    <p className="text-sm text-gray-600 mt-1">
                      ※ Visa、Mastercard、American Express、JCB、Diners Club、Discoverに対応
                    </p>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">決済期間</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    購入ボタンをクリックし、カード情報を入力後、即時決済されます
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">セキュリティ</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    Stripe社の安全な決済システムを使用しており、カード情報は当サービスに保存されません
                  </dd>
                </div>
              </div>
            </section>

            {/* 商品の引渡時期 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                商品の引渡時期
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 font-semibold mb-2">
                  決済完了後、即時ご利用いただけます
                </p>
                <p className="text-gray-700 text-sm">
                  ・クレジットカード決済完了と同時に、画面上で詳細レポートが表示されます<br />
                  ・ダウンロードや配送の待ち時間は一切ありません<br />
                  ・決済後すぐに全コンテンツにアクセス可能です
                </p>
              </div>
            </section>

            {/* 返品・返金・キャンセルポリシー */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                返品・返金・キャンセルポリシー
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">返品・返金について</h3>
                  <p className="text-gray-800 mb-2">
                    デジタルコンテンツの性質上、決済完了後の返品・返金は原則として承っておりません。
                  </p>
                  <p className="text-gray-800 font-semibold">
                    ただし、以下の場合は返金対応いたします：
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                    <li>システムエラーによりレポートが表示されない場合</li>
                    <li>決済は完了したがサービスが提供されない場合</li>
                    <li>その他、サービス提供に重大な不具合がある場合</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">キャンセルについて</h3>
                  <p className="text-gray-800">
                    決済完了前であれば、いつでも無料でキャンセル可能です。決済完了後のキャンセルは上記返金ポリシーに準じます。
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">不審請求について</h3>
                  <p className="text-gray-800">
                    身に覚えのない請求や不審な請求があった場合は、速やかに下記カスタマーサポートまでご連絡ください。調査の上、適切に対応いたします。
                  </p>
                </div>
              </div>
            </section>

            {/* カスタマーサポート */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-pink-500 pl-3">
                カスタマーサポート
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-800 font-semibold">
                  ご質問・お問い合わせは以下までご連絡ください：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">メールアドレス</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    <a href="mailto:yangpingnengwei@gmail.com" className="text-blue-600 hover:underline">
                      yangpingnengwei@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">電話番号</dt>
                  <dd className="sm:col-span-2 text-gray-800">
                    <p>請求があったら遅滞なく開示します</p>
                    <p className="text-sm text-gray-600 mt-1">※ 個人事業主のため、お客様の請求があった場合に開示いたします</p>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-bold text-gray-700">対応時間</dt>
                  <dd className="sm:col-span-2 text-gray-800">メールでのお問い合わせは24時間受付（回答は平日 10:00-18:00）</dd>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  ※ お問い合わせ内容により、回答までにお時間をいただく場合がございます。
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
