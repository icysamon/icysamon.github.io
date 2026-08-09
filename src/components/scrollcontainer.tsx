import { useRef } from 'react';

export default function ScrollContainer({ children }: { children: React.ReactNode }) {
  const className = "grid grid-rows-2 grid-flow-col auto-cols-max gap-4 overflow-x-auto overflow-y-hidden w-full pt-4 pb-4 snap-x snap-mandatory cursor-grab select-none bg-transparent [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-slate-200/50 dark:[&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-thumb]:rounded-full";
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = 'none'; 
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
      scrollRef.current.style.scrollSnapType = '';
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
    <div
      ref={scrollRef}
      className={className}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onDragStart={onDragStart}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}