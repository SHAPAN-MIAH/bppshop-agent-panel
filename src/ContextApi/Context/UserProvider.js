import React from 'react';
import { createContext } from 'react';
import User from './../Hooks/User';

export const userContext = createContext()

const UserProvider = ({children}) => {
  const allContext = User()
  return (
    <userContext.Provider value={allContext}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;