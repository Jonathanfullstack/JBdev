'use client';

import { useEffect, useRef } from 'react';
import { cssVar } from '@/lib/motion';

/** Cores do tema atual para desenhar em canvas; atualiza quando o tema muda. */
export function useThemeColors() {
  const ref = useRef({ ink: '#0A1020', accent: '#1F5FE0' });
  useEffect(() => {
    const read = () => { ref.current = { ink: cssVar('--ink') || '#0A1020', accent: cssVar('--accent') || '#1F5FE0' }; };
    read();
    window.addEventListener('jb:theme', read);
    return () => window.removeEventListener('jb:theme', read);
  }, []);
  return ref;
}
