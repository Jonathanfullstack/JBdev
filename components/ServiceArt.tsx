import type { Locale } from '@/lib/i18n';
import type { ServiceSummary } from '@/content/dictionaries/types';
import WhatsAppChat, { type ChatMsg } from './motion/WhatsAppChat';

const PALETTES = [
  { cls: 'cover-accent' },
  { cls: 'cover-ink' },
  { cls: 'cover-soft' },
];

const CHAT: Record<Locale, { title: string; status: string; caption: string; messages: ChatMsg[] }> = {
  pt: {
    title: 'Assistente da sua empresa', status: 'online', caption: 'Exemplo de conversa com o assistente',
    messages: [
      { from: 'in', text: 'Oi! Vocês abrem sábado?' },
      { from: 'out', text: 'Oi! Abrimos sábado das 9h às 14h. Quer agendar um horário?' },
      { from: 'in', text: 'Quero, amanhã às 10h' },
      { from: 'out', text: 'Amanhã às 10h está livre. Posso confirmar no seu nome?' },
      { from: 'in', text: 'Pode!' },
      { from: 'out', text: 'Confirmado ✓ Te mando um lembrete 1h antes.' },
    ],
  },
  en: {
    title: 'Your business assistant', status: 'online', caption: 'Sample conversation with the assistant',
    messages: [
      { from: 'in', text: 'Hi! Are you open on Saturday?' },
      { from: 'out', text: 'Hi! We’re open Saturday 9am–2pm. Want to book a time?' },
      { from: 'in', text: 'Yes, tomorrow at 10am' },
      { from: 'out', text: 'Tomorrow at 10am is free. Shall I confirm it under your name?' },
      { from: 'in', text: 'Please!' },
      { from: 'out', text: 'Confirmed ✓ I’ll send you a reminder 1h before.' },
    ],
  },
  es: {
    title: 'Asistente de tu empresa', status: 'en línea', caption: 'Ejemplo de conversación con el asistente',
    messages: [
      { from: 'in', text: '¡Hola! ¿Abren el sábado?' },
      { from: 'out', text: '¡Hola! Abrimos el sábado de 9 a 14 h. ¿Quieres reservar un horario?' },
      { from: 'in', text: 'Sí, mañana a las 10' },
      { from: 'out', text: 'Mañana a las 10 está libre. ¿Lo confirmo a tu nombre?' },
      { from: 'in', text: '¡Sí!' },
      { from: 'out', text: 'Confirmado ✓ Te envío un recordatorio 1 h antes.' },
    ],
  },
};

/** Arte do bloco de serviço: cartão 3D com o glifo, ou o celular com o chat (automação). */
export default function ServiceArt({ s, index, locale }: { s: ServiceSummary; index: number; locale: Locale }) {
  if (s.key === 'auto') {
    const c = CHAT[locale];
    return (
      <div className="svc-art cover-soft" style={{ justifyContent: 'center', aspectRatio: 'auto', padding: 'clamp(24px, 3vw, 40px)' }}>
        <WhatsAppChat title={c.title} status={c.status} caption={c.caption} messages={c.messages} />
      </div>
    );
  }
  const pal = PALETTES[index % 3];
  return (
    <div className={`svc-art ${pal.cls}`} data-tilt="3d" aria-hidden="true">
      <span className="mono" style={{ fontSize: 13, opacity: 0.8 }}>jb.dev / {s.slug}</span>
      <span className="glyph z60">{s.icon}</span>
      <span style={{ fontSize: 15, opacity: 0.85 }}>{s.short}</span>
    </div>
  );
}
