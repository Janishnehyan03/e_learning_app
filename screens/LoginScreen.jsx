import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Logo from '../assets/images/logo.png';

import Axios from '../utils/Axios';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password');
    } else {
      try {
        setIsLoading(true);
        const response = await Axios.post(`/auth/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          setIsLoading(false);
          setEmail('');
          setPassword('');
          setError('');
          Alert.alert('Authentication Success', 'Login Completed', [
            {text: 'OK'},
          ]);
          const token = response.data.token;
          const username = response.data.user.name;
          const userId = response.data.user.id;

          await AsyncStorage.setItem('authToken', token);
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('userExists', 'true');
          navigation.navigate('Home');
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={Logo}
            style={{width: 100, height: 60}}
            resizeMode="contain"
          />
          <Text style={styles.title}>Login to your account</Text>
          <Text style={styles.error}>{error}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    // fontWeight: 'bold',
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  error: {
    color: '#b12828',
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  input: {
    height: 40,
  },
  button: {
    backgroundColor: '#4B26A0',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: 'blue',
  },
});

export default LoginScreen;
