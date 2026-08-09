"use client";
import { use } from 'react';
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Portfolio from "@/components/portfolio";
import MUSIC_DATA from '@/data/music.json'; 
import REPO_DATA from '@/data/repositories.json'; 
import GAME_DATA from '@/data/games.json';

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const rawLang = resolvedParams?.lang;
  const lang = rawLang === 'ja' ? 'ja' : 'en';
  const TRANSLATIONS = {
    ja: {
      section_music: "作曲",
      section_repo: "GitHub",
      section_game: "ゲーム",
      prev: "前へ",
      next: "次へ",
      role: "電子工作・クリエイター",
    },
    en: {
      section_music: "Composition",
      section_repo: "GitHub",
      section_game: "Game",
      prev: "Prev",
      next: "Next",
      role: "Electronics & Creator",
    }
  };
  const t = TRANSLATIONS[lang];

  return (
      <main className="font-sans antialiased flex flex-col items-center min-h-screen relative overflow-x-hidden scroll-smooth">
      <Hero lang={lang} />
      <section id="portfolio" className="relative z-10 max-w-[1280px] w-full px-4 pt-12 min-h-screen flex flex-col justify-center">
        <Portfolio title={t.section_repo} items={REPO_DATA} lang={lang} />
        <Portfolio title={t.section_music} items={MUSIC_DATA} lang={lang} />
        <Portfolio title={t.section_game} items={GAME_DATA} lang={lang} />
      </section>
      <Footer lang={lang}/>
    </main>
  );
}