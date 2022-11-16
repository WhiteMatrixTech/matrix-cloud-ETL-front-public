import React, { FC } from 'react';

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

export const ContextProvider: FC = (props) => {
  const id = '10';
  const name = 'zhangsan';
  const number = 2;
  const toggleTheme = () => {
    return `${id}${name}`;
  };
  return (
    <ContextInfo.Provider value={{ id, name, number, toggleTheme }}>
      {props.children}
    </ContextInfo.Provider>
  );
};
