"use client"; // usePathnameを使用するために追加

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation"; // 現在のURLを取得するために追加

// 記事の共通レイアウトコンポーネント
export default function ArticleLayout({ content, userLang }: { content: string, userLang?: string }) {
  const lang = userLang === 'ja' ? 'ja' : 'en';
  const pathname = usePathname() || '/';

  // 現在のパスから切り替え先のURLを動的に生成
  // 日本語(ルート) -> 英語(/en/...) に切り替え
  // 英語(/en/...) -> 日本語(ルート) に切り替え
  const toggleUrl = lang === 'ja' 
    ? `/en${pathname === '/' ? '' : pathname}` 
    : pathname.replace(/^\/en/, '') || '/';

  return (
    <main className="font-sans antialiased min-h-screen relative overflow-x-hidden flex justify-center pt-24 pb-12 px-4">

      {/* 記事を囲むCard型コンテナ（磨りガラス効果） */}
      <div className="relative z-10 w-full max-w-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-slate-700/50 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 mb-10 h-fit">
        
        {/* ヘッダーエリア（戻るボタンと言語切り替えボタンを平行・中央揃え） */}
        <div className="flex justify-between items-center mb-8">
          
          {/* ホームへ戻るボタン */}
          <Link 
            href={lang === 'ja' ? '/' : '/en'} // 英語の時は英語のホームに戻るように調整しました
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-rose-400 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {lang === 'ja' ? 'ホームに戻る' : 'Back to Home'}
          </Link>
          
          {/* 言語切り替えボタン */}
          <Link
            href={toggleUrl}
            scroll={false}
            className="relative flex items-center w-32 h-9 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-1 cursor-pointer select-none transition-transform active:scale-95"
            aria-label="Language Toggle"
          >
            <span className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-500 rounded-full shadow-md transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`} />
            <span className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors ${lang === 'ja' ? 'text-slate-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>JP</span>
            <span className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors ${lang === 'en' ? 'text-slate-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>EN</span>
          </Link>
        </div>

        {/* Markdownレンダリングエリア */}
        <article className="prose prose-slate prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-rose-400 hover:prose-a:text-rose-500">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </article>
        
      </div>
    </main>
  );
}