/* eslint-disable no-case-declarations */
export function waitTime(timeMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, timeMs);
  });
}

export function getParams(key: string) {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const params = new window.URLSearchParams(window.location.search);
  return params.get(key) ?? '';
}

export interface ITree {
  key: string;
  children?: ITree[];
  parentKeys: string[];
}
export function flatTreeData(treeData: ITree[] | null, parentKey = '') {
  const result: ITree[] = [];
  if (!treeData) {
    return [];
  }

  treeData.forEach((item: ITree) => {
    if (item && item.children) {
      result.push(...flatTreeData(item.children, item.key));
    } else {
      item.parentKeys = [];
      item.parentKeys.push(parentKey);
      result.push({
        ...item
      });
    }
  });

  return result;
}

export function deduplicate<T extends Record<string, unknown>>(
  arr: T[],
  key = 'id'
) {
  const record: Record<string, boolean> = {};
  const newList: T[] = [];
  arr.forEach((item) => {
    const recordKey = item[key] as string;
    if (!record[recordKey]) {
      newList.push(item);
      record[recordKey] = true;
    }
  });

  return newList;
}
