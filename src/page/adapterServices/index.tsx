import { Spin } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
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
        { text: 'Ethereum', value: 'ethereum' }
      ],
      filteredValue: filteredInfo.blockchain || null,
      onFilter: (value, record) => {
        return record.blockchain === value;
      },
      className: 'text-[#000000] font-[700] text-base capitalize'
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[40%]'
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
          <div className="">
            {dayjs(data.createTime).format('YYYY-MM-DD hh:mm:ss')}
          </div>
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
        Adapter Tasks
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="userId"
            columns={columns}
            dataSource={adaptServicesData}
            loading={getAdaptServicesLoading}
            // pagination={false}
            onChange={handleChange}
          />
        </div>
      </Spin>
    </div>
  );
}

export default AdapterServices;
