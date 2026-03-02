"use client"
import Index from "@/app/components/index";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    if (langParam) {
      setLang(langParam === 'en' ? 'ja' : 'en');
    } else {
      const browserLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
      setLang(browserLang);
    }
  }, [langParam]);

  return <Index params={{ lang }} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}