import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRouters } from './src/navigators';
import { AuthProvider } from './src/configs/AuthContext';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AuthProvider>
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

