import { Layout as AppLayout } from 'antd';
import cn from 'classnames';

import { Header } from './Header';
import styles from './Layout.module.less';
import { LeftMenu } from './LeftMenu';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const { Content, Sider } = AppLayout;

export function Layout(props: LayoutProps) {
  const { className, children } = props;

  return (
    <AppLayout className="h-screen overflow-hidden">
      <AppLayout>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          className={cn(styles.layoutAside, className)}
        >
          <LeftMenu />
        </Sider>
        <Content className="min-h-full overflow-y-auto overflow-x-hidden bg-[#474E6C] px-8 pt-[60px] pb-10">
          {children}
        </Content>
      </AppLayout>
    </AppLayout>
  );
}
