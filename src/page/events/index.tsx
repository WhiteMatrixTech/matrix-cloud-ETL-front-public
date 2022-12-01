import { Select, Spin } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncFn } from 'react-use';

import { getEventsData } from '@/service/services';

interface eventsProps {
  className?: string;
}

interface EventsColumnsType {
  transactionHash: string;
  blockNumber: number;
  topics: string[];
  address: string;
  data: string;
}

function Events(props: eventsProps) {
  const { className } = props;
  const [selectedChain, setSelectedChain] = useState<string>('ethereum');

  const Columns: ColumnsType<EventsColumnsType> = [
    {
      title: 'TxnHash',
      dataIndex: 'transactionHash',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        if (!data.transactionHash) {
          return <div>N/A</div>;
        }
        return <div>{data.transactionHash}</div>;
      }
    },
    {
      title: 'Contract',
      dataIndex: 'address',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        if (!data.address) {
          return <div>N/A</div>;
        }
        return <div>{data.address}</div>;
      }
    },
    {
      title: 'BlockNumber',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base w-[15%]',
      render: (_, data) => {
        if (!data.blockNumber) {
          return <div>N/A</div>;
        }
        return <div>{data.blockNumber}</div>;
      }
    },
    {
      title: 'Data',
      dataIndex: 'data',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        if (!data.data) {
          return <div>N/A</div>;
        }
        return <div>{data.data}</div>;
      }
    },
    {
      title: 'Topics',
      dataIndex: 'topics',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[25%]',
      render: (_, data) => {
        if (!data.topics) {
          return <div>N/A</div>;
        }
        return (
          <div>
            {data.topics.map((item, index) => (
              <div key={index} className="m-[5px] text-[#000000d9]">
                {`"${item}"`}
                {index >= data.topics.length - 1 ? '' : ','}
              </div>
            ))}
          </div>
        );
      }
    }
  ];

  const handleChangeSelect = (value: string) => {
    setSelectedChain(value);
  };

  const [{ loading: getEventsLoading, value: eventsData }, getEventsServices] =
    useAsyncFn(async (Chain: string) => {
      const response = await getEventsData(Chain);

      return response.events;
    });

  useEffect(() => {
    if (selectedChain) {
      void getEventsServices(selectedChain);
    }
  }, [getEventsServices, selectedChain]);

  return (
    <div className={cn(className)}>
      <div className="px-10 py-3 text-[24px] font-[600] capitalize text-[#2483FF]">
        <Link to="/data-store?params=blockchain">Blockchain Explorer</Link>
        <span className="mx-4">{'>'}</span>
        <span className="text-[#292B2E]">events</span>
      </div>
      <Select
        defaultValue="ethereum"
        style={{ width: '210px', marginLeft: '40px' }}
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
            label: 'BSC'
          }
        ]}
        onChange={handleChangeSelect}
      />

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="userId"
            columns={Columns}
            dataSource={eventsData}
            loading={getEventsLoading}
          />
        </div>
      </Spin>
    </div>
  );
}

export default Events;
