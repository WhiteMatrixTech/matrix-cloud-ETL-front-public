/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { MenuProps } from 'antd';
import { cloneDeep } from 'lodash';

import { flatTreeData, ITree } from '@/utils/common';
// eslint-disable-next-line @typescript-eslint/no-type-alias
type MenuItem = Required<MenuProps>['items'][number];

export const MenuList: MenuItem[] = [
  {
    label: 'Adapter Services',
    key: '/adapter-services'
  },
  {
    label: 'Event Handlers',
    key: '/event-handlers'
  },
  {
    label: 'Downstream Apps',
    key: '/downstream-apps'
  },
  {
    label: 'Data Store',
    key: '/data-store'
  }
];

export const flatMenuList = flatTreeData(cloneDeep(MenuList) as ITree[]);
