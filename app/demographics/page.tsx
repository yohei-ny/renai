'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center px-4 py-8">
      <main className="max-w-md w-full">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            ♡IBJ Matching
          </h1>
          <h2 className="text-xl font-bold text-gray-600">
            AI恋愛悩み診断を始めましょう
          </h2>
          <p className="text-sm text-pink-500 mt-2">
            ❤️ あなたについて教えてください
          </p>
        </div>

        {/* フォーム */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 space-y-8">

          {/* 質問0-1: 性別 */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">
              【質問0-1】性別を選んでください
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setGender('female')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  gender === 'female'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 女性
              </button>
              <button
                onClick={() => setGender('male')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  gender === 'male'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 男性
              </button>
              <button
                onClick={() => setGender('no_answer')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  gender === 'no_answer'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 答えたくない
              </button>
            </div>
          </div>

          {/* 質問0-2: 年代 */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">
              【質問0-2】年代を選んでください
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setAgeGroup('10s')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  ageGroup === '10s'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 10代（18歳以上）
              </button>
              <button
                onClick={() => setAgeGroup('20s_early')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  ageGroup === '20s_early'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 20代前半（20〜24歳）
              </button>
              <button
                onClick={() => setAgeGroup('20s_late')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  ageGroup === '20s_late'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 20代後半（25〜29歳）
              </button>
              <button
                onClick={() => setAgeGroup('30s_early')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  ageGroup === '30s_early'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 30代前半（30〜34歳）
              </button>
              <button
                onClick={() => setAgeGroup('30s_late')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  ageGroup === '30s_late'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 30代後半（35〜39歳）
              </button>
              <button
                onClick={() => setAgeGroup('40s_plus')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  ageGroup === '40s_plus'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 40代以上
              </button>
            </div>
          </div>

          {/* 質問0-3: 恋愛状況 */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">
              【質問0-3】現在の恋愛状況は？
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setRelationshipStatus('dating')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  relationshipStatus === 'dating'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 恋人がいる
              </button>
              <button
                onClick={() => setRelationshipStatus('crush')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  relationshipStatus === 'crush'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 片思い中
              </button>
              <button
                onClick={() => setRelationshipStatus('single')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  relationshipStatus === 'single'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 恋愛していない
              </button>
              <button
                onClick={() => setRelationshipStatus('complicated')}
                className={`w-full p-4 rounded-full border-2 transition-all ${
                  relationshipStatus === 'complicated'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'
                }`}
              >
                □ 複雑な関係
              </button>
            </div>
          </div>

          {/* 次へボタン */}
          <button
            onClick={handleSubmit}
            disabled={!gender || !ageGroup || !relationshipStatus}
            className={`w-full py-4 rounded-full font-bold text-white transition-all shadow-lg ${
              gender && ageGroup && relationshipStatus
                ? 'bg-pink-500 hover:bg-pink-600 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            診断を開始する →
          </button>
        </div>

        {/* フッター */}
        <p className="text-xs text-gray-500 text-center mt-6">
          ※ 入力いただいた情報は診断結果の最適化にのみ使用します
        </p>
      </main>
    </div>
  );
}
