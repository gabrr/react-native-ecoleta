import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Routes/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
