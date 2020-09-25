import React from 'react';
import useAuth from './UseAuth';
import { AuthProps, authInit } from './AuthProviderTypes';

export const AuthContext = React.createContext<AuthProps>(authInit);

interface AuthProviderProps {

}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { auth } = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
