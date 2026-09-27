import Link from "next/link";

interface Props {
  lang: 'ja' | 'en';
}

export default function LanguageSwitcher({ lang }: Props) {
  return (
    <Link
      href={lang === 'ja' ? '/en' : '/ja'}
      scroll={false}
      className="relative flex items-center w-36 h-11 bg-[#EAF7F6] hover:bg-[#D9F0EE] dark:bg-[#0B3D4E] dark:hover:bg-[#0F4A5D] border-2 border-[#0B3D4E]/15 hover:border-[#1C7C93] dark:border-white/15 dark:hover:border-[#4FC3D9] rounded-full p-1 cursor-pointer select-none transition-all duration-300 active:scale-95"
      aria-label="Language Toggle"
    >
      <span className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-[#08303D] border-2 border-[#0B3D4E]/10 dark:border-white/10 rounded-full transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`} />
      <span className={`relative z-10 flex items-center justify-center w-1/2 h-full text-xs font-bold transition-colors duration-300 ${lang === 'ja' ? 'text-[#0B3D4E] dark:text-white' : 'text-[#3F6E78]/60 dark:text-[#9FC9D1]/50'}`}>JP</span>
      <span className={`relative z-10 flex items-center justify-center w-1/2 h-full text-xs font-bold transition-colors duration-300 ${lang === 'en' ? 'text-[#0B3D4E] dark:text-white' : 'text-[#3F6E78]/60 dark:text-[#9FC9D1]/50'}`}>EN</span>
    </Link>
  );
}
