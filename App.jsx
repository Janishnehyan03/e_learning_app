import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Header from './components/Header';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';
import CourseDetails from './screens/CourseDetails';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import {AuthProvider} from './utils/UserContext';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // options={{
            //   headerStyle: {backgroundColor: '#ffffff'},
            //   headerShadowVisible: false,
            //   headerTitle: () => (
            //     <Image
            //       source={Logo}
            //       style={{width: 120, height: 40}}
            //       resizeMode="contain"
            //     />
            //   ),
            //   headerRight: () => <HeaderBtn />,
            // }}
            options={{
              header: props => <Header {...props} />,
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
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Learn"
            component={LearnScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </AuthProvider>
      <NetworkStatusIndicator />
    </NavigationContainer>
  );
}

export default App;
