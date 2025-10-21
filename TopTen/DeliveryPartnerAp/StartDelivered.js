import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, Animated, PanResponder } from 'react-native'
import React, { useRef, useState } from 'react'
import BRAND from '../../src/constant/color'
import { s, vs, ms } from 'react-native-size-matters'
import { SlideArrow } from '../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'

const StartDelivered = () => {
    const navigation = useNavigation(); // This must be at the top level

    // Static order data
    const orderData = {
        orderId: 'TOTFINDTSPTA4',
        customerName: 'Abdiam Pal',
        mobileNumber: '7834416847',
        deliveryAddress: 'DSA, Black & Alison Central Park, Cornouight Place, New Delhi - 10000, India',
        totalAmount: '865',
        products: [
            {
                id: 1,
                name: 'Hybrid Tomato (Tomato)',
                weight: '5kg',
                price: '900',
                image: require('../../src/images/Tomato.png')
            },
            {
                id: 2,
                name: 'Fresh Carrots',
                weight: '3kg',
                price: '450',
                image: require('../../src/images/Tomato.png')
            },
            {
                id: 3,
                name: 'Organic Potatoes',
                weight: '4kg',
                price: '680',
                image: require('../../src/images/Tomato.png')
            }
        ]
    }

    const pan = useRef(new Animated.Value(0)).current;
    const [isSlided, setIsSlided] = useState(false);
    const [buttonColor, setButtonColor] = useState(BRAND.primary);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                const buttonWidth = s(343);
                const maxSlide = buttonWidth - s(60);

                if (gestureState.dx >= 0 && gestureState.dx <= maxSlide) {
                    pan.setValue(gestureState.dx);

                    // Change button color based on slide progress
                    const progress = gestureState.dx / maxSlide;
                    if (progress > 0.3) {
                        setButtonColor('#FF4444');
                    } else {
                        setButtonColor(BRAND.primary);
                    }
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                const buttonWidth = s(343);
                const maxSlide = buttonWidth - s(60);
                const threshold = maxSlide * 0.8;

                if (gestureState.dx >= threshold) {
                    // Slide completed
                    Animated.timing(pan, {
                        toValue: maxSlide,
                        duration: 200,
                        useNativeDriver: false,
                    }).start(() => {
                        setIsSlided(true);
                        setButtonColor('#FF4444');
                        navigation.replace('Payments');

                        
                    });
                } else {
                    // Slide not completed - reset to start
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start(() => {
                        setButtonColor(BRAND.primary);
                    });
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                {/* Header */}
                <View style={styles.orderDetailsCard}>
                    <Text style={styles.header}>Order Details</Text>

                    {/* Order Information */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Order Id</Text>
                        <Text style={styles.sectionValue}>Order #{orderData.orderId}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Customer Name</Text>
                        <Text style={styles.sectionValue}>{orderData.customerName}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Customer Mobile Number</Text>
                        <Text style={styles.sectionValue}>{orderData.mobileNumber}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery Address:</Text>
                        <Text style={styles.addressValue}>
                            {orderData.deliveryAddress}
                        </Text>
                    </View>
                </View>

                {/* Products Section */}
                <Text style={styles.productsHeader}>Products</Text>

                {/* Product Items */}
                {orderData.products.map((product) => (
                    <View key={product.id} style={styles.productItem}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={product.image}
                                style={styles.itemImage}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productWeight}>{product.weight}</Text>
                        </View>
                        <Text style={styles.productPrice}>${product.price}</Text>
                    </View>
                ))}

                {/* Total Amount */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>${orderData.totalAmount}</Text>
                </View>
            </ScrollView>

            {/* Slide to Confirm Button */}
            <View style={[styles.button, { backgroundColor: buttonColor }]}>
                <Animated.View
                    style={[
                        styles.circle,
                        {
                            transform: [{ translateX: pan }]
                        }
                    ]}
                    {...panResponder.panHandlers}
                >
                    <SlideArrow stroke={BRAND.primary} width={s(16)} height={s(16)} />
                </Animated.View>
                <Text style={styles.buttonText}>
                    {isSlided ? 'Location Confirmed!' : 'Reached At Location'}
                </Text>
            </View>
        </View>
    )
}

export default StartDelivered

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.white,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: s(16),
        paddingBottom: vs(100),
    },
    orderDetailsCard: {
        borderWidth: s(1),
        borderColor: BRAND.border,
        borderRadius: s(12),
        paddingHorizontal: s(12),
        paddingVertical: vs(12),
        marginTop: vs(10),
    },
    header: {
        fontSize: ms(16),
        fontWeight: '700',
        marginBottom: vs(12),
        color: '#333',
    },
    section: {
        marginBottom: vs(10),
    },
    sectionTitle: {
        fontSize: ms(12),
        fontWeight: '500',
        color: '#878787',
        marginBottom: vs(2),
    },
    sectionValue: {
        fontSize: ms(13),
        color: '#333',
        fontWeight: '500',
    },
    addressValue: {
        fontSize: ms(13),
        color: '#333',
        fontWeight: '500',
        lineHeight: ms(18),
    },
    productsHeader: {
        fontSize: ms(15),
        fontWeight: '700',
        marginTop: vs(15),
        marginBottom: vs(10),
        color: '#333',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: vs(8),
        marginBottom: vs(5),
    },
    imageContainer: {
        width: s(40),
        height: s(40),
        backgroundColor: "#EEF9F0",
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "center",
        padding: s(6),
        marginRight: s(10),
    },
    itemImage: {
        width: "100%",
        height: "100%",
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: ms(13),
        fontWeight: '500',
        color: '#333',
        marginBottom: vs(2),
    },
    productWeight: {
        fontSize: ms(12),
        color: '#666',
    },
    productPrice: {
        fontSize: ms(13),
        fontWeight: '600',
        color: '#333',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vs(15),
        paddingHorizontal: s(12),
        paddingVertical: vs(10),
        borderWidth: s(1),
        borderRadius: s(12),
        borderColor: BRAND.border,
        marginBottom: vs(10),
    },
    totalLabel: {
        fontSize: ms(14),
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: ms(14),
        fontWeight: '700',
        color: '#333',
    },
    button: {
        position: 'absolute',
        bottom: vs(10),
        left: s(16),
        right: s(16),
        backgroundColor: BRAND.primary,
        paddingVertical: vs(14),
        borderRadius: s(12),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: ms(14),
        fontWeight: '600',
        color: BRAND.white,
    },
    circle: {
        width: s(40),
        height: s(40),
        backgroundColor: BRAND.white,
        borderRadius: s(20),
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        left: s(8),
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})