'use client';

import { useSearchParams } from 'next/navigation';
import { DiagnosisType } from '@/types';
import { getTypeName, getTypeCharacter } from '@/lib/scoring';
import Image from 'next/image';
import { Suspense } from 'react';

function ScreenshotContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as DiagnosisType | null;

  // デフォルトはA（犬）
  const type: DiagnosisType = typeParam || 'A';

  const typeName = getTypeName(type);
  const character = getTypeCharacter(type);

  return (
    <div className="min-h-screen bg-gradient-romantic flex items-center justify-center px-4">
      <main className="w-full max-w-md">
        {/* タイプ選択ナビ（スクショには含めない） */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-4 mb-6 print:hidden">
          <p className="text-sm font-bold text-gray-700 mb-3 text-center">タイプを選択:</p>
          <div className="grid grid-cols-3 gap-2">
            {(['A', 'B', 'C', 'D', 'E', 'F'] as DiagnosisType[]).map((t) => (
              <a
                key={t}
                href={`/screenshot?type=${t}`}
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

        {/* スクリーンショット用カード */}
        <div className={`bg-gradient-to-br ${character.gradient} rounded-3xl shadow-2xl p-8`}>
          <div className="flex flex-col items-center gap-6">
            {/* キャラクター画像 */}
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={character.imagePath}
                  alt={character.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* タイプ名 */}
            <div className="bg-white/95 backdrop-blur-sm px-10 py-5 rounded-full shadow-xl">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                {typeName}
              </p>
            </div>

            {/* キャラクター説明 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2 justify-center">
                <span className="text-3xl">{character.emoji}</span>
                <p className="text-xl font-bold text-gray-800">{character.name}</p>
              </div>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {character.description}
              </p>
            </div>
          </div>
        </div>

        {/* 使い方説明（スクショには含めない） */}
        <div className="bg-blue-50 rounded-xl p-4 text-center mt-6 print:hidden">
          <p className="text-sm text-gray-700 mb-2">
            <strong>📸 スクリーンショット撮影用</strong>
          </p>
          <p className="text-xs text-gray-600">
            このカード部分をスクリーンショットしてください
          </p>
        </div>
      </main>
    </div>
  );
}

export default function ScreenshotPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-romantic flex items-center justify-center">読み込み中...</div>}>
      <ScreenshotContent />
    </Suspense>
  );
}
