import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-romantic py-8 px-4">
      <main className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            利用規約
          </h1>

          <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第1条（適用）</h2>
              <p>
                本規約は、IBJ Matching（以下「当サービス」といいます）が提供する恋愛診断サービス（以下「本サービス」といいます）の利用条件を定めるものです。
                利用者の皆様（以下「ユーザー」といいます）には、本規約に従って本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第2条（サービスの内容）</h2>
              <p className="mb-2">本サービスは、以下の機能を提供します：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>恋愛傾向の診断</li>
                <li>診断結果に基づくパーソナライズされた分析</li>
                <li>有料オプションとしての詳細レポートの提供</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第3条（診断に関する重要事項）</h2>
              <div className="space-y-2">
                <p className="font-semibold">ユーザーは、以下の事項を理解し、同意したうえで本サービスを利用するものとします：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <span className="font-semibold">医療・心理学的診断ではありません：</span>
                    本サービスの診断結果は傾向分析であり、医学的・心理学的診断ではありません。
                  </li>
                  <li>
                    <span className="font-semibold">専門家の代替ではありません：</span>
                    深刻な悩みや精神的な問題を抱えている場合は、医師、心理カウンセラー等の専門家にご相談ください。
                  </li>
                  <li>
                    <span className="font-semibold">分析の限界：</span>
                    分析は入力された情報に基づく統計的な推測であり、個人の複雑な感情や状況を完全に理解するものではありません。
                  </li>
                  <li>
                    <span className="font-semibold">結果の解釈：</span>
                    診断結果はあくまで参考情報であり、ユーザー自身の判断の補助として活用してください。
                  </li>
                  <li>
                    <span className="font-semibold">正確性の保証なし：</span>
                    当サービスは、診断結果の正確性、完全性、有用性について保証するものではありません。
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第4条（禁止事項）</h2>
              <p className="mb-2">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                <li>虚偽の情報を入力する行為</li>
                <li>本サービスのシステムに不正にアクセスする行為</li>
                <li>診断結果を商業目的で使用する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第5条（有料サービス）</h2>
              <div className="space-y-2">
                <p>本サービスの一部機能は有料です。</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>料金は各サービスページに表示されます</li>
                  <li>支払いは指定の決済方法で行われます</li>
                  <li>一度購入した有料サービスの返金は原則として行いません</li>
                  <li>ただし、システムエラー等により正常にサービスが提供されなかった場合はこの限りではありません</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第6条（免責事項）</h2>
              <div className="space-y-2">
                <p>当サービスは、以下について一切の責任を負いません：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>本サービスの診断結果に基づいてユーザーが行った行動の結果</li>
                  <li>本サービスの利用によってユーザーに生じた損害</li>
                  <li>システムの一時的な中断、エラー、不具合</li>
                  <li>第三者による本サービスへの不正アクセス</li>
                </ul>
                <p className="mt-2 font-semibold">
                  ただし、当サービスの故意または重大な過失による損害についてはこの限りではありません。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第7条（サービスの変更・停止）</h2>
              <p>
                当サービスは、ユーザーへの事前の通知なく、本サービスの内容を変更し、または本サービスの提供を停止することができます。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第8条（利用規約の変更）</h2>
              <p>
                当サービスは、必要に応じて本規約を変更することができます。
                変更後の規約は、本サイト上に掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第9条（準拠法・管轄裁判所）</h2>
              <p className="mb-2">
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p>
                本サービスに関して紛争が生じた場合には、当サービスの所在地を管轄する裁判所を専属的合意管轄とします。
              </p>
            </section>

            <section className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                制定日：2025年10月13日
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
