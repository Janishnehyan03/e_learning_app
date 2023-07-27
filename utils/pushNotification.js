import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    console.log(authStatus);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFCMToken(); // Add 'await' here to ensure the token retrieval is complete before proceeding.
    }
  } catch (error) {
    console.log('Error requesting permission:', error);
  }
}

export async function getFCMToken() {
  try {
    const token = await AsyncStorage.getItem('fcmToken');
    if (!token) {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.log('FCM token retrieved and stored:', fcmToken);
      }
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
}
