import { createElement, type ReactNode } from 'react';

type Part = string | { text: string; className?: string };

/**
 * Título que sobe palavra por palavra de trás de uma máscara ao entrar na tela.
 * O texto completo fica no HTML desde o início (bom para buscadores).
 */
export default function SplitText({
  as = 'h2', className = '', parts, id, style,
}: { as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; parts: Part[]; id?: string; style?: React.CSSProperties }) {
  let i = 0;
  const nodes: ReactNode[] = [];
  parts.forEach((part, pi) => {
    const { text, className: cls } = typeof part === 'string' ? { text: part, className: undefined } : part;
    const words = text.split(' ').filter(Boolean);
    const inner = words.map((w, wi) => {
      const idx = i++;
      return (
        <span key={`${pi}-${wi}`}>
          <span className="w"><i style={{ '--i': idx } as React.CSSProperties}>{w}</i></span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
    nodes.push(cls ? <span key={pi} className={cls}>{inner}</span> : <span key={pi}>{inner}</span>);
    const next = parts[pi + 1];
    const nextText = next === undefined ? '' : typeof next === 'string' ? next : next.text;
    // sem espaço antes de pontuação ("Portfólio" + ".")
    if (next !== undefined && !/^[.,!?;:]/.test(nextText)) nodes.push(' ');
  });
  return createElement(as, { className: `split ${className}`, 'data-split': '', id, style }, nodes);
}
