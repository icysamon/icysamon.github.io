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
      className="group relative flex items-center gap-4 p-2.5 bg-[#EAF7F6] hover:bg-[#D9F0EE] dark:bg-[#0B3D4E] dark:hover:bg-[#0F4A5D] border-2 border-[#0B3D4E]/15 hover:border-[#1C7C93] dark:border-white/15 dark:hover:border-[#4FC3D9] rounded-full transition-colors duration-200"
    >
      {/* ポートホール(丸窓)風のアイコン枠 */}
      <div className="relative flex items-center justify-center w-12 h-12 bg-white dark:bg-[#08303D] rounded-full shrink-0 border-2 border-[#0B3D4E]/20 dark:border-white/20 group-hover:border-[#FF6F59] transition-colors duration-200">
        {icon}

        {/* 小さな泡アクセント */}
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#4FC3D9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col items-start pr-4 text-left">
        <span className="font-bold text-[#0B3D4E] dark:text-white text-base leading-tight">
          {title}
        </span>
        <span className="text-[11px] md:text-xs text-[#3F6E78] dark:text-[#9FC9D1] mt-0.5">
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
