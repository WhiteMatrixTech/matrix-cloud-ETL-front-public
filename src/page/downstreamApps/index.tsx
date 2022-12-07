import { Spin, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { getAppsData } from '@/service/services';

interface downstreamAppsProps {
  className?: string;
}

interface columnsType {
  blockchain: string;
  appName: string;
  handlers: string[];
}

function DownstreamApps(props: downstreamAppsProps) {
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
      title: 'App Name',
      dataIndex: 'appName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'EventHandlers',
      dataIndex: 'eventHandlers',
      className: 'text-[#000000d9] text-base w-[40%]',
      render: (_, data) => {
        const handlers = data.handlers;
        return (
          <div>
            {handlers.map((item, index) => (
              <div key={index} className="m-[5px] text-[#000000d9]">
                {item}
                {index >= handlers.length - 1 ? '' : ','}
              </div>
            ))}
          </div>
        );
      }
    }
  ];

  const [
    { loading: getDownstreamAppsLoading, value: downstreamAppsData },
    getDownstreamApps
  ] = useAsyncFn(async () => {
    const response = await getAppsData();

    return response.apps;
  });

  useEffect(() => {
    void getDownstreamApps();
  }, [getDownstreamApps]);

  return (
    <div className={cn(className)}>
      <div className="text-[24px] font-[600] capitalize text-[#2483FF] ">
        Downstream Apps
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10')}>
          <Table
            rowKey="userId"
            columns={columns}
            dataSource={downstreamAppsData}
            loading={getDownstreamAppsLoading}
            // pagination={false}
            onChange={handleChange}
          />
        </div>
      </Spin>
    </div>
  );
}

export default DownstreamApps;
