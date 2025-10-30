import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { s, vs } from 'react-native-size-matters'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { DARK, BRAND } from '../../../src/constant/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const OrderConfirm = () => {
    const navigation = useNavigation()

    const Theme = useSelector(state => state.auth.Theme)
    const colors = Theme ? DARK : BRAND

    const handleGoToOrders = () => {
        navigation.replace('MyOrder') // Navigate to your orders screen
    }

    const handleContinueShopping = () => {
        navigation.replace('CustomerMain') // Navigate to your home screen
    }

    return (
        <SafeAreaView style={[styles.container,{backgroundColor:colors.bg}]}>
            <StatusBar backgroundColor={ colors.bg} barStyle={ Theme ? 'light-content' :'dark-content'}/>
            <View style={{ width: "100%", height: 200, backgroundColor: colors.bg}}>
                <ImageBackground source={require('../../../src/images/Mask Group.png')}
                    style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} resizeMode='contain'>
                    <Image source={require('../../../src/images/mobile.png')}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode='contain'
                    />
                    <FastImage source={require('../../../src/images/confirm.gif')}
                        style={{ width: "20%", height: "20%", position: "absolute" }}
                        resizeMode='contain'
                    />

                </ImageBackground>

            </View>
            {/* Success Icon/Checkmark */}
            {/* <View style={styles.successCircle}>
        <Text style={styles.checkmark}>✓</Text>
      </View> */}

            {/* Order Confirmed Title */}
            <Text style={[styles.title,{color:colors.text}]}>Order Confirmed!</Text>

            {/* Confirmation Message */}
            <Text style={[styles.message,{color:colors.muted}]}>Your order has been confirmed!</Text>

            {/* Action Buttons */}
            <View style={[styles.buttonsContainer]}>
                <TouchableOpacity
                    style={[styles.ordersButton,{backgroundColor:colors.muted}]}
                    onPress={handleGoToOrders}
                >
                    <Text style={styles.ordersButtonText}>Go to Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.shoppingButton}
                    onPress={handleContinueShopping}
                >
                    <Text style={styles.shoppingButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OrderConfirm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        // paddingTop:vs(150),
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    successCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkmark: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: s(20),
        marginBottom: 16,
    },
    message: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 50,
        lineHeight: 24,
    },
    buttonsContainer: {
        position: "absolute",
        bottom: vs(15),
        width: '100%',
        gap: 16,
    },
    ordersButton: {
        backgroundColor: '#C4C4C4',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    ordersButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    shoppingButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    shoppingButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})