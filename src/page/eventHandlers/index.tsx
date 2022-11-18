import { Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';

import { getEventHandlersData } from '@/service/services';

interface dataStoreProps {
  className?: string;
}

interface columnsType {
  blockchain: string;
  handlerName: string;
  type: string;
}

function EventHandlers(props: dataStoreProps) {
  const { className } = props;

  const columns: ColumnsType<columnsType> = [
    {
      title: 'Blockchain',
      dataIndex: 'blockchain',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base w-[20%] capitalize'
    },
    {
      title: 'Handler Name',
      dataIndex: 'handlerName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]'
    }
  ];

  // const mockData = [
  //   {
  //     blockchain: 'Ethereum',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'Flow',
  //     handlerName: 'OneSyncNotifierEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'BTC',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     handlerName: 'OneSyncEnrollmentEventHandler',
  //     type: 'Custom'
  //   }
  // ];

  const [
    { loading: getEventHandlersLoading, value: eventHandlerData },
    getEventHandlers
  ] = useAsyncFn(async () => {
    const response = await getEventHandlersData();

    return response.handlers;
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
            pagination={false}
          />
        </div>
      </Spin>
    </div>
  );
}

export default EventHandlers;
