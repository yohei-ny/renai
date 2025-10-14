import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

/**
 * Payment Intentを作成（ページ内決済用）
 */
export async function POST(request: NextRequest) {
  try {
    // Stripe Secret Keyのチェック
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      );
    }

    const { diagnosisId } = await request.json();

    if (!diagnosisId) {
      return NextResponse.json(
        { error: 'Diagnosis ID is required' },
        { status: 400 }
      );
    }

    // Payment Intentを作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 480, // ¥480
      currency: 'jpy',
      metadata: {
        diagnosisId,
      },
      // 自動決済方法を有効化（カード、Apple Pay、Google Payなどすべて）
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent creation error:', error);
    // エラーの詳細をログに出力
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      {
        error: 'Failed to create payment intent',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
