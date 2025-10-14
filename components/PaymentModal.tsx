'use client';

import { useState, useEffect } from 'react';
import { loadStripe, PaymentRequest } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';

// Stripeの公開可能キーを使用
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnosisId: string;
  onSuccess: () => void;
}

interface CheckoutFormProps {
  diagnosisId: string;
  onSuccess: () => void;
  onClose: () => void;
  clientSecret: string;
}

function CheckoutForm({ diagnosisId, onSuccess, onClose, clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  // Payment Request Button（Apple Pay / Google Pay）の初期化
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'JP',
      currency: 'jpy',
      total: {
        label: 'AI恋愛診断 詳細レポート',
        amount: 480,
      },
      requestPayerName: false,
      requestPayerEmail: false,
      // Apple PayとGoogle Payを明示的に有効化
      disableWallets: [], // すべてのウォレットを許可
    });

    // デバイス・ブラウザがApple PayやGoogle Payに対応しているか確認
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    // 決済処理
    pr.on('paymentmethod', async (ev) => {
      try {
        // Payment Intentの確認
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          ev.complete('fail');
          setErrorMessage(confirmError.message || '決済に失敗しました');
        } else {
          ev.complete('success');

          // Firestoreを更新
          if (paymentIntent && paymentIntent.status === 'succeeded') {
            await fetch('/api/payment/update-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                diagnosisId,
                paymentIntentId: paymentIntent.id,
              }),
            });

            onSuccess();
            onClose();
          }
        }
      } catch {
        ev.complete('fail');
        setErrorMessage('決済処理中にエラーが発生しました');
      }
    });
  }, [stripe, diagnosisId, onSuccess, onClose, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/result?paid=true&diagnosisId=${diagnosisId}`,
        },
        redirect: 'if_required', // リダイレクトを必要な場合のみに
      });

      if (error) {
        setErrorMessage(error.message || '決済に失敗しました');
        setLoading(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 決済成功
        // Firestoreを更新
        await fetch('/api/payment/update-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            diagnosisId,
            paymentIntentId: paymentIntent.id,
          }),
        });

        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage('決済処理中にエラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Apple Pay / Google Pay ボタン */}
      {paymentRequest && (
        <div className="mb-4">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>
        </div>
      )}

      <PaymentElement
        options={{
          layout: 'tabs',
          wallets: {
            applePay: 'auto',
            googlePay: 'auto',
          },
        }}
      />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-full transition-all disabled:opacity-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '処理中...' : '¥480を支払う'}
        </button>
      </div>
    </form>
  );
}

export default function PaymentModal({
  isOpen,
  onClose,
  diagnosisId,
  onSuccess,
}: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loadingSecret, setLoadingSecret] = useState(true);

  useEffect(() => {
    if (isOpen && diagnosisId) {
      setLoadingSecret(true);
      // Payment Intentを作成
      fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosisId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error('No clientSecret in response:', data);
          }
          setLoadingSecret(false);
        })
        .catch((error) => {
          console.error('Failed to create payment intent:', error);
          setLoadingSecret(false);
        });
    }
  }, [isOpen, diagnosisId]);

  if (!isOpen) return null;

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#ec4899',
      colorBackground: '#ffffff',
      colorText: '#374151',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
    },
  };

  const options = {
    clientSecret,
    appearance,
    // PaymentElementでウォレット決済を有効化
    loader: 'auto' as const,
    // Stripeロゴを非表示
    business: { name: 'IBJ Matching' },
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">詳細レポート購入</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600">
            AIによる詳細な恋愛診断レポート（2500-3500文字）
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">料金</span>
            <span className="text-2xl font-bold text-gray-800">¥480</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ あなたの恋愛の本質（800-1000文字）</li>
            <li>✓ 今のあなたに必要な視点（500-700文字）</li>
            <li>✓ これから試したい3つのアプローチ（700-900文字）</li>
            <li>✓ 根源的な問いかけ（400-600文字）</li>
          </ul>
        </div>

        {loadingSecret ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">決済フォームを準備中...</p>
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              diagnosisId={diagnosisId}
              onSuccess={onSuccess}
              onClose={onClose}
              clientSecret={clientSecret}
            />
          </Elements>
        ) : (
          <div className="py-12 text-center">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-red-600 font-bold mb-2">決済フォームの読み込みに失敗しました</p>
            <p className="text-sm text-gray-600 mb-6">
              エラーが発生しました。もう一度お試しいただくか、<br />
              しばらく時間をおいてから再度お試しください。
            </p>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-8 rounded-full"
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
