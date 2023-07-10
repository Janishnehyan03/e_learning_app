import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://dhcourse-server.vercel.app/api/v1/auth';

const loginUser = async (email, password) => {
  if (email.trim() === '') {
    throw 'Please enter your email';
  }
  if (password.trim() === '') {
    throw 'Please enter your password';
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      const username = responseData.user.name;
      const userId = responseData.user.id;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('userExists', 'true');

      return token;
    } else {
      const errorMessage = (await response.json()).message;
      throw errorMessage;
    }
  } catch (error) {
    throw error.toString();
  }
};

const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      await AsyncStorage.clear();
    } else {
      const errorMessage = (await response.json()).message;
      throw errorMessage;
    }
  } catch (error) {
    throw error.toString();
  }
};

export { loginUser, logout };
