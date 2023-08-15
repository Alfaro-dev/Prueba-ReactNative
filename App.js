import 'react-native-gesture-handler';

import React from 'react';


import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import MyNavigation from './Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <MyNavigation />
    </SafeAreaProvider>
  );
}
