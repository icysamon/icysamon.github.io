"use client"
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { M_PLUS_Rounded_1c } from 'next/font/google';
import Card from "@/app/components/card";
import MUSIC_DATA from '@/data/music.json'; 
import GAME_DATA from '@/data/games.json';
import Background from "@/app/components/background";

// フォントの設定（可愛くて丸みのあるフォント）
const mplus = M_PLUS_Rounded_1c({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap',
});

// スタイル定義
const h2Style = "text-2xl font-bold";
const divStyle = "flex flex-wrap justify-center w-full sm:w-auto gap-4";
const placeholderClass = "invisible w-full mx-2 sm:w-[400px] sm:mx-4 my-4 h-[396px]";

// ボタンスタイル（灰藍色・スレートカラーで統一）
const buttonStyle = "flex items-center px-4 py-2 bg-slate-400 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-500 dark:hover:bg-slate-600 transition-colors shadow-sm text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";

function HomeContent() {
  const [musicPage, setMusicPage] = useState(1);
  const [gamePage, setGamePage] = useState(1);
  const pageSize = 4;

  const musicList = MUSIC_DATA;
  const musicTotalPages = Math.ceil(musicList.length / pageSize);
  const musicStartIndex = (musicPage - 1) * pageSize;
  const currentMusicItems = musicList.slice(musicStartIndex, musicStartIndex + pageSize);
  const emptyMusicSlots = pageSize - currentMusicItems.length;

  const gameList = GAME_DATA;
  const gameTotalPages = Math.ceil(gameList.length / pageSize);
  const gameStartIndex = (gamePage - 1) * pageSize;
  const currentGameItems = gameList.slice(gameStartIndex, gameStartIndex + pageSize);
  const emptyGameSlots = pageSize - currentGameItems.length;

  const date = new Date();
  const router = useRouter();
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const lang = langParam === 'en' ? 'en' : 'ja';

  useEffect(() => {
    document.documentElement.lang = lang;
    if (!langParam) {
      const browserLang = navigator.language;
      if (!browserLang.startsWith('ja')) {
        router.replace('/?lang=en');
      }
    }
  }, [langParam, router, lang]);

  const TRANSLATIONS = {
    ja: {
      section_music: "作曲",
      section_game: "ゲームジャム",
      prev: "前へ",
      next: "次へ",
      role: "理系大学院生（IoT分野）",
      hobby: "趣味でゲームと曲を作ってます 🫧",
    },
    en: {
      section_music: "Composition",
      section_game: "Game Jam",
      prev: "Prev",
      next: "Next",
      role: "Master's Student (IoT)",
      hobby: "Game Dev & Music Creator 🫧",
    }
  };
  const t = TRANSLATIONS[lang];

  const getLinkWithLang = (href: string) => {
    if (!href) return '#';
    const separator = href.includes('?') ? '&' : '?';
    return `${href}${separator}lang=${lang}`;
  };

  const handleScrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="font-sans antialiased flex flex-col items-center min-h-screen relative overflow-x-hidden scroll-smooth bg-white dark:bg-slate-900">
      <Background />
      
      <section className="relative z-10 w-full px-6 min-h-[95vh] flex flex-col items-center justify-center mx-auto pt-10 pb-24">
        
        {/* 【完全な中央揃え】左右のコンテナを同じ幅（md:w-[400px]）に設定することで、絶対的な中心軸を作り出します */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full max-w-5xl">
          
          {/* 左側：画像エリア（幅を400pxに固定） */}
          <div className="flex justify-center md:justify-end shrink-0 w-full md:w-[400px]">
            <div className="w-[300px] sm:w-[360px] md:w-[400px]">
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

          {/* 右側：テキストエリア（幅を400pxに固定） */}
          {/* 幅が固定されているため、言語を切り替えて文字長が変わってもレイアウトは1ミリも動きません */}
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start shrink-0 w-full md:w-[400px]">
            
            <div className="space-y-5">
              <h1 className={`text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white ${mplus.className}`}>
                icysamon
              </h1>
              <div className="flex flex-col gap-1 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium min-h-[3.5rem] md:min-h-0">
                <p className="whitespace-nowrap">{t.role}</p>
                <p className="whitespace-nowrap">{t.hobby}</p>
              </div>
            </div>
            
            <Link
              href={lang === 'ja' ? '/?lang=en' : '/?lang=ja'}
              scroll={false}
              className="relative flex items-center w-32 h-9 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-1 cursor-pointer select-none transition-transform active:scale-95"
              aria-label="Language Toggle"
            >
              <span className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-500 rounded-full shadow-md transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`} />
              <span className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors ${lang === 'ja' ? 'text-slate-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>JP</span>
              <span className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors ${lang === 'en' ? 'text-slate-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>EN</span>
            </Link>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full">
              <Link href="https://blog.icysamon.com" className={buttonStyle}>Blog</Link>
              <Link href={getLinkWithLang("https://www.tunecore.co.jp/artists/icysamon")} className={buttonStyle}>
                {lang === 'ja' ? '音楽配信' : 'Streaming'}
              </Link>
              <Link href={lang === 'en' ? "https://bgm.icysamon.com/en" : "https://bgm.icysamon.com/"} className={buttonStyle}>
                {lang === 'ja' ? 'フリーBGM' : 'Free BGM'}
              </Link>
            </div>
            
            {/* ソーシャルリンク */}
            <div className="flex items-center gap-1">
              <Icon href="http://twitter.com/icysamon" src="/svgrepo-com/twitter.svg" />
              <Icon href="https://www.youtube.com/@icysamon/releases" src="/svgrepo-com/youtube.svg" />
              <Icon href="https://music.apple.com/jp/artist/icysamon/1808762015" src="/svgrepo-com/apple-music.svg" />
              <Icon href="https://open.spotify.com/intl-ja/artist/7tk5ryKLzZdGvABO1H0LCx" src="/svgrepo-com/spotify.svg" />
              <Icon href="https://github.com/icysamon" src="/svgrepo-com/github.svg" />
              <Icon href="mailto:me@icysamon.com" src="/svgrepo-com/email.svg" />
            </div>
          </div>
        </div>

        <a 
          href="#portfolio" 
          onClick={handleScrollToPortfolio}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 animate-bounce hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer z-20"
        >
          <span className="text-xs font-medium uppercase tracking-widest">{lang === 'ja' ? 'Scroll' : 'Scroll'}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      <section id="portfolio" className="relative z-10 max-w-[1280px] w-full px-4 pt-12 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col mb-16 gap-6 items-center">
          <h2 className={h2Style}>{t.section_music}</h2>
          <div className={divStyle}>
            {currentMusicItems.map((item, index) => (
              <Card
                key={`music-${index}`}
                image={item.image}
                href={getLinkWithLang(item.href)}
                title={typeof item.title === 'string' ? item.title : (item.title[lang] || item.title.ja)}
                date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              />
            ))}
            {emptyMusicSlots > 0 && Array.from({ length: emptyMusicSlots }).map((_, index) => (
              <div key={`empty-music-${index}`} className={placeholderClass} />
            ))}
          </div>
          {musicTotalPages > 1 && (
            <div className="flex gap-4 items-center mt-4">
              <button onClick={() => setMusicPage(p => Math.max(1, p - 1))} disabled={musicPage === 1} className={buttonStyle}>
                {t.prev}
              </button>
              <span className="font-medium text-slate-600 dark:text-slate-400">{musicPage} / {musicTotalPages}</span>
              <button onClick={() => setMusicPage(p => Math.min(musicTotalPages, p + 1))} disabled={musicPage === musicTotalPages} className={buttonStyle}>
                {t.next}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col mb-16 gap-6 items-center">
          <h2 className={h2Style}>{t.section_game}</h2>
          <div className={divStyle}>
             {currentGameItems.map((item, index) => (
               <Card
                 key={`game-${index}`}
                 image={item.image}
                 href={item.href}
                 title={typeof item.title === 'string' ? item.title : (item.title[lang] || item.title.ja)}
                 date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                 description={typeof item.description === 'string' ? item.description : (item.description[lang] || item.description.ja)}
               />
            ))}
             {emptyGameSlots > 0 && Array.from({ length: emptyGameSlots }).map((_, index) => (
              <div key={`empty-game-${index}`} className={placeholderClass} />
            ))}
          </div>
          {gameTotalPages > 1 && (
            <div className="flex gap-4 items-center mt-4">
              <button onClick={() => setGamePage(p => Math.max(1, p - 1))} disabled={gamePage === 1} className={buttonStyle}>
                {t.prev}
              </button>
              <span className="font-medium text-slate-600 dark:text-slate-400">{gamePage} / {gameTotalPages}</span>
              <button onClick={() => setGamePage(p => Math.min(gameTotalPages, p + 1))} disabled={gamePage === gameTotalPages} className={buttonStyle}>
                {t.next}
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 flex flex-col gap-2 items-center justify-center py-8 text-sm font-medium text-gray-500 dark:text-gray-400 w-full">
        <p>Copyright © 2023 - {date.getFullYear()} <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>.</p>
        <p>All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function Icon({ href, src }: { href: string, src: string }) {
  return (
    <Link
      className="mr-4 transition-transform hover:-translate-y-1 transform-gpu"
      href={href}
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={src}
        alt="icon"
        width={32}
        height={32}
        // 【修正】dark:invert でダークモード時にアイコンを完全な白に反転させます
        // opacity-70 で普段は少し落ち着かせ、ホバー時（hover:opacity-100）に明るく光るようにします
        className="dark:invert opacity-70 hover:opacity-100 transition-opacity"
      />
    </Link>
  );
}