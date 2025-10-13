# 有料版（¥480）課金機能 設計書

## 📋 概要

無料診断後に「詳細レポートを購入する（¥480）」ボタンから課金し、AIによる詳細分析を提供する。

---

## 💰 価格設定

- **無料版**: 20問診断 + 簡易AI分析（300-400文字）
- **有料版**: ¥480（買い切り）で詳細レポート（2500-3500文字）

---

## 🔄 決済フロー

### 1. 結果ページで「詳細レポートを購入（¥480）」をクリック

↓

### 2. Stripe Checkoutページに遷移
- メールアドレス入力
- カード情報入力
- 決済実行

↓

### 3. 決済完了後、自動的にリダイレクト

↓

### 4. 詳細レポートページを表示
- Gemini APIで詳細分析を生成
- 4セクション構成のレポート表示

---

## 📊 データフロー

```
[結果ページ]
   ↓ 購入ボタンクリック
[POST /api/payment/create-session]
   ↓ Stripe Checkout URLを生成
[Stripe Checkoutページ]
   ↓ 決済完了
[Stripe Webhook → /api/webhook/stripe]
   ↓ 決済成功イベントを受信
[Firestoreを更新: isPaid = true]
   ↓
[詳細レポート生成 → Gemini API]
   ↓
[/result?paid=true&diagnosisId=xxx]
   ↓ 詳細レポート表示
```

---

## 🔧 必要な実装

### 1. Stripe設定

#### Stripeアカウント作成
1. https://stripe.com でアカウント作成
2. ダッシュボードで以下を取得：
   - **公開可能キー**: `pk_test_xxxxx`
   - **シークレットキー**: `sk_test_xxxxx`
   - **Webhookシークレット**: `whsec_xxxxx`

#### 商品設定
- 商品名: AI恋愛診断 詳細レポート
- 価格: ¥480
- 決済方法: カード（一回払い）

---

### 2. 環境変数

`.env.local` に追加：

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

### 3. API実装

#### A. `/api/payment/create-session` - Checkout作成

**リクエスト**:
```json
POST /api/payment/create-session
{
  "diagnosisId": "abc123"
}
```

**レスポンス**:
```json
{
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/xxxxx"
}
```

**実装内容**:
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { diagnosisId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: 'AI恋愛診断 詳細レポート',
            description: 'あなたの恋愛の本質を深く分析',
          },
          unit_amount: 480, // ¥480
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?paid=true&diagnosisId=${diagnosisId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?diagnosisId=${diagnosisId}`,
    metadata: {
      diagnosisId,
    },
  });

  return Response.json({
    sessionId: session.id,
    url: session.url
  });
}
```

---

#### B. `/api/webhook/stripe` - Webhook受信

**目的**: Stripe決済完了イベントを受信してFirestoreを更新

**実装内容**:
```typescript
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return Response.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const diagnosisId = session.metadata?.diagnosisId;

    if (diagnosisId) {
      // Firestoreを更新
      const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
      await updateDoc(diagnosisRef, {
        isPaid: true,
        paidAt: new Date(),
        paymentId: session.payment_intent,
        amount: 480,
      });
    }
  }

  return Response.json({ received: true });
}
```

---

#### C. `/api/generate-report` - 詳細レポート生成

**リクエスト**:
```json
POST /api/generate-report
{
  "diagnosisId": "abc123"
}
```

**レスポンス**:
```json
{
  "report": "## 1. あなたの恋愛の本質（Fact）\n\n..."
}
```

**実装内容**:
```typescript
import { generateDetailedReport } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  const { diagnosisId } = await request.json();

  // Firestoreから診断データを取得
  const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
  const diagnosisSnap = await getDoc(diagnosisRef);

  if (!diagnosisSnap.exists()) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const diagnosis = diagnosisSnap.data();

  // 購入済みチェック
  if (!diagnosis.isPaid) {
    return Response.json({ error: 'Not paid' }, { status: 403 });
  }

  // 既に生成済みの場合は返す
  if (diagnosis.detailText) {
    return Response.json({ report: diagnosis.detailText });
  }

  // Gemini APIで詳細レポート生成
  const report = await generateDetailedReport(
    diagnosis.demographics,
    diagnosis.scores,
    diagnosis.type,
    diagnosis.answers,
    diagnosis.concern
  );

  // Firestoreに保存
  await updateDoc(diagnosisRef, {
    detailText: report,
  });

  return Response.json({ report });
}
```

---

### 4. フロントエンド実装

#### 結果ページに購入ボタン追加

```typescript
// app/result/page.tsx

const handlePurchase = async () => {
  setLoading(true);

  try {
    const response = await fetch('/api/payment/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagnosisId }),
    });

    const { url } = await response.json();

    // Stripe Checkoutへリダイレクト
    window.location.href = url;
  } catch (error) {
    console.error('Payment error:', error);
    alert('決済ページの読み込みに失敗しました');
  } finally {
    setLoading(false);
  }
};
```

#### 購入後の詳細表示

```typescript
// 決済完了後にURLパラメータで判定
const searchParams = useSearchParams();
const isPaid = searchParams.get('paid') === 'true';

useEffect(() => {
  if (isPaid) {
    // 詳細レポートを取得
    fetchDetailedReport();
  }
}, [isPaid]);

const fetchDetailedReport = async () => {
  const response = await fetch('/api/generate-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ diagnosisId }),
  });

  const { report } = await response.json();
  setDetailReport(report);
};
```

---

## 📦 必要なパッケージ

```bash
npm install stripe
```

---

## 🗄️ Firestore データ構造

### Collection: `diagnoses`

```typescript
{
  diagnosisId: string,
  userId: string,
  createdAt: timestamp,

  // 属性
  demographics: {
    gender: 'female' | 'male' | 'no_answer',
    ageGroup: string,
    relationshipStatus: string
  },

  // 回答
  answers: Answer[],
  concern: string,

  // スコア
  scores: {
    anxiety: number,
    autonomy: number,
    idealization: number
  },

  type: DiagnosisType,

  // AI生成テキスト
  summaryText: string,      // 無料版
  detailText: string | null, // 有料版

  // 決済情報
  isPaid: boolean,
  paidAt: timestamp | null,
  paymentId: string | null,
  amount: number | null
}
```

---

## 🎨 UI設計

### 無料版結果ページ

```
┌─────────────────────────────────┐
│  【あなたは「共感依存型」】      │
│                                 │
│  📊 スコア表示                  │
│  💭 簡易AI分析（300-400文字）   │
│                                 │
│  🔒 詳細レポートを購入（¥480）  │
│  ┌─────────────────────────┐  │
│  │ ✓ 恋愛の本質（800-1000字）│  │
│  │ ✓ 必要な安心（500-700字） │  │
│  │ ✓ 行動提案（700-900字）   │  │
│  │ ✓ 心の整理（400-600字）   │  │
│  │                           │  │
│  │ [詳細レポートを購入]      │  │
│  └─────────────────────────┘  │
└─────────────────────────────────┘
```

### 有料版結果ページ

```
┌─────────────────────────────────┐
│  【あなたは「共感依存型」】      │
│                                 │
│  📊 スコア表示                  │
│  💭 簡易AI分析                  │
│                                 │
│  ✨ 購入済み詳細レポート        │
│  ┌─────────────────────────┐  │
│  │ ## 1. あなたの恋愛の本質  │  │
│  │ （Fact）                  │  │
│  │ 800-1000文字の詳細分析... │  │
│  │                           │  │
│  │ ## 2. 今のあなたに必要な  │  │
│  │ 安心（Accept）            │  │
│  │ 500-700文字...            │  │
│  │                           │  │
│  │ ## 3. これからできる行動  │  │
│  │ （Action）                │  │
│  │ 700-900文字...            │  │
│  │                           │  │
│  │ ## 4. 心の整理のヒント    │  │
│  │ （Mind）                  │  │
│  │ 400-600文字...            │  │
│  └─────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 🔐 セキュリティ

### 1. Webhook検証
- Stripeシグネチャーで検証
- 不正なリクエストを拒否

### 2. 購入済みチェック
- Firestoreで `isPaid` フラグを確認
- 未購入者は詳細レポートにアクセス不可

### 3. 環境変数
- Stripeキーは環境変数で管理
- GitHubにコミットしない

---

## 🧪 テスト方法

### 1. Stripeテストモード
- テストカード番号: `4242 4242 4242 4242`
- 有効期限: 任意の未来日付
- CVC: 任意の3桁

### 2. Webhook テスト
```bash
# Stripe CLIをインストール
brew install stripe/stripe-cli/stripe

# ローカルでWebhookをリスニング
stripe listen --forward-to localhost:3000/api/webhook/stripe

# テスト決済を実行
stripe trigger checkout.session.completed
```

---

## 📝 実装チェックリスト

### Stripe設定
- [ ] Stripeアカウント作成
- [ ] 商品・価格設定
- [ ] APIキー取得
- [ ] Webhook設定

### バックエンド
- [ ] `/api/payment/create-session` 実装
- [ ] `/api/webhook/stripe` 実装
- [ ] `/api/generate-report` 実装
- [ ] Firestore更新ロジック

### フロントエンド
- [ ] 購入ボタン実装
- [ ] 決済フロー実装
- [ ] 詳細レポート表示
- [ ] ローディング状態管理

### テスト
- [ ] テスト決済の実行
- [ ] Webhook受信テスト
- [ ] レポート生成テスト
- [ ] エラーハンドリング

---

## 💡 今後の拡張案

1. **メール通知**
   - 購入完了メール
   - レポートリンクを送付

2. **PDFダウンロード**
   - レポートをPDF化
   - ダウンロード機能

3. **再アクセス機能**
   - メールで専用URLを発行
   - 後から何度でも閲覧可能

4. **クーポン機能**
   - 割引コード
   - キャンペーン対応

---

**この設計書を元に実装を進めますか？**
