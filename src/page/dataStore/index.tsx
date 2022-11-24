import cn from 'classnames';
import React, { useState } from 'react';

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
          Token Data Explorer
        </span>

        <span
          className={cn(
            'ml-12 cursor-pointer',
            dataStoreTab === 'Blockchain' && 'text-[#2483FF]'
          )}
          onClick={() => setDataStoreTab('Blockchain')}
        >
          Blockchain Explorer
        </span>

        <span
          className={cn(
            'ml-12 cursor-pointer',
            dataStoreTab === 'Analytics' && 'text-[#2483FF]'
          )}
          onClick={() => setDataStoreTab('Analytics')}
        >
          Analytics
        </span>
      </div>

      {dataStoreTab === 'Analytics' && <Analytics />}
      {dataStoreTab === 'Blockchain' && <BlockchainExplorer />}
      {dataStoreTab === 'TokenData' && <TokenDataExplorer />}
    </div>
  );
}

export default DataStore;
