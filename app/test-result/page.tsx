'use client';

import { useSearchParams } from 'next/navigation';
import { DiagnosisType, Scores } from '@/types';
import { getTypeName, getTypeDescription, getTypeCharacter } from '@/lib/scoring';
import Image from 'next/image';
import { Suspense } from 'react';

function TestResultContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as DiagnosisType | null;

  // デフォルトはA（犬）
  const type: DiagnosisType = typeParam || 'A';

  // テスト用のダミースコア
  const getTestScores = (t: DiagnosisType): Scores => {
    switch (t) {
      case 'A': // 犬: バランス型
        return { anxiety: 40, autonomy: 70, idealization: 45 };
      case 'B': // うさぎ: 共感依存型
        return { anxiety: 70, autonomy: 35, idealization: 50 };
      case 'C': // 猫: 恋愛過集中型
        return { anxiety: 75, autonomy: 30, idealization: 65 };
      case 'D': // キツネ: 自立防衛型
        return { anxiety: 35, autonomy: 75, idealization: 60 };
      case 'E': // フクロウ: 理想投影型
        return { anxiety: 45, autonomy: 60, idealization: 80 };
      case 'F': // リス: 感情ジェットコースター型
        return { anxiety: 80, autonomy: 30, idealization: 75 };
      default:
        return { anxiety: 50, autonomy: 50, idealization: 50 };
    }
  };

  const scores = getTestScores(type);
  const typeName = getTypeName(type);
  const typeDescription = getTypeDescription(type);
  const character = getTypeCharacter(type);

  return (
    <div className="min-h-screen bg-gradient-romantic py-8 px-4">
      <main className="max-w-2xl mx-auto">
        {/* タイプ選択ナビ */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-4 mb-6">
          <p className="text-sm font-bold text-gray-700 mb-3 text-center">テスト表示モード - タイプを選択:</p>
          <div className="grid grid-cols-3 gap-2">
            {(['A', 'B', 'C', 'D', 'E', 'F'] as DiagnosisType[]).map((t) => (
              <a
                key={t}
                href={`/test-result?type=${t}`}
                className={`px-3 py-2 rounded-lg text-center text-sm font-bold transition-all ${
                  type === t
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getTypeName(t)}
              </a>
            ))}
          </div>
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-1">
            恋愛診断サービス
          </h1>
          <h2 className="text-lg font-bold text-gray-600">
            診断結果（テスト表示）
          </h2>
        </div>

        {/* 結果カード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 mb-6 space-y-6">

          {/* タイプ表示 - キャラクター付き */}
          <div className={`text-center pb-6 border-b-2 border-pink-100 bg-gradient-to-br ${character.gradient} rounded-2xl p-8`}>
            <div className="flex flex-col items-center gap-4">
              {/* キャラクター画像 */}
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={character.imagePath}
                    alt={character.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* タイプ名 */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">あなたは</p>
                <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-md">
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    「{typeName}」
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-2">タイプです</p>
              </div>

              {/* キャラクター説明 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{character.emoji}</span>
                  <p className="text-lg font-bold text-gray-800">{character.name}</p>
                </div>
                <p className="text-sm text-gray-600">{character.description}</p>
              </div>
            </div>
          </div>

          {/* スコア表示 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-700 mb-3">📊 あなたのスコア</h3>

            {/* 依存スコア */}
            <div>
              <div className="flex justify-between mb-1.5">
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
              <div className="flex justify-between mb-1.5">
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
              <div className="flex justify-between mb-1.5">
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

          {/* 診断分析 */}
          <div className="bg-pink-50 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-gray-700 mb-3">
              💭 簡易分析
            </h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {typeDescription}
            </p>
          </div>
        </div>

        {/* 使い方説明 */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-700 mb-2">
            <strong>📸 スクリーンショット用テストページ</strong>
          </p>
          <p className="text-xs text-gray-600">
            URL: <code className="bg-white px-2 py-1 rounded">/test-result?type=A</code> ～ <code className="bg-white px-2 py-1 rounded">F</code>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function TestResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-romantic flex items-center justify-center">読み込み中...</div>}>
      <TestResultContent />
    </Suspense>
  );
}
