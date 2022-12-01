import { getData } from './request';

interface TaskDataRes {
  blockchain: string;
  createTime: number;
  status: string;
  taskId: number;
  taskName: string;
  taskType: string;
  blockNumber: number;
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
  kafkaTopic: string;
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

interface BlockReq {
  chainType: string;
  blockNumber?: number;
}

interface BlocksType {
  blockNumber: number;
  gasUsed: number;
  size: number;
  timestamp: string;
  transactionCount: number;
}

interface BlockDataRes {
  blocks: BlocksType[];
}

export const getBlockData = (params: BlockReq) => {
  return getData<BlockReq, BlockDataRes>(
    '/etl/api/v1/blockchain/blocks',
    params,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

interface TransactionType {
  blockNumber: number;
  from: string;
  timestamp: string;
  to: string;
  transactionHash: string;
  value: number;
}

interface TransactionDataRes {
  transactions: TransactionType[];
}

interface TransactionReq {
  chainType: string;
  blockNumber?: number;
}

export const getTransactionData = (params: TransactionReq) => {
  return getData<TransactionReq, TransactionDataRes>(
    '/etl/api/v1/blockchain/transactions',
    params,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export interface ethTokenDataRes {
  address: string;
  owner: string;
  tokenId: string;
  tokenMetadataRaw: string;
  tokenMetadataURI: string;
}

interface ethTokenDataReq {
  address?: string;
  tokenId?: number;
}

export const getEthTokenData = (params: ethTokenDataReq) => {
  return getData<ethTokenDataReq, { tokens: ethTokenDataRes[] }>(
    '/etl/api/v1/token/ethereum',
    params,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export const getEthTokenDataByOwner = (owner: string) => {
  return getData<null, { tokens: ethTokenDataRes[] }>(
    `/etl/api/v1/token/ethereum/owner/${owner}`,
    null,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export interface flowTokenDataRes {
  address: string;
  owner: string;
  tokenId: string;
  tokenMetadataRaw: string;
  tokenMetadataURI: string;
}

interface flowTokenDataReq {
  address?: string;
  tokenId?: number;
}

export const getFlowTokenData = (params: flowTokenDataReq) => {
  return getData<flowTokenDataReq, { tokens: flowTokenDataRes[] }>(
    '/etl/api/v1/token/flow',
    params,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

export const getFlowTokenDataByOwner = (owner: string) => {
  return getData<null, { tokens: flowTokenDataRes[] }>(
    `/etl/api/v1/token/flow/owner/${owner}`,
    null,
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};

interface EventsDataRes {
  transactionHash: string;
  blockNumber: number;
  topics: string[];
  address: string;
  data: string;
}

export const getEventsData = (chainType: string) => {
  return getData<{ chainType: string }, { events: EventsDataRes[] }>(
    '/etl/api/v1/blockchain/events',
    { chainType },
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );
};
