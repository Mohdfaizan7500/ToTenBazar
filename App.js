import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNav from './TopTen/AppNavigator/AppNav'
import { NavigationContainer } from '@react-navigation/native'
import {ReduxProvider} from './TopTen/ReduxProvider/ReduxProvider';

const App = () => {
  return (
    // <View>
    //   <Text>App</Text>
    // </View>
    <ReduxProvider>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </ReduxProvider>
  )
}

export default App

const styles = StyleSheet.create({})