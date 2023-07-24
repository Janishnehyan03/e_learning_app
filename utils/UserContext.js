import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in on app start
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      // You can perform additional checks here if needed (e.g., token expiration)
      setUser(authToken ? {token: authToken} : null);
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, logout,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};
