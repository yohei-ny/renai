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
      // 自動決済確認を有効化
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
