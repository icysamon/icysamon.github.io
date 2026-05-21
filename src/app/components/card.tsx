import Image from "next/image";
import Link from "next/link";

export default function Card({ image, href, title, date, description }: { image?: string, href?: string, title?: string, date?: string, description?: string }) {
  // URLが "http" または "https" から始まるかどうかで、外部リンクかを判定する
  const isExternal = href ? href.startsWith("http") : false;

  return (
    // 【変更点1】カード全体を <Link> で囲み、どこをタップしても飛べるようにしました（UX向上）
    // 【変更点2】背景色、枠線、ホバー効果を先ほどのボタンと同じ「グラスモーフィズム」スタイルに統一
    // 【変更点3】親要素に `group` を付与し、ホバー時に中の要素（画像など）を動かせるようにしました
    <Link 
      href={href || "/"} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex w-full sm:w-[360px] h-[120px] bg-white/50 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/60 dark:border-white/20 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden min-w-0"
    >
      
      {/* 画像エリア: 左側に配置し、親の高さと同じ 120px の正方形に固定 */}
      <div className="relative w-[120px] h-[120px] shrink-0 bg-slate-200/50 dark:bg-slate-800/50 overflow-hidden">
        <Image
          aria-hidden
          fill
          src={image || ""}
          alt={title || "no-image"}
          sizes="(max-width: 640px) 120px, 120px"
          // 【変更点4】ホバー時に画像が少しだけズームするアニメーションを追加し、リッチな印象に
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>

      {/* テキストエリア: 右側に配置し、縦方向に並べる。flex-1 で残りの横幅をすべて使う */}
      <div className="flex flex-col justify-center gap-1.5 p-3.5 min-w-0 flex-1">
        <h3 
          className="text-base sm:text-[17px] font-bold text-slate-800 dark:text-white line-clamp-2 leading-tight transition-colors"
          title={title}
        >
          {title}
        </h3>
        
        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
          {date}
        </p>
        
        {/* 説明文がある場合は1行で省略（truncate）して表示 */}
        {description && (
          <p className="truncate text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}