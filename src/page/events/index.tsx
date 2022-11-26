import { SearchOutlined } from '@ant-design/icons';
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

  const Columns: ColumnsType<EventsColumnsType> = [
    {
      title: 'Topics',
      dataIndex: 'topics',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[25%]',
      render: (_, data) => {
        return (
          <div>
            {data.topics.map((item, index) => (
              <div key={index} className="m-[5px] text-[#000000d9]">
                {`"${item}"`}
                {index >= data.topics.length - 1 ? '' : '、'}
              </div>
            ))}
          </div>
        );
      }
    },
    {
      title: 'Txn Hash',
      dataIndex: 'transactionHash',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Block Number',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base w-[15%]'
    },
    {
      title: 'Data',
      dataIndex: 'data',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    }
  ];

  const mokeData = [
    {
      transactionHash:
        '0xa5b284c4cf5b8157f84f79b39404e8dba427e5ed823aa3afbeebb69b178387e7',
      blockNumber: 15050021,
      topics: [
        '"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640","0x000000000000000000000000beefbabeea323f07c59926295205d3b7a17e8638"'
      ],
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      data: '0x00000000000000000000000000000000000000000000000789b799961a079869'
    }
  ];

  const [{ loading: getEventsLoading, value: eventsData }, getEventsServices] =
    useAsyncFn(async () => {
      const response = await getEventsData('ethereum');

      return response.events;
    });

  useEffect(() => {
    void getEventsServices();
  }, [getEventsServices]);

  return (
    <div className={cn(className)}>
      <div className="px-10 py-3 text-[24px] font-[600] capitalize text-[#2483FF]">
        <Link to="/data-store?params=blockchain">Blockchain Explorer</Link>
        <span className="mx-4">{'>'}</span>
        <span className="text-[#292B2E]">events</span>
      </div>

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
