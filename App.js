/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';
import MyNavigator from './Navigation/MyNavigator'

LogBox.ignoreAllLogs()
const App = () => {


  return (
    <MyNavigator />

  )
  };
export default App;
