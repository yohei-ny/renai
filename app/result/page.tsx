'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Answer, Demographics, Scores, DiagnosisType } from '@/types';
import { calculateScores, determineType, getTypeName, getTypeDescription } from '@/lib/scoring';

export default function ResultPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores | null>(null);
  const [type, setType] = useState<DiagnosisType | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState<string>('');
  const [isPaid, setIsPaid] = useState(false);
  const [detailReport, setDetailReport] = useState<string>('');
  const [purchasing, setPurchasing] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      // ローカルストレージからデータを取得
      const demographicsData = localStorage.getItem('demographics');
      const answersData = localStorage.getItem('answers');
      const concernData = localStorage.getItem('concern');

      if (!demographicsData || !answersData) {
        router.push('/demographics');
        return;
      }

      const demo: Demographics = JSON.parse(demographicsData);
      const answers: Answer[] = JSON.parse(answersData);
      const concern = concernData || '';

      // ローカルでスコア計算（即座に表示用）
      const calculatedScores = calculateScores(answers);
      const diagnosisType = determineType(calculatedScores);

      // 最低3秒間のローディング演出
      await new Promise(resolve => setTimeout(resolve, 3000));

      setScores(calculatedScores);
      setType(diagnosisType);
      setLoading(false);

      // AI分析をバックグラウンドで実行
      setAnalyzing(true);
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            demographics: demo,
            answers,
            concern
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setDiagnosisId(result.data.diagnosisId);
          setAiSummary(result.data.summaryText);
        } else {
          // APIエラー時はデフォルトテキスト
          setAiSummary(getTypeDescription(diagnosisType));
        }
      } catch (error) {
        console.error('Analysis fetch error:', error);
        // エラー時はデフォルトテキスト
        setAiSummary(getTypeDescription(diagnosisType));
      } finally {
        setAnalyzing(false);
      }
    };

    fetchAnalysis();
  }, [router]);

  // URLパラメータから決済完了をチェック
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paidParam = params.get('paid');
    const diagnosisIdParam = params.get('diagnosisId');

    if (paidParam === 'true' && diagnosisIdParam) {
      setIsPaid(true);
      setDiagnosisId(diagnosisIdParam);
      fetchDetailedReport(diagnosisIdParam);
    }
  }, []);

  // 購入ボタン
  const handlePurchase = async () => {
    if (!diagnosisId) {
      alert('診断IDが見つかりません。もう一度診断をお試しください。');
      return;
    }

    setPurchasing(true);

    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosisId }),
      });

      if (response.ok) {
        const { url } = await response.json();
        // Stripe Checkoutへリダイレクト
        window.location.href = url;
      } else {
        alert('決済ページの読み込みに失敗しました');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('決済ページの読み込みに失敗しました');
    } finally {
      setPurchasing(false);
    }
  };

  // 詳細レポート取得
  const fetchDetailedReport = async (id: string) => {
    setLoadingReport(true);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosisId: id }),
      });

      if (response.ok) {
        const { report } = await response.json();
        setDetailReport(report);
      } else {
        alert('レポートの読み込みに失敗しました');
      }
    } catch (error) {
      console.error('Report fetch error:', error);
      alert('レポートの読み込みに失敗しました');
    } finally {
      setLoadingReport(false);
    }
  };

  if (loading || !scores || !type) {
    return (
      <div className="min-h-screen bg-gradient-romantic flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          {/* ローディングアニメーション */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-6">
            <div className="relative mb-8">
              {/* 外側の円 */}
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-pink-500 mx-auto"></div>
              {/* 内側の円 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                <div className="rounded-full h-16 w-16 bg-gradient-to-r from-pink-400 to-purple-400"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              診断結果を分析中...
            </h2>

            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="animate-bounce">💖</div>
                <p className="text-sm">あなたの回答パターンを解析しています</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🧠</div>
                <p className="text-sm">AIがあなたの恋愛傾向を分析中</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
                <p className="text-sm">パーソナライズされた結果を生成中</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            しばらくお待ちください...
          </p>
        </div>
      </div>
    );
  }

  const typeName = getTypeName(type);
  const typeDescription = getTypeDescription(type);

  return (
    <div className="min-h-screen bg-gradient-romantic py-8 px-4">
      <main className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            ♡IBJ Matching
          </h1>
          <h2 className="text-xl font-bold text-gray-600">
            診断結果
          </h2>
        </div>

        {/* 結果カード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6">

          {/* タイプ表示 */}
          <div className="text-center mb-8 pb-8 border-b-2 border-pink-100">
            <div className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full mb-4">
              <p className="text-sm font-medium mb-1">あなたは</p>
              <p className="text-3xl font-bold">「{typeName}」</p>
              <p className="text-sm mt-1">タイプです</p>
            </div>
          </div>

          {/* スコア表示 */}
          <div className="mb-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">📊 あなたのスコア</h3>

            {/* 依存スコア */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">依存スコア</span>
                <span className="text-sm font-bold text-pink-600">{scores.anxiety}点</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-pink-500 h-full transition-all duration-1000"
                  style={{ width: `${scores.anxiety}%` }}
                />
              </div>
            </div>

            {/* 自立スコア */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">自立スコア</span>
                <span className="text-sm font-bold text-blue-600">{scores.autonomy}点</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-1000"
                  style={{ width: `${scores.autonomy}%` }}
                />
              </div>
            </div>

            {/* 理想化スコア */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">理想化スコア</span>
                <span className="text-sm font-bold text-purple-600">{scores.idealization}点</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-purple-500 h-full transition-all duration-1000"
                  style={{ width: `${scores.idealization}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI分析 */}
          <div className="bg-pink-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              💭 {aiSummary ? 'AIによる分析' : '簡易分析'}
            </h3>

            {analyzing && !aiSummary ? (
              <div className="py-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
                  <div className="animate-pulse">
                    <p className="text-gray-700 font-medium">AIが詳細に分析中...</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="animate-bounce h-2 w-2 bg-pink-500 rounded-full" style={{ animationDelay: '0s' }}></div>
                  <div className="animate-bounce h-2 w-2 bg-pink-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                  <div className="animate-bounce h-2 w-2 bg-pink-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">
                  あなたの回答と悩みを総合的に分析しています
                </p>
              </div>
            ) : aiSummary ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {aiSummary}
              </div>
            ) : (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {typeDescription}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  あなたの回答からは、恋愛において{scores.anxiety > 60 ? '相手への不安' : '安定感'}と
                  {scores.autonomy > 60 ? '自立した姿勢' : '相手への依存'}、
                  そして{scores.idealization > 60 ? '高い理想' : '現実的な視点'}が見えます。
                </p>
              </>
            )}
          </div>

          {/* 有料版への誘導 or 詳細レポート表示 */}
          {isPaid && detailReport ? (
            <div className="space-y-6">
              {/* 購入完了バッジ */}
              <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-2xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-lg font-bold">詳細レポート</h3>
                </div>
                <p className="text-sm opacity-90">ご購入ありがとうございます</p>
              </div>

              {/* 詳細レポート本文 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div
                  className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed"
                  style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.8'
                  }}
                >
                  {detailReport.split('\n').map((line, index) => {
                    // ## で始まる見出し
                    if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b-2 border-pink-200">
                          {line.replace('## ', '')}
                        </h2>
                      );
                    }
                    // ### で始まる小見出し
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-lg font-bold text-gray-700 mt-6 mb-3">
                          {line.replace('### ', '')}
                        </h3>
                      );
                    }
                    // 箇条書き
                    if (line.trim().startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4 mb-2 text-gray-700">
                          {line.replace(/^- /, '')}
                        </li>
                      );
                    }
                    // 空行
                    if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    // 通常のテキスト
                    return (
                      <p key={index} className="mb-4 text-gray-700">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : loadingReport ? (
            <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 border-2 border-yellow-300">
              <div className="flex items-center justify-center gap-3 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
                <p className="text-gray-700 font-medium">詳細レポートを生成中...</p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 border-2 border-yellow-300">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🔒</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    AIの詳しい分析を見る（¥480）
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    AIが「あなたの恋愛の根本的な思考パターン」と「今の関係を穏やかにする行動法」を具体的に言語化します。
                  </p>
                </div>
              </div>

              <ul className="text-sm text-gray-700 space-y-2 mb-6 ml-12">
                <li>✓ あなたの恋愛の本質（800-1000文字）</li>
                <li>✓ 今のあなたに必要な安心（500-700文字）</li>
                <li>✓ これからできる行動（700-900文字）</li>
                <li>✓ 心の整理のヒント（400-600文字）</li>
              </ul>

              <button
                onClick={handlePurchase}
                disabled={purchasing || !diagnosisId}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchasing ? '処理中...' : '詳細レポートを購入する（¥480）'}
              </button>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            ※ 本診断はAIによる傾向分析であり、医学的・心理学的診断ではありません。
          </p>
          <p className="text-xs text-gray-500">
            ※ 深刻な悩みがある場合は、専門機関への相談をお勧めします。
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-pink-500 hover:text-pink-600 font-medium text-sm underline"
          >
            トップに戻る
          </button>
        </div>
      </main>
    </div>
  );
}
