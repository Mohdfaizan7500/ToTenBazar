import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { s, vs } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'
import FastImage from 'react-native-fast-image'

const OrderConfirm = () => {
    const navigation = useNavigation()

    const handleGoToOrders = () => {
        navigation.replace('MyOrder') // Navigate to your orders screen
    }

    const handleContinueShopping = () => {
        navigation.replace('CustomerMain') // Navigate to your home screen
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: 200, backgroundColor: BRAND.white }}>
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
            <Text style={styles.title}>Order Confirmed!</Text>

            {/* Confirmation Message */}
            <Text style={styles.message}>Your order has been confirmed!</Text>

            {/* Action Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.ordersButton}
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
        </View>
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