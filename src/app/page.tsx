"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

  // 画面のチラつきを防ぐため、リダイレクト中は何もレンダリングしない（またはLoading表示）
  return null;
}