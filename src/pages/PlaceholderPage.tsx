import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  description?: string;
  title: string;
}

export function PlaceholderPage({ description = '该模块将在后续阶段接入', title }: PlaceholderPageProps) {
  return (
    <section className="placeholder-page">
      <Construction size={38} strokeWidth={1.5} />
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
