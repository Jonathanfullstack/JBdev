'use client';

import type Lenis from 'lenis';

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { instance = l; };

export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
}

export function scrollToEl(el: HTMLElement) {
  if (instance) instance.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
