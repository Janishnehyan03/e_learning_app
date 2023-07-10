import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './screens/HomeScreen';
import HeaderBtn from './components/HeaderBtn';
import {Image} from 'react-native';
import UserIcon from './assets/images/user.png';
import CourseDetails from './screens/CourseDetails';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OtpScreen from './screens/OtpScreen';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {backgroundColor: '#ffffff'},
            headerShadowVisible: false,
            headerTitle: () => (
              <Image
                source={{
                  uri: 'https://seeklogo.com/images/U/udemy-wordmark-logo-5BA74BCA61-seeklogo.com.png',
                }}
                style={{width: 120, height: 40}}
                resizeMode="contain"
              />
            ),
            headerRight: () => <HeaderBtn iconUrl={UserIcon} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={CourseDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
