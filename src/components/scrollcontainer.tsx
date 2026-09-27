import { useRef, useState, useCallback } from 'react';

export default function ScrollContainer({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const [progress, setProgress] = useState(0); // 0〜1（水位）
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max <= 0 ? 0 : el.scrollLeft / max;
    setProgress(ratio);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.style.cursor = 'grabbing';
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };
  const stopDragging = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.style.cursor = 'grab';
    }
  };
  const onMouseLeave = () => stopDragging();
  const onMouseUp = () => stopDragging();
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      isDragging.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    updateProgress();
  };
  const onDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      {/* スクロール本体: ネイティブスクロールバーは非表示、左右は端が見えてきたら段階的にフェード */}
      <div
        ref={scrollRef}
        onScroll={updateProgress}
        className={`grid grid-rows-1 sm:grid-rows-2 grid-flow-col auto-cols-max gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden w-full pt-4 pb-2 cursor-grab select-none bg-transparent touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          ${atStart ? '' : '[mask-image:linear-gradient(to_right,transparent,black_32px)]'}
          ${atEnd ? '' : '[mask-image:linear-gradient(to_left,transparent,black_32px)]'}
          ${!atStart && !atEnd ? '[mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]' : ''}
        `}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onDragStart={onDragStart}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>

      {/* 水位インジケーター: スクロールバーの代わりに、満ちていく水のように進捗を見せる */}
      <div className="w-full h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#A9A69E] dark:bg-[#6B675F] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(progress * 100, 8)}%` }}
        />
      </div>
    </div>
  );
}
