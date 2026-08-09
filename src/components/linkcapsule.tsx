import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export default function LinkCapsule({ href, title, subtitle, icon }: Props) {
  return (
    <Link 
      href={href} 
      className="group flex items-center gap-4 p-2.5 bg-slate-50 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/60 dark:border-white/20 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-white/70 dark:bg-slate-800 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-105">
        {icon}
      </div>
      <div className="flex flex-col items-start pr-4 text-left">
        <span className="font-bold text-slate-900 dark:text-white text-base leading-tight">{title}</span>
        <span className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 mt-0.5">{subtitle}</span>
      </div>
    </Link>
  );
}