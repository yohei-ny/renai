import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

interface DiagnosisData {
  id: string;
  createdAt?: { toDate: () => Date } | Date | string;
  isPaid?: boolean;
  amount?: number;
  type?: string;
}

export async function GET() {
  try {
    const diagnosesRef = collection(db, 'diagnoses');

    // 全診断データを取得
    const q = query(diagnosesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const diagnoses: DiagnosisData[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 今日の開始時刻（0時）
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 今日のデータをフィルタリング
    const todayDiagnoses = diagnoses.filter(d => {
      const createdAt = d.createdAt?.toDate ? d.createdAt.toDate() : new Date(d.createdAt);
      return createdAt >= today;
    });

    const todayPaid = todayDiagnoses.filter(d => d.isPaid);

    // 今日のKPI
    const todayStats = {
      totalDiagnoses: todayDiagnoses.length,
      paidCount: todayPaid.length,
      revenue: todayPaid.reduce((sum, d) => sum + (d.amount || 0), 0),
      cvr: todayDiagnoses.length > 0
        ? ((todayPaid.length / todayDiagnoses.length) * 100).toFixed(2)
        : '0.00'
    };

    // 過去30日分の日別データ
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30Days = diagnoses.filter(d => {
      const createdAt = d.createdAt?.toDate ? d.createdAt.toDate() : new Date(d.createdAt);
      return createdAt >= thirtyDaysAgo;
    });

    // 日別集計
    const dailyData: { [key: string]: { diagnoses: number; paid: number; revenue: number } } = {};

    last30Days.forEach(d => {
      const createdAt = d.createdAt?.toDate ? d.createdAt.toDate() : new Date(d.createdAt);
      const dateKey = createdAt.toISOString().split('T')[0]; // YYYY-MM-DD

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { diagnoses: 0, paid: 0, revenue: 0 };
      }

      dailyData[dateKey].diagnoses += 1;
      if (d.isPaid) {
        dailyData[dateKey].paid += 1;
        dailyData[dateKey].revenue += d.amount || 0;
      }
    });

    // 日別データを配列に変換（日付順）
    const dailyChartData = Object.keys(dailyData)
      .sort()
      .map(date => ({
        date,
        diagnoses: dailyData[date].diagnoses,
        paid: dailyData[date].paid,
        revenue: dailyData[date].revenue
      }));

    // タイプ別分布
    const typeDistribution: { [key: string]: number } = {};
    diagnoses.forEach(d => {
      const type = d.type || 'Unknown';
      typeDistribution[type] = (typeDistribution[type] || 0) + 1;
    });

    // 全期間の統計
    const allTimeStats = {
      totalDiagnoses: diagnoses.length,
      totalPaid: diagnoses.filter(d => d.isPaid).length,
      totalRevenue: diagnoses.reduce((sum, d) => d.isPaid ? sum + (d.amount || 0) : sum, 0),
      overallCvr: diagnoses.length > 0
        ? ((diagnoses.filter(d => d.isPaid).length / diagnoses.length) * 100).toFixed(2)
        : '0.00'
    };

    return NextResponse.json({
      success: true,
      data: {
        today: todayStats,
        allTime: allTimeStats,
        daily: dailyChartData,
        typeDistribution
      }
    });
  } catch (error) {
    console.error('Admin stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
