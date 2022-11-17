import cn from 'classnames';

import { Header } from './Header';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const { className, children } = props;

  return (
    <div className={cn(className)}>
      <Header />
      <main className="min-h-[calc(100vh_-_328px)]">{children}</main>
    </div>
  );
}
