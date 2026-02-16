"use client"
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import Card from "@/app/components/card";
import MUSIC_DATA from '@/data/music.json'; 
import GAME_DATA from '@/data/games.json';

const h2Style = "text-2xl font-bold";
const divStyle = "flex flex-wrap justify-center w-full sm:w-auto gap-4";
const placeholderClass = "invisible w-full mx-2 sm:w-[400px] sm:mx-4 my-4 h-[396px]";
const buttonStyle = "flex items-center px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm dark:bg-slate-700 dark:hover:bg-rose-600 text-sm font-medium";

function HomeContent() {
  // ページ
  const [musicPage, setMusicPage] = useState(1);
  const [gamePage, setGamePage] = useState(1);
  const pageSize = 4; // 1ページあたりの表示数

  // ミュージック
  const musicList = MUSIC_DATA;
  const musicTotalPages = Math.ceil(musicList.length / pageSize);
  const musicStartIndex = (musicPage - 1) * pageSize;
  const currentMusicItems = musicList.slice(musicStartIndex, musicStartIndex + pageSize);
  const emptyMusicSlots = pageSize - currentMusicItems.length;

  // ゲーム
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

  // 言語切り替え
  useEffect(() => {
    if (!langParam) {
      const browserLang = navigator.language;
      console.log("Browser language:", browserLang);

      if (!browserLang.startsWith('ja')) {
        router.replace('/?lang=en');
      }
    }
  }, [langParam, router]);

  const TRANSLATIONS = {
    ja: {
      section_music: "作曲",
      section_game: "ゲームジャム",
      prev: "前へ",
      next: "次へ",
    },
    en: {
      section_music: "Composition",
      section_game: "Game Jam",
      prev: "Prev",
      next: "Next",
    }
  };
  const t = TRANSLATIONS[lang];
  const getLinkWithLang = (href: string) => {
    if (!href) return '#';
    const separator = href.includes('?') ? '&' : '?';
    return `${href}${separator}lang=${lang}`;
  };

  return (
    <main className="font-sans flex flex-col items-center min-h-screen">
      <div className="flex flex-wrap mt-12 gap-8 justify-center">
        <Image
          aria-hidden
          width={300}
          height={300}
          src={"https://image.icysamon.com/avatar/artist.webp"}
          alt={"no-image"}
          className="object-cover rounded-full dark:brightness-80"
          priority
        />
        <div className="flex flex-col gap-4 justify-center w-full text-center items-center md:w-[340px] md:items-start md:text-left">
          <h1 className="text-4xl font-semibold">icysamon</h1>
          <div className="flex flex-col gap-2">
            <p>{lang === 'ja' ? "理系大学院生（IoT分野）" : "Master's Student (IoT)"}</p>
            <p>{lang === 'ja' ? "趣味でゲームと曲を作ってます 🫧" : "Game Dev & Music Creator 🫧"}</p>
          </div>
            <Link
            href={lang === 'ja' ? '/?lang=en' : '/?lang=ja'}
            scroll={false}
            className="
              relative flex items-center 
              w-32 h-9
              bg-gray-200 dark:bg-gray-700 
              rounded-full 
              p-1
              cursor-pointer select-none
            "
            aria-label="Language Toggle"
          >
            {/* Background */}
            <span
              className={`
                absolute top-1 bottom-1 
                w-[calc(50%-4px)] 
                bg-white dark:bg-slate-600 
                rounded-full shadow-sm
                transition-transform duration-300 ease-in-out
                ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}
              `}
            />

            {/* JP */}
            <span 
              className={`
                relative z-10 w-1/2 text-center text-sm font-bold transition-colors duration-300
                ${lang === 'ja' ? 'text-rose-500 dark:text-rose-400' : 'text-gray-400 dark:text-gray-500'}
              `}
            >
              JP
            </span>

            {/* EN */}
            <span 
              className={`
                relative z-10 w-1/2 text-center text-sm font-bold transition-colors duration-300
                ${lang === 'en' ? 'text-rose-500 dark:text-rose-400' : 'text-gray-400 dark:text-gray-500'}
              `}
            >
              EN
            </span>
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link href="https://blog.icysamon.com" className={buttonStyle}>
              {lang === 'ja' ? 'Blog' : 'Blog'}
            </Link>
            <Link href={getLinkWithLang("https://www.tunecore.co.jp/artists/icysamon")} className={buttonStyle}>
              {lang === 'ja' ? '音楽配信' : 'Music Streaming'}
            </Link>
            <Link href="https://bgm.icysamon.com/" className={buttonStyle}>
              {lang === 'ja' ? 'フリーBGM' : 'Free BGM'}
            </Link>
          </div>
          <div className="flex brightness-100 dark:brightness-80">
            <Icon
              href="http://twitter.com/icysamon"
              src="/svgrepo-com/twitter.svg"
            />
            <Icon
              href="https://www.youtube.com/@icysamon/releases"
              src="/svgrepo-com/youtube.svg"
            />
            <Icon
              href="https://music.apple.com/jp/artist/icysamon/1808762015"
              src="/svgrepo-com/apple-music.svg"
            />
            <Icon
              href="https://open.spotify.com/intl-ja/artist/7tk5ryKLzZdGvABO1H0LCx"
              src="/svgrepo-com/spotify.svg"
            />
            <Icon
              href="https://github.com/icysamon"
              src="/svgrepo-com/github.svg"
            />
            <Icon
              href="mailto:me@icysamon.com"
              src="/svgrepo-com/email.svg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] w-full">
        {/* 作曲 */}
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>{t.section_music}</h2>
          <div className={divStyle}>
            {currentMusicItems.map((item, index) => (
              <Card
                key={`music-${index}`}
                image={item.image}
                href={getLinkWithLang(item.href)}
                title={
                  typeof item.title === 'string' 
                  ? item.title 
                  : (item.title[lang] || item.title.ja)
                }
                date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              />
            ))}
            {emptyMusicSlots > 0 && Array.from({ length: emptyMusicSlots }).map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className={placeholderClass}
              />
            ))}
          </div>
          {/* 作曲用ページネーション */}
          {musicTotalPages > 1 && (
            <div className="flex gap-4 items-center mt-4">
              <button 
                onClick={() => setMusicPage(p => Math.max(1, p - 1))} 
                disabled={musicPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition dark:text-slate-800"
              >
                {t.prev}
              </button>
              <span className="font-medium">{musicPage} / {musicTotalPages}</span>
              <button 
                onClick={() => setMusicPage(p => Math.min(musicTotalPages, p + 1))} 
                disabled={musicPage === musicTotalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition dark:text-slate-800"
              >
                {t.next}
              </button>
            </div>
          )}
        </div>
        {/* ゲーム */}
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>{t.section_game}</h2>
          <div className={divStyle}>
             {/* マップ関数で表示 */}
             {currentGameItems.map((item, index) => (
               <Card
                 key={`game-${index}`}
                 image={item.image}
                 href={item.href}
                 title={
                  typeof item.title === 'string' 
                  ? item.title 
                  : (item.title[lang] || item.title.ja)
                }
                date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                 description={
                  typeof item.description === 'string' 
                  ? item.description 
                  : (item.description[lang] || item.description.ja)
                }
               />
            ))}
             {emptyGameSlots > 0 && Array.from({ length: emptyGameSlots }).map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className={placeholderClass}
              />
            ))}
          </div>

          {/* ゲーム用ページネーション */}
          {gameTotalPages > 1 && (
            <div className="flex gap-4 items-center mt-4">
              <button 
                onClick={() => setGamePage(p => Math.max(1, p - 1))} 
                disabled={gamePage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition dark:text-slate-800"
              >
                {t.prev}
              </button>
              <span className="font-medium">{gamePage} / {gameTotalPages}</span>
              <button 
                onClick={() => setGamePage(p => Math.min(gameTotalPages, p + 1))} 
                disabled={gamePage === gameTotalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition dark:text-slate-800"
              >
                {t.next}
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="flex flex-col gap-2 items-center justify-center my-8 text-sm font-medium text-gray-500 dark:text-gray-400">
        <p>Copyright © 2023 - {date.getFullYear()} <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>.</p>
        <p> All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}


function Icon({ href, src }: { href: string, src: string }) {
  return (
    <>
    <Link
      className="mr-4 hover:brightness-75 transition"
      href={href}
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={src}
        alt="none-icon"
        width={32}
        height={32}
      />
    </Link>
    </>
  );
}