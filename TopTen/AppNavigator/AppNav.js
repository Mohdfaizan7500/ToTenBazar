import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { BackIcon } from '../../src/SVGicons/icon'
import { ms, s } from 'react-native-size-matters'
import BRAND from '../../src/constant/color';
import Splash from '../Splash';
import Login from '../AuthScreen/Login';
import SignUp from '../AuthScreen/SignUp';
import OTPScreen from '../AuthScreen/OTPScreen';
import CustomerMain from '../CustomerApp/CustomerMain';
import PersonalDetails from '../CustomerApp/ProfileScreens/PersonalDetails'
import Address from '../CustomerApp/ProfileScreens/Address';
import MyOrder from '../CustomerApp/ProfileScreens/MyOrder';
import HelpCenter from '../CustomerApp/ProfileScreens/HelpCenter';
import EditAdrees from '../CustomerApp/ProfileScreens/EditAdrees';
import CategoriesCatlog from '../CustomerApp/CategoriesScreens/CategoriesCatlog';
import CustomerAppNav from '../CustomerApp/CustomerAppNav';
import OnBoardingScreen from '../AuthScreen/OnBoardingScreen';
import PartnerAppNav from '../DeliveryPartnerAp/PartnerAppNav';

const AppNav = () => {

    const Stack = createStackNavigator()


    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='PartnerAppNav'>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='OTPScreen' component={OTPScreen} />
            <Stack.Screen name='CustomerAppNav' component={CustomerAppNav} options={{ headerShown: false }} />
            <Stack.Screen name='PartnerAppNav' component={PartnerAppNav} options={{ headerShown: false }} />




        </Stack.Navigator>
    )
}

export default AppNav

const styles = StyleSheet.create({

})