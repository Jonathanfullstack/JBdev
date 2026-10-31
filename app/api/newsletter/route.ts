import { NextResponse } from 'next/server';
import { deliver, isEmail, str } from '@/lib/forms';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (str(body.website, 200)) return NextResponse.json({ ok: true });
  if (!isEmail(body.email)) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
  try {
    await deliver('newsletter', { email: body.email, locale: str(body.locale, 5) });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter] falha no envio:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
