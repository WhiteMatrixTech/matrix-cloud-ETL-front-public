/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Select, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { getEthTokenData, getFlowTokenData } from '@/service/services';

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
      owner: 'mainnet_ethereum-0xC',
      name: 'Theirsverse #0',
      image: 'https://dl9da…',
      description: 'Theirsverse has created a bra……',
      attributes: '{“traits name”}'
    },
    {
      contractAddress: '0x97d4b4……64da',
      tokenId: '0',
      owner: 'mainnet_ethereum-0xC',
      name: 'Theirsverse #0',
      image: 'https://dl9da…',
      description: 'Theirsverse has created a bra……',
      attributes: '{“traits name”}'
    },
    {
      contractAddress: '0x97d4b4……64da',
      tokenId: '0',
      owner: 'mainnet_ethereum-0xC',
      name: 'Theirsverse #0',
      image: 'https://dl9da…',
      description: 'Theirsverse has created a bra……',
      attributes: '{“traits name”}'
    }
  ];

  const [
    { loading: getEthTokenDataLoading, value: ethTokenData },
    getEthTokenDataServices
  ] = useAsyncFn(async () => {
    const response = await getEthTokenData({});

    if (response) {
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
    }

    // return response.tokens;
  });

  const [
    { loading: getFlowTokenDataLoading, value: flowTokenData },
    getFlowTokenDataServices
  ] = useAsyncFn(async () => {
    const response = await getFlowTokenData({});

    if (response) {
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
    }

    // return response.tokens;
  });

  const tableData = useMemo(() => {
    if (selectedChain === 'flow') {
      return flowTokenData;
    }

    return ethTokenData;
  }, [ethTokenData, flowTokenData, selectedChain]);

  useEffect(() => {
    void getEthTokenDataServices();
    void getFlowTokenDataServices();
  }, [getEthTokenDataServices, getFlowTokenDataServices, selectedChain]);

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
          onChange={(value: string) => setSelectedChain(value)}
        />

        {/* <div className="ml-14 text-[20px] text-[#2483FF]">App</div>
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
        /> */}
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
