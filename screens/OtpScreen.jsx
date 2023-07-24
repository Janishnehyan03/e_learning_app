import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Axios from '../utils/Axios';

export default function OtpScreen({route, navigation}) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {email} = route.params;
  const [remainingTime, setRemainingTime] = useState(10 * 60); // 10 minutes in seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formatTime = time => {
    return time < 10 ? `0${time}` : time;
  };
  const handleOtp = async () => {
    setIsLoading(true);

    try {
      const response = await Axios.post('/auth/verify-token', {
        otpToken: otp,
        email: email,
      });

      if (response.status === 200) {
        const authToken = response.data.token;
        const username = response.data.user.name;
        const userId = response.data.user.id;
        const email = response.data.user.email;

        // Save data to shared preferences or AsyncStorage
        // Example using AsyncStorage:
        await AsyncStorage.setItem('authToken', authToken);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('email', email);

        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Try Again', "Something Went Wrong", [{ text: 'OK' }]);
      console.log(error.response);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F4F4F4'}}>
      <View style={{marginTop: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>
          Type Your OTP here
        </Text>
      </View>
      <View style={{marginTop: 40, paddingHorizontal: 25}}>
        <View style={{backgroundColor: 'white', borderRadius: 10}}>
          <TextInput
            style={{padding: 10}}
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
      </View>
      <View style={{marginTop: 10, paddingHorizontal: 25}}>
        <TouchableOpacity
          style={{backgroundColor: '#0F6897', borderRadius: 15, padding: 20}}
          onPress={handleOtp}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={{textAlign: 'center', marginVertical: 5}}>
        OTP will expire in {formatTime(minutes)}:{formatTime(seconds)} minutes
      </Text>
      {remainingTime <= 0 && (
        <TouchableOpacity onPress={() => console.log('Resend OTP')}>
          <Text>Resend OTP</Text>
        </TouchableOpacity>
      )}
      <View style={{marginTop: 40, alignItems: 'center'}}>
        <Text>We have sent an OTP to your email</Text>
        <Text style={{color: 'lightblue'}}>{email}</Text>
      </View>
    </View>
  );
}
