'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// 記事の共通レイアウトコンポーネント（他の記事ページでも使い回せます）
export default function ArticleLayout({ contentJa, contentEn }: { contentJa: string, contentEn?: string }) {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const htmlLang = document.documentElement.lang;
    if (htmlLang) setLang(htmlLang);
  }, []);

  return (
    <main className="font-sans antialiased min-h-screen relative overflow-x-hidden flex justify-center pt-24 pb-12 px-4">

      {/* 記事を囲むCard型コンテナ（磨りガラス効果） */}
      <div className="relative z-10 w-full max-w-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-slate-700/50 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 mb-10 h-fit">
        
        {/* ホームへ戻るボタン */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-rose-400 dark:text-slate-400 dark:hover:text-rose-400 transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {lang === 'ja' ? 'ホームに戻る' : 'Back to Home'}
        </Link>

        {/* Markdownレンダリングエリア */}
        <article className="prose prose-slate prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-rose-400 hover:prose-a:text-rose-500">
          <ReactMarkdown>
            {lang === 'ja' ? contentJa : (contentEn || contentJa)}
          </ReactMarkdown>
        </article>
        
      </div>
    </main>
  );
}