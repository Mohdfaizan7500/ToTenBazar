import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNav from './TopTen/AppNavigator/AppNav'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    // <View>
    //   <Text>App</Text>
    // </View>
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})