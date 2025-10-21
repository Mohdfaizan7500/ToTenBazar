import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { moderateScale, ms, s } from 'react-native-size-matters'
import Home from '../CustomerApp/BottomTabs/Home';
import Profile from '../CustomerApp/BottomTabs/Profile';
import Categories from '../CustomerApp/BottomTabs/Categories';
import { BackIcon, CategoriesIcon, HomeIcon, ProfileIcon } from '../../src/SVGicons/icon';
import BRAND from '../../src/constant/color';
import ProfileNavigator from '../CustomerApp/ProfileScreens/ProfileNavigator';

const Tabs = createBottomTabNavigator();

// Move the config outside as a regular function, not a hook
const getTabBarConfig = () => {
    return {
        tabBarHeight: s(70),
        paddingVertical: s(5),
        borderWidth: ms(1),
        labelFontSize: ms(14),
        labelMarginBottom: s(5),
        iconMarginTop: s(5),
        iconSize: ms(24),
    };
};

const CustomerMain = () => {
    // Call the regular function instead of a custom hook
    const {
        tabBarHeight,
        paddingVertical,
        borderWidth,
        labelFontSize,
        labelMarginBottom,
        iconMarginTop,
        iconSize,
    } = getTabBarConfig();

    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: tabBarHeight,
                    paddingBottom: paddingVertical,
                    paddingTop: paddingVertical,
                    backgroundColor: 'white',
                    borderTopWidth: borderWidth,
                    borderTopColor: '#e0e0e0',
                },
                tabBarLabelStyle: {
                    fontSize: labelFontSize,
                    fontWeight: '400',
                    marginBottom: labelMarginBottom,
                },
                tabBarIconStyle: {
                    marginTop: iconMarginTop,
                },
                tabBarActiveTintColor: BRAND.orange,
                tabBarInactiveTintColor: BRAND.muted,
            }}
        >
            <Tabs.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <HomeIcon width={iconSize} height={iconSize} stroke={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='Categories'
                component={Categories}
                options={({ navigation }) => ({
                    headerTitle: 'Categories',
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
                    headerLeft: () => (
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {
                                navigation.navigate('Home')
                            }}
                        >
                            <BackIcon width={ms(16)} height={ms(16)} />
                        </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {
                        paddingLeft: s(15),
                    },
                    headerRightContainerStyle: {
                        paddingRight: s(20),
                    },
                    tabBarIcon: ({ color }) => (
                        <CategoriesIcon width={iconSize} height={iconSize} stroke={color} />
                    )
                })}
            />
            <Tabs.Screen
                name='Profile'
                component={Profile}
                options={({ navigation }) => ({
                    tabBarLabel: 'Profile',
                    headerShown: true,
                    headerTitle: 'Profile',
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
                    headerLeft: () => (
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {
                                navigation.navigate('Home')
                            }}
                        >
                            <BackIcon width={ms(16)} height={ms(16)} />
                        </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {
                        paddingLeft: s(15),
                    },
                    headerRightContainerStyle: {
                        paddingRight: s(20),
                    },
                    tabBarIcon: ({ color }) => (
                        <ProfileIcon width={iconSize} height={iconSize} stroke={color} />
                    )
                })}
            />
        </Tabs.Navigator>
    )
}

export default CustomerMain

const styles = StyleSheet.create({
    backButton: {
        padding: ms(10),
        borderRadius: ms(50),
        borderWidth: 0.5,
        borderColor: BRAND.muted
    }
})