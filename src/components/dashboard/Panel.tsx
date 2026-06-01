import type { PropsWithChildren, ReactNode } from 'react';

interface PanelProps extends PropsWithChildren {
  actions?: ReactNode;
  className?: string;
  title: string;
}

export function Panel({ actions, children, className = '', title }: PanelProps) {
  return (
    <section className={`panel ${className}`.trim()}>
      <header className="panel__header">
        <h2>{title}</h2>
        {actions}
      </header>
      <div className="panel__body">{children}</div>
    </section>
  );
}
