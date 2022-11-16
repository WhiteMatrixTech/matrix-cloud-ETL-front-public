import cn from 'classnames';

import styles from './Layout.module.less';

interface LayoutProps {
  className?: string;
}

export function Layout(props: LayoutProps) {
  const { className } = props;

  return <div className={cn(styles.Layout, className)}>Layout</div>;
}
