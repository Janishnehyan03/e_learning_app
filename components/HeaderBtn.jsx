import React, {useContext, useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserAuthContext} from '../utils/UserContext';
import LoginIcon from '../assets/images/login.png';
import UserIcon from '../assets/images/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderBtn = () => {
  const {loggedIn, setLoggedIn} = useContext(UserAuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    async function getUser() {
      if (await AsyncStorage.getItem('userExists')) {
        setLoggedIn(true);
      }
    }
    getUser()
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        if (loggedIn) {
          navigation.navigate('Profile');
        } else {
          navigation.navigate('Login');
        }
      }}>
      <Image
        source={loggedIn ? UserIcon : LoginIcon}
        resizeMode="cover"
        style={{
          width: 30,
          height: 30,
        }}
      />
    </TouchableOpacity>
  );
};

export default HeaderBtn;
