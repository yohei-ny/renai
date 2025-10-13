'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Gender, AgeGroup, RelationshipStatus } from '@/types';

export default function DemographicsPage() {
  const router = useRouter();
  const [gender, setGender] = useState<Gender | null>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus | null>(null);

  const handleSubmit = () => {
    if (!gender || !ageGroup || !relationshipStatus) {
      alert('すべての項目を選択してください');
      return;
    }

    // ローカルストレージに保存
    localStorage.setItem('demographics', JSON.stringify({
      gender,
      ageGroup,
      relationshipStatus
    }));

    // 診断ページへ遷移
    router.push('/diagnosis');
  };

  return (
    <div className="min-h-screen bg-gradient-romantic flex items-center justify-center px-4 py-8">
      <main className="max-w-4xl w-full">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">
            ♡IBJ Matching
          </h1>
          <p className="text-gray-600 text-sm">
            あなたについて教えてください
          </p>
        </div>

        {/* フォーム - 横並びで3列 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6">

            {/* 性別 */}
            <div>
              <label className="block text-gray-700 font-bold mb-3 text-center text-sm">
                性別
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setGender('female')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    gender === 'female'
                      ? 'border-pink-500 bg-pink-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                  }`}
                >
                  女性
                </button>
                <button
                  onClick={() => setGender('male')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    gender === 'male'
                      ? 'border-blue-500 bg-blue-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  男性
                </button>
                <button
                  onClick={() => setGender('no_answer')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    gender === 'no_answer'
                      ? 'border-gray-500 bg-gray-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  答えたくない
                </button>
              </div>
            </div>

            {/* 年代 */}
            <div>
              <label className="block text-gray-700 font-bold mb-3 text-center text-sm">
                年代
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setAgeGroup('10s')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    ageGroup === '10s'
                      ? 'border-purple-500 bg-purple-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  10代
                </button>
                <button
                  onClick={() => setAgeGroup('20s_early')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    ageGroup === '20s_early'
                      ? 'border-purple-500 bg-purple-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  20代前半
                </button>
                <button
                  onClick={() => setAgeGroup('20s_late')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    ageGroup === '20s_late'
                      ? 'border-purple-500 bg-purple-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  20代後半
                </button>
                <button
                  onClick={() => setAgeGroup('30s_early')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    ageGroup === '30s_early'
                      ? 'border-purple-500 bg-purple-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  30代前半
                </button>
                <button
                  onClick={() => setAgeGroup('30s_late')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    ageGroup === '30s_late'
                      ? 'border-purple-500 bg-purple-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  30代後半
                </button>
                <button
                  onClick={() => setAgeGroup('40s_plus')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    ageGroup === '40s_plus'
                      ? 'border-purple-500 bg-purple-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  40代以上
                </button>
              </div>
            </div>

            {/* 恋愛状況 */}
            <div>
              <label className="block text-gray-700 font-bold mb-3 text-center text-sm">
                恋愛状況
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setRelationshipStatus('dating')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    relationshipStatus === 'dating'
                      ? 'border-pink-500 bg-pink-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                  }`}
                >
                  💕 恋人がいる
                </button>
                <button
                  onClick={() => setRelationshipStatus('crush')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    relationshipStatus === 'crush'
                      ? 'border-pink-500 bg-pink-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                  }`}
                >
                  💭 片思い中
                </button>
                <button
                  onClick={() => setRelationshipStatus('single')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    relationshipStatus === 'single'
                      ? 'border-pink-500 bg-pink-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                  }`}
                >
                  🌱 恋愛していない
                </button>
                <button
                  onClick={() => setRelationshipStatus('complicated')}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-sm ${
                    relationshipStatus === 'complicated'
                      ? 'border-pink-500 bg-pink-500 text-white font-bold shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                  }`}
                >
                  🌀 複雑な関係
                </button>
              </div>
            </div>

          </div>

          {/* 次へボタン */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={!gender || !ageGroup || !relationshipStatus}
              className={`w-full py-4 rounded-full font-bold text-white transition-all shadow-lg text-lg ${
                gender && ageGroup && relationshipStatus
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              診断を開始する →
            </button>
          </div>

          {/* フッター */}
          <p className="text-xs text-gray-400 text-center mt-4 mb-2">
            ※ 入力いただいた情報は診断結果の最適化にのみ使用します
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline">
              利用規約
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 underline">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
