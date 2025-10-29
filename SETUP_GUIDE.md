# 課金機能 セットアップガイド

課金機能を実装するための準備手順を順番に説明します。

---

## 📋 必要なもの一覧

### 1. **Stripeアカウント**
- 決済処理のため
- 無料で作成可能
- テストモードで開発可能

### 2. **Firebaseプロジェクト**
- データベース（Firestore）
- ユーザー認証（オプション）
- 無料枠で十分

### 3. **各種APIキー**
- Stripe APIキー（公開・秘密）
- Firebase設定情報
- Webhook シークレット

---

## 🚀 手順1: Stripeアカウント作成

### 1-1. アカウント登録

1. **Stripe公式サイト**にアクセス
   - https://stripe.com/jp

2. **「今すぐ始める」をクリック**
   - メールアドレス入力
   - パスワード設定
   - 会社名入力（個人の場合は個人名でOK）

3. **メール認証**
   - 受信したメールのリンクをクリック

### 1-2. ダッシュボードにログイン

- https://dashboard.stripe.com/login

### 1-3. テストモードに切り替え

- 画面右上の「**テストモード**」トグルをON

---

## 🔑 手順2: Stripe APIキー取得

### 2-1. APIキーページにアクセス

1. ダッシュボード左メニュー
2. **「開発者」→「APIキー」**をクリック

### 2-2. 2つのキーをコピー

#### ① 公開可能キー（Publishable key）
```
pk_test_xxxxxxxxxxxxxxxxxxxxx
```
→ フロントエンドで使用

#### ② シークレットキー（Secret key）
```
sk_test_xxxxxxxxxxxxxxxxxxxxx
```
→ バックエンド（API）で使用

⚠️ **シークレットキーは絶対に外部公開しないこと**

---

## 💳 手順3: Stripe商品設定

### 3-1. 商品を作成

1. ダッシュボード左メニュー
2. **「商品カタログ」→「商品」**をクリック
3. **「+ 商品を追加」**をクリック

### 3-2. 商品情報を入力

```
商品名: AI恋愛診断 詳細レポート
説明: あなたの恋愛の本質を深く分析します
```

### 3-3. 価格を設定

```
料金モデル: 標準の料金体系
価格: ¥480
通貨: JPY（日本円）
請求期間: 1回のみ
```

### 3-4. 保存

→ 価格ID（`price_xxxxx`）をメモ

---

## 🔗 手順4: Webhook設定

### 4-1. Webhookエンドポイントを追加

1. **「開発者」→「Webhook」**をクリック
2. **「+ エンドポイントを追加」**をクリック

### 4-2. 設定内容

```
エンドポイントURL: https://your-domain.vercel.app/api/webhook/stripe
説明: 決済完了イベント受信
リッスンするイベント: checkout.session.completed
```

⚠️ **デプロイ後に実際のURLに変更すること**

### 4-3. Webhookシークレットをコピー

```
whsec_xxxxxxxxxxxxxxxxxxxxx
```

---

## 💳 手順5: Apple Pay設定（重要）

### 5-1. Apple Payを有効化

Apple PayをStripeで使用するには、ドメインの検証が必要です。

1. **Stripeダッシュボード**にログイン
2. 左メニュー「**設定**」→「**決済方法**」をクリック
3. **「Apple Pay」**セクションを見つける
4. **「Apple Payを有効にする」**をクリック

### 5-2. ドメインを追加・検証

#### 開発環境（localhost）の場合

localhostは自動的に検証されるため、追加設定は不要です。

#### 本番環境（Vercel等）の場合

1. **「ドメインを追加」**をクリック
2. デプロイ先のドメインを入力
   ```
   例: your-app.vercel.app
   ```
3. **「ドメインを追加」**をクリック
4. Stripeが自動的にドメインを検証します

⚠️ **重要な注意点:**
- デプロイ前にドメイン検証はできません
- デプロイ後、本番URLでドメインを追加してください
- 検証には数分かかる場合があります
- ドメインが検証されるまで、Apple Payは表示されません

### 5-3. 確認方法

1. Stripeダッシュボードの「決済方法」→「Apple Pay」
2. 追加したドメインのステータスが「検証済み」になっているか確認

---

## 🔥 手順6: Firebaseプロジェクト作成

### 6-1. Firebase Consoleにアクセス

- https://console.firebase.google.com/

### 6-2. プロジェクト作成

1. **「プロジェクトを追加」**をクリック
2. プロジェクト名: `ai-love-diagnosis` など
3. Google Analytics: 不要ならオフ
4. **「プロジェクトを作成」**

### 6-3. Webアプリを追加

1. プロジェクト概要ページ
2. **「</> （Webアプリ）」**アイコンをクリック
3. アプリ名: `ai-love-diagnosis-web`
4. **「アプリを登録」**

### 6-4. Firebase設定情報をコピー

表示される設定情報をメモ：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

---

## 🗄️ 手順7: Firestore設定

### 7-1. Firestoreデータベースを作成

1. 左メニュー「**Firestore Database**」
2. **「データベースの作成」**
3. ロケーション: `asia-northeast1`（東京）
4. セキュリティルール: **「テストモードで開始」**
5. **「有効にする」**

### 7-2. セキュリティルールを設定

後で以下に変更：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 診断データ: 読み取り・作成は誰でも可能
    match /diagnoses/{diagnosisId} {
      allow read, create: if true;
      // 更新は決済後のみ（サーバー側から）
      allow update: if false;
    }
  }
}
```

---

## 🔐 手順8: 環境変数を設定

### 8-1. ローカル環境（`.env.local`）

プロジェクトルートに `.env.local` を作成：

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx

# Gemini API
GEMINI_API_KEY=AIzaSyBTLT1tlA8pe1Xy14X2ybUXfwapAyHn7jM
GEMINI_MODEL=gemini-2.5-flash-lite-preview-09-2025

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# その他
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 8-2. Vercel環境変数

デプロイ後、Vercelダッシュボードで同じ内容を設定：

1. Vercelプロジェクトページ
2. **Settings** → **Environment Variables**
3. 上記の変数を1つずつ追加

⚠️ `NEXT_PUBLIC_BASE_URL` は本番URLに変更
例: `https://your-app.vercel.app`

---

## 📦 手順9: 必要なパッケージをインストール

```bash
npm install stripe firebase
```

すでにインストール済みです。

---

## ✅ 準備完了チェックリスト

### Stripe関連
- [ ] Stripeアカウント作成
- [ ] テストモードに切り替え
- [ ] APIキー取得（公開・秘密）
- [ ] 商品設定（¥480）
- [ ] Webhook設定
- [ ] Apple Pay有効化
- [ ] ドメイン検証（本番環境のみ）

### Firebase関連
- [ ] Firebaseプロジェクト作成
- [ ] Webアプリ追加
- [ ] Firebase設定情報取得
- [ ] Firestoreデータベース作成
- [ ] セキュリティルール設定

### 環境変数
- [ ] `.env.local` 作成
- [ ] 全てのキーを設定
- [ ] Vercel環境変数設定（デプロイ後）

### テスト
- [ ] ローカルで動作確認
- [ ] テスト決済実行
- [ ] Webhook受信確認

---

## 🧪 テスト用カード情報

Stripeテストモードで使えるカード：

```
カード番号: 4242 4242 4242 4242
有効期限: 任意の未来日付（例: 12/34）
CVC: 任意の3桁（例: 123）
郵便番号: 任意
```

その他のテストカード：
- **拒否**: `4000 0000 0000 0002`
- **3Dセキュア**: `4000 0027 6000 3184`

---

## 🚨 注意事項

### 1. セキュリティ
- **シークレットキーは絶対に公開しない**
- `.env.local` は `.gitignore` に含める
- 本番環境でもテストキーを使わない

### 2. 本番移行時
- Stripeダッシュボードで「本番モード」に切り替え
- 本番用APIキーを再取得
- Webhook URLを本番URLに更新
- Vercel環境変数を本番キーに更新

### 3. 料金
- Stripe手数料: 3.6%
- ¥480 → 手数料 ¥17 → 実質利益 ¥463

---

## 📞 次のステップ

準備が完了したら：

1. **実装開始**
   - API実装
   - フロントエンド実装
   - Firestore連携

2. **テスト**
   - ローカルで決済テスト
   - Webhook動作確認

3. **デプロイ**
   - Vercelにデプロイ
   - 本番環境でテスト

---

**準備ができたら教えてください！実装を始めます。**

---

## 🔧 Apple Payトラブルシューティング

### Apple Payボタンが表示されない場合

#### 1. ブラウザのコンソールログを確認

開発者ツールを開いて（F12キー）、以下のようなログを確認してください：

```
[PaymentRequest] useEffect triggered
[PaymentRequest] Device detection:
[PaymentRequest] canMakePayment result:
```

#### 2. よくある原因と解決方法

| 問題 | 原因 | 解決方法 |
|------|------|----------|
| `ClientSecret not available yet` | clientSecretの取得が遅い | 正常です。数秒待ってください |
| `canMakePayment result: null` | ドメインが検証されていない | Stripeダッシュボードでドメイン検証 |
| `canMakePayment result: null` | 対応していないブラウザ | Safari、Chromeを使用 |
| `canMakePayment result: null` | HTTPSでない | localhost以外はHTTPS必須 |
| エラーメッセージなし | Stripeキーが間違っている | .env.localを確認 |

#### 3. 確認すべきポイント

✅ **開発環境（localhost）の場合:**
- Safariブラウザを使用していますか？
- Apple Payに対応したデバイス（iPhoneなど）ですか？
- Stripeの公開キーは正しく設定されていますか？

✅ **本番環境の場合:**
- HTTPSで配信されていますか？
- Stripeダッシュボードでドメインを検証しましたか？
- ドメインのステータスが「検証済み」になっていますか？

#### 4. デバッグログの見方

良好な状態の例：
```
[PaymentRequest] useEffect triggered { hasStripe: true, hasClientSecret: true }
[PaymentRequest] Device detection: { isIOS: true, isSafari: true }
[PaymentRequest] canMakePayment result: { applePay: true }
[PaymentRequest] Available wallets: { applePay: true }
```

問題がある状態の例：
```
[PaymentRequest] useEffect triggered { hasStripe: true, hasClientSecret: true }
[PaymentRequest] Device detection: { isIOS: true, isSafari: true }
[PaymentRequest] canMakePayment result: null
[PaymentRequest] No payment methods available
[PaymentRequest] Note: Apple Pay requires domain verification in Stripe Dashboard
```

#### 5. それでも解決しない場合

1. **Stripeダッシュボードを確認**
   - 「設定」→「決済方法」→「Apple Pay」
   - ドメインが正しく追加されているか
   - ステータスが「検証済み」か

2. **別のブラウザで試す**
   - Safari（推奨）
   - Chrome（Apple Pay対応版）

3. **キャッシュをクリア**
   - ブラウザのキャッシュをクリア
   - ハードリロード（Cmd+Shift+R / Ctrl+Shift+R）

4. **環境変数を再確認**
   ```bash
   # .env.local
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # 正しいキーか確認
   ```

---
