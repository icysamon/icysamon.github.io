"use client";
import { use } from 'react';
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Portfolio from "@/components/portfolio";
import MUSIC_DATA from '@/content/json/music.json'; 
import REPO_DATA from '@/content/json/repositories.json'; 
import GAME_DATA from '@/content/json/games.json';
import INDEX from '@/content/json/index.json';

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams?.lang === 'ja' ? 'ja' : 'en';
  const index = INDEX[lang];

  return (
    <main className="font-sans antialiased flex flex-col items-center min-h-screen relative overflow-x-hidden scroll-smooth">
      <Hero lang={lang} />
      <section id="portfolio" className="relative z-10 max-w-[1280px] w-full px-4 pt-12 min-h-screen flex flex-col justify-center">
        <Portfolio title={index.section_repo} items={REPO_DATA} lang={lang} />
        <Portfolio title={index.section_music} items={MUSIC_DATA} lang={lang} />
        <Portfolio title={index.section_game} items={GAME_DATA} lang={lang} />
      </section>
      <Footer lang={lang} />
    </main>
  );
}