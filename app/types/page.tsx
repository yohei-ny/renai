'use client';

import Link from 'next/link';
import { DiagnosisType } from '@/types';
import { getTypeName, getTypeCharacter } from '@/lib/scoring';
import Image from 'next/image';

export default function TypesListPage() {
  const types: DiagnosisType[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 drop-shadow-2xl">
            🔥 恋愛診断 6つのタイプ 🔥
          </h1>
          <p className="text-white text-lg sm:text-xl drop-shadow-lg">
            あなたはどのタイプ？クリックして詳細をチェック！
          </p>
        </div>

        {/* タイプ一覧グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {types.map((type) => {
            const character = getTypeCharacter(type);
            const typeName = getTypeName(type);
            const typeNumber = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(type) + 1;

            return (
              <Link
                key={type}
                href={`/types/${type}`}
                className="group relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* 話題沸騰中バッジ */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg z-10">
                  🔥 話題沸騰中
                </div>

                {/* キラキラエフェクト */}
                <div className="absolute top-5 right-5 text-3xl animate-pulse">✨</div>
                <div className="absolute bottom-5 left-5 text-2xl animate-bounce">💕</div>

                {/* コンテンツ */}
                <div className="relative z-10 flex flex-col items-center gap-6 mt-4">
                  {/* 画像 */}
                  <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden border-4 border-white group-hover:border-purple-300 transition-all">
                    <Image
                      src={character.imagePath}
                      alt={character.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* タイプ名 */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full shadow-lg">
                    <h2 className="text-2xl font-black">「{typeName}」</h2>
                  </div>

                  {/* キャラクター情報 */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 w-full shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{character.emoji}</span>
                      <span className="text-lg font-bold text-gray-800">{character.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-11">
                      {character.description}
                    </p>
                  </div>

                  {/* 詳細を見るボタン */}
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold group-hover:from-pink-600 group-hover:to-purple-600 transition-all shadow-md">
                    詳細を見る →
                  </div>

                  {/* OG画像番号表示（開発用） */}
                  <div className="text-xs text-gray-400">
                    画像: {typeNumber}.png
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl px-12 py-5 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all animate-pulse"
          >
            👉 無料で診断する 👈
          </Link>
          <p className="text-white text-sm mt-6 drop-shadow-lg">
            ※ 会員登録不要・完全無料
          </p>
        </div>
      </div>
    </div>
  );
}
