import { Spin } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

import dateIcon from '@/assets/images/dateIcon.svg';
import { getTaskData } from '@/service/services';

interface adapterServicesProps {
  className?: string;
}

interface columnsType {
  blockchain: string;
  taskName: string;
  createTime: number;
  status: string;
  taskType: string;
  blockNumber: number;
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
        { text: 'Ethereum', value: 'ethereum' },
        { text: 'Polygon', value: 'polygon' },
        { text: 'BSC', value: 'bsc' }
      ],
      filteredValue: filteredInfo.blockchain || null,
      onFilter: (value, record) => {
        return record.blockchain === value;
      },
      sorter: {
        compare: (a, b) => a.blockchain.length - b.blockchain.length,
        multiple: 1
      },
      className: 'text-[#000000] font-[600] text-[14px] text-base capitalize',
      render: (_, data) => {
        if (data.blockchain === 'bsc') {
          return <div>BNB Chain</div>;
        } else {
          return <div>{data.blockchain}</div>;
        }
      }
    },
    {
      title: 'TaskName',
      dataIndex: 'taskName',
      ellipsis: true,
      className: 'text-[#000000d9] font-[400] text-base w-[30%]',
      render: (_, data) => {
        return (
          <Link
            className="text-[#59A8D4] underline underline-offset-4 hover:underline "
            to={`/adapter-services/taskDetail?taskName=${data.taskName}`}
          >
            {data.taskName}
          </Link>
        );
      }
    },
    {
      title: 'TaskType',
      dataIndex: 'taskType',
      ellipsis: true,
      className: 'text-[#000000d9] font-[400] text-base'
    },
    {
      title: 'BlockNumber',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000d9] font-[400] text-base',
      render: (_, data) => {
        return <div>{data.blockNumber || 'N/A'}</div>;
      }
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      ellipsis: true,
      className: 'text-[#FFFFFFE5] font-[400] text-base w-[20%]',
      render: (_, data) => {
        return (
          <div className="flex items-center">
            <img className="mr-2" src={dateIcon} />
            {dayjs(Number(data.createTime)).toISOString()}
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
              'flex items-center text-[18px] font-[600] uppercase',
              data.status === 'paused' ? 'text-[#FF7800]' : 'text-[#4AA785]'
            )}
          >
            <div
              className={cn(
                'mr-2 h-[6px] w-[6px] rounded-[50%]',
                data.status === 'paused' ? 'bg-[#FF7800]' : 'bg-[#499F5F]'
              )}
            />
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

    return response.tasks.sort(
      (a, b) => b.blockchain.length - a.blockchain.length
    );
  });

  useEffect(() => {
    void getAdaptServices();
  }, [getAdaptServices]);

  return (
    <div className={cn(className)}>
      <div className="text-[24px] font-[600] capitalize text-[#FFFFFF] ">
        Data Adapter Jobs
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-4')}>
          <Table
            rowKey={(record) => `${record.blockNumber} - ${uuidv4()}`}
            columns={columns}
            dataSource={adaptServicesData}
            loading={getAdaptServicesLoading}
            onChange={handleChange}
            pagination={false}
          />
        </div>
      </Spin>
    </div>
  );
}

export default AdapterServices;
