import { getData } from './request';

interface TaskDataRes {
  blockchain: string;
  createTime: number;
  status: string;
  taskId: number;
  taskName: string;
}

export interface AppsDataRes {
  appName: string;
  blockchain: string;
  handlers: string[];
}

interface EventHandlersDataRes {
  blockchain: string;
  handlerName: string;
  type: string;
}

interface BlocksType {
  blockNumber: number;
  gasUsed: number;
  size: number;
  timestamp: string;
  transactionCount: number;
  transactionHash: string;
}

interface BlockDataRes {
  blocks: BlocksType[];
  nextKey: string;
  prevKey: string;
}

interface TransactionType {
  blockNumber: number;
  from: string;
  method: string;
  timestamp: string;
  to: string;
  transactionHash: string;
  value: number;
}

interface TransactionDataRes {
  blocks: TransactionType[];
  nextKey: string;
  prevKey: string;
}

export const getTaskData = () => {
  return getData<null, { tasks: TaskDataRes[] }>(
    '/etl/api/v1/blockchain/tasks',
    null,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export const getAppsData = () => {
  return getData<null, { apps: AppsDataRes[] }>(
    '/etl/api/v1/blockchain/apps',
    null,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export const getEventHandlersData = () => {
  return getData<null, { handlers: EventHandlersDataRes[] }>(
    '/etl/api/v1/blockchain/handlers',
    null,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export const getBlockData = (chainType: string) => {
  return getData<string, BlockDataRes>(
    '/etl/api/v1/blockchain/blocks',
    chainType,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export const getTransactionData = (chainType: string) => {
  return getData<string, TransactionDataRes>(
    '/etl/api/v1/blockchain/transactions',
    chainType,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};
