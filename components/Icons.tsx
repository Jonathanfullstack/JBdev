type P = { size?: number; className?: string; style?: React.CSSProperties };
const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
});

export const Arrow = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} strokeWidth={2} {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);
export const Check = ({ size = 20, ...p }: P) => (
  <svg {...base(size)} strokeWidth={2.2} {...p}><path d="M5 12.5 10 17 19 7" /></svg>
);
export const Sun = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const Moon = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const Burger = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const Close = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Chat = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z" /></svg>
);
export const Mail = ({ size = 22 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
);
export const Instagram = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);
export const Linkedin = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" /></svg>
);
export const Github = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V22" /></svg>
);
export const Quote = ({ size = 40, style }: P) => (
  <svg {...base(size)} strokeWidth={1.6} style={style}><path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3" /><path d="M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3" /></svg>
);
export const Globe = ({ size = 14 }: P) => (
  <svg {...base(size)} strokeWidth={1.8}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
);
