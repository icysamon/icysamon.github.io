export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-opacity duration-300">
      {/* 回転するスピナー */}
      <div className="w-12 h-12 border-4 border-gray-200 dark:border-zinc-800 border-t-blue-500 dark:border-t-zinc-100 rounded-full animate-spin"></div>
      
      {/* テキスト（点滅アニメーション） */}
      <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest animate-pulse uppercase">
        Loading...
      </p>
    </div>
  );
}