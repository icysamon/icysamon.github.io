"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import MUSIC_DATA from '@/data/music.json'; 
import GAME_DATA from '@/data/games.json';

const h2Style = "text-2xl font-bold";
const divStyle = "flex flex-wrap justify-center w-full sm:w-auto gap-4";
const placeholderClass = "invisible w-full mx-2 sm:w-[400px] sm:mx-4 my-4 h-[396px]";

export default function Home() {
  const musicList = MUSIC_DATA;
  const gameList = GAME_DATA; 

  // === State (状態管理) ===
  // それぞれ独立したページ番号を持ちます
  const [musicPage, setMusicPage] = useState(1);
  const [gamePage, setGamePage] = useState(1);
  
  const pageSize = 4; // 1ページあたりの表示数

  // === 計算ロジック: 作曲 ===
  const musicTotalPages = Math.ceil(musicList.length / pageSize);
  const musicStartIndex = (musicPage - 1) * pageSize;
  const currentMusicItems = musicList.slice(musicStartIndex, musicStartIndex + pageSize);
  const emptyMusicSlots = pageSize - currentMusicItems.length;

  // === 計算ロジック: ゲーム ===
  const gameTotalPages = Math.ceil(gameList.length / pageSize);
  const gameStartIndex = (gamePage - 1) * pageSize;
  const currentGameItems = gameList.slice(gameStartIndex, gameStartIndex + pageSize);
  const emptyGameSlots = pageSize - currentGameItems.length;

  const date = new Date();

  const [lang, setLang] = useState<'ja' | 'en'>('ja');
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

  useEffect(() => {
    if (!navigator.language.startsWith('ja')) {
      setLang('en');
    }
  }, []);
  const t = TRANSLATIONS[lang];

  return (
    <div className="font-sans flex flex-col items-center min-h-screen">
      <Header lang={lang}/>
      <main className="max-w-[1280px] w-full">
        
        {/* =======================
            セクション1: 作曲・編曲
           ======================= */}
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>{t.section_music}</h2>
          
          <div className={divStyle}>
            {currentMusicItems.map((item, index) => (
              <Card
                key={`music-${index}`}
                image={item.image}
                href={item.href}
                title={item.title}
                date={item.date}
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

        {/* =======================
            セクション2: ゲームジャム
           ======================= */}
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>{t.section_game}</h2>
          
          <div className={divStyle}>
             {/* マップ関数で表示 */}
             {currentGameItems.map((item, index) => (
               <Card
                 key={`game-${index}`}
                 image={item.image}
                 href={item.href}
                 title={item.title}
                 date={item.date}
                 description={item.description}
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
      </main>
      
      <footer className="flex flex-col gap-2 items-center justify-center my-8 text-sm font-medium text-gray-500 dark:text-gray-400">
        <p>Copyright © 2023 - {date.getFullYear()} <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>.</p>
        <p> All Rights Reserved.</p>
      </footer>
    </div>
  );
}