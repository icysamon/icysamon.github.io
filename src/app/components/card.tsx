import Image from "next/image";
import Link from "next/link";

export default function Card({ image, href, title, date, description }: { image?: string, href?: string, title?: string, date?: string, description?: string }) {
  // URLが "http" または "https" から始まるかどうかで、外部リンクかを判定する
  const isExternal = href ? href.startsWith("http") : false;

  return (
    // 【変更】縦長から横長のコンパクトな長方形レイアウトに変更。
    // 高さを 120px に固定し、画像が角丸からはみ出ないように overflow-hidden を追加しました。
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 w-full sm:w-[360px] h-[120px] rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex overflow-hidden min-w-0">
      
      {/* 【変更】画像エリア: 左側に配置し、親の高さと同じ 120px の正方形に固定 */}
      {/* 念のため、こちらの div の relative は外しても大丈夫です */}
      <div className="w-[120px] h-[120px] shrink-0 bg-slate-100 dark:bg-slate-800">
        <Link 
          href={href || "/"} 
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          // ↓【重要】ここに `relative` を追加します！
          className="relative block w-full h-full"
        >
          <Image
            aria-hidden
            fill
            src={image || ""}
            alt={title || "no-image"}
            sizes="(max-width: 640px) 120px, 120px"
            className="object-cover" 
          />
        </Link>
      </div>

      {/* 【変更】テキストエリア: 右側に配置し、縦方向に並べる。flex-1 で残りの横幅をすべて使う */}
      <div className="flex flex-col justify-center gap-1.5 p-3 min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-bold">
          {/* 【変更】タイトルが長い場合は「line-clamp-2」で最大2行で折り返し、はみ出た部分は「...」にします */}
          <Link 
            href={href || "/"} 
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-slate-800 dark:text-white hover:text-rose-400 dark:hover:text-rose-400 hover:underline hover:underline-offset-4 transition-colors line-clamp-2 leading-tight"
            title={title} // ホバー時に全文が見えるようにtitle属性を追加しておくのがおすすめです
          >
            {title}
          </Link>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">{date}</p>
        
        {/* 説明文がある場合は1行で省略（truncate）して表示 */}
        {description && (
          <p className="truncate text-xs text-slate-600 dark:text-slate-300">{description}</p>
        )}
      </div>
    </div>
  );
}