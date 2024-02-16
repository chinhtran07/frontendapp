import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SplashScreen } from './src/screens';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SplashScreen />
    </>
  );
}

