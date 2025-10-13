'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { Answer } from '@/types';

export default function DiagnosisPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  useEffect(() => {
    // demographicsデータがない場合は戻す
    const demographics = localStorage.getItem('demographics');
    if (!demographics) {
      router.push('/demographics');
    }
  }, [router]);

  const handleAnswer = (score: number) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      score
    };

    const newAnswers = [...answers.filter(a => a.questionId !== questions[currentQuestion].id), newAnswer];
    setAnswers(newAnswers);
    setSelectedScore(score);

    // 自動で次へ進む（少し遅延を入れる）
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedScore(null);
      } else {
        // 全問回答完了 → 悩み入力ページへ
        localStorage.setItem('answers', JSON.stringify(newAnswers));
        router.push('/concern');
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedScore(null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-dreamy flex flex-col items-center justify-center px-4 py-8">
      <main className="max-w-md w-full">
        {/* プログレスバー */}
        <div className="mb-8">
          <div className="bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-pink-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-white text-sm mt-2 font-bold">
            {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        {/* 質問カード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 border-4 border-yellow-200">
          {/* QUESTION表示 */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`text-2xl ${
                  currentQuestion === 0 ? 'text-gray-300' : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                ◀
              </button>
              <div>
                <p className="text-blue-600 font-bold text-sm">QUESTION</p>
                <p className="text-4xl font-bold text-blue-600">
                  {currentQuestion + 1}
                  <span className="text-xl text-gray-500"> /{questions.length}</span>
                </p>
              </div>
              <button
                disabled={currentQuestion === questions.length - 1}
                className={`text-2xl ${
                  currentQuestion === questions.length - 1 ? 'text-gray-300' : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                ▶
              </button>
            </div>
          </div>

          {/* 質問文 */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 font-medium text-center leading-relaxed">
              {questions[currentQuestion].text}
            </p>
          </div>

          {/* 回答選択肢 */}
          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(5)}
              className={`w-full p-4 rounded-full border-2 transition-all ${
                selectedScore === 5
                  ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold scale-105'
                  : 'border-yellow-300 bg-white text-gray-700 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              とてもそう思う
            </button>
            <button
              onClick={() => handleAnswer(4)}
              className={`w-full p-4 rounded-full border-2 transition-all ${
                selectedScore === 4
                  ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold scale-105'
                  : 'border-yellow-300 bg-white text-gray-700 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              そう思う
            </button>
            <button
              onClick={() => handleAnswer(3)}
              className={`w-full p-4 rounded-full border-2 transition-all ${
                selectedScore === 3
                  ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold scale-105'
                  : 'border-yellow-300 bg-white text-gray-700 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              どちらでもない
            </button>
            <button
              onClick={() => handleAnswer(2)}
              className={`w-full p-4 rounded-full border-2 transition-all ${
                selectedScore === 2
                  ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold scale-105'
                  : 'border-yellow-300 bg-white text-gray-700 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              あまり思わない
            </button>
            <button
              onClick={() => handleAnswer(1)}
              className={`w-full p-4 rounded-full border-2 transition-all ${
                selectedScore === 1
                  ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold scale-105'
                  : 'border-yellow-300 bg-white text-gray-700 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              全く思わない
            </button>
          </div>

          {/* 前に戻るボタン */}
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className="mt-6 w-full py-3 bg-purple-100 text-purple-600 rounded-full font-medium hover:bg-purple-200 transition-all"
            >
              ◀ ひとつ前に戻る
            </button>
          )}
        </div>

        {/* デコレーション雲のイメージ（CSS装飾） */}
        <div className="text-center text-white/70 text-xs">
          ☁️ あなたの恋愛心理を分析中... ☁️
        </div>
      </main>
    </div>
  );
}
