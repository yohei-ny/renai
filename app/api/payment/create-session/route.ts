import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { diagnosisId } = await request.json();

    if (!diagnosisId) {
      return NextResponse.json(
        { error: 'diagnosisId is required' },
        { status: 400 }
      );
    }

    // Stripe Checkoutセッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'AI恋愛診断 詳細レポート',
              description: 'あなたの恋愛の本質を深く分析します（2500-3500文字の詳細分析）',
            },
            unit_amount: 480, // ¥480
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/result?paid=true&diagnosisId=${diagnosisId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/result?diagnosisId=${diagnosisId}`,
      metadata: {
        diagnosisId,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
