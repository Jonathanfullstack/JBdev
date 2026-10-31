import 'server-only';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), '.data');

export const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && v.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * Entrega um envio do site. Padrão (FORM_DELIVERY=local): salva em .data/<arquivo>.jsonl
 * e mostra no terminal — nada sai da máquina. Com FORM_DELIVERY=webhook e a URL
 * preenchida no .env, também envia para o webhook.
 */
export async function deliver(kind: 'briefing' | 'newsletter', payload: Record<string, unknown>) {
  const entry = { kind, receivedAt: new Date().toISOString(), ...payload };
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(path.join(DATA_DIR, `${kind}.jsonl`), `${JSON.stringify(entry)}\n`, 'utf8');
  console.log(`[${kind}] novo envio (salvo em .data/${kind}.jsonl):`, entry);

  const mode = process.env.FORM_DELIVERY ?? 'local';
  const url = kind === 'briefing' ? process.env.BRIEFING_WEBHOOK_URL : process.env.NEWSLETTER_WEBHOOK_URL;
  if (mode === 'webhook' && url) {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) });
    if (!res.ok) throw new Error(`webhook respondeu ${res.status}`);
  }
}
