"use client"
import { Suspense } from 'react';
import Index from "@/app/components/index";

export default function Home({ params }: { params: { lang: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-500">Loading...</div>}>
      <Index params={params} />
    </Suspense>
  );
} 