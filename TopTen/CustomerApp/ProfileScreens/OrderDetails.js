import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { s, vs } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'
import { AddressIcon, AddToCartIcon, OfferIcon, PaymentCheckBoxIcon, RightArrowICon } from '../../../src/SVGicons/icon'
import { SafeAreaView } from 'react-native-safe-area-context'

const OrderDetails = () => {
    const route = useRoute()
    const navigation = useNavigation();

    const PlaceOrderHandle = () => {
        navigation.replace('OrderConfirem')
    }

    // Get data passed from MyOrder screen
    const { cartItems, totalInr, subtotalInr, discountInr, totalItems } = route.params || {}

    // Static data for order details (you can modify this as needed)
    const orderData = {
        id: 'ORD-12345',
        date: '8-21',
        status: 'Checkout',
        deliveryAddress: {
            title: 'Delhi Kirti Nagar',
            status: 'OK',
            owner: 'Owner',
            address: '1234, Block A, Near Central Park, Connaught Place, New Delhi - 110001, India',
            location: 'Corresponding Files: New Delhi - NIGO!',
            index: 'Index'
        },
        paymentMethod: 'Pay On Delivery',
    }

    // If no data passed, use empty state
    if (!cartItems || cartItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No order data available</Text>
                <Text style={styles.emptySubText}>Please go back and select items to order</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* Item Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Item Details</Text>

                    {cartItems.map((item, index) => (
                        <View key={item.id} style={styles.item}>
                            <View style={styles.itemLeft}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                                </View>
                            </View>
                            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Delivery Address Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>

                    <View style={styles.addressCard}>
                        <View style={styles.addressIconContainer}>
                            <AddressIcon width={s(30)} height={s(30)} />
                        </View>
                        <View style={styles.addressContent}>
                            <View style={styles.addressHeader}>
                                <View style={styles.addressTextContent}>
                                    <Text style={styles.addressTitle}>{orderData.deliveryAddress.title}</Text>
                                    <Text style={styles.addressStatus}>{orderData.deliveryAddress.status}</Text>
                                    <Text style={styles.addressOwner}>{orderData.deliveryAddress.owner}</Text>
                                </View>
                                <TouchableOpacity style={styles.changeButton}>
                                    <Text style={styles.change}>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.addressText}>{orderData.deliveryAddress.address}</Text>
                            <Text style={styles.addressLocation}>{orderData.deliveryAddress.location}</Text>
                            <Text style={styles.addressIndex}>{orderData.deliveryAddress.index}</Text>
                        </View>
                    </View>
                </View>

                {/* Offers & Coupons Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Offers & Coupons</Text>
                    <TouchableOpacity style={styles.offersCard} onPress={()=>navigation.navigate('Offers')}>
                        <OfferIcon width={s(25)} height={s(25)} />
                        <Text style={styles.offersPlaceholder}>Offers & Coupons</Text>
                        <View style={styles.offersArrow}>
                            <RightArrowICon stroke={'#fff'} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Payment Method Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentCard}>
                        <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
                        <PaymentCheckBoxIcon />
                    </View>
                </View>

                {/* Payment Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>

                    <View style={styles.summaryCard}>
                        <Text style={styles.totalItems}>Total Items ({totalItems})</Text>
                        <View style={styles.divider} />

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>₹{subtotalInr}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Discount</Text>
                            <Text style={styles.discountValue}>-₹{discountInr}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={styles.freeText}>Free</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalPrice}>₹{totalInr}</Text>
                        </View>
                    </View>
                </View>

                {/* Place Order Button */}
                <TouchableOpacity style={styles.placeOrderButton} onPress={() => PlaceOrderHandle()}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.bg,
    },
    scrollView: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: s(12),
    },
    emptyText: {
        fontSize: s(16),
        fontWeight: 'bold',
        color: '#666',
        marginBottom: vs(6),
    },
    emptySubText: {
        fontSize: s(14),
        color: '#999',
        textAlign: 'center',
    },
    section: {
        backgroundColor: BRAND.bg,
        paddingHorizontal: s(12),
        paddingVertical: vs(6),
    },
    sectionTitle: {
        fontSize: s(15),
        fontWeight: 'bold',
        color: BRAND.dark,
        marginBottom: vs(10),
    },
    // Item Details Container (unchanged)
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: s(15),
        marginBottom: vs(10),
        backgroundColor: BRAND.white,
        borderRadius: s(12),
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemImage: {
        width: s(70),
        height: s(70),
        borderRadius: s(8),
        marginRight: s(12),
        backgroundColor: '#f8f8f8',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: s(16),
        fontWeight: '600',
        color: BRAND.dark,
        marginBottom: vs(4),
    },
    itemQuantity: {
        fontSize: s(14),
        color: BRAND.muted,
    },
    itemPrice: {
        fontSize: s(16),
        fontWeight: 'bold',
        color: BRAND.orange,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: vs(6),
    },
    // Address Container (reduced)
    addressCard: {
        backgroundColor: BRAND.white,
        flexDirection: 'row',
        padding: s(10),
        borderRadius: s(10),
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    addressIconContainer: {
        width: s(40),
        height: s(40),
        borderRadius: s(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FE8C0033',
        marginRight: s(10),
    },
    addressContent: {
        flex: 1,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: vs(4),
    },
    addressTextContent: {
        flex: 1,
    },
    addressTitle: {
        fontSize: s(14),
        fontWeight: 'bold',
        color: BRAND.dark,
        marginBottom: vs(1),
    },
    addressStatus: {
        fontSize: s(12),
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: vs(1),
    },
    addressOwner: {
        fontSize: s(12),
        fontWeight: 'bold',
        color: BRAND.dark,
        marginBottom: vs(1),
    },
    addressText: {
        fontSize: s(12),
        color: BRAND.muted,
        marginBottom: vs(2),
        lineHeight: vs(16),
    },
    addressLocation: {
        fontSize: s(12),
        color: BRAND.muted,
        marginBottom: vs(1),
    },
    addressIndex: {
        fontSize: s(12),
        color: BRAND.muted,
        fontStyle: 'italic',
    },
    changeButton: {
        padding: s(3),
    },
    change: {
        fontSize: s(12),
        fontWeight: '500',
        color: BRAND.orange,
    },
    // Offers & Coupons (reduced)
    offersCard: {
        backgroundColor: BRAND.white,
        padding: s(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: s(10),
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    offersPlaceholder: {
        fontSize: s(14),
        fontWeight: '600',
        color: BRAND.text,
        flex: 1,
        marginLeft: s(10),
    },
    offersArrow: {
        width: s(25),
        height: s(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: s(12.5),
        backgroundColor: BRAND.orange,
    },
    // Payment Method (reduced)
    paymentCard: {
        backgroundColor: BRAND.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: s(10),
        borderRadius: s(10),
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    paymentMethod: {
        fontSize: s(14),
        fontWeight: 'bold',
        color: BRAND.dark,
    },
    // Payment Summary (reduced)
    summaryCard: {
        backgroundColor: BRAND.white,
        padding: s(10),
        borderRadius: s(10),
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    totalItems: {
        fontSize: s(14),
        fontWeight: 'bold',
        color: BRAND.dark,
        marginBottom: vs(6),
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vs(4),
    },
    summaryLabel: {
        fontSize: s(12),
        color: BRAND.muted,
    },
    summaryValue: {
        fontSize: s(12),
        fontWeight: '600',
        color: BRAND.dark,
    },
    discountValue: {
        fontSize: s(12),
        fontWeight: '600',
        color: '#dc3545',
    },
    freeText: {
        fontSize: s(12),
        fontWeight: '600',
        color: '#28a745',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vs(6),
    },
    totalLabel: {
        fontSize: s(15),
        fontWeight: 'bold',
        color: BRAND.dark,
    },
    totalPrice: {
        fontSize: s(16),
        fontWeight: 'bold',
        color: BRAND.dark,
    },
    // Place Order Button (reduced)
    placeOrderButton: {
        backgroundColor: BRAND.primary,
        margin: s(12),
        padding: s(12),
        borderRadius: s(10),
        alignItems: 'center',
    },
    placeOrderText: {
        color: BRAND.white,
        fontSize: s(16),
        fontWeight: 'bold',
    },
})