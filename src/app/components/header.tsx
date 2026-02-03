import Image from "next/image";
import Link from "next/link";

export default function Home({ lang }: { lang: 'ja' | 'en' }) {
  return (
    <>
    <header className="flex flex-col">
      <div className="flex flex-wrap mt-12 gap-8 justify-center">
        <div>
          <Image
            aria-hidden
            width={300}
            height={300}
            src={"https://image.icysamon.com/avatar/artist.webp"}
            alt={"no-image"}
            className="object-cover rounded-full dark:brightness-80"
            priority
          />
        </div>  
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-4xl font-semibold">icysamon</h1>
          <div className="flex flex-col gap-2">
            <p>{lang === 'ja' ? "理系大学院生（IoT分野）" : "Master's Student (IoT)"}</p>
            <p>{lang === 'ja' ? "趣味でゲームと曲を作ってます 🫧" : "Game Dev & Music Creator 🫧"}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="https://blog.icysamon.com" className="flex hover:underline hover:underline-offset-4 gap-2">
              <Image
                aria-hidden
                src="./file.svg"
                alt=""
                width={16}
                height={16}
                className="brightness-100 dark:brightness-200"
              />
              {lang === 'ja' ? 'Blog' : 'Blog'}
            </Link>
            <Link href="https://www.tunecore.co.jp/artists/icysamon" className="flex hover:underline hover:underline-offset-4 gap-2">
              <Image
                aria-hidden
                src="./globe.svg"
                alt=""
                width={16}
                height={16}
                className="brightness-100 dark:brightness-200"
              />
              {lang === 'ja' ? '音楽配信' : 'Music Streaming'}
            </Link>
            <Link href="https://bgm.icysamon.com/" className="flex hover:underline hover:underline-offset-4 gap-2">
              <Image
                aria-hidden
                src="./globe.svg"
                alt=""
                width={16}
                height={16}
                className="brightness-100 dark:brightness-200"
              />
              {lang === 'ja' ? 'フリーBGM' : 'Free BGM'}
            </Link>
          </div>
          <div className="flex brightness-100 dark:brightness-80">
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