import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-romantic py-8 px-4">
      <main className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            プライバシーポリシー
          </h1>

          <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第1条（個人情報の定義）</h2>
              <p>
                本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法に定める「個人情報」を指し、
                生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
                特定の個人を識別できるもの、または個人識別符号が含まれるものを指します。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第2条（収集する情報）</h2>
              <p className="mb-2">当サービスは、ユーザーから以下の情報を収集します：</p>

              <div className="space-y-3 ml-4">
                <div>
                  <p className="font-semibold text-gray-800">1. 診断情報</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>性別・年代・恋愛状況などの属性情報</li>
                    <li>20問の診断への回答内容</li>
                    <li>自由記述による悩みや相談内容</li>
                    <li>診断結果データ（スコア、タイプ分類）</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">2. 処理に関する情報</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Google Gemini APIによる分析処理のために、入力された診断情報が使用されます</li>
                    <li>分析結果（要約文、詳細レポート）はFirebase Firestoreに保存されます</li>
                    <li>処理は匿名化された状態で行われ、個人を特定する情報は送信されません</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">3. 決済情報</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>有料サービス購入時の決済情報はStripe社のシステムで処理されます</li>
                    <li>当サービスはクレジットカード番号等の決済情報を直接保存しません</li>
                    <li>購入履歴（購入日時、金額、診断ID）のみを保存します</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">4. 技術情報</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>IPアドレス、ブラウザの種類、アクセス日時</li>
                    <li>Cookie、LocalStorage（診断データの一時保存用）</li>
                    <li>デバイス情報、画面サイズ（レスポンシブ対応のため）</li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm">
                  <span className="font-bold text-gray-800">重要：</span>
                  当サービスは会員登録を必要としないため、氏名・メールアドレス・電話番号などの
                  個人を直接特定できる情報は収集しません。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第3条（情報の利用目的）</h2>
              <p className="mb-2">収集した情報は、以下の目的で利用します：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>診断の実施と結果の提供</li>
                <li>診断結果のパーソナライズと精度向上</li>
                <li>有料サービスの提供と決済処理</li>
                <li>サービスの改善および新機能の開発</li>
                <li>統計データの作成（個人を特定できない形式で集計）</li>
                <li>お問い合わせへの対応</li>
                <li>利用規約違反への対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第4条（第三者提供）</h2>
              <div className="space-y-2">
                <p className="font-semibold">当サービスは、以下の場合を除き、ユーザーの同意なく第三者に情報を提供しません：</p>

                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-semibold text-gray-800">1. 業務委託先への提供</p>
                    <p className="text-sm ml-4">
                      以下のサービス提供のため、必要最小限の情報を委託先に提供します：
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-8 text-sm">
                      <li>Google Gemini API（診断分析）</li>
                      <li>Firebase/Google Cloud（データベース、ホスティング）</li>
                      <li>Stripe（決済処理）</li>
                      <li>Vercel（Webホスティング）</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">2. 法令に基づく場合</p>
                    <p className="text-sm ml-4">
                      法令に基づき開示が必要な場合
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">3. 人の生命、身体または財産の保護のために必要な場合</p>
                    <p className="text-sm ml-4">
                      本人の同意を得ることが困難な場合
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第5条（データ処理について）</h2>
              <div className="space-y-2">
                <p className="font-semibold">Google Gemini APIの利用に関する重要事項：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>
                    診断のために入力されたすべての情報（属性、回答、悩み）は、
                    Google Gemini APIに送信され、分析が行われます
                  </li>
                  <li>
                    送信される情報には、個人を特定できる氏名やメールアドレスは含まれません
                  </li>
                  <li>
                    Google社の利用ポリシーに従い、データは処理されます
                  </li>
                  <li>
                    分析は統計的な推測であり、結果の正確性を保証するものではありません
                  </li>
                  <li>
                    分析結果は医療的・心理学的診断ではありません
                  </li>
                </ul>
                <p className="mt-2 text-sm">
                  Google社のプライバシーポリシーについては、
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">こちら</a>
                  をご確認ください。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第6条（データの保存期間）</h2>
              <p className="mb-2">収集したデータは、以下の期間保存されます：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>診断結果データ：無期限（統計分析およびサービス改善のため）</li>
                <li>LocalStorageデータ：ブラウザのキャッシュクリアまで</li>
                <li>購入履歴：法令で定められた期間（最低5年間）</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                ※ ユーザーが診断結果の削除を希望する場合は、お問い合わせください
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第7条（Cookieおよび類似技術）</h2>
              <p className="mb-2">
                当サービスは、サービスの利便性向上のためCookieおよびLocalStorageを使用します。
              </p>
              <div className="space-y-2 ml-4">
                <div>
                  <p className="font-semibold">使用目的：</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>診断の進行状況の保存</li>
                    <li>診断IDの管理（結果ページへのアクセス）</li>
                    <li>ユーザー体験の最適化</li>
                  </ul>
                </div>
                <p className="text-sm">
                  ブラウザの設定でCookieを無効にすることも可能ですが、
                  一部機能が正常に動作しない場合があります。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第8条（セキュリティ）</h2>
              <p className="mb-2">
                当サービスは、情報の漏洩、滅失または毀損を防止するため、以下の対策を講じています：
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SSL/TLS暗号化通信の使用</li>
                <li>Firebase Firestoreのセキュリティルール設定</li>
                <li>APIキーの環境変数管理</li>
                <li>Stripe社の安全な決済システムの利用</li>
                <li>定期的なセキュリティアップデート</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第9条（ユーザーの権利）</h2>
              <p className="mb-2">ユーザーは、自身の情報について以下の権利を有します：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>診断結果データの開示請求</li>
                <li>診断結果データの削除請求</li>
                <li>データ利用の停止請求</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                これらの請求を行う場合は、当サービスの問い合わせ窓口までご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第10条（未成年者の利用）</h2>
              <p>
                未成年者が本サービスを利用する場合、保護者の同意を得た上でご利用ください。
                未成年者の情報についても、本プライバシーポリシーが適用されます。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第11条（プライバシーポリシーの変更）</h2>
              <p>
                当サービスは、必要に応じて本プライバシーポリシーを変更することができます。
                変更後のプライバシーポリシーは、本サイト上に掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">第12条（お問い合わせ）</h2>
              <p className="mb-2">
                本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください：
              </p>
              <div className="bg-gray-50 rounded-lg p-4 ml-4">
                <p className="text-sm text-gray-700">
                  サービス名：IBJ Matching - 恋愛診断<br />
                  管理者：IBJ Matching運営チーム<br />
                  URL：https://renai-nine.vercel.app/
                </p>
              </div>
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
