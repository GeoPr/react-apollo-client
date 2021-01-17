import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type ID = number | string;

interface IPost {
  id: ID;
  title: string;
  content: string;
}

export interface IUser {
  id: ID;
  username: string;
  age: number;
  posts: IPost[];
}

interface IContextProps {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const Context = createContext({} as IContextProps);

export const StateProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const value: IContextProps = { users, setUsers };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextValue = () => useContext(Context);
