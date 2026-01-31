// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useColorSchemeOptional } from "@/lib/themes";

interface Particle {
  rotationSign: number;
  age: number;
  initialLifeSpan: number;
  lifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  canv: HTMLCanvasElement;
  update: (context: CanvasRenderingContext2D) => void;
}

interface CharacterCursorProps {
  characters?: string[];
  colors?: string[];
  cursorOffset?: { x: number; y: number };
  font?: string;
  characterLifeSpanFunction?: () => number;
  initialCharacterVelocityFunction?: () => { x: number; y: number };
  characterVelocityChangeFunctions?: {
    x_func: (age: number, lifeSpan: number) => number;
    y_func: (age: number, lifeSpan: number) => number;
  };
  characterScalingFunction?: (age: number, lifeSpan: number) => number;
  characterNewRotationDegreesFunction?: (
    age: number,
    lifeSpan: number
  ) => number;
  wrapperElement?: HTMLElement;
}

/** Read theme colors from CSS variables (selected theme only) */
function getThemeColors(): string[] {
  if (typeof document === "undefined") return [];
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const vars = [
    "primary",
    "secondary",
    "accent",
    "muted-foreground",
    "foreground",

  ] as const;
  const colors: string[] = [];
  for (const name of vars) {
    const value = style.getPropertyValue(`--${name}`).trim();
    if (value) colors.push(value);
  }
  return colors.length > 0 ? colors : ["oklch(0.6 0.2 250)"];
}

/** Read theme font from document (same as selected theme – uses body’s computed font) */
function getThemeFont(): string {
  if (typeof document === "undefined") return "14px system-ui, sans-serif";
  const el = document.body || document.documentElement;
  const style = getComputedStyle(el);
  const fontFamily =
    style.fontFamily ||
    style.getPropertyValue("--font-theme").trim() ||
    "system-ui, sans-serif";
  return `14px ${fontFamily}`;
}

/** Coding / syntax characters for the cursor trail */
const DEFAULT_CODING_CHARACTERS = [
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  ";",
  ":",
  "=",
  "<",
  ">",
  "/",
  "*",
  "+",
  "-",
  "|",
  "&",
  "%",
  "#",
  '"',
  "'",
  ".",
  ",",
];

const CharacterCursor: React.FC<CharacterCursorProps> = ({
  characters = DEFAULT_CODING_CHARACTERS,
  colors: colorsProp,
  cursorOffset = { x: 0, y: 0 },
  font: fontProp,
  characterLifeSpanFunction = () => Math.floor(Math.random() * 50 + 70),
  initialCharacterVelocityFunction = () => ({
    x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 4,
    y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 4,
  }),
  characterVelocityChangeFunctions = {
    x_func: () => (Math.random() < 0.5 ? -1 : 1) / 25,
    y_func: () => (Math.random() < 0.5 ? -1 : 1) / 12,
  },
  characterScalingFunction = (age, lifeSpan) =>
    Math.max(((lifeSpan - age) / lifeSpan) * 1.8, 0),
  characterNewRotationDegreesFunction = (age, lifeSpan) => (lifeSpan - age) / 4,
  wrapperElement,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const canvImagesRef = useRef<HTMLCanvasElement[]>([]);
  const schemeContext = useColorSchemeOptional();
  const colorScheme = schemeContext?.colorScheme ?? "vscode";
  const [styleVersion, setStyleVersion] = useState(0);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        debounceRef.current = null;
        setStyleVersion((v) => v + 1);
      }, 150);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    return () => {
      observer.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const colors =
      colorsProp && colorsProp.length > 0 ? colorsProp : getThemeColors();
    const font = fontProp ?? getThemeFont();

    const randomPositiveOrNegativeOne = () => (Math.random() < 0.5 ? -1 : 1);

    class Particle {
      rotationSign: number;
      age: number;
      initialLifeSpan: number;
      lifeSpan: number;
      velocity: { x: number; y: number };
      position: { x: number; y: number };
      canv: HTMLCanvasElement;

      constructor(
        x: number,
        y: number,
        canvasItem: HTMLCanvasElement,
        optionalVelocity?: { x: number; y: number },
        optionalLifeSpan?: number
      ) {
        const lifeSpan = optionalLifeSpan ?? characterLifeSpanFunction();
        this.rotationSign = randomPositiveOrNegativeOne();
        this.age = 0;
        this.initialLifeSpan = lifeSpan;
        this.lifeSpan = lifeSpan;
        this.velocity = optionalVelocity ?? initialCharacterVelocityFunction();
        this.position = {
          x: x + cursorOffset.x,
          y: y + cursorOffset.y,
        };
        this.canv = canvasItem;
      }

      update(context: CanvasRenderingContext2D) {
        if (!this.canv.width || !this.canv.height) return;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        this.age++;

        this.velocity.x += characterVelocityChangeFunctions.x_func(
          this.age,
          this.initialLifeSpan
        );
        this.velocity.y += characterVelocityChangeFunctions.y_func(
          this.age,
          this.initialLifeSpan
        );

        const scale = characterScalingFunction(this.age, this.initialLifeSpan);

        const degrees =
          this.rotationSign *
          characterNewRotationDegreesFunction(this.age, this.initialLifeSpan);
        const radians = degrees * 0.0174533;

        context.translate(this.position.x, this.position.y);
        context.rotate(radians);

        context.drawImage(
          this.canv,
          (-this.canv.width / 2) * scale,
          -this.canv.height / 2,
          this.canv.width * scale,
          this.canv.height * scale
        );

        context.rotate(-radians);
        context.translate(-this.position.x, -this.position.y);
      }
    }

    const init = () => {
      if (prefersReducedMotion.matches) {
        return false;
      }

      canvas = canvasRef.current;
      if (!canvas) return;

      context = canvas.getContext("2d");
      if (!context) return;

      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.pointerEvents = "none";

      if (wrapperElement) {
        canvas.style.position = "absolute";
        wrapperElement.appendChild(canvas);
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
      } else {
        canvas.style.position = "fixed";
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }

      context.font = font;
      context.textBaseline = "middle";
      context.textAlign = "center";

      canvImagesRef.current = [];

      characters.forEach((char) => {
        const measurements = context!.measureText(char);
        const w = Math.max(12, Number(measurements.width) + 4) || 12;
        const h = Math.max(
          12,
          (Number(measurements.actualBoundingBoxAscent) || 12) * 2.5
        );
        if (w < 1 || h < 1) return;

        const bgCanvas = document.createElement("canvas");
        const bgContext = bgCanvas.getContext("2d");

        if (bgContext) {
          bgCanvas.width = w;
          bgCanvas.height = h;

          bgContext.textAlign = "center";
          bgContext.font = font;
          bgContext.textBaseline = "middle";
          const color =
            colors[Math.floor(Math.random() * colors.length)] ?? colors[0];
          bgContext.fillStyle = color;

          bgContext.fillText(char, bgCanvas.width / 2, bgCanvas.height / 2);

          canvImagesRef.current.push(bgCanvas);
        }
      });

      bindEvents();
      loop();
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in e
          ? e.changedTouches?.[0]?.clientX ?? e.touches[0]?.clientX
          : e.clientX;
      const clientY =
        "touches" in e
          ? e.changedTouches?.[0]?.clientY ?? e.touches[0]?.clientY
          : e.clientY;
      if (clientX != null && clientY != null) addBlast(clientX, clientY);
    };

    const bindEvents = () => {
      const element = wrapperElement || document.body;
      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("touchmove", onTouchMove, { passive: true });
      element.addEventListener("touchstart", onTouchMove, { passive: true });
      element.addEventListener("click", onPointerDown);
      element.addEventListener("touchend", onPointerDown, { passive: true });
      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (!canvasRef.current) return;

      if (wrapperElement) {
        canvasRef.current.width = wrapperElement.clientWidth;
        canvasRef.current.height = wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    const TRAIL_THROTTLE_MS = 55;
    let lastTrailAdd = 0;

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0 || canvImagesRef.current.length === 0) return;
      const now = Date.now();
      if (now - lastTrailAdd < TRAIL_THROTTLE_MS) return;
      lastTrailAdd = now;
      const touch = e.touches[0]!;
      const tx = wrapperElement
        ? touch.clientX - wrapperElement.getBoundingClientRect().left
        : touch.clientX;
      const ty = wrapperElement
        ? touch.clientY - wrapperElement.getBoundingClientRect().top
        : touch.clientY;
      addParticle(
        tx,
        ty,
        canvImagesRef.current[
          Math.floor(Math.random() * canvImagesRef.current.length)
        ]!
      );
    };

    const onMouseMove = (e: MouseEvent) => {
      if (wrapperElement) {
        const boundingRect = wrapperElement.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }

      if (canvImagesRef.current.length === 0) return;
      const now = Date.now();
      if (now - lastTrailAdd < TRAIL_THROTTLE_MS) return;
      lastTrailAdd = now;

      addParticle(
        cursorRef.current.x,
        cursorRef.current.y,
        canvImagesRef.current[Math.floor(Math.random() * characters.length)]!
      );
    };

    const addParticle = (x: number, y: number, img: HTMLCanvasElement) => {
      particlesRef.current.push(new Particle(x, y, img));
    };

    const BLAST_COUNT =5;
    const BLAST_SPEED_MIN = 1;
    const BLAST_SPEED_MAX = 5;
    const BLAST_LIFESPAN_MIN = 45;
    const BLAST_LIFESPAN_MAX = 85;

    const addBlast = (clientX: number, clientY: number) => {
      if (canvImagesRef.current.length === 0) return;
      const px = wrapperElement
        ? clientX - wrapperElement.getBoundingClientRect().left
        : clientX;
      const py = wrapperElement
        ? clientY - wrapperElement.getBoundingClientRect().top
        : clientY;
      const images = canvImagesRef.current;
      for (let i = 0; i < BLAST_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / BLAST_COUNT + Math.random() * 0.4;
        const speed =
          BLAST_SPEED_MIN + Math.random() * (BLAST_SPEED_MAX - BLAST_SPEED_MIN);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const lifeSpan =
          BLAST_LIFESPAN_MIN +
          Math.floor(Math.random() * (BLAST_LIFESPAN_MAX - BLAST_LIFESPAN_MIN));
        const img = images[Math.floor(Math.random() * images.length)]!;
        particlesRef.current.push(
          new Particle(px, py, img, { x: vx, y: vy }, lifeSpan)
        );
      }
    };

    const updateParticles = () => {
      if (!canvas || !context) return;

      if (particlesRef.current.length === 0) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i]!.update(context);
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i]!.lifeSpan < 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    init();

    return () => {
      particlesRef.current = [];
      if (canvas) {
        canvas.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const element = wrapperElement || document.body;
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchstart", onTouchMove);
      element.removeEventListener("click", onPointerDown);
      element.removeEventListener("touchend", onPointerDown);
      window.removeEventListener("resize", onWindowResize);
    };
  }, [
    characters,
    colorsProp,
    cursorOffset,
    fontProp,
    characterLifeSpanFunction,
    initialCharacterVelocityFunction,
    characterVelocityChangeFunctions,
    characterScalingFunction,
    characterNewRotationDegreesFunction,
    wrapperElement,
    colorScheme,
    styleVersion,
  ]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
};

export default CharacterCursor;
