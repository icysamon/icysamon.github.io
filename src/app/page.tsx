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

  // 初回アクセス時、リダイレクトが完了するまでの間だけローディングを表示
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black">
      <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
      <p className="mt-4 text-xs font-semibold text-slate-400 tracking-widest uppercase">
        Loading
      </p>
    </div>
  );
}