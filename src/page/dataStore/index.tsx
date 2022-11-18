import cn from 'classnames';
import React from 'react';

interface dataStoreProps {
  className?: string;
}

function DataStore(props: dataStoreProps) {
  const { className } = props;

  return <div className={cn(className)}>dataStore</div>;
}

export default DataStore;
