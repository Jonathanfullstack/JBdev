import { NextResponse } from 'next/server';
import { deliver, isEmail, str } from '@/lib/forms';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // honeypot: robôs preenchem o campo escondido; finge sucesso e descarta
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  if (!name || !isEmail(body.email) || body.consent !== true) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  try {
    await deliver('briefing', {
      name,
      company: str(body.company, 120),
      email: body.email,
      whatsapp: str(body.whatsapp, 40),
      needs: Array.isArray(body.needs) ? body.needs.map((n) => str(n, 40)).slice(0, 10) : [],
      budget: str(body.budget, 80),
      message: str(body.message, 4000),
      locale: str(body.locale, 5),
      page: str(body.page, 200),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[briefing] falha no envio:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
