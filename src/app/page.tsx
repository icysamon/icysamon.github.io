"use client"
import { useState } from 'react';
import Link from "next/link";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import MUSIC_DATA from '@/data/music.json'; 
import GAME_DATA from '@/data/games.json';

const h2Style = "text-2xl font-bold";
const divStyle = "flex flex-wrap inline-flex justify-center w-full sm:w-auto gap-4"; 

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

  // === 計算ロジック: ゲーム ===
  const gameTotalPages = Math.ceil(gameList.length / pageSize);
  const gameStartIndex = (gamePage - 1) * pageSize;
  const currentGameItems = gameList.slice(gameStartIndex, gameStartIndex + pageSize);

  const date = new Date();

  return (
    <div className="font-sans justify-items-center min-h-screen">
      <Header />
      <main className="max-w-[1280px]">
        
        {/* =======================
            セクション1: 作曲・編曲
           ======================= */}
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>作曲・編曲</h2>
          
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
          </div>

          {/* 作曲用ページネーション */}
          {musicTotalPages > 1 && (
            <div className="flex gap-4 items-center mt-4">
              <button 
                onClick={() => setMusicPage(p => Math.max(1, p - 1))} 
                disabled={musicPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
              >
                前へ
              </button>
              <span className="font-medium">{musicPage} / {musicTotalPages}</span>
              <button 
                onClick={() => setMusicPage(p => Math.min(musicTotalPages, p + 1))} 
                disabled={musicPage === musicTotalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
              >
                次へ
              </button>
            </div>
          )}
        </div>

        {/* =======================
            セクション2: ゲームジャム
           ======================= */}
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>ゲームジャム</h2>
          
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
          </div>

          {/* ゲーム用ページネーション */}
          {gameTotalPages > 1 && (
            <div className="flex gap-4 items-center mt-4">
              <button 
                onClick={() => setGamePage(p => Math.max(1, p - 1))} 
                disabled={gamePage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
              >
                前へ
              </button>
              <span className="font-medium">{gamePage} / {gameTotalPages}</span>
              <button 
                onClick={() => setGamePage(p => Math.min(gameTotalPages, p + 1))} 
                disabled={gamePage === gameTotalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
              >
                次へ
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