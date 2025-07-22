import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        setUser(usr);
      } else {
        const skip = await AsyncStorage.getItem('skip');
        if (skip === 'true') {
          setUser({ skip: true });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const skipLogin = async () => {
    await AsyncStorage.setItem('skip', 'true');
    setUser({ skip: true });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, skipLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
