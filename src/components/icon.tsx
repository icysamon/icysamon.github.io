import Link from 'next/link';
import Image from "next/image";

interface Props {
  href: string;
  src: string;
}

export default function Icon({ href, src }: Props) {

  return (
    <Link
      className="transition-transform hover:-translate-y-1 transform-gpu inline-block"
      href={href}
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={src}
        alt="icon"
        width={32}
        height={32}
        className="opacity-80 hover:opacity-100"
      />
    </Link>
  );
}