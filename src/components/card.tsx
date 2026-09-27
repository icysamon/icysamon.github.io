import Image from "next/image";
import Link from "next/link";

export default function Card({ image, href, title, date, description }: { image?: string, href?: string, title?: string, date?: string, description?: string }) {
  // URLが "http" または "https" から始まるかどうかで、外部リンクかを判定する
  const isExternal = href ? href.startsWith("http") : false;

  return (
    // 青系をやめ、貝殻・流木のような彩度の低いニュートラルトーンに変更
    <Link
      href={href || "/"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex w-full sm:w-[360px] h-[120px] bg-[#ECEAE4] hover:bg-[#E2DFD7] dark:bg-[#23272B] dark:hover:bg-[#2B3034] border-2 border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20 rounded-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden min-w-0"
    >
      {/* 画像エリア: 左側に配置し、親の高さと同じ 120px の正方形に固定。縦の仕切り線でポートホール枠と揃える */}
      <div className="relative w-[120px] h-[120px] shrink-0 bg-white dark:bg-[#1A1D20] border-r-2 border-black/10 dark:border-white/10 overflow-hidden">
        <Image
          aria-hidden
          fill
          src={image || ""}
          alt={title || "no-image"}
          sizes="(max-width: 640px) 120px, 120px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* テキストエリア: 右側に配置し、縦方向に並べる。flex-1 で残りの横幅をすべて使う */}
      <div className="flex flex-col justify-center gap-1.5 p-3.5 min-w-0 flex-1">
        <h3
          className="text-base sm:text-[17px] font-bold text-[#2B2B28] dark:text-[#EDEAE4] line-clamp-2 leading-tight transition-colors"
          title={title}
        >
          {title}
        </h3>
        <p className="text-[11px] sm:text-xs text-[#6B675F] dark:text-[#A9A69E] font-medium shrink-0">
          {date}
        </p>
        {/* 説明文がある場合は1行で省略（truncate）して表示 */}
        {description && (
          <p className="truncate text-[11px] sm:text-xs text-[#6B675F] dark:text-[#A9A69E] mt-0.5">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
