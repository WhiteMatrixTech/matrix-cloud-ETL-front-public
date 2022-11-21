import { SearchOutlined } from '@ant-design/icons';
import { Select, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React from 'react';

interface BlockchainExplorerProps {
  className?: string;
}

interface BlockColumnsType {
  blockNumber: string;
  txHash: string;
  size: string;
  gasUsed: string;
  timestamp: string;
  transactionCount: string;
}

interface TransactionColumnsType {
  txHash: string;
  blockNumber: string;
  method: string;
  from: string;
  timestamp: string;
  to: string;
  Value: string;
}

export function BlockchainExplorer(props: BlockchainExplorerProps) {
  const { className } = props;

  const blockColumns: ColumnsType<BlockColumnsType> = [
    {
      title: 'Block Number',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base capitalize'
    },
    {
      title: 'Txn Hash',
      dataIndex: 'txHash',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Size',
      dataIndex: 'size',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Gas Used',
      dataIndex: 'gasUsed',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Transaction Count',
      dataIndex: 'transactionCount',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        return (
          <div className="text-[#2483FF] underline underline-offset-2">
            {data.transactionCount}
          </div>
        );
      }
    }
  ];

  const transactionColumns: ColumnsType<TransactionColumnsType> = [
    {
      title: 'Txn Hash',
      dataIndex: 'txHash',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Block Number',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base capitalize'
    },
    {
      title: 'Method',
      dataIndex: 'method',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'From',
      dataIndex: 'from',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },

    {
      title: 'To',
      dataIndex: 'to',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    }
  ];

  const mockBlockData = [
    {
      blockNumber: '12714233',
      txHash: '0x97d4b4……64da',
      size: '27036',
      gasUsed: '12370451',
      timestamp: '2022-11-07T02:18:57.000Z',
      transactionCount: '111'
    },
    {
      blockNumber: '12714233',
      txHash: '0x97d4b4……64da',
      size: '27036',
      gasUsed: '12370451',
      timestamp: '2022-11-07T02:18:57.000Z',
      transactionCount: '111'
    },
    {
      blockNumber: '12714233',
      txHash: '0x97d4b4……64da',
      size: '27036',
      gasUsed: '12370451',
      timestamp: '2022-11-07T02:18:57.000Z',
      transactionCount: '111'
    }
  ];

  const mockTransactionData = [
    {
      txHash: '0x97d4b4……64da',
      blockNumber: '12714233',
      method: 'Transfer',
      from: '0x97d4b4……64da',
      timestamp: '2022-11-07T02:18:57.000Z',
      to: '0x97d4b4……64da',
      Value: '0 Ether'
    },
    {
      txHash: '0x97d4b4……64da',
      blockNumber: '12714233',
      method: 'Transfer',
      from: '0x97d4b4……64da',
      timestamp: '2022-11-07T02:18:57.000Z',
      to: '0x97d4b4……64da',
      Value: '0 Ether'
    },
    {
      txHash: '0x97d4b4……64da',
      blockNumber: '12714233',
      method: 'Transfer',
      from: '0x97d4b4……64da',
      timestamp: '2022-11-07T02:18:57.000Z',
      to: '0x97d4b4……64da',
      Value: '0 Ether'
    }
  ];

  return (
    <div className={cn(className, 'py-20')}>
      <div className="flex">
        <input
          placeholder="Search by Txn Hash / Block"
          className="h-10 w-[500px] border-[1px] border-[#D9D9D9] p-2 outline-none"
        />
        <div
          className="flex h-10 w-11 items-center justify-center bg-[#1890FF] text-[#FFFFFF]"
          style={{ boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)' }}
        >
          <SearchOutlined />
        </div>

        <Select
          defaultValue="ethereum"
          style={{ width: '210px', marginLeft: '30px' }}
          options={[
            {
              value: 'ethereum',
              label: 'Ethereum'
            },
            {
              value: 'flow',
              label: 'Flow'
            },
            {
              value: 'btc',
              label: 'BTC'
            }
          ]}
        />
      </div>

      <div className="mt-14">
        <div className="text-[20px] text-[#2483FF]">Latest Blocks</div>

        <Spin spinning={status === 'loading'} tip="downloading">
          <div className={cn(className, 'pt-10 font-Roboto')}>
            <Table
              rowKey="userId"
              columns={blockColumns}
              dataSource={mockBlockData}
              // loading={getAdaptServicesLoading}
              pagination={false}
              // onChange={handleChange}
            />
            <div className="mt-[2px] text-right text-[16px] font-[600] text-[#1890FF]">
              View More <span className="mx-2">{'>'}</span>
            </div>
          </div>
        </Spin>
      </div>

      <div className="mt-14">
        <div className="text-[20px] text-[#2483FF]">Latest Transactions</div>

        <Spin spinning={status === 'loading'} tip="downloading">
          <div className={cn(className, 'pt-10 font-Roboto')}>
            <Table
              rowKey="userId"
              columns={transactionColumns}
              dataSource={mockTransactionData}
              // loading={getAdaptServicesLoading}
              pagination={false}
              // onChange={handleChange}
            />
            <div className="mt-[2px] text-right text-[16px] font-[600] text-[#1890FF]">
              View More <span className="mx-2">{'>'}</span>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}
