import Link from 'next/link';

interface Props {
  lang: string;
}

export default function Footer({ lang }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 flex flex-col gap-2 items-center justify-center py-8 text-sm font-medium text-gray-500 dark:text-gray-400 w-full">
      <p>Copyright © 2023 - {currentYear} <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>.</p>
      <p>All Rights Reserved.</p>
      <div className="flex items-center gap-4 text-xs mt-1">
          <Link 
          href={`/${lang}/privacy-policy`}
          className="hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
          {lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
          </Link>
      </div>
    </footer>
  );
}