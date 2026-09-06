"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loadingscreen';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // クライアントの言語設定を取得
    const browserLang = navigator.language.toLowerCase();
    
    // 日本語の場合は ja、それ以外はデフォルトで en
    const targetLang = browserLang.includes('ja') ? 'ja' : 'en';

    // 判定した言語のページへリダイレクト
    router.replace(`/${targetLang}`);
  }, [router]);

  // 初回アクセス時、リダイレクトが完了するまでの間 ScrollContainer 内でローディングを表示
  return (
      <LoadingScreen />
  );
}