'use client';

import { useState } from 'react';
import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import type { Dict } from '@/content/dictionaries/types';
import { Check } from '../Icons';

export default function BriefingForm({ c, locale }: { c: Dict['contact']; locale: Locale }) {
  const [needs, setNeeds] = useState<string[]>([]);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState('sending');
    try {
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'), company: fd.get('company'), email: fd.get('email'), whatsapp: fd.get('whatsapp'),
          needs, budget: fd.get('budget'), message: fd.get('message'), consent: fd.get('consent') === 'on',
          website: fd.get('website'), locale, page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      form.reset();
      setNeeds([]);
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="success" role="status">
        <span className="ok"><Check size={28} /></span>
        <h2 style={{ marginTop: 24, fontSize: 36, letterSpacing: '-0.03em', fontWeight: 600 }}>{c.successTitle}</h2>
        <p className="muted" style={{ margin: '14px auto 0', maxWidth: 380, fontSize: 17, lineHeight: 1.55 }}>{c.successText}</p>
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 24 }} onClick={() => setState('idle')}>{c.again}</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="jb-nome">{c.name}</label>
          <input id="jb-nome" name="name" className="input" type="text" required autoComplete="name" placeholder={c.namePh} maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="jb-empresa">{c.company} <span className="muted" style={{ fontWeight: 400 }}>{c.optional}</span></label>
          <input id="jb-empresa" name="company" className="input" type="text" autoComplete="organization" placeholder={c.companyPh} maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="jb-email">{c.email}</label>
          <input id="jb-email" name="email" className="input" type="email" required autoComplete="email" placeholder={c.emailPh} maxLength={160} />
        </div>
        <div className="field">
          <label htmlFor="jb-whats">{c.whatsapp}</label>
          <input id="jb-whats" name="whatsapp" className="input" type="tel" autoComplete="tel" placeholder={c.whatsappPh} maxLength={40} />
        </div>
      </div>

      <fieldset>
        <legend style={{ marginBottom: 10, fontSize: 14, fontWeight: 500 }}>{c.needs}</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {c.needOptions.map((n) => {
            const on = needs.includes(n);
            return (
              <button key={n} type="button" className="need-chip" aria-pressed={on}
                onClick={() => setNeeds(on ? needs.filter((x) => x !== n) : [...needs, n])}>{n}</button>
            );
          })}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="jb-invest">{c.invest}</label>
        <select id="jb-invest" name="budget" className="input" defaultValue={c.investOptions[0]}>
          {c.investOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="jb-msg">{c.message}</label>
        <textarea id="jb-msg" name="message" className="input" rows={5} placeholder={c.messagePh} maxLength={4000} />
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="consent">
        <input id="jb-lgpd" name="consent" type="checkbox" required />
        <label htmlFor="jb-lgpd">{c.consent}</label>
      </div>

      {state === 'error' && <p className="form-error" role="alert">{c.error}</p>}

      <button type="submit" className="btn btn-accent" style={{ height: 56, fontSize: 17 }} disabled={state === 'sending'} data-magnetic>
        {state === 'sending' ? c.sending : c.submit}
      </button>
      <p className="form-note">{c.privacyNote} <Link href={localePath(locale, '/politica-de-privacidade')}>{c.privacyLink}</Link>.</p>
    </form>
  );
}
