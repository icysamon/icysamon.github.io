import Image from "next/image";
import Link from "next/link";

export default function Game({ image, href, title, date, description }: { image?: string, href?: string, title?: string, date?: string, description?: string }) {
  // URLが "http" または "https" から始まるかどうかで、外部リンク（站外链接）かを判定する
  const isExternal = href ? href.startsWith("http") : false;

  return (
    <>
    {/* カードコンテナ: 
      - bg-white/50: 背景色を半透明の白に
      - backdrop-blur-md: 背後の海底背景をぼかして透かす「磨りガラス」効果
      - border-white/40: 縁に細いハイライトを入れてクリスタルのような質感に
      - hover:-translate-y-1: ホバー時にふんわりと浮き上がる演出
    */}
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 sm:mx-4 mx-2 my-4 w-full lg:w-[400px] rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
      <div className="h-[300px]">
        {/* 外部リンクの場合は別タブで開く (target="_blank")、サイト内リンクの場合は現在のタブで開く。
          セキュリティ対策として外部リンクには rel="noopener noreferrer" を付与する。
        */}
        <Link 
          href={href || "/"} 
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="relative block w-full h-full"
        >
          <Image
            aria-hidden
            fill
            src={image || ""}
            alt={title || "no-image"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            // 【修正】dark:brightness-90 を削除し、ダークモードでも画像の明るさを維持
            className="rounded-t-2xl object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2 m-5 min-w-0">
        <h3 className="text-xl font-bold truncate">
          {/* タイトル部分のリンクも同様に、外部リンクかサイト内リンクかでタブの挙動を動的に変える 
          */}
          <Link 
            href={href || "/"} 
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-slate-800 dark:text-white hover:text-rose-400 dark:hover:text-rose-400 hover:underline hover:underline-offset-4 transition-colors"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{date}</p>
        <p className="truncate text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
    </>
  );
}