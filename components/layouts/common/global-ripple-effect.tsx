"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Global Ripple Effect
 * Clicking or dragging anywhere on the page creates water-like ripples at the cursor.
 * Inspired by https://www.ui-layouts.com/components/image-ripple-effect
 */

const RIPPLE_COUNT = 4;
const RIPPLE_DURATION = 1;
const RIPPLE_MAX_SCALE = 2;

interface RippleCircle {
  id: number;
  x: number;
  y: number;
}

export function GlobalRippleEffect() {
  const [ripples, setRipples] = useState<RippleCircle[]>([]);
  const rippleIdRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const addRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (prefersReducedMotion) return;

      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-(RIPPLE_COUNT - 1)), { id, x: clientX, y: clientY }]);
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerDown = (e: PointerEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.buttons !== 1) return;
      addRipple(e.clientX, e.clientY);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, [addRipple, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-primary/40 bg-primary/10"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 56,
              height: 56,
              marginLeft: -28,
              marginTop: -28,
            }}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{
              scale: RIPPLE_MAX_SCALE,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: RIPPLE_DURATION,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
