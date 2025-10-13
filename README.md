# AI恋愛悩み診断サービス

AIを活用した恋愛心理診断アプリケーション

## 🌟 機能

- **20問の本格診断**: ジョン・アラン・リー「ラブスタイル類型論」に基づく心理診断
- **6タイプ分類**: 安心型、共感依存型、恋愛過集中型、自立防衛型、理想投影型、感情ジェットコースター型
- **AI分析**: Google Gemini APIによるパーソナライズされた分析
- **属性対応**: 性別・年代・恋愛状況に応じた最適化
- **悩み入力**: 自由記述による詳細なアドバイス生成

## 🚀 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: TailwindCSS
- **AI API**: Google Gemini Pro
- **データベース**: Firebase Firestore (予定)
- **決済**: Stripe (予定)
- **デプロイ**: Vercel

## 📦 セットアップ

### インストール

```bash
# リポジトリをクローン
git clone git@github.com:yohei-ny/renai.git
cd ai-love-diagnosis

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
```

### 環境変数

`.env.local` に以下を設定してください：

```bash
# Gemini API
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite-preview-09-2025

# Firebase (今後実装予定)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe (今後実装予定)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

## 📁 プロジェクト構造

```
ai-love-diagnosis/
├── app/
│   ├── page.tsx                 # トップページ
│   ├── demographics/            # 属性入力
│   ├── diagnosis/               # 診断画面
│   ├── concern/                 # 悩み入力
│   ├── result/                  # 結果表示
│   └── api/
│       └── analyze/             # AI分析API
├── components/
│   ├── ui/                      # UIコンポーネント
│   └── layout/                  # レイアウト
├── lib/
│   ├── questions.ts             # 20問の質問データ
│   ├── scoring.ts               # スコアリングロジック
│   ├── gemini.ts                # Gemini API統合
│   └── firebase.ts              # Firebase設定
├── types/
│   └── index.ts                 # TypeScript型定義
└── public/
    └── images/                  # 画像ファイル
```

## 🚀 デプロイ (Vercel)

### 1. GitHubにプッシュ

```bash
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:yohei-ny/renai.git
git push -u origin main
```

### 2. Vercelにデプロイ

1. [Vercel](https://vercel.com) にログイン
2. "New Project" をクリック
3. GitHubリポジトリ `yohei-ny/renai` を選択
4. 環境変数を設定:
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL`
5. "Deploy" をクリック

### 3. 環境変数の設定

Vercel ダッシュボード > Settings > Environment Variables で以下を設定:

```
GEMINI_API_KEY=AIzaSyBTLT1tlA8pe1Xy14X2ybUXfwapAyHn7jM
GEMINI_MODEL=gemini-2.5-flash-lite-preview-09-2025
```

## 🎨 デザイン

- ピンク・紫系のグラデーション
- 柔らかく女性向けのUI
- スムーズなアニメーション
- レスポンシブデザイン

## 📄 ライセンス

このプロジェクトは個人利用・商用利用可能です。

---

**© 2025 AI恋愛悩み診断サービス**
