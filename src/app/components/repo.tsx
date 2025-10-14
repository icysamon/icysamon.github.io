import Link
 from "next/link";
export default function Home({ href, title, description }: { href?: string, title?: string, description?: string }) {
  return (
    <>
    <div className="flex flex-col bg-gray-50 dark:bg-zinc-900 sm:max-w-[400px] w-full h-[150px] rounded-xl border-1 border-gray-300 m-4 p-4 justify-center gap-2 shadow-md">
      <h3><Link href={href || "/"} target="_blank" className="text-sky-600 font-bold hover:underline hover:underline-offset-4">{title}</Link></h3>
      <p className="text-sm font-medium">{description}</p>
    </div>
    </>
  );
}