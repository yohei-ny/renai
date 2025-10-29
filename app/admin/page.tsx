'use client';

import { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Chart.js登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TodayStats {
  totalDiagnoses: number;
  paidCount: number;
  revenue: number;
  cvr: string;
}

interface AllTimeStats {
  totalDiagnoses: number;
  totalPaid: number;
  totalRevenue: number;
  overallCvr: string;
}

interface DailyData {
  date: string;
  diagnoses: number;
  paid: number;
  revenue: number;
}

interface AdminStats {
  today: TodayStats;
  allTime: AllTimeStats;
  daily: DailyData[];
  typeDistribution: { [key: string]: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats');
      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      } else {
        setError('データの取得に失敗しました');
      }
    } catch (err) {
      setError('エラーが発生しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'データが見つかりません'}</p>
          <button
            onClick={fetchStats}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  // グラフデータの準備
  const dailyDiagnosesData = {
    labels: stats.daily.map(d => d.date),
    datasets: [
      {
        label: '診断数',
        data: stats.daily.map(d => d.diagnoses),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const dailyRevenueData = {
    labels: stats.daily.map(d => d.date),
    datasets: [
      {
        label: '売上（円）',
        data: stats.daily.map(d => d.revenue),
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 1
      }
    ]
  };

  const typeLabels: { [key: string]: string } = {
    'A': '安心型',
    'B': '共感依存型',
    'C': '恋愛過集中型',
    'D': '自立防衛型',
    'E': '理想投影型',
    'F': '感情ジェット型'
  };

  const typeDistributionData = {
    labels: Object.keys(stats.typeDistribution).map(key => typeLabels[key] || key),
    datasets: [
      {
        data: Object.values(stats.typeDistribution),
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            管理ダッシュボード
          </h1>
          <p className="text-gray-600">恋愛診断サービスの運用状況</p>
        </div>

        {/* 今日のKPI */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 本日の実績</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">診断数</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.today.totalDiagnoses}
              </p>
              <p className="text-xs text-gray-500 mt-1">件</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">課金数</p>
              <p className="text-3xl font-bold text-pink-600">
                {stats.today.paidCount}
              </p>
              <p className="text-xs text-gray-500 mt-1">件</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">売上</p>
              <p className="text-3xl font-bold text-blue-600">
                ¥{stats.today.revenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">円</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">CVR</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.today.cvr}%
              </p>
              <p className="text-xs text-gray-500 mt-1">転換率</p>
            </div>
          </div>
        </div>

        {/* 全期間の統計 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 累計実績</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6">
              <p className="text-sm text-purple-700 mb-1">総診断数</p>
              <p className="text-3xl font-bold text-purple-800">
                {stats.allTime.totalDiagnoses}
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow p-6">
              <p className="text-sm text-pink-700 mb-1">総課金数</p>
              <p className="text-3xl font-bold text-pink-800">
                {stats.allTime.totalPaid}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6">
              <p className="text-sm text-blue-700 mb-1">総売上</p>
              <p className="text-3xl font-bold text-blue-800">
                ¥{stats.allTime.totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6">
              <p className="text-sm text-green-700 mb-1">平均CVR</p>
              <p className="text-3xl font-bold text-green-800">
                {stats.allTime.overallCvr}%
              </p>
            </div>
          </div>
        </div>

        {/* グラフセクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 日別診断数 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              日別診断数（過去30日）
            </h3>
            <Line
              data={dailyDiagnosesData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0
                    }
                  }
                }
              }}
            />
          </div>

          {/* 日別売上 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              日別売上（過去30日）
            </h3>
            <Bar
              data={dailyRevenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `¥${value}`
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* タイプ別分布 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            タイプ別分布（全期間）
          </h3>
          <div className="max-w-md mx-auto">
            <Doughnut
              data={typeDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* 更新ボタン */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchStats}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            データを更新
          </button>
        </div>
      </div>
    </div>
  );
}
