import { Select, Spin, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

import { getEventsData } from '@/service/services';

import styles from './index.module.less';

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
        return (
          <Tooltip
            overlayStyle={{
              maxWidth: '50%'
            }}
            overlayInnerStyle={{
              padding: '16px',
              background: '#313857',
              borderRadius: '8px'
            }}
            placement="top"
            arrowPointAtCenter={true}
            title={data.data}
          >
            <div className={cn(styles.description)}>{data.data}</div>
          </Tooltip>
        );
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
              <div key={index} className="m-[5px] text-[#ffffff]">
                {`${item}`}
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
      <div className="pb-4 text-[24px] font-[600] capitalize text-[#2483FF]">
        <Link to="/data-store?params=blockchain">Blockchain Explorer</Link>
        <span className="mx-4">{'>'}</span>
        <span className="text-[#ffffff]">events</span>
      </div>
      <Select
        defaultValue="ethereum"
        style={{ width: '210px' }}
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
            value: 'bsc',
            label: 'BNB Chain'
          },
          {
            value: 'flow',
            label: 'Flow'
          }
        ]}
        onChange={handleChangeSelect}
      />

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10')}>
          <Table
            rowKey={(record) =>
              `${record.address} - ${record.blockNumber} - ${uuidv4()}`
            }
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
