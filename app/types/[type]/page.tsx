'use client';

import { useParams, useRouter } from 'next/navigation';
import { DiagnosisType } from '@/types';
import { getTypeName, getTypeDescription, getTypeCharacter } from '@/lib/scoring';
import Image from 'next/image';
import { useEffect } from 'react';

export default function TypeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as DiagnosisType;

  // タイプの検証
  useEffect(() => {
    if (!['A', 'B', 'C', 'D', 'E', 'F'].includes(type)) {
      router.push('/types');
    }
  }, [type, router]);

  if (!type || !['A', 'B', 'C', 'D', 'E', 'F'].includes(type)) {
    return null;
  }

  const typeName = getTypeName(type);
  const typeDescription = getTypeDescription(type);
  const character = getTypeCharacter(type);
  const typeNumber = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(type) + 1;

  // OG画像のパス
  const ogImage = `/og/${typeNumber}.png`;

  // SNSシェア用のURL
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `私は「${typeName}」タイプでした！\n${character.name} - ${character.description}\n\nあなたも診断してみる？`;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToLine = () => {
    const url = `https://line.me/R/msg/text/?${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-12 px-4">
      {/* OGタグ用のメタ情報（動的に設定したい場合は別途対応が必要） */}
      <div className="max-w-3xl mx-auto">
        {/* 戻るボタン */}
        <button
          onClick={() => router.push('/types')}
          className="mb-6 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-all"
        >
          ← タイプ一覧に戻る
        </button>

        {/* メインカード */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* 話題沸騰中バッジ */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-2 rounded-full text-sm font-bold shadow-lg z-10">
            🔥 話題沸騰中
          </div>

          {/* エフェクト */}
          <div className="absolute top-8 right-8 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-8 left-8 text-3xl animate-bounce">💕</div>

          {/* コンテンツ */}
          <div className="relative z-10 flex flex-col items-center gap-8 mt-6">
            {/* 画像 */}
            <div className="w-64 h-64 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white">
              <Image
                src={character.imagePath}
                alt={character.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* あなたは */}
            <p className="text-xl text-gray-600 font-semibold">あなたは</p>

            {/* タイプ名 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full shadow-xl">
              <h1 className="text-4xl font-black">「{typeName}」</h1>
            </div>

            {/* タイプです */}
            <p className="text-xl text-gray-600 font-semibold">タイプです</p>

            {/* キャラクター情報 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-6 w-full max-w-md shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{character.emoji}</span>
                <span className="text-2xl font-bold text-gray-800">{character.name}</span>
              </div>
              <p className="text-base text-gray-600 leading-relaxed pl-14">
                {character.description}
              </p>
            </div>

            {/* 詳細説明 */}
            <div className="bg-pink-50 rounded-2xl px-8 py-6 w-full max-w-md">
              <h2 className="text-lg font-bold text-gray-800 mb-3">💭 タイプの特徴</h2>
              <p className="text-gray-700 leading-relaxed">
                {typeDescription}
              </p>
            </div>

            {/* SNSシェアボタン */}
            <div className="w-full max-w-md space-y-4 mt-6">
              <p className="text-center text-gray-700 font-bold text-lg">
                📢 結果をシェアしよう！
              </p>

              <div className="flex gap-4">
                <button
                  onClick={shareToTwitter}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🐦</span>
                  Xでシェア
                </button>

                <button
                  onClick={shareToLine}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="text-xl">📱</span>
                  LINEでシェア
                </button>
              </div>

              {/* OG画像情報 */}
              <div className="text-center text-sm text-gray-500 mt-4">
                シェア時に {typeNumber}.png の画像が表示されます
              </div>
            </div>

            {/* 診断するボタン */}
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl px-12 py-5 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all mt-6"
            >
              👉 あなたも診断する 👈
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
