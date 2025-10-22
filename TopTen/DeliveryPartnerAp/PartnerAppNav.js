import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PartnerMain from '../DeliveryPartnerAp/BottomTabs/PartnerMain';
import ProfileEdit from '../DeliveryPartnerAp/ProfileEdit';
import MyOrder from '../DeliveryPartnerAp/MyOrder';
import { BackIcon } from '../../src/SVGicons/icon';
import { ms, s, vs } from 'react-native-size-matters';
import BRAND from '../../src/constant/color';
import AssignOrders from '../DeliveryPartnerAp/AssignOrders';
import DeliverdOreder from '../DeliveryPartnerAp/DeliverdOreder';
import StartDelivered from '../DeliveryPartnerAp/StartDelivered';
import Payments from '../DeliveryPartnerAp/Payments';
import CompleteDelivery from '../DeliveryPartnerAp/CompleteDelivery';
import Notification from '../DeliveryPartnerAp/Notification';
const Stack = createStackNavigator()

const PartnerAppNav = () => {
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
        <Stack.Navigator>
            <Stack.Screen name='PartnerMain' component={PartnerMain} options={{ headerShown: false }} />
            <Stack.Screen name='ProfileEdit' component={ProfileEdit}
                options={({ navigation }) => getProfileHeaderOptions('Profile', navigation)}
            />
            <Stack.Screen name='MyOrder' component={MyOrder}
                options={({ navigation }) => getProfileHeaderOptions('My Order', navigation)}

            />
            <Stack.Screen name='AssignOrders' component={AssignOrders}
                options={({ navigation }) => getProfileHeaderOptions('Assigned Orders', navigation)}

            />
             <Stack.Screen name='DeliverdOreder' component={DeliverdOreder}
                options={({ navigation }) => getProfileHeaderOptions('Deliverd Orders', navigation)}

            />
            <Stack.Screen name='StartDelivered' component={StartDelivered}
                options={({ navigation }) => getProfileHeaderOptions('Assigned Order', navigation)}

            />
             <Stack.Screen name='Payments' component={Payments}
                options={({ navigation }) => getProfileHeaderOptions('Payments', navigation)}

            />
             <Stack.Screen name='CompleteDelivery' component={CompleteDelivery}
              options={{ headerShown: false }}

            />
             <Stack.Screen name='Notification' component={Notification}
                options={({ navigation }) => getProfileHeaderOptions('Notification', navigation)}

            />
        </Stack.Navigator>
    )
}

export default PartnerAppNav

const styles = StyleSheet.create({
    backButton: {
        padding: ms(10),
        borderRadius: ms(50),
        borderWidth: 0.5,
        borderColor: BRAND.muted
    }
})