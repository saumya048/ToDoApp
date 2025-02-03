import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';

import SplashScreen from "../Splash";
import HomeScreen from "../HomeScreen";
import NotificationScreen from "../NotificationScreen";

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useRef(null);

  useEffect(() => {
    
    async function requestPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert('Permission Denied', 'Enable notifications in settings.');
      }
    }
    requestPermission();

    
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        navigationRef.current?.navigate('Notification', { message: remoteMessage.data.message });
      }
    });


    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigationRef.current?.navigate('Notification', { message: remoteMessage.data.message });
        }
      });

    return () => {
      unsubscribeOnNotificationOpened(); 
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
