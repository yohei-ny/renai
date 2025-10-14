import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

/**
 * 決済完了後にFirestoreのステータスを更新
 */
export async function POST(request: NextRequest) {
  try {
    const { diagnosisId, paymentIntentId } = await request.json();

    if (!diagnosisId || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Firestoreを更新
    const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
    await updateDoc(diagnosisRef, {
      isPaid: true,
      paidAt: new Date(),
      paymentId: paymentIntentId,
      amount: 480,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update status error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
