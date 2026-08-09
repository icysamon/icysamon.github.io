import Link from "next/link";

interface Props {
  lang: 'ja' | 'en';
}

export default function LanguageSwitcher({ lang }: Props) {
  return (
    <Link
      href={lang === 'ja' ? '/en' : '/ja'}
      scroll={false}
      className="relative flex items-center w-36 h-11 bg-slate-50 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/60 dark:border-white/20 rounded-full p-1 cursor-pointer select-none transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
      aria-label="Language Toggle"
    >
      <span className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-full shadow-sm transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`} />
      <span className={`relative z-10 flex items-center justify-center w-1/2 h-full text-xs font-bold transition-colors duration-300 ${lang === 'ja' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>JP</span>
      <span className={`relative z-10 flex items-center justify-center w-1/2 h-full text-xs font-bold transition-colors duration-300 ${lang === 'en' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>EN</span>
    </Link>
  );
}