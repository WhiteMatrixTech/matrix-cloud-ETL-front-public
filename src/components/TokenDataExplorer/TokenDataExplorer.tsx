/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SearchOutlined } from '@ant-design/icons';
import { Select, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { JSONTree } from 'react-json-tree';
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

interface MetadataType {
  name: string;
  image: string;
  description: string | null;
  attributes: string | null;
}

interface TokenDataColumnsType {
  address: string;
  tokenId: string;
  owner: string;
  metadata: MetadataType;
}

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

export function TokenDataExplorer(props: TokenDataExplorerProps) {
  const { className } = props;
  const [selectedChain, setSelectedChain] = useState<string>('ethereum');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchByTokenId, setSearchByTokenId] = useState<string>('');
  const [selectedSearch, setSelectedSearch] =
    useState<string>('Contract Address');

  const Columns: ColumnsType<TokenDataColumnsType> = [
    {
      title: 'ContractAddress',
      dataIndex: 'contractAddress',
      ellipsis: true,
      className: 'text-[#000000] font-[700] text-base',
      sorter: {
        compare: (a, b) => a.address.localeCompare(b.address),
        multiple: 2
      },
      render: (_, data) => {
        return <div>{data.address.split('-')[1]}</div>;
      }
    },
    {
      title: 'TokenId',
      dataIndex: 'tokenId',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[8%]',
      sorter: {
        compare: (a, b) => Number(a.tokenId) - Number(b.tokenId),
        multiple: 1
      }
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      ellipsis: true,
      className: 'text-[#000000d9] text-base'
    },
    {
      title: 'Name',
      dataIndex: 'tokenName',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        if (!data.metadata.name) {
          return <div>N/A</div>;
        }
        return <div>{data.metadata.name}</div>;
      }
    },
    {
      title: 'Image',
      dataIndex: 'image',
      ellipsis: true,
      className: 'text-[#000000d9] text-base',
      render: (_, data) => {
        if (!data.metadata.image || data.metadata.image.includes('ipfs')) {
          return <div>N/A</div>;
        }
        return (
          <div className="w-[120px]">
            <img src={data.metadata.image} />
          </div>
        );
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]',
      render: (_, data) => {
        if (!data.metadata.description) {
          return <div>N/A</div>;
        }
        return <div>{data.metadata.description}</div>;
      }
    },
    {
      title: 'Attributes',
      dataIndex: 'attributes',
      ellipsis: true,
      className: 'text-[#000000d9] text-base w-[20%]',
      render: (_, data) => {
        if (!data.metadata.attributes) {
          return <div>N/A</div>;
        }
        return (
          <JSONTree
            data={JSON.parse(data.metadata.attributes || '')}
            theme={{
              extend: theme
              // underline keys for literal values
              // valueLabel: {
              //   textDecoration: 'underline'
              // }
            }}
          />
        );
      }
    }
  ];

  const [
    { loading: getEthTokenDataLoading, value: ethTokenData },
    getEthTokenDataServices
  ] = useAsyncFn(async (address?: string, owner?: string, tokenId?: string) => {
    let response: { tokens: ethTokenDataRes[] };

    if (owner) {
      response = await getEthTokenDataByOwner(owner);
    } else if (tokenId) {
      response = await getEthTokenData({ address, tokenId });
    } else {
      response = await getEthTokenData({ address });
    }
    return response.tokens.sort((a, b) => a.address.localeCompare(b.address));
  });

  const [
    { loading: getFlowTokenDataLoading, value: flowTokenData },
    getFlowTokenDataServices
  ] = useAsyncFn(async (address?: string, owner?: string, tokenId?: string) => {
    let response: { tokens: ethTokenDataRes[] };
    if (owner) {
      response = await getFlowTokenDataByOwner(owner);
    } else if (tokenId) {
      response = await getFlowTokenData({ address, tokenId });
    } else {
      response = await getFlowTokenData({ address });
    }

    return response.tokens.sort((a, b) => a.address.localeCompare(b.address));
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
    if (selectedSearch === 'Owner') {
      void getEthTokenDataServices(undefined, searchValue);
      void getFlowTokenDataServices(undefined, searchValue);
      return;
    }
    if (selectedSearch === 'Contract Address' && searchByTokenId) {
      void getEthTokenDataServices(searchValue, undefined, searchByTokenId);
      void getFlowTokenDataServices(searchValue, undefined, searchByTokenId);
      return;
    }
    void getEthTokenDataServices(searchValue);
    void getFlowTokenDataServices(searchValue);
  }, [
    getEthTokenDataServices,
    getFlowTokenDataServices,
    selectedChain,
    searchValue,
    selectedSearch,
    searchByTokenId
  ]);

  return (
    <div className={cn(className, 'py-10')}>
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

      {selectedSearch === 'Contract Address' && searchValue && (
        <div className="mt-2 flex">
          <div className="h-[40px] w-[159px] text-center text-[20px] leading-[40px] ">
            TokenId:
          </div>

          <input
            value={searchByTokenId}
            placeholder={`Search by tokenId`}
            className="h-10 w-[400px] border-[1px] border-[#D9D9D9] p-2 outline-none"
            onChange={(e) => setSearchByTokenId(e.target.value)}
          />
          <div
            className="flex h-10 w-11 items-center justify-center bg-[#1890FF] text-[#FFFFFF]"
            style={{ boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)' }}
          >
            <SearchOutlined />
          </div>
        </div>
      )}

      <Spin spinning={status === 'loading'} tip="downloading">
        <div className={cn(className, 'pt-10 font-Roboto')}>
          <Table
            rowKey="tokenId"
            columns={Columns}
            dataSource={tableData}
            loading={getEthTokenDataLoading || getFlowTokenDataLoading}
          />
        </div>
      </Spin>
    </div>
  );
}
