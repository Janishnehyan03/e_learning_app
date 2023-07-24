import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Axios from '../utils/Axios';
import Logo from '../assets/images/logo.png';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === '' ||
      name.trim() === ''
    ) {
      setError('Please enter all fields');
    } else {
      try {
        setIsLoading(true);
        const response = await Axios.post(`/auth/signup`, {
          email,
          password,
          name,
          confirmPassword,
        });
        if (response.data) {
          setIsLoading(false);
          setEmail('');
          setPassword('');
          setError('');
          setConfirmPassword('');
          setName('');

          navigation.navigate('OtpScreen', {email});
        }
      } catch (error) {
        console.log(error.response.data);
        setIsLoading(false);
        if (error.response) {
          const errorMessage = error.response.data.message;
          Alert.alert('Authentication Failed', errorMessage, [{text: 'OK'}]);
        } else if (error.request) {
          Alert.alert('Authentication Failed', 'No response from server', [
            {text: 'OK'},
          ]);
        } else {
          Alert.alert('Authentication Failed', 'Error during login', [
            {text: 'OK'},
          ]);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={Logo}
          style={{width: 100, height: 60}}
          resizeMode="contain"
        />
        <Text style={styles.title}>create your account</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#333"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#333"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#333"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#333"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {isLoading ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#341154',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 30,
          }}>
          <Text style={{textAlign: 'center', color: '#fff'}}>
            Processing...
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#341154',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 30,
          }}
          onPress={handleRegister}>
          <Text style={{textAlign: 'center', color: '#fff'}}>Register</Text>
        </TouchableOpacity>
      )}
      <View style={styles.registerContainer}>
        <Text style={{color: '#333'}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 17,
    marginBottom: 40,
    textTransform: 'uppercase',
    color: '#333',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
    color: '#333',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  registerText: {
    color: 'blue',
  },
});
