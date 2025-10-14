import Image from "next/image";
import Link from "next/link";

export default function Game({ image, href, title, date, description }: { image?: string, href?: string, title?: string, date?: string, description?: string }) {
  return (
    <>
    <div className="bg-gray-50 dark:bg-zinc-900 sm:mx-4 mx-2 my-4 w-full sm:w-[400px] rounded-xl shadow-xl">
      <div className="relative h-[300px]">
        <Link href={href || "/"} target="_blank">
          <Image
            aria-hidden
            fill
            src={image || ""}
            alt={title || "no-image"}
            className="rounded-t-xl object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2 m-4">
        <h3 className="text-xl font-bold"><Link href={href || "/"} target="_blank" className="hover:underline hover:underline-offset-4">{title}</Link></h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{date}</p>
        <p>{description}</p>
      </div>
    </div>
    </>
  );
}