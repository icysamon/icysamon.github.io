"use client"
import Index from "@/app/components/index";
import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const lang = langParam === 'en' ? 'en' : 'ja';

  useEffect(() => {
    document.documentElement.lang = lang;
    if (!langParam) {
      const browserLang = navigator.language;
      if (!browserLang.startsWith('ja')) {
        router.replace('/en');
      }
    }
  }, [langParam, router, lang]);

  return (
    <Index params={{ lang: 'ja' }} />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}