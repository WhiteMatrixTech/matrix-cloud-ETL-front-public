import cn from 'classnames';
import React from 'react';

import logo from '@/assets/images/logo.png';

import styles from './Header.module.less';

interface HeaderProps {
  className?: string;
}

export function Header(props: HeaderProps) {
  const { className } = props;
  return (
    <div
      className={cn(styles.Header, className, 'h-[80px] w-full bg-[#FEFEFF]')}
    >
      <div className="font-['IBM Plex Sans'] flex h-[80px] w-full items-center justify-start pl-9 text-[30px] font-[600] text-[#1B1C1E]">
        <img className="" src={logo} />
      </div>
    </div>
  );
}
