'use client';

import { useId, useState } from 'react';

export default function FaqList({ items, firstOpen = true }: { items: [string, string][]; firstOpen?: boolean }) {
  const [open, setOpen] = useState(firstOpen ? 0 : -1);
  const base = useId();
  return (
    <div className="faq-list">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div className="faq-item" key={q}>
            <h3 style={{ margin: 0 }}>
              <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="q">{q}</span>
                <span className="plus" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
            </h3>
            <div id={id} className={`faq-a${isOpen ? ' open' : ''}`} role="region" aria-hidden={!isOpen}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
