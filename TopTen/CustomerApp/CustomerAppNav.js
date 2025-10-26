import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CustomerMain from '../CustomerApp/CustomerMain';
import { BackIcon } from '../../src/SVGicons/icon';
import { ms, s, vs } from 'react-native-size-matters';
import BRAND from '../../src/constant/color';
import PersonalDetails from '../CustomerApp/ProfileScreens/PersonalDetails';
import Address from '../CustomerApp/ProfileScreens/Address';
import MyOrder from '../CustomerApp/ProfileScreens/MyOrder';
import HelpCenter from '../CustomerApp/ProfileScreens/HelpCenter';
import EditAdrees from '../CustomerApp/ProfileScreens/EditAdrees';
import CategoriesCatlog from '../CustomerApp/CategoriesScreens/CategoriesCatlog';
import Notification from '../CustomerApp/Notification';
import MyCart from '../CustomerApp/MyCart';
import AboutProductScreen from '../CustomerApp/CategoriesScreens/AboutProductScreen';
import OrderSummery from '../CustomerApp/ProfileScreens/OrderSummery';
import OrderDetails from '../CustomerApp/ProfileScreens/OrderDetails';
import OrderConfirem from '../CustomerApp/ProfileScreens/OrderConfirem';
import Offers from '../CustomerApp/ProfileScreens/Offers';
import Catlog from '../CustomerApp/Catlog';
const Stack = createStackNavigator()

const CustomerAppNav = () => {

    // Common header options for profile screens
    const getProfileHeaderOptions = (title, navigation) => ({
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
        headerLeft: () => (
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <BackIcon width={ms(16)} height={ms(16)} />
            </TouchableOpacity>
        ),
        headerLeftContainerStyle: {
            paddingLeft: s(15),
        },
    })

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='CustomerMain'>
            <Stack.Screen name='CustomerMain' component={CustomerMain} options={{ headerShown: false }} />
            {/* Profile Screens with Headers */}
            <Stack.Screen
                name='PersonalDetails'
                component={PersonalDetails}
                options={({ navigation }) => getProfileHeaderOptions('Personal Details', navigation)}
            />
            <Stack.Screen
                name='Address'
                component={Address}
                options={({ navigation }) => getProfileHeaderOptions('Addresses', navigation)}
            />
            <Stack.Screen
                name='MyOrder'
                component={MyOrder}
                options={({ navigation }) => getProfileHeaderOptions('My Orders', navigation)}
            />
            <Stack.Screen
                name='HelpCenter'
                component={HelpCenter}
                options={({ navigation }) => getProfileHeaderOptions('Help Center', navigation)}
            />
            <Stack.Screen
                name='EditAdrees'
                component={EditAdrees}
                options={({ navigation }) => getProfileHeaderOptions('Address', navigation)}
            />
            <Stack.Screen
                name='CategoriesCatlog'
                component={CategoriesCatlog}
                options={({ route, navigation }) => {
                    const title = route.params?.title || 'Catalog'; // Fallback title
                    return getProfileHeaderOptions(title, navigation);
                }}
            />
            <Stack.Screen name='MyCart' component={MyCart}
                options={({ navigation }) => getProfileHeaderOptions('My Cart', navigation)}
            />
            <Stack.Screen name='Notification' component={Notification}
                options={({ navigation }) => getProfileHeaderOptions('Notification', navigation)}
            />
            <Stack.Screen name='AboutProductScreen' component={AboutProductScreen} options={{ headerShown: false }} />

            {/* Order Summary Screen with Dynamic Order ID */}
            <Stack.Screen
                name='OrderSummery'
                component={OrderSummery}
                options={({ route, navigation }) => {
                    const orderId = `Order#` + route.params?.order?.orderId || 'Order #N/A';
                    return getProfileHeaderOptions(orderId, navigation);
                }}
            />

            <Stack.Screen name='OrderDetails' component={OrderDetails}
                options={({ navigation }) => getProfileHeaderOptions('Checkout', navigation)} />

            <Stack.Screen name='OrderConfirem' component={OrderConfirem} options={{ headerShown: false }} />
            <Stack.Screen name='Offers' component={Offers}
                options={({ navigation }) => getProfileHeaderOptions('Checkout', navigation)} />
            <Stack.Screen name='Catlog' component={Catlog}
                options={({ route,navigation }) => {
                    const title = route?.params?.title || 'Catlog'
                    return  getProfileHeaderOptions(title, navigation)} }/>

        </Stack.Navigator>
    )
}

export default CustomerAppNav

const styles = StyleSheet.create({
    backButton: {
        padding: ms(10),
        borderRadius: ms(50),
        borderWidth: 0.5,
        borderColor: BRAND.muted
    }
})