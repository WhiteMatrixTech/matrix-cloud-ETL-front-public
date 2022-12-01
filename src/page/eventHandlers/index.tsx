import { Spin, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { getEventHandlersData } from '@/service/services';

interface dataStoreProps {
  className?: string;
}

interface columnsType {
  blockchain: string;
  handlerName: string;
  kafkaTopic: string;
  type: string;
  appName: string;
}

function EventHandlers(props: dataStoreProps) {
  const { className } = props;
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const handleChange: TableProps<columnsType>['onChange'] = (
    _pagination,
    filters
  ) => {
    setFilteredInfo(filters);
  };

  const columns: ColumnsType<columnsType> = [
    {
      title: 'Blockchain',
      dataIndex: 'blockchain',
      ellipsis: true,
      filters: [
        { text: 'Flow', value: 'flow' },
        { text: 'Ethereum', value: 'ethereum' },
        { text: 'Polygon', value: 'polygon' }
      ],
      sorter: {
        compare: (a, b) => a.blockchain.length - b.blockchain.length,
        multiple: 1
      },
      filteredValue: filteredInfo.blockchain || null,
      onFilter: (value, record) => {
        return record.blockchain === value;
      },
      className: 'text-[#000000] font-[700] text-base w-[15%] capitalize'
    },
    {
      title: 'App',
      dataIndex: 'appName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        return <div>{data.appName || 'N/A'}</div>;
      }
    },
    {
      title: 'HandlerName',
      dataIndex: 'handlerName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Topic',
      dataIndex: 'kafkaTopic',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[15%]'
    }
  ];

  const [
    { loading: getEventHandlersLoading, value: eventHandlerData },
    getEventHandlers
  ] = useAsyncFn(async () => {
    const response = await getEventHandlersData();

    return response.handlers.sort(
      (a, b) => b.blockchain.length - a.blockchain.length
    );
  });

  useEffect(() => {
    void getEventHandlers();
  }, [getEventHandlers]);

  return (
    <div className={cn(className)}>
      <div className="text-[24px] font-[600] capitalize text-[#2483FF]">
        Event Handlers
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="userId"
            columns={columns}
            dataSource={eventHandlerData}
            loading={getEventHandlersLoading}
            // pagination={false}
            onChange={handleChange}
          />
        </div>
      </Spin>
    </div>
  );
}

export default EventHandlers;
