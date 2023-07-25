import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Header from './components/Header';
import OnboardingScreen from './components/Onboarding';
import AboutScreen from './screens/AboutScreen';
import CourseDetails from './screens/CourseDetails';
import CreatorScreen from './screens/CreatorScreen';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import { AuthProvider } from './utils/UserContext';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    // Check if the onboarding has already been completed
    const checkOnboardingCompleted = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          '@onboarding_completed',
        );
        setIsOnboardingCompleted(onboardingCompleted === 'true');
        setIsLoading(false);
      } catch (error) {
        // Error handling if AsyncStorage fails
        console.error('Error checking onboarding completion:', error);
      }
    };
    checkOnboardingCompleted();
  }, []);
  if (isLoading) {
    // You can show a loading screen while checking the onboarding status
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          headerMode="none"
          initialRouteName={isOnboardingCompleted ? 'Home' : 'Onboarding'}>
          <Stack.Screen
            name="Onboarding"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
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
          <Stack.Screen
            name="CreatorScreen"
            component={CreatorScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
