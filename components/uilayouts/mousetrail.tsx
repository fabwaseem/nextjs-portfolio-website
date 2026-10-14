// @ts-nocheck
'use client';
import { cn } from '@/lib/utils';
import { ReactNode, useRef } from 'react';
interface ImageMouseTrailProps {
  items: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}
export default function ImageMouseTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = 'w-40 h-48',
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLElement>(null);
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const currentZIndexRef = useRef(1);
  const globalIndexRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0 });

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = 'active';
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = 'inactive';
      }, 1500);
    }
    lastRef.current = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - lastRef.current.x, y - lastRef.current.y);
  };
  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = 'inactive';
  };

  const handleOnMove = (e: { clientX: number; clientY: number }) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const images = refs.current;
      const globalIndex = globalIndexRef.current;
      const lead = images[globalIndex % images.length];
      const tail =
        images[(globalIndex - maxNumberOfImages) % images.length] ?? null;

      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail) deactivate(tail);
      globalIndexRef.current++;
    }
  };

  return (
    <section
      onMouseMove={handleOnMove}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      ref={containerRef}
      className={cn(
        'grid place-content-center h-[600px] w-full bg-[#e0dfdf] relative overflow-hidden rounded-lg',
        className
      )}
    >
      {items.map((item, index) => (
        // Decorative trail frames; position is applied from pointer events.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={item + index}
          className={cn(
            "object-cover  scale-0 opacity:0 data-[status='active']:scale-100  data-[status='active']:opacity-100 transition-transform data-[status='active']:duration-500 duration-300 data-[status='active']:ease-out-expo  absolute   -translate-y-[50%] -translate-x-[50%] ",
            imgClass
          )}
          data-index={index}
          data-status='inactive'
          src={item}
          alt=""
          ref={(node) => {
            refs.current[index] = node;
          }}
        />
      ))}
      {children}
    </section>
  );
}
