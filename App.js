import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { AppRouters } from './src/navigators';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>
    </>
  );
}

