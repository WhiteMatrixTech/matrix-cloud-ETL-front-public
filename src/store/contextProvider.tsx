import React, { FC, ReactNode } from 'react';

interface IContextInfo {
  id: string;
  name: string;
  number: number;
  toggleTheme: () => void;
}

export const ContextInfo = React.createContext<IContextInfo>({
  id: '',
  name: '',
  number: 0,
  toggleTheme: () => {
    console.log();
  }
});

interface ProvidersProps {
  children: ReactNode;
}

export const ContextProvider: FC<ProvidersProps> = ({ children }) => {
  const id = '10';
  const name = 'zhangsan';
  const number = 2;
  const toggleTheme = () => {
    return `${id}${name}`;
  };
  return (
    <ContextInfo.Provider value={{ id, name, number, toggleTheme }}>
      {children}
    </ContextInfo.Provider>
  );
};
