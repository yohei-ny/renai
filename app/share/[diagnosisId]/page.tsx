import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DiagnosisType } from '@/types';
import { getTypeName } from '@/lib/scoring';

// OG画像のマッピング
const OG_IMAGE_MAP: Record<DiagnosisType, string> = {
  A: '/og/1.png', // 安心型
  B: '/og/2.png', // 共感依存型
  C: '/og/3.png', // 恋愛過集中型
  D: '/og/4.png', // 自立防衛型
  E: '/og/5.png', // 理想投影型
  F: '/og/6.png', // 感情ジェットコースター型
};

type Props = {
  params: Promise<{ diagnosisId: string }>;
};

// 動的メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { diagnosisId } = await params;

  try {
    // Firestoreから診断データを取得
    const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
    const diagnosisDoc = await getDoc(diagnosisRef);

    if (!diagnosisDoc.exists()) {
      return {
        title: '恋愛診断',
        description: 'あなたの恋愛タイプを20問で診断',
      };
    }

    const data = diagnosisDoc.data();
    const type = data.type as DiagnosisType;
    const typeName = getTypeName(type);
    const ogImage = OG_IMAGE_MAP[type] || '/og/1.png';

    // ベースURLを環境変数から取得（本番環境とローカルで切り替え）
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const fullOgImageUrl = `${baseUrl}${ogImage}`;

    return {
      title: `私のタイプは「${typeName}」 | 恋愛診断`,
      description: `私は「${typeName}」でした！あなたも20問で恋愛タイプを診断してみませんか？`,
      openGraph: {
        title: `私のタイプは「${typeName}」 | 恋愛診断`,
        description: `私は「${typeName}」でした！あなたも診断してみませんか？`,
        type: 'website',
        locale: 'ja_JP',
        images: [
          {
            url: fullOgImageUrl,
            width: 1200,
            height: 630,
            alt: `恋愛診断結果 - ${typeName}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `私のタイプは「${typeName}」 | 恋愛診断`,
        description: `私は「${typeName}」でした！あなたも診断してみませんか？`,
        images: [fullOgImageUrl],
      },
    };
  } catch (error) {
    console.error('Error fetching diagnosis:', error);
    return {
      title: '恋愛診断',
      description: 'あなたの恋愛タイプを20問で診断',
    };
  }
}

// ページコンポーネント（診断結果ページにリダイレクト）
export default async function SharePage({ params }: Props) {
  const { diagnosisId } = await params;

  try {
    // Firestoreから診断データを取得して存在を確認
    const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
    const diagnosisDoc = await getDoc(diagnosisRef);

    if (!diagnosisDoc.exists()) {
      notFound();
    }

    // 診断結果ページにリダイレクト
    redirect(`/?diagnosisId=${diagnosisId}`);
  } catch (error) {
    console.error('Error in share page:', error);
    notFound();
  }
}
