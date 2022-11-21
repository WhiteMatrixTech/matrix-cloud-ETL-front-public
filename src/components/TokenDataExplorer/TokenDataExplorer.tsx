import { Select, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React from 'react';

interface TokenDataExplorerProps {
  className?: string;
}

interface TokenDataColumnsType {
  contractAddress: string;
  tokenId: string;
  blockNumber: string;
  owner: string;
  name: string;
  image: string;
  description: string;
  attributes: string;
}

export function TokenDataExplorer(props: TokenDataExplorerProps) {
  const { className } = props;

  const Columns: ColumnsType<TokenDataColumnsType> = [
    {
      title: 'Contract Address',
      dataIndex: 'contractAddress',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base capitalize'
    },
    {
      title: 'TokenId',
      dataIndex: 'tokenId',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'BlockNumber',
      dataIndex: 'blockNumber',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Attributes',
      dataIndex: 'attributes',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    }
  ];

  const mockData = [
    {
      contractAddress: '0x97d4b4……64da',
      tokenId: '0',
      blockNumber: '12714233',
      owner: 'mainnet_ethereum-0xC',
      name: 'Theirsverse #0',
      image: 'https://dl9da…',
      description: 'Theirsverse has created a bra……',
      attributes: '{“traits name”}'
    },
    {
      contractAddress: '0x97d4b4……64da',
      tokenId: '0',
      blockNumber: '12714233',
      owner: 'mainnet_ethereum-0xC',
      name: 'Theirsverse #0',
      image: 'https://dl9da…',
      description: 'Theirsverse has created a bra……',
      attributes: '{“traits name”}'
    },
    {
      contractAddress: '0x97d4b4……64da',
      tokenId: '0',
      blockNumber: '12714233',
      owner: 'mainnet_ethereum-0xC',
      name: 'Theirsverse #0',
      image: 'https://dl9da…',
      description: 'Theirsverse has created a bra……',
      attributes: '{“traits name”}'
    }
  ];

  return (
    <div className={cn(className, 'p-10')}>
      <div className="flex items-center">
        <div className="text-[20px] text-[#2483FF]">Blockchain</div>
        <Select
          defaultValue="ethereum"
          style={{ width: '210px', marginLeft: '30px' }}
          options={[
            {
              value: 'ethereum',
              label: 'Ethereum'
            },
            {
              value: 'flow',
              label: 'Flow'
            }
          ]}
        />

        <div className="ml-14 text-[20px] text-[#2483FF]">App</div>
        <Select
          defaultValue="theirsverse"
          style={{ width: '210px', marginLeft: '30px' }}
          options={[
            {
              value: 'theirsverse',
              label: 'Theirsverse'
            },
            {
              value: 'Phanta bear',
              label: 'Phanta bear'
            },
            {
              value: 'matrix world',
              label: 'matrix world'
            }
          ]}
        />
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="userId"
            columns={Columns}
            dataSource={mockData}
            // loading={getAdaptServicesLoading}
            // pagination={false}
            // onChange={handleChange}
          />
        </div>
      </Spin>
    </div>
  );
}
