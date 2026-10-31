import type { Dict } from '@/content/dictionaries/types';
import SplitText from './SplitText';

export default function ProcessSteps({ process, title }: { process: Dict['process']; title?: string }) {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">{process.eyebrow}</p>
        <SplitText className="h2" style={{ maxWidth: 820 }} parts={[title ?? process.title]} />
        <ol className="steps" style={{ listStyle: 'none', padding: 0 }}>
          {process.steps.map(([t, text], i) => (
            <li key={t} className="step draw-top" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
              <p className="n">0{i + 1}</p>
              <h3>{t}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
