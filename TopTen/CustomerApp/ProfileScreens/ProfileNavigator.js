import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../BottomTabs/Profile'
import { ms, s } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'
import { BackIcon } from '../../../src/SVGicons/icon'
import Address from '../ProfileScreens/Address';
import MyOrder from '../ProfileScreens/MyOrder';
import HelpCenter from '../ProfileScreens/HelpCenter';
import PersonalDetails from '../ProfileScreens/PersonalDetails'

const Stack = createStackNavigator()

// Common header options to avoid code duplication
const getHeaderOptions = (navigation, title, showBackButton = true) => ({
    headerTitle: title,
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontSize: ms(22),
        fontWeight: '800',
        color: BRAND.dark,
    },
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: BRAND.white,
    },
    headerLeft: showBackButton ? () => (
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <BackIcon width={ms(16)} height={ms(16)} />
        </TouchableOpacity>
    ) : undefined,
    headerLeftContainerStyle: {
        paddingLeft: s(15),
    },
    headerRightContainerStyle: {
        paddingRight: s(20),
    },
})

const hideTabBar = (route)=>{
    console.log(route)

}

const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ProfileMain'
                component={Profile}
                options={({ navigation }) => ({
                    ...getHeaderOptions(navigation, 'Profile', false),
                    headerShown: true, // Show header for main Profile screen
                })}
            />
            <Stack.Screen
                name='Address'
                component={Address}
                options={({ navigation }) => ({
                    ...getHeaderOptions(navigation, 'Address'),
                    headerShown: true,
                    tabBarStyle: { display: 'none' }, // Hide tab bar
                })}
            />
            <Stack.Screen
                name='MyOrder'
                component={MyOrder}
                options={({ navigation }) => ({
                    
                    ...getHeaderOptions(navigation, 'My Orders'),
                    headerShown: true,
                    tabBarStyle: { display: 'none' }, // Hide tab bar
                })}
            />
            <Stack.Screen
                name='HelpCenter'
                component={HelpCenter}
                options={({ navigation }) => ({
                    ...getHeaderOptions(navigation, 'Help Center'),
                    headerShown: true,
                    tabBarStyle: { display: 'none' }, // Hide tab bar
                })}
            />
            <Stack.Screen
                name='PersonalDetails'
                component={PersonalDetails}
                options={({ navigation }) => ({
                    ...getHeaderOptions(navigation, 'Personal Details'),
                    headerShown: true,
                    tabBarStyle: { display: 'none' }, // Hide tab bar
                })}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigator

const styles = StyleSheet.create({
    backButton: {
        padding: ms(10),
        borderRadius: ms(50),
        borderWidth: 0.5,
        borderColor: BRAND.muted
    }
})