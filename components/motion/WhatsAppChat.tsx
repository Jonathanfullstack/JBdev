'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReduced } from '@/lib/motion';

export type ChatMsg = { from: 'in' | 'out'; text: string };

/**
 * Celular com uma conversa de exemplo com o assistente: as mensagens aparecem
 * uma a uma, com o indicador "digitando…". Recomeça sozinho enquanto visível.
 */
export default function WhatsAppChat({ title, status, messages, caption }: {
  title: string; status: string; messages: ChatMsg[]; caption: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<'in' | 'out' | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReduced()) { setShown(messages.length); return; }
    let timers: number[] = [];
    let running = false;
    const clear = () => { timers.forEach(clearTimeout); timers = []; };

    const play = () => {
      running = true;
      setShown(0);
      let t = 500;
      messages.forEach((m, i) => {
        const typeFor = m.from === 'out' ? 1300 : 800;
        timers.push(window.setTimeout(() => setTyping(m.from), t));
        t += typeFor;
        timers.push(window.setTimeout(() => { setTyping(null); setShown(i + 1); }, t));
        t += 700;
      });
      timers.push(window.setTimeout(() => { if (running) play(); }, t + 4200));
    };

    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !running) play();
      if (!en.isIntersecting && running) { running = false; clear(); setTyping(null); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clear(); };
  }, [messages]);

  return (
    <figure ref={root} style={{ margin: 0 }}>
      <div className="phone" role="img" aria-label={`${caption}: ${messages.map((m) => m.text).join(' / ')}`}>
        <div className="wa-head" aria-hidden="true">
          <span className="av">jb</span>
          <span><b>{title}</b><small>{typing === 'out' ? '…' : status}</small></span>
        </div>
        <div className="wa-body" aria-hidden="true">
          {messages.slice(0, shown).map((m, i) => (
            <div key={i} className={`wa-msg ${m.from}`}>{m.text}<time>{`09:${String(12 + i).padStart(2, '0')}`}</time></div>
          ))}
          {typing && <div className={`wa-typing${typing === 'out' ? ' out' : ''}`}><i /><i /><i /></div>}
        </div>
        <div className="wa-input" aria-hidden="true"><span /><i /></div>
      </div>
      <figcaption className="label-caps" style={{ textAlign: 'center', marginTop: 16 }}>{caption}</figcaption>
    </figure>
  );
}
