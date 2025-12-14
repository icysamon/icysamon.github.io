import Link from "next/link";
import Header from "@/app/components/header";
import Card from "@/app/components/card";

const h2Style = "text-2xl font-bold";
const divStyle = "flex flex-wrap inline-flex justify-center w-full sm'w-auto";


export default function Home() {
  const date = new Date();
  return (
    <div className="font-sans justify-items-center min-h-screen">
      <Header />
      <main className="max-w-[1280px]">
        <div className="flex flex-col my-8 gap-4 items-center">
          <h2 className={h2Style}>ゲーム制作</h2>
          <div className={divStyle}>
            <Card
              image="https://image.icysamon.com/index/2025/12/the-chart-magician.webp"
              href="https://icysamon.itch.io/the-chart-magician"
              title="譜面の魔法使い"
              date="2025年12月14日"
              description="Godotでゆるっとゲーム制作祭４参加作品。"
            />
            <Card
              image="https://image.icysamon.com/index/2024/12/the-endless-journey.webp"
              href="https://unity.cn/gamejam2024"
              title="終わりなき旅"
              date="2024年12月27日"
              description="Unity（中国）開発者コミュニティゲームジャム参加作品。"
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
          <h2 className={h2Style}>作曲・編曲</h2>
          <div className={divStyle}>
            <Card
              image="https://image.icysamon.com/index/2025/11/dreaming-fish.webp"
              href="https://linkco.re/QaGRyDV3"
              title="サカナノユメ"
              date="2025年11月21日"
            />
            <Card
              image="https://image.icysamon.com/index/2025/11/to-you-in-2020.webp"
              href="https://linkco.re/ad8AsbYr"
              title="2020年のあなたへ"
              date="2025年11月15日"
            />
            <Card
              image="https://image.icysamon.com/index/2025/04/light-year.webp"
              href="https://linkco.re/tGbPetG4"
              title="光年"
              date="2025年4月2日"
            />
            <Card
              image="https://image.icysamon.com/index/2025/03/beginning-of-the-journey.webp"
              href="https://linkco.re/xyG6xA4X"
              title="旅の始まり"
              date="2025年3月25日"
            />
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 items-center justify-center my-8 text-sm font-medium text-gray-500 dark:text-gray-400">
        <p>Copyright © 2023 - {date.getFullYear()} <Link href="/" className="font-bold hover:underline hover:underline-offset-4">icysamon</Link>.</p>
        <p> All Rights Reserved.</p>
      </footer>
    </div>
  );
}