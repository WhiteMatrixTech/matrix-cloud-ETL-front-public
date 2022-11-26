import { Line } from '@ant-design/plots';
import cn from 'classnames';
import React from 'react';
import CountUp from 'react-countup';

interface AnalyticsProps {
  className?: string;
}

export function Analytics(props: AnalyticsProps) {
  const { className } = props;

  const config = {
    data: [
      {
        Date: '2022-10-19',
        scales: 200
      },
      {
        Date: '2022-10-25',
        scales: 1000
      },
      {
        Date: '2022-10-31',
        scales: 500
      },
      {
        Date: '2022-11-6',
        scales: 2000
      },
      {
        Date: '2022-11-17',
        scales: 500
      }
    ],
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5
    }
  };

  const analyticsList = [
    {
      title: 'Total Transactions',
      content: 3234
    },
    {
      title: 'Supported Blockchain',
      content: 3
    },
    {
      title: 'Transactions In The Past 24 Hours',
      content: 11
    },
    {
      title: 'Total Token Number',
      content: 123234
    }
  ];

  return (
    <div className={cn(className, 'py-10')}>
      <div className="flex w-[80%] flex-wrap">
        {analyticsList.map((item, index) => (
          <div key={index} className="mt-10 w-[50%]">
            <div className="text-[20px] text-[#A0A0A0]">{item.title}</div>
            <CountUp
              end={item.content}
              duration={2}
              className="text-[32px] text-[#2483FF]"
            />
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div className="text-[20px] text-[#A0A0A0]">Transactions Amount</div>
        <Line {...config} className="mt-10" />
      </div>
    </div>
  );
}
