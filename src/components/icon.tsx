import Link from 'next/link';
import Image from "next/image";

interface Props {
  href: string;
  src: string;
}

export default function Icon({ href, src }: Props) {

  return (
    <Link
      className="group flex items-center justify-center w-14 h-14 bg-[#EAF7F6] dark:bg-[#0B3D4E] border-2 border-[#0B3D4E]/15 dark:border-white/15 hover:border-[#FF6F59] rounded-full transition-all duration-200 transform-gpu hover:-translate-y-1"
      href={href}
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={src}
        alt="icon"
        width={32}
        height={32}
        className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
      />
    </Link>
  );
}
