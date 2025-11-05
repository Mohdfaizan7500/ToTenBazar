import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { s, vs } from 'react-native-size-matters'
import { AddressIcon, OfferIcon, PaymentCheckBoxIcon, RightArrowICon } from '../../../src/SVGicons/icon'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useSelector } from 'react-redux'
import { BRAND, DARK } from '../../../src/constant/colors'

const OrderDetails = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const selectedAddress = useSelector(state => state?.user?.selectedAddress, shallowEqual);
    console.log('selectedAddress:', selectedAddress)

    const Theme = useSelector(state => state.auth.Theme)
    const colors = Theme ? DARK : BRAND

    const { cartItems, totalInr, subtotalInr, discountInr, totalItems, orderData } = route.params || {}
    console.log('route params:', route.params)

    // Function to format amount (divide by 100 and remove decimals)
    const formatAmount = (amount) => {
        if (!amount) return 0;
        const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return Math.floor(numericAmount / 100);
    }

    // Format all amounts
    const formattedSubtotal = subtotalInr;
    const formattedDiscount =discountInr;
    const formattedTotal = totalInr;

    if (!cartItems?.length) {
        return (
            <View style={[styles.emptyContainer, { backgroundColor: colors.bg }]}>
                <Text style={[styles.emptyText, { color: colors.text }]}>No order data available</Text>
                <Text style={[styles.emptySubText, { color: colors.muted }]}>Please go back and select items to order</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <StatusBar backgroundColor={colors.bg} barStyle={Theme ? 'light-content' : 'dark-content'} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: colors.bg }}>

                {/* Item Details */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Item Details</Text>
                    {cartItems.map((item) => {
                        const itemTotalPrice = formatAmount(item.price * item.quantity);
                        const itemUnitPrice = formatAmount(item.price);
                        
                        return (
                            <View key={item.id} style={[styles.item, {
                                backgroundColor: colors.white,
                                shadowColor: colors.black,
                                shadowOpacity: Theme ? 0.05 : 0.1
                            }]}>
                                <View style={styles.itemLeft}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <View style={styles.itemInfo}>
                                        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                                        <Text style={[styles.itemQuantity, { color: colors.muted }]}>Qty: {item.quantity}</Text>
                                        <Text style={[styles.unitPrice, { color: colors.muted }]}>₹{itemUnitPrice} per item</Text>
                                    </View>
                                </View>
                                <Text style={[styles.itemPrice, { color: colors.orange }]}>₹{itemTotalPrice}</Text>
                            </View>
                        )
                    })}
                </View>

                {/* Delivery Address */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Address</Text>
                    <View style={[styles.addressCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
                        <View style={[styles.addressIconContainer, { backgroundColor: Theme ? colors.orangeLight : '#FE8C0033' }]}>
                            <AddressIcon width={s(22)} height={s(22)} stroke={colors.orange} />
                        </View>
                        <View style={styles.addressContent}>
                            <View style={styles.addressHeader}>
                                <View style={styles.addressTextContent}>
                                    <Text style={[styles.addressTitle, { color: colors.text }]}>
                                        {selectedAddress?.add_name || 'Delivery Address'}
                                    </Text>
                                    <Text style={[styles.addressStatus, { color: colors.green }]}>ACTIVE</Text>
                                    <Text style={[styles.addressOwner, { color: colors.text }]}>
                                        {selectedAddress?.user_name || 'Customer'}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.changeButton} 
                                    onPress={() => navigation.navigate('Address')}
                                >
                                    <Text style={[styles.change, { color: colors.orange }]}>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.addressText, { color: colors.muted }]}>
                                {selectedAddress ? 
                                    `${selectedAddress.address}, ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}, ${selectedAddress.country}`
                                    : 'No address selected. Please select a delivery address.'
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Offers & Coupons */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Offers & Coupons</Text>
                    <TouchableOpacity
                        style={[styles.offersCard, { backgroundColor: colors.white, borderColor: colors.border }]}
                        onPress={() => navigation.navigate('Offers', { amount: formattedTotal })}
                    >
                        <OfferIcon width={s(20)} height={s(20)} stroke={colors.orange} />
                        <Text style={[styles.offersPlaceholder, { color: colors.text }]}>Offers & Coupons</Text>
                        <View style={[styles.offersArrow, { backgroundColor: colors.orange }]}>
                            <RightArrowICon stroke={colors.white} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
                    <View style={[styles.paymentCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
                        <Text style={[styles.paymentMethod, { color: colors.text }]}>Pay On Delivery</Text>
                        <PaymentCheckBoxIcon />
                    </View>
                </View>

                {/* Payment Summary */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Summary</Text>
                    <View style={[styles.summaryCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
                        <Text style={[styles.totalItems, { color: colors.text }]}>Total Items ({totalItems})</Text>
                        <View style={[styles.divider, { backgroundColor: colors.border }]} />
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: colors.muted }]}>Subtotal</Text>
                            <Text style={[styles.summaryValue, { color: colors.text }]}>₹{formattedSubtotal}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: colors.muted }]}>Discount</Text>
                            <Text style={[styles.discountValue, { color: colors.orange }]}>-₹{formattedDiscount}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: colors.muted }]}>Delivery Fee</Text>
                            <Text style={[styles.freeText, { color: colors.green }]}>Free</Text>
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.border }]} />
                        <View style={styles.totalRow}>
                            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                            <Text style={[styles.totalPrice, { color: colors.text }]}>₹{formattedTotal}</Text>
                        </View>
                    </View>
                </View>

                {/* Order ID Display */}
                {orderData?.order_id && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Information</Text>
                        <View style={[styles.orderInfoCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
                            <Text style={[styles.orderId, { color: colors.text }]}>Order ID: {orderData.order_id}</Text>
                            <Text style={[styles.orderStatus, { color: colors.orange }]}>Status: {orderData.status}</Text>
                        </View>
                    </View>
                )}

                {/* Place Order Button */}
                <TouchableOpacity
                    style={[styles.placeOrderButton, { 
                        backgroundColor: selectedAddress ? colors.primary : colors.muted,
                    }]}
                    onPress={() => navigation.replace('OrderConfirem')}
                    disabled={!selectedAddress}
                >
                    <Text style={styles.placeOrderText}>
                        {selectedAddress ? 'Place Order' : 'Select Address First'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: s(10)
    },
    emptyText: {
        fontSize: s(13),
        fontWeight: 'bold',
        marginBottom: vs(4)
    },
    emptySubText: {
        fontSize: s(11),
        textAlign: 'center'
    },
    section: {
        paddingHorizontal: s(10),
        paddingVertical: vs(4)
    },
    sectionTitle: {
        fontSize: s(13),
        fontWeight: 'bold',
        marginBottom: vs(6)
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: s(10),
        marginBottom: vs(6),
        borderRadius: s(8),
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    itemImage: {
        width: s(50),
        height: s(50),
        borderRadius: s(6),
        marginRight: s(8)
    },
    itemInfo: {
        flex: 1
    },
    itemName: {
        fontSize: s(13),
        fontWeight: '600',
        marginBottom: vs(2)
    },
    itemQuantity: {
        fontSize: s(11)
    },
    unitPrice: {
        fontSize: s(10),
        fontStyle: 'italic'
    },
    itemPrice: {
        fontSize: s(13),
        fontWeight: 'bold'
    },
    addressCard: {
        flexDirection: 'row',
        padding: s(8),
        borderRadius: s(8),
        borderWidth: 1
    },
    addressIconContainer: {
        width: s(32),
        height: s(32),
        borderRadius: s(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: s(8)
    },
    addressContent: {
        flex: 1
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: vs(2)
    },
    addressTextContent: {
        flex: 1
    },
    addressTitle: {
        fontSize: s(12),
        fontWeight: 'bold',
        marginBottom: vs(1)
    },
    addressStatus: {
        fontSize: s(10),
        fontWeight: 'bold',
        marginBottom: vs(1)
    },
    addressOwner: {
        fontSize: s(10),
        fontWeight: 'bold',
        marginBottom: vs(1)
    },
    addressText: {
        fontSize: s(10),
        marginBottom: vs(1),
        lineHeight: vs(12)
    },
    changeButton: {
        padding: s(2)
    },
    change: {
        fontSize: s(10),
        fontWeight: '500'
    },
    offersCard: {
        padding: s(8),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: s(8),
        borderWidth: 1
    },
    offersPlaceholder: {
        fontSize: s(12),
        fontWeight: '600',
        flex: 1,
        marginLeft: s(6)
    },
    offersArrow: {
        width: s(20),
        height: s(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: s(10)
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: s(8),
        borderRadius: s(8),
        borderWidth: 1
    },
    paymentMethod: {
        fontSize: s(12),
        fontWeight: 'bold'
    },
    summaryCard: {
        padding: s(8),
        borderRadius: s(8),
        borderWidth: 1
    },
    totalItems: {
        fontSize: s(12),
        fontWeight: 'bold',
        marginBottom: vs(4)
    },
    divider: {
        height: 1,
        marginVertical: vs(4)
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vs(2)
    },
    summaryLabel: {
        fontSize: s(10)
    },
    summaryValue: {
        fontSize: s(10),
        fontWeight: '600'
    },
    discountValue: {
        fontSize: s(10),
        fontWeight: '600'
    },
    freeText: {
        fontSize: s(10),
        fontWeight: '600'
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vs(4)
    },
    totalLabel: {
        fontSize: s(13),
        fontWeight: 'bold'
    },
    totalPrice: {
        fontSize: s(13),
        fontWeight: 'bold'
    },
    orderInfoCard: {
        padding: s(8),
        borderRadius: s(8),
        borderWidth: 1
    },
    orderId: {
        fontSize: s(11),
        fontWeight: '600',
        marginBottom: vs(2)
    },
    orderStatus: {
        fontSize: s(11),
        fontWeight: '600'
    },
    placeOrderButton: {
        margin: s(10),
        padding: s(10),
        borderRadius: s(8),
        alignItems: 'center'
    },
    placeOrderText: {
        color: '#fff',
        fontSize: s(13),
        fontWeight: 'bold'
    },
})