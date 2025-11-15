import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <header className="flex justify-center">
      <div className="flex flex-col gap-4 my-2">
        <h1 className="text-4xl font-semibold">icysamon</h1>
        <div className="flex flex-col gap-2">
          <p>大学院生（情報ネットワーク分野）</p>
          <p>趣味でゲームと曲を作っております。</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="https://blog.icysamon.com" target="_blank" className="flex hover:underline hover:underline-offset-4 gap-2">
            <Image
              aria-hidden
              src="./file.svg"
              alt=""
              width={16}
              height={16}
            />
            Blog
          </Link>
          <Link href="https://www.tunecore.co.jp/artists/icysamon" target="_blank" className="flex hover:underline hover:underline-offset-4 gap-2">
            <Image
              aria-hidden
              src="./globe.svg"
              alt=""
              width={16}
              height={16}
            />
            音楽配信
          </Link>
          <Link href="https://bgm.icysamon.com/" target="_blank" className="flex hover:underline hover:underline-offset-4 gap-2">
            <Image
              aria-hidden
              src="./globe.svg"
              alt=""
              width={16}
              height={16}
            />
            無料BGM素材
          </Link>
        </div>
        <div className="flex">
          <Icon
            href="http://twitter.com/icysamon"
            src="/svgrepo-com/twitter.svg"
          />
          <Icon
            href="https://www.youtube.com/@icysamon"
            src="/svgrepo-com/youtube.svg"
          />
          <Icon
            href="https://music.apple.com/jp/artist/icysamon/1808762015"
            src="/svgrepo-com/apple-music.svg"
          />
          <Icon
            href="https://open.spotify.com/intl-ja/artist/7tk5ryKLzZdGvABO1H0LCx"
            src="/svgrepo-com/spotify.svg"
          />
          <Icon
            href="https://github.com/icysamon"
            src="/svgrepo-com/github.svg"
          />
          <Icon
            href="mailto:me@icysamon.com"
            src="/svgrepo-com/email.svg"
          />
        </div>
      </div>
    </header>
    </>
  );
}

function Icon({ href, src }: { href: string, src: string }) {
  return (
    <>
    <Link
      className="mr-4 hover:brightness-75 transition"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={src}
        alt="none-icon"
        width={32}
        height={32}
      />
    </Link>
    </>
  );
}