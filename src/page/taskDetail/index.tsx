import { Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncFn, useSearchParam } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

import { getTaskLogData } from '@/service/services';

import styles from './index.module.less';

interface taskDetailProps {
  className?: string;
}

interface TaskDetailType {
  taskName: string;
  taskId: number;
  createTime: number;
  lastExecuteTime: number;
  status: string;
}

function TaskDetail(props: taskDetailProps) {
  const { className } = props;

  const taskName = useSearchParam('taskName');

  const Columns: ColumnsType<TaskDetailType> = [
    {
      title: 'TaskName',
      dataIndex: 'taskName',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base w-[25%] '
    },
    {
      title: 'TaskId',
      dataIndex: 'taskId',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[15%]'
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        return (
          <div className="">{dayjs(Number(data.createTime)).toISOString()}</div>
        );
      }
    },
    {
      title: 'LastExecuteTime',
      dataIndex: 'lastExecuteTime',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        return <div>{dayjs(Number(data.lastExecuteTime)).toISOString()}</div>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'w-[15%]',
      render: (_, data) => {
        return (
          <div
            className={cn(
              'flex items-center text-[14px] font-[600] capitalize',
              data.status === 'paused' ? 'text-[#FF7800]' : 'text-[#499F5F]'
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

  // const mockData = [
  //   {
  //     taskName: 'sync_blockchain_ethereum_mainnet',
  //     taskId: 998766719,
  //     createTime: '2022-11-07T02:18:57.000Z',
  //     lastExecuteTime: '2022-11-07T02:18:57.000Z',
  //     status: 'ACTIVE'
  //   }
  // ];

  const [
    { loading: getTaskLogDataLoading, value: taskLogData },
    getTaskLogDataServices
  ] = useAsyncFn(async (taskName: string) => {
    const response = await getTaskLogData(taskName);

    return response.tasks;
  });

  useEffect(() => {
    if (taskName) {
      void getTaskLogDataServices(taskName);
    }
  }, [getTaskLogDataServices, taskName]);

  return (
    <div className={cn(styles.taskDetail, className)}>
      <div className="text-[24px] font-[600] capitalize text-[#2483FF]">
        <Link to="/adapter-services">Data Adapter Jobs</Link>
        <span className="mx-4">{'>'}</span>
        <span className="text-[#ffffff]">Task Detail</span>
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10')}>
          <Table
            rowKey={(record) => `${record.taskId} - ${uuidv4()}`}
            columns={Columns}
            dataSource={taskLogData}
            loading={getTaskLogDataLoading}
          />
        </div>
      </Spin>
    </div>
  );
}

export default TaskDetail;
