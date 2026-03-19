"use client"

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const langParam = searchParams.get('lang');

  useEffect(() => {
    let targetLang = 'ja';

    if (langParam === 'en' || langParam === 'ja') {
      targetLang = langParam;
    } else {
      targetLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    }

    router.replace(`/${targetLang}/preparation`);
    
  }, [langParam, router]);

  return null; 
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}