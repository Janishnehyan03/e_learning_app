import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import OtpScreen from './OtpScreen';
import Axios from '../utils/Axios';

const registerUser = async (
  email,
  password,
  name,
  confirmPassword,
  navigation,
) => {
  if (name === '') {
    throw 'Please enter your name';
  }
  if (confirmPassword !== password) {
    throw 'Passwords do not match';
  }
  if (confirmPassword === '') {
    throw 'Please enter your confirm password';
  }
  if (email === '') {
    throw 'Please enter your email';
  }
  if (password === '') {
    throw 'Please enter your password';
  }

  try {
    const response = await Axios.post('/auth/signup', {
      email: email,
      name: name,
      password: password,
    });

    if (response.status === 201) {
      const data = await response.json();
      const userEmail = data.user.email;

      navigation.navigate('OtpScreen', {email: userEmail});
    } else {
      const errorData = await response.json();
      const error = errorData.message;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

// Example usage:
// registerUser('email@example.com', 'password123', 'John Doe', 'password123', navigation);

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = () => {
    try {
      registerUser(email, password, name, confirmPassword, navigation);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
