import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook Error' },
      { status: 400 }
    );
  }

  // 決済完了イベントを処理
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const diagnosisId = session.metadata?.diagnosisId;

    if (diagnosisId) {
      try {
        // Firestoreを更新
        const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
        await updateDoc(diagnosisRef, {
          isPaid: true,
          paidAt: new Date(),
          paymentId: session.payment_intent,
          amount: 480,
        });

        console.log(`Payment completed for diagnosis: ${diagnosisId}`);
      } catch (error) {
        console.error('Failed to update Firestore:', error);
        return NextResponse.json(
          { error: 'Database update failed' },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
