'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { onFrame, prefersReduced } from '@/lib/motion';
import { setLenis } from '@/lib/lenis';

/** Scroll com inércia (Lenis) no site todo. Desligado com movimento reduzido. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -96 } });
    setLenis(lenis);
    const off = onFrame((now) => lenis.raf(now));
    return () => {
      off();
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
