import { Spin } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';

import { getTaskData } from '@/service/services';

interface adapterServicesProps {
  className?: string;
}

interface columnsType {
  blockchain: string;
  taskName: string;
  taskId: number;
  createTime: number;
  status: string;
}

function AdapterServices(props: adapterServicesProps) {
  const { className } = props;

  const columns: ColumnsType<columnsType> = [
    {
      title: 'Blockchain',
      dataIndex: 'blockchain',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base'
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'TaskId',
      dataIndex: 'taskId',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        return (
          <div>{dayjs(data.createTime).format('YYYY-MM-DD hh:mm:ss')}</div>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, data) => {
        return (
          <div
            className={cn(
              'text-[14px] font-[700]',
              data.status === 'FAILURE' ? 'text-[#EA6F6F]' : 'text-[#499F5F]'
            )}
          >
            {data.status}
          </div>
        );
      }
    }
  ];

  // const mockData = [
  //   {
  //     blockchain: 'Ethereum',
  //     taskName: 'spork13-reverse',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'PROCESSING'
  //   },
  //   {
  //     blockchain: 'Flow',
  //     taskName: 'phantabear',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'PROCESSING'
  //   },
  //   {
  //     blockchain: 'BTC',
  //     taskName: 'BYC-task',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'FAILURE'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     taskName: 'spork13-reverse',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'PROCESSING'
  //   },
  //   {
  //     blockchain: 'Flow',
  //     taskName: 'phantabear',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'PROCESSING'
  //   },
  //   {
  //     blockchain: 'BTC',
  //     taskName: 'BYC-task',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'FAILURE'
  //   },
  //   {
  //     blockchain: 'Ethereum',
  //     taskName: 'spork13-reverse',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'PROCESSING'
  //   },
  //   {
  //     blockchain: 'Flow',
  //     taskName: 'phantabear',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'PROCESSING'
  //   },
  //   {
  //     blockchain: 'BTC',
  //     taskName: 'BYC-task',
  //     taskId: 998766719,
  //     createTime: 0,
  //     status: 'FAILURE'
  //   }
  // ];

  const [
    { loading: getAdaptServicesLoading, value: adaptServicesData },
    getAdaptServices
  ] = useAsyncFn(async () => {
    const response = await getTaskData();

    return response.tasks;
  });

  useEffect(() => {
    void getAdaptServices();
  }, [getAdaptServices]);

  return (
    <div className={cn(className)}>
      <div className="text-[24px] font-[600] capitalize text-[#2483FF] ">
        Adapter Services
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="userId"
            columns={columns}
            dataSource={adaptServicesData}
            loading={getAdaptServicesLoading}
            pagination={false}
          />
        </div>
      </Spin>
    </div>
  );
}

export default AdapterServices;
