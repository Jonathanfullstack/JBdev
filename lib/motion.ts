'use client';

// Um único requestAnimationFrame para o site inteiro.
// Cada efeito se inscreve com `onFrame` e lê o estado compartilhado
// (scroll, velocidade do scroll e mouse suavizado).

type Frame = (now: number) => void;

export const motion = {
  scrollY: 0,
  vel: 0,
  mouse: { x: -9999, y: -9999, nx: 0, ny: 0 },
  ease: { nx: 0, ny: 0 },
};

const subs = new Set<Frame>();
let raf = 0;
let lastY = 0;
let started = false;

function loop(now: number) {
  const y = window.scrollY || 0;
  const dy = y - lastY;
  lastY = y;
  motion.scrollY = y;
  motion.vel = motion.vel * 0.88 + dy * 0.12;
  motion.ease.nx += (motion.mouse.nx - motion.ease.nx) * 0.06;
  motion.ease.ny += (motion.mouse.ny - motion.ease.ny) * 0.06;
  subs.forEach((fn) => {
    try { fn(now); } catch { /* um efeito com erro não derruba os outros */ }
  });
  raf = subs.size ? requestAnimationFrame(loop) : 0;
}

function start() {
  if (!started) {
    started = true;
    lastY = window.scrollY || 0;
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      motion.mouse.x = e.clientX;
      motion.mouse.y = e.clientY;
      motion.mouse.nx = e.clientX / Math.max(1, window.innerWidth) - 0.5;
      motion.mouse.ny = Math.min(1, e.clientY / Math.max(1, Math.min(window.innerHeight, 1000))) - 0.5;
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => {
      motion.mouse.x = -9999;
      motion.mouse.y = -9999;
    });
  }
  if (!raf) raf = requestAnimationFrame(loop);
}

export function onFrame(fn: Frame) {
  subs.add(fn);
  start();
  return () => { subs.delete(fn); };
}

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Prepara um canvas no tamanho/DPR atuais. Retorna null se estiver fora da tela. */
export function prepCanvas(cv: HTMLCanvasElement) {
  const r = cv.getBoundingClientRect();
  if (r.bottom < 0 || r.top > window.innerHeight || r.width < 10 || r.height < 10) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
  const ctx = cv.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, r.width, r.height);
  return { ctx, r };
}

/** Lê uma variável CSS do tema atual. */
export const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
