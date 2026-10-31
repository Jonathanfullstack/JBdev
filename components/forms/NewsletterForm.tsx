'use client';

import { useState } from 'react';

type Labels = { label: string; placeholder: string; button: string; doneStrong: string; done: string; error: string };

export default function NewsletterForm({ labels, locale }: { labels: Labels; locale: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), website: fd.get('website'), locale }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return <p role="status" style={{ fontSize: 18, lineHeight: 1.5 }}><strong className="accent">{labels.doneStrong}</strong> {labels.done}</p>;
  }
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label htmlFor="jb-news" className="muted" style={{ fontSize: 14 }}>{labels.label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <input id="jb-news" name="email" type="email" required autoComplete="email" placeholder={labels.placeholder}
          className="input" style={{ flex: '1 1 220px', height: 54, borderRadius: 999, padding: '0 20px' }} />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <button type="submit" className="btn btn-accent" disabled={state === 'sending'} data-magnetic>{labels.button}</button>
      </div>
      {state === 'error' && <p className="form-error" role="alert">{labels.error}</p>}
    </form>
  );
}
