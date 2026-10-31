// Logo real da JB DEV (</> azul e ciano + "JB | DEV"), redesenhado em SVG a partir de public/assents/img/logo.png.
// O símbolo mantém as cores da marca; o texto usa currentColor e acompanha o tema claro/escuro.
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={Math.round(size * 0.68)} viewBox="0 0 76 52" aria-hidden="true" focusable="false">
      <path d="M4 18h33.5L28 50H4a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z" fill="#0B55E3" />
      <path d="M48 1h24.5a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H38.5Z" fill="#62DFE6" />
      <path d="M20.5 26 9.5 34l11 8" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 8.5l12 8-12 8" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ size = 54 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">JB <span className="logo-bar">|</span> DEV</span>
    </span>
  );
}
