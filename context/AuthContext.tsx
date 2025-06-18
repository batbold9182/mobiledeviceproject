import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  signIn: () => {},
  signOut: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) setToken(savedToken);
      setLoading(false);
    };
    restore();
  }, []);

  const signIn = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setToken(token);
  };
  

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
