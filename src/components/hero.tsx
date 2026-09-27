// src/components/hero.tsx
import Image from "next/image";
import Icon from "@/components/icon";
import LanguageSwitcher from "@/components/languageswitcher";
import LinkCapsule from "@/components/linkcapsule";

interface Props {
  lang: 'ja' | 'en';
}

export default function Hero({ lang }: Props) {
  const roleText = lang === 'en' ? "" : "";

  return (
    <section className="relative z-10 w-full px-6 min-h-[95vh] flex flex-col items-center justify-center mx-auto pt-10 pb-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-[1280px] z-10 w-full">
        <div className="flex justify-center md:justify-end w-[360px]">
          <div className="w-[300px] md:w-[384px]">
            {/* ポートホール(丸窓)風の縁取り。影は使わずフラットに */}
            <div className="p-2 rounded-[2.5rem] bg-white dark:bg-[#08303D] border-2 border-[#0B3D4E]/15 dark:border-white/15">
              <Image
                aria-hidden
                width={800}
                height={800}
                src={"/image/avatar.webp"}
                alt={"artist-avatar"}
                className="w-full h-auto aspect-square object-cover rounded-[2rem] transition-transform duration-500 hover:rotate-2 transform-gpu select-none"
                priority
                unoptimized
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitUserDrag: 'none',
                  WebkitTouchCallout: 'none',
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:justify-start md:items-start shrink-0 w-[360px] md:pl-6">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B3D4E] dark:text-white">
              icysamon
            </h1>
            <div className="flex flex-col gap-1 text-lg md:text-xl text-[#3F6E78] dark:text-[#9FC9D1] font-medium md:min-h-0">
              <p className="whitespace-nowrap">{roleText}</p>
            </div>
          </div>
          <LanguageSwitcher lang={lang} />
          <div className="flex flex-col gap-4 w-[300px] md:w-full mt-2">
            <LinkCapsule
              href={lang === "ja" ? "https://blog.icysamon.com" : "https://blog.icysamon.com/en"}
              title={lang === "ja" ? "ブログ" : "Blog"}
              subtitle={lang === 'ja' ? '技術・趣味' : 'Tech & Hobbies'}
              icon={
                <svg className="w-6 h-6 text-[#0B3D4E] dark:text-[#9FC9D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            />
            <LinkCapsule
              href={lang === "ja" ? "https://www.tunecore.co.jp/artists/icysamon" : "https://www.tunecore.co.jp/artists/icysamon?artistPagePath=icysamon&lang=en"}
              title={lang === 'ja' ? '音楽配信' : 'Streaming'}
              subtitle={lang === 'ja' ? 'オリジナル楽曲' : 'Original Songs'}
              icon={
                <svg className="w-6 h-6 text-[#0B3D4E] dark:text-[#9FC9D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-16 md:mt-24 z-10 px-4">
        <div className="flex items-center flex-wrap justify-center gap-6 md:gap-10 scale-110 md:scale-125 transition-transform">
          <Icon href="http://twitter.com/icysamon" src="/icon/svgrepo-com/twitter.svg" />
          <Icon href="https://www.youtube.com/@icysamon" src="/icon/svgrepo-com/youtube.svg" />
          <Icon href="https://music.apple.com/jp/artist/icysamon/1808762015" src="/icon/svgrepo-com/apple-music.svg" />
          <Icon href="https://open.spotify.com/intl-ja/artist/7tk5ryKLzZdGvABO1H0LCx" src="/icon/svgrepo-com/spotify.svg" />
          <Icon href="https://github.com/icysamon" src="/icon/svgrepo-com/github.svg" />
          <Icon href="mailto:me@icysamon.com" src="/icon/svgrepo-com/email.svg" />
        </div>
      </div>
    </section>
  );
}
