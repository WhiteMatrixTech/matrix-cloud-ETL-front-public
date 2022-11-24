/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SearchOutlined } from '@ant-design/icons';
import { Select, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useAsyncFn } from 'react-use';

import {
  ethTokenDataRes,
  getEthTokenData,
  getEthTokenDataByOwner,
  getFlowTokenData,
  getFlowTokenDataByOwner
} from '@/service/services';

interface TokenDataExplorerProps {
  className?: string;
}

interface TokenDataColumnsType {
  contractAddress: string;
  tokenId: string;
  owner: string;
  name: string;
  image: string;
  description: string;
  attributes: string;
}

interface TokenMetadataRaw {
  [key: string]: any;
}

export function TokenDataExplorer(props: TokenDataExplorerProps) {
  const { className } = props;
  const [selectedChain, setSelectedChain] = useState<string>('ethereum');
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedSearch, setSelectedSearch] =
    useState<string>('Contract Address');

  const Columns: ColumnsType<TokenDataColumnsType> = [
    {
      title: 'Contract Address',
      dataIndex: 'contractAddress',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base'
    },
    {
      title: 'TokenId',
      dataIndex: 'tokenId',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[8%]'
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
      className: 'text-[#000000d9] text-base w-[20%]'
    },
    {
      title: 'Attributes',
      dataIndex: 'attributes',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]'
    }
  ];

  const [
    { loading: getEthTokenDataLoading, value: ethTokenData },
    getEthTokenDataServices
  ] = useAsyncFn(async (address?: string, owner?: string) => {
    let response: { tokens: ethTokenDataRes[] };
    if (owner) {
      response = await getEthTokenDataByOwner(owner);
    } else {
      response = await getEthTokenData({ address });
    }

    const data: TokenDataColumnsType[] = [];

    response.tokens.forEach((item) => {
      const tokenMetadataRaw = JSON.parse(
        item.tokenMetadataRaw
      ) as TokenMetadataRaw;

      data.push({
        contractAddress: item.address,
        tokenId: item.tokenId,
        owner: item.owner,
        name: tokenMetadataRaw.name || 'null',
        image: tokenMetadataRaw.image || 'null',
        description: tokenMetadataRaw.description || 'null',
        attributes: JSON.stringify(tokenMetadataRaw.attributes) || 'null'
      });
    });

    return data;
  });

  const [
    { loading: getFlowTokenDataLoading, value: flowTokenData },
    getFlowTokenDataServices
  ] = useAsyncFn(async (address?: string, owner?: string) => {
    // const response = await getFlowTokenData({});
    let response: { tokens: ethTokenDataRes[] };
    if (owner) {
      response = await getFlowTokenDataByOwner(owner);
    } else {
      response = await getFlowTokenData({ address });
    }

    const data: TokenDataColumnsType[] = [];

    response.tokens.forEach((item) => {
      const tokenMetadataRaw = JSON.parse(
        item.tokenMetadataRaw
      ) as TokenMetadataRaw;

      data.push({
        contractAddress: item.address,
        tokenId: item.tokenId,
        owner: item.owner,
        name: tokenMetadataRaw.name || 'null',
        image: tokenMetadataRaw.image || 'null',
        description: tokenMetadataRaw.description || 'null',
        attributes: JSON.stringify(tokenMetadataRaw.attributes) || 'null'
      });
    });

    return data;
  });

  const tableData = useMemo(() => {
    if (selectedChain === 'flow') {
      return flowTokenData;
    }

    return ethTokenData;
  }, [ethTokenData, flowTokenData, selectedChain]);

  useEffect(() => {
    if (!searchValue) {
      void getEthTokenDataServices();
      void getFlowTokenDataServices();
      return;
    }
    if (selectedSearch === 'Contract Address') {
      void getEthTokenDataServices(searchValue);
      void getFlowTokenDataServices(searchValue);
      return;
    }
    if (selectedSearch === 'Owner') {
      void getEthTokenDataServices(undefined, searchValue);
      void getFlowTokenDataServices(undefined, searchValue);
    }
  }, [
    getEthTokenDataServices,
    getFlowTokenDataServices,
    selectedChain,
    searchValue,
    selectedSearch
  ]);

  return (
    <div className={cn(className, 'p-10')}>
      <div className="flex items-center">
        <Select
          value={selectedSearch}
          defaultValue="contractAddress"
          style={{ width: '159px' }}
          options={[
            {
              value: 'Contract Address',
              label: 'Contract Address'
            },
            {
              value: 'Owner',
              label: 'Owner'
            }
          ]}
          onChange={(value: string) => setSelectedSearch(value)}
        />
        <input
          value={searchValue}
          placeholder={`Search by ${selectedSearch}`}
          className="h-10 w-[400px] border-[1px] border-[#D9D9D9] p-2 outline-none"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div
          className="flex h-10 w-11 items-center justify-center bg-[#1890FF] text-[#FFFFFF]"
          style={{ boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)' }}
        >
          <SearchOutlined />
        </div>
        <div className="ml-10 text-[20px] text-[#2483FF]">Blockchain</div>
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
          onChange={(value: string) => setSelectedChain(value)}
        />
      </div>

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="userId"
            columns={Columns}
            dataSource={tableData}
            loading={getEthTokenDataLoading || getFlowTokenDataLoading}
          />
        </div>
      </Spin>
    </div>
  );
}
