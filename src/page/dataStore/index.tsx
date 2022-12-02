import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSearchParam } from 'react-use';

import { Analytics } from '@/components/Analytics';
import { BlockchainExplorer } from '@/components/BlockchainExplorer';
import { TokenDataExplorer } from '@/components/TokenDataExplorer';

interface dataStoreProps {
  className?: string;
}

function DataStore(props: dataStoreProps) {
  const { className } = props;

  const [dataStoreTab, setDataStoreTab] = useState<
    'Analytics' | 'Blockchain' | 'TokenData'
  >('TokenData');
  const params = useSearchParam('params');

  useEffect(() => {
    if (params === 'blockchain') {
      setDataStoreTab('Blockchain');
    }
  }, [params]);

  return (
    <div className={cn(className, 'mt-6')}>
      <div className="font-Sans text-[24px] font-[500] capitalize text-[#A0A0A0]">
        <span
          className={cn(
            ' cursor-pointer',
            dataStoreTab === 'TokenData' && 'text-[#2483FF]'
          )}
          onClick={() => setDataStoreTab('TokenData')}
        >
          NFT Data
        </span>

        <span
          className={cn(
            'ml-12 cursor-pointer',
            dataStoreTab === 'Blockchain' && 'text-[#2483FF]'
          )}
          onClick={() => setDataStoreTab('Blockchain')}
        >
          Blockchain Data
        </span>

        {/* <span
          className={cn(
            'ml-12 cursor-pointer',
            dataStoreTab === 'Analytics' && 'text-[#2483FF]'
          )}
          onClick={() => setDataStoreTab('Analytics')}
        >
          Analytics
        </span> */}
      </div>

      {dataStoreTab === 'Analytics' && <Analytics />}
      {dataStoreTab === 'Blockchain' && <BlockchainExplorer />}
      {dataStoreTab === 'TokenData' && <TokenDataExplorer />}
    </div>
  );
}

export default DataStore;
