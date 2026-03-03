"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { M_PLUS_Rounded_1c } from 'next/font/google';
import Card from "@/app/components/card";
import MUSIC_DATA from '@/data/music.json'; 
import GAME_DATA from '@/data/games.json';

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

export default function Home({ params }: { params: { lang: string } }) {
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

  const lang = params.lang === 'en' ? 'en' : 'ja';

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


  const langLink = (url: string) => {
    if (!url) return '#';
    if (lang === 'ja') return url; 
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}lang=en`;
  };

  const handleScrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-[1280px] z-10">
          
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
          {/* 幅が固定されているため、言語を切り替えて文字長が変わってもレイアウトは1ミリも動きません */}
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:justify-start md:items-start shrink-0 w-[360px] md:pl-6">
            
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
              href={lang === 'ja' ? '/en' : '/ja'}
              scroll={false}
              className="relative flex items-center w-32 h-9 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-1 cursor-pointer select-none transition-transform active:scale-95"
              aria-label="Language Toggle"
            >
              <span className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-500 rounded-full shadow-md transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`} />
              <span className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors ${lang === 'ja' ? 'text-slate-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>JP</span>
              <span className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors ${lang === 'en' ? 'text-slate-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>EN</span>
            </Link>
            
            <div>
              <div className="flex flex-wrap gap-4 justify-between w-[300px]">
                <Link href="https://blog.icysamon.com" className={buttonStyle}>Blog</Link>
                <Link href={langLink("https://www.tunecore.co.jp/artists/icysamon")} className={buttonStyle}>
                  {lang === 'ja' ? '音楽配信' : 'Streaming'}
                </Link>
                <Link href={lang === 'en' ? "https://bgm.icysamon.com/en" : "https://bgm.icysamon.com/"} className={buttonStyle}>
                  {lang === 'ja' ? 'フリーBGM' : 'Free BGM'}
                </Link>
                <Link href={lang === 'ja' ? "/ja/request" : "/en/request"} className={buttonStyle}>
                  {lang === 'ja' ? 'テスト' : 'Test'}
                </Link>
              </div>
            </div>
            
            {/* ソーシャルリンク */}
            <div className="flex items-center gap-2 justify-between w-[300px]">
              <Icon href="http://twitter.com/icysamon" src="/svgrepo-com/twitter.svg" />
              <Icon href="https://www.youtube.com/@icysamon/releases" src="/svgrepo-com/youtube.svg" />
              <Icon href="https://music.apple.com/jp/artist/icysamon/1808762015" src="/svgrepo-com/apple-music.svg" />
              <Icon href="https://open.spotify.com/intl-ja/artist/7tk5ryKLzZdGvABO1H0LCx" src="/svgrepo-com/spotify.svg" />
              <Icon href="https://github.com/icysamon" src="/svgrepo-com/github.svg" />
              <Icon href="mailto:me@icysamon.com" src="/svgrepo-com/email.svg" />
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="relative z-10 max-w-[1280px] w-full px-4 pt-12 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col mb-16 gap-6 items-center">
          <h2 className={h2Style}>{t.section_music}</h2>
          <div className={divStyle}>
            {currentMusicItems.map((item, index) => (
              <Card
                key={`music-${index}`}
                image={item.image}
                href={langLink(item.href)}
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

function Icon({ href, src }: { href: string, src: string }) {
  return (
    <Link
      className="transition-transform hover:-translate-y-1 transform-gpu"
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