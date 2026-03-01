"use client"
import Index from "@/app/components/index";
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Home() {
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