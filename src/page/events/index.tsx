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

  // const mokeData = [
  //   {
  //     transactionHash:
  //       '0xa5b284c4cf5b8157f84f79b39404e8dba427e5ed823aa3afbeebb69b178387e7',
  //     blockNumber: 15050021,
  //     topics: [
  //       '"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640","0x000000000000000000000000beefbabeea323f07c59926295205d3b7a17e8638"'
  //     ],
  //     address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  //     data: '0x00000000000000000000000000000000000000000000000789b799961a079869'
  //   }
  // ];

  const handleChangeSelect = (value: string) => {
    setSelectedChain(value);
  };

  const [{ loading: getEventsLoading, value: eventsData }, getEventsServices] =
    useAsyncFn(async (Chain: string) => {
      const response = await getEventsData(Chain);

      return response.events;
    });

  console.log('eventsData', eventsData);

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
