import { SearchOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncFn, useSearchParam } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

import {
  getTransactionData,
  getTransactionDataByTxnHash
} from '@/service/services';

interface transactionProps {
  className?: string;
}

interface TransactionColumnsType {
  blockNumber: number;
  from: string;
  timestamp: string;
  to: string;
  transactionHash: string;
  value: number;
}

function Transactions(props: transactionProps) {
  const { className } = props;

  const blockChainParam = useSearchParam('blockchain');

  const [selectedChain, setSelectedChain] = useState<string>('ethereum');
  const [searchValue, setSearchValue] = useState<string>('');

  const Columns: ColumnsType<TransactionColumnsType> = [
    {
      title: 'TxnHash',
      dataIndex: 'transactionHash',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]'
    },
    {
      title: 'BlockNumber',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base capitalize'
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        return (
          <div className="">{dayjs(Number(data.timestamp)).toISOString()}</div>
        );
      }
    },
    {
      title: 'From',
      dataIndex: 'from',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]',
      render: (_, data) => {
        if (data.from) {
          return <div>{data.from}</div>;
        }
        return <div>N/A</div>;
      }
    },

    {
      title: 'To',
      dataIndex: 'to',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]',
      render: (_, data) => {
        if (data.to) {
          return <div>{data.to}</div>;
        }
        return <div>N/A</div>;
      }
    },
    {
      title: `Value (${
        selectedChain === 'bsc'
          ? 'BNB'
          : selectedChain === 'flow'
          ? 'Flow'
          : 'ETH'
      })`,
      dataIndex: 'value',
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        if (selectedChain === 'flow') {
          return <div>{data.value || 'N/A'}</div>;
        }
        return <div>{data.value / 1e18}</div>;
      }
    }
  ];

  const [
    { loading: getTransactionsLoading, value: transactionsData },
    getTransactionsServices
  ] = useAsyncFn(async (chainType: string, transactionHash?: string) => {
    if (transactionHash) {
      const response = await getTransactionDataByTxnHash({
        chainType,
        transactionHash
      });
      return [response];
    }

    if (blockChainParam) {
      const response = await getTransactionData({
        chainType,
        blockNumber: Number(blockChainParam.split('?blockNumber=')[1])
      });

      return response.transactions;
    }

    const response = await getTransactionData({
      chainType
    });

    return response.transactions;
  });

  useEffect(() => {
    if (blockChainParam) {
      setSelectedChain(blockChainParam.split('?')[0]);
    }
  }, [blockChainParam]);

  useEffect(() => {
    if (searchValue) {
      return void getTransactionsServices(selectedChain, searchValue);
    }
    void getTransactionsServices(selectedChain);
  }, [getTransactionsServices, searchValue, selectedChain]);

  return (
    <div className={cn(className)}>
      <div className="px-10 py-3 text-[24px] font-[600] capitalize text-[#2483FF]">
        <Link to="/data-store?params=blockchain">Blockchain Explorer</Link>
        <span className="mx-4">{'>'}</span>
        <span className="text-[#292B2E]">transactions</span>
      </div>

      <div className="flex px-10 py-3">
        <input
          value={searchValue}
          placeholder="Search by transaction hash"
          className="h-10 w-[500px] border-[1px] border-[#D9D9D9] p-2 outline-none"
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() =>
            void getTransactionsServices(selectedChain, searchValue)
          }
        />
        <div
          className="flex h-10 w-11 items-center justify-center bg-[#1890FF] text-[#FFFFFF]"
          style={{ boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)' }}
        >
          <SearchOutlined />
        </div>

        <Select
          defaultValue="ethereum"
          value={selectedChain}
          style={{ width: '210px', marginLeft: '30px' }}
          options={[
            {
              value: 'ethereum',
              label: 'Ethereum'
            },
            {
              value: 'polygon',
              label: 'Polygon'
            },
            {
              value: 'flow',
              label: 'Flow'
            },
            {
              value: 'bsc',
              label: 'BNB Chain'
            }
          ]}
          onChange={(value: string) => setSelectedChain(value)}
        />
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey={(record) => `${record.blockNumber} - ${uuidv4()}`}
            columns={Columns}
            dataSource={transactionsData}
            loading={getTransactionsLoading}
          />
        </div>
      </Spin>
    </div>
  );
}

export default Transactions;
