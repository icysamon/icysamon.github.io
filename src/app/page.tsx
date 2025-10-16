import Link from "next/link";
import Header from "@/app/components/header";
import Repo from "@/app/components/repo";
import Card from "@/app/components/card";

const h2Style = "text-2xl font-bold";
const divStyle = "flex flex-wrap inline-flex justify-center w-full sm'w-auto";

export default function Home() {
  return (
    <div className="font-sans justify-items-center min-h-screen p-4 sm:p-8">
      <Header />
      <main className="max-w-[1280px]">
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>GitHub</h2>
          <div className={divStyle}>
            <Repo
            title="chord"
            href="https://github.com/icysamon/chord"
            description="音楽配信機能に特化したシンプルな Hugo テーマです。"
            />
            <Repo
            title="rp2040-dht20"
            href="https://github.com/icysamon/rp2040-dht20"
            description="Raspberry Pi Pico が使える温湿度センサー DHT20 の C/Python ドライバーです。"
            />
            <Repo
            title="rp2040-sg-90"
            href="https://github.com/icysamon/rp2040-sg-90"
            description="Raspberry Pi Pico が使えるサーボモーター SG-90 の C/Python ドライバーです。"
            />
            <Repo
            title="stm32-dht20"
            href="https://github.com/icysamon/stm32-dht20"
            description="STM32F103 シリーズが使える温湿度センサー DHT20 の C ドライバーです。"
            />
          </div>
          <h2 className={h2Style}>作曲・編曲</h2>
          <div className={divStyle}>
            <Card
              image="https://image.icysamon.com/index/2025/04/light-year.webp"
              href="https://linkco.re/tGbPetG4"
              title="光年"
              date="	2025年4月2日"
            />
            <Card
              image="https://image.icysamon.com/index/2025/03/beginning-of-the-journey.webp"
              href="https://linkco.re/xyG6xA4X"
              title="旅の始まり"
              date="2025年3月25日"
            />
          </div>
          <h2 className={h2Style}>ゲーム制作</h2>
          <div className={divStyle}>
            <Card
              image="https://image.icysamon.com/index/2024/12/the-endless-journey.webp"
              title="終わりなき旅"
              date="2024年12月27日"
              description="Unity 開発者コミュニティゲームジャム（中国開催）参加作品。"
            />
            <Card
              image="https://image.icysamon.com/index/2024/07/light-years-traveler.webp"
              href="https://icysamon.itch.io/light-years-traveler"
              title="Light Years Traveler"
              date="2024年7月21日"
              description="Godot Wild Jam 参加作品。"
            />
            <Card
              image="https://image.icysamon.com/index/2023/10/find.webp"
              href="https://www.gcores.com/games/113216"
              title="痕跡"
              date="2023年10月11日"
              description="BOOOMJAM 参加作品。"
            />
            <Card
              image="https://image.icysamon.com/index/2023/08/happy-happy-happy.webp"
              href="https://www.gcores.com/games/110286"
              title="Happy Happy Happy"
              date="2023年8月25日"
              description="BOOOMJAM 参加作品。"
            />
            <Card
              image="https://image.icysamon.com/index/2023/05/unfinished-puzzle.webp"
              href="https://www.gcores.com/games/105393"
              title="未完成のパズル"
              date="2023年3月29日"
              description="BOOOMJAM 参加作品。"
            />
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 items-center justify-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Copyright © 2023 <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>. All Rights Reserved.</p>
      </footer>
    </div>
  );
}