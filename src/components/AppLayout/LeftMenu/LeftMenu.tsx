import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

import { MenuList } from './_menu';
import styles from './LeftMenu.module.less';

export function LeftMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selected, setSelected] = useState<string>('Data Adapter Jobs');

  // const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);
  // const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  useEffect(() => {
    const currentMenu = MenuList.find((menu) => pathname.includes(menu.key));
    if (currentMenu) {
      setSelected(currentMenu.label);
    }
  }, [pathname]);

  // const onClick: MenuProps['onClick'] = (e) => {
  //   setSelectedKeys([e.key]);
  //   navigate(e.key);
  // };

  return (
    <div className={cn(styles.LeftMenu, 'overflow-hidden bg-[#2D304A] py-4')}>
      <div className="mb-4 flex h-[60px] items-center justify-center">
        <img className="h-[35px]" src={logo} />
      </div>

      <div className="">
        {MenuList.map((item, index) => (
          <div key={index} className="my-2 px-5">
            <Link
              to={item.key}
              className={cn(
                'flex cursor-pointer items-center justify-start  rounded-[50px] px-8 py-4 text-[16px] font-[400] text-[#FFFFFF]',
                selected === item.label && 'bg-[#474E6C] hover:text-[#ffffff]'
              )}
            >
              <img src={item.icon} />
              <span className="ml-1">{item.label}</span>
            </Link>
          </div>
        ))}
      </div>
      {/* <Menu
        mode="inline"
        onClick={onClick}
        openKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onOpenChange={setExpandedKeys}
        items={MenuList}
      /> */}
    </div>
  );
}
