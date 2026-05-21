"use client";
import { Metadata } from 'next';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import { useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import Card from "@/app/components/card";
import MUSIC_DATA from '@/data/music.json'; 
import REPO_DATA from '@/data/repositories.json'; 
import GAME_DATA from '@/data/games.json';


// タイトル定義
export const metadata: Metadata = {
  title: "icysamon",
};

// フォントの設定
const mplus = M_PLUS_Rounded_1c({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap',
});

// スタイル定義
const h2Style = `text-2xl font-bold tracking-wider text-slate-700 dark:text-slate-200 text-center w-full ${mplus.className}`;

// 【修正】Mac Safariで右側に不要な縦（高さ）スクロールバーが表示されるのを防ぐため、`overflow-y-hidden` を追加しました。
// 【変更】マウスホバー時に「掴める」カーソルになるように `cursor-grab` を追加。ドラッグ中のテキスト選択を防ぐため `select-none` も追加しました。
const scrollContainerStyle = "grid grid-rows-2 grid-flow-col auto-cols-max gap-4 overflow-x-auto overflow-y-hidden w-full pt-4 pb-4 snap-x snap-mandatory cursor-grab select-none bg-transparent [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-slate-200/50 dark:[&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-thumb]:rounded-full";

// 【修正】カードが重ならないように、ラッパーの幅を元のカードサイズに合わせて sm:w-[400px] に拡大しました。
const cardWrapperStyle = "shrink-0 snap-start snap-always w-[85vw] sm:w-[360px]";

// ボタンスタイル（灰藍色・スレートカラーで統一）
const buttonStyle = "flex items-center px-4 py-2 bg-slate-400 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-500 dark:hover:bg-slate-600 transition-colors shadow-sm text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";

// 【追加】マウスでドラッグしてスクロールできるようにするための専用ラッパーコンポーネント
function DraggableScrollContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = 'none'; 
      // 【重要】ドラッグ中はスムーズスクロールをオフ（マウスにぴったり追従させるため）
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.style.cursor = 'grabbing';
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  // 【追加】マウスを離した時の処理をまとめる
  const stopDragging = () => {
    isDown.current = false;
    if (scrollRef.current) {
      // 【重要】離した瞬間にスムーズスクロールをオンにする。これでスナップ時の「瞬間移動」が「滑らかなアニメーション」に変わります
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.style.scrollSnapType = ''; // スナップを復元
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const onMouseLeave = () => stopDragging();
  const onMouseUp = () => stopDragging();

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    
    if (Math.abs(walk) > 5) {
      isDragging.current = true; 
    }
    
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={scrollRef}
      className={className}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onDragStart={onDragStart}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}

export default function Home({ params }: { params: { lang: string } }) {
  const musicList = MUSIC_DATA;
  const repoList = REPO_DATA; // 【追加】GitHubリストの変数を定義
  const gameList = GAME_DATA;

  const date = new Date();

  const lang = params.lang === 'en' ? 'en' : 'ja';

  const TRANSLATIONS = {
    ja: {
      section_music: "作曲",
      section_repo: "GitHub", // 【追加】GitHubセクションの日本語タイトル
      section_game: "ゲーム",
      prev: "前へ",
      next: "次へ",
      role: "電子工作・クリエイター",
    },
    en: {
      section_music: "Composition",
      section_repo: "GitHub", // 【追加】GitHubセクションの英語タイトル
      section_game: "Game",
      prev: "Prev",
      next: "Next",
      role: "Electronics & Creator",
    }
  };
  const t = TRANSLATIONS[lang];


  const langLink = (url: string) => {
    if (!url) return '#';
    if (lang === 'ja') return url; 
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}lang=en`;
  };


  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'ja') {
      //window.history.replaceState(null, '', '/')
    };
  }, [lang]);

  return (
      <main className="font-sans antialiased flex flex-col items-center min-h-screen relative overflow-x-hidden scroll-smooth">

      <section className="relative z-10 w-full px-6 min-h-[95vh] flex flex-col items-center justify-center mx-auto pt-10 pb-24">
        
        {/* 【完全な中央揃え】左右のコンテナを同じ幅（md:w-[384px]）に設定することで、絶対的な中心軸を作り出します */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-[1280px] z-10 w-full">
          
          {/* 左側：画像エリア（幅を384pxに固定） */}
          <div className="flex justify-center md:justify-end w-[360px]">
            <div className="w-[300px] md:w-[384px]">
              <Image
                aria-hidden
                width={800} 
                height={800}
                src={"https://image.icysamon.com/avatar/artist.webp"}
                alt={"artist-avatar"}
                className="w-full h-auto aspect-square object-cover rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:rotate-2 transform-gpu select-none"
                priority
                unoptimized
                draggable={false} 
                onDragStart={(e) => e.preventDefault()} 
                onContextMenu={(e) => e.preventDefault()} 
                style={{ 
                  WebkitUserDrag: 'none', 
                  WebkitTouchCallout: 'none', 
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* 右側：テキストエリア（幅を384pxに固定） */}
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:justify-start md:items-start shrink-0 w-[360px] md:pl-6">
            
            <div className="space-y-5">
              <h1 className={`text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white ${mplus.className}`}>
                icysamon
              </h1>
              <div className="flex flex-col gap-1 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium min-h-[3.5rem] md:min-h-0">
                <p className="whitespace-nowrap">{t.role}</p>
              </div>
            </div>
            
            <Link
              href={lang === 'ja' ? '/en' : '/ja'}
              scroll={false}
              className="relative flex items-center w-36 h-11 bg-white/50 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/60 dark:border-white/20 rounded-full p-1 cursor-pointer select-none transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
              aria-label="Language Toggle"
            >
              {/* 背景をスライドする丸い要素 */}
              <span className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-full shadow-sm transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`} />
              
              {/* JP テキスト */}
              <span className={`relative z-10 flex items-center justify-center w-1/2 h-full text-xs font-bold transition-colors duration-300 ${lang === 'ja' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                JP
              </span>
              
              {/* EN テキスト */}
              <span className={`relative z-10 flex items-center justify-center w-1/2 h-full text-xs font-bold transition-colors duration-300 ${lang === 'en' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                EN
              </span>
            </Link>
            
            {/* 拡張されたボタンリンクエリア */}
            <div className="flex flex-col gap-4 w-[300px] md:w-full mt-2">
              
              {/* ブログボタン */}
              <Link 
                href="https://blog.icysamon.com" 
                className="group flex items-center gap-4 p-2.5 bg-white/50 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/60 dark:border-white/20 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* 左側の丸いSVGアイコン領域 */}
                <div className="flex items-center justify-center w-12 h-12 bg-white/70 dark:bg-slate-800 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-105">
                  <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                {/* 右側のタイトルと説明文 */}
                <div className="flex flex-col items-start pr-4 text-left">
                  <span className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                    {lang === 'ja' ? 'ブログ' : 'Blog'}
                  </span>
                  <span className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {lang === 'ja' ? '技術録・趣味' : 'Tech & Hobbies'}
                  </span>
                </div>
              </Link>

              {/* 音楽配信ボタン */}
              <Link 
                href={langLink("https://www.tunecore.co.jp/artists/icysamon")} 
                className="group flex items-center gap-4 p-2.5 bg-white/50 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/60 dark:border-white/20 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* 左側の丸いSVGアイコン領域 */}
                <div className="flex items-center justify-center w-12 h-12 bg-white/70 dark:bg-slate-800 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-105">
                  <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                {/* 右側のタイトルと説明文 */}
                <div className="flex flex-col items-start pr-4 text-left">
                  <span className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                    {lang === 'ja' ? '音楽配信' : 'Streaming'}
                  </span>
                  <span className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {lang === 'ja' ? '最新のリリースを聴く' : 'Listen to latest releases'}
                  </span>
                </div>
              </Link>
              
            </div>
          </div>
        </div>

        {/* 下部に移動したソーシャルアイコンバー（大型化） */}
        <div className="flex justify-center items-center w-full mt-16 md:mt-24 z-10 px-4">
          {/* scaleで一括して大きくし、間隔(gap)も広げています */}
          <div className="flex items-center flex-wrap justify-center gap-6 md:gap-10 scale-110 md:scale-125 transition-transform">
            <Icon href="http://twitter.com/icysamon" src="/svgrepo-com/twitter.svg" />
            <Icon href="https://www.youtube.com/@icysamon" src="/svgrepo-com/youtube.svg" />
            <Icon href="https://music.apple.com/jp/artist/icysamon/1808762015" src="/svgrepo-com/apple-music.svg" />
            <Icon href="https://open.spotify.com/intl-ja/artist/7tk5ryKLzZdGvABO1H0LCx" src="/svgrepo-com/spotify.svg" />
            <Icon href="https://github.com/icysamon" src="/svgrepo-com/github.svg" />
            <Icon href="mailto:me@icysamon.com" src="/svgrepo-com/email.svg" />
          </div>
        </div>

      </section>

      <section id="portfolio" className="relative z-10 max-w-[1280px] w-full px-4 pt-12 min-h-screen flex flex-col justify-center">
        
        {/* 1. 作曲セクション */}
        <div className="flex flex-col mb-16 gap-6 w-full">
          <h2 className={h2Style}>{t.section_music}</h2>
          <DraggableScrollContainer className={scrollContainerStyle}>
            {musicList.map((item, index) => (
              <div key={`music-${index}`} className={cardWrapperStyle}>
                <Card
                  image={item.image}
                  href={langLink(item.href)}
                  title={typeof item.title === 'string' ? item.title : (item.title[lang] || item.title.ja)}
                  date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                />
              </div>
            ))}
          </DraggableScrollContainer>
        </div>

        {/* 2. 【追加】GitHub（リポジトリ）セクション */}
        <div className="flex flex-col mb-16 gap-6 w-full">
          <h2 className={h2Style}>{t.section_repo}</h2>
          <DraggableScrollContainer className={scrollContainerStyle}>
             {repoList.map((item, index) => (
               <div key={`repo-${index}`} className={cardWrapperStyle}>
                 <Card
                   image={item.image}
                   href={item.href}
                   title={typeof item.title === 'string' ? item.title : (item.title[lang] || item.title.ja)}
                   date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                   // descriptionが存在しないデータでもエラーにならないようにチェックを入れています
                   description={item.description ? (typeof item.description === 'string' ? item.description : (item.description[lang] || item.description.ja)) : undefined}
                 />
               </div>
            ))}
          </DraggableScrollContainer>
        </div>

        {/* 3. ゲームセクション */}
        <div className="flex flex-col mb-16 gap-6 w-full">
          <h2 className={h2Style}>{t.section_game}</h2>
          <DraggableScrollContainer className={scrollContainerStyle}>
             {gameList.map((item, index) => (
               <div key={`game-${index}`} className={cardWrapperStyle}>
                 <Card
                   image={item.image}
                   href={item.href}
                   title={typeof item.title === 'string' ? item.title : (item.title[lang] || item.title.ja)}
                   date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                   description={typeof item.description === 'string' ? item.description : (item.description[lang] || item.description.ja)}
                 />
               </div>
            ))}
          </DraggableScrollContainer>
        </div>
      </section>

      <footer className="relative z-10 flex flex-col gap-2 items-center justify-center py-8 text-sm font-medium text-gray-500 dark:text-gray-400 w-full">
        <p>Copyright © 2023 - {date.getFullYear()} <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>.</p>
        <p>All Rights Reserved.</p>
      </footer>
    </main>
  );
}


function Icon({ href, src }: { href: string, src: string }) {
  return (
    <Link
      className="transition-transform hover:-translate-y-1 transform-gpu inline-block"
      href={href}
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={src}
        alt="icon"
        width={32}
        height={32}
        className="opacity-80 hover:opacity-100"
      />
    </Link>
  );
}