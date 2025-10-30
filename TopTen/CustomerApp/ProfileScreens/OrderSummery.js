import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { BRAND, DARK } from '../../../src/constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderSummery = () => {
    const route = useRoute();
    const { order } = route.params || {};
    const navigation = useNavigation();
    const Theme = useSelector(state => state?.auth?.Theme)
    const colors = Theme ? DARK : BRAND;

    // Use the passed order data or fallback to mock data
    const orderData = order || {
        id: 1,
        date: '14 July 2025, 12:00 PM',
        deliveryDate: '15 July 2025, 1:00 PM',
        amount: '45',
        status: 'Delivered',
        orderId: 'TORTS06759764',
        deliveryAddress: 'Zakko, A. Nood Central Park, Cearnought Place, New Delhi waters, n.d.',
        paymentMethod: 'Pay On Delivery',
        paymentSummary: {
            totalItems: 3,
            deliveryFee: 0,
            discount: 0,
            total: 45
        },
        items: [
            {
                id: 1,
                name: 'Hybrid Tomato (Tomaton)',
                image: 'https://images.unsplash.com/photo-1546470427-e212b7d310a2?w=150&h=150&fit=crop',
                quantity: 3,
                price: 45,
                size: 'Big'
            }
        ]
    }

    const handleDownloadInvoice = () => {
        console.log('Downloading invoice for order:', orderData.orderId);
        // Add your invoice download logic here
        // This could generate a PDF, open a share dialog, etc.
        alert(`Invoice for ₹{orderData.orderId} is being downloaded`);
    }

    const renderItems = () => {
        return orderData.items.map((item, index) => (
            <View key={item.id || index} style={[styles.itemContainer, { borderBottomColor: colors.border }]}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                />
                <View style={styles.itemContent}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.itemSize, { color: colors.muted }]}>{item.size}</Text>
                </View>
                <Text style={[styles.itemQuantity, { color: colors.muted }]}>Qty: {item.quantity}</Text>
            </View>
        ))
    }

    const renderPaymentSummary = () => {
        return (
            <View style={[styles.paymentSection, { backgroundColor: colors.white }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Summary</Text>
                <View style={styles.paymentRow}>
                    <Text style={[styles.paymentLabel, { color: colors.muted }]}>Total Items ({orderData.paymentSummary.totalItems})</Text>
                    <Text style={[styles.paymentValue, { color: colors.text }]}>₹{orderData.paymentSummary.total}</Text>
                </View>
                <View style={styles.paymentRow}>
                    <Text style={[styles.paymentLabel, { color: colors.muted }]}>Delivery Fee</Text>
                    <Text style={[styles.paymentValue, { color: colors.text }]}>₹{orderData.paymentSummary.deliveryFee}</Text>
                </View>
                <View style={styles.paymentRow}>
                    <Text style={[styles.paymentLabel, { color: colors.muted }]}>Discount</Text>
                    <Text style={[styles.paymentValue, { color: colors.green }]}>-₹{orderData.paymentSummary.discount}</Text>
                </View>
                <View style={[styles.paymentRow, styles.totalRow, { borderTopColor: colors.border }]}>
                    <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                    <Text style={[styles.totalValue, { color: colors.text }]}>₹{orderData.paymentSummary.total}</Text>
                </View>
            </View>
        )
    }

    const getStatusHeaderStyle = (status) => {
        switch (status) {
            case 'Delivered':
                return { backgroundColor: colors.green };
            case 'Processing':
                return { backgroundColor: colors.orange };
            case 'Cancelled':
                return { backgroundColor: colors.orange };
            default:
                return { backgroundColor: colors.green };
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'Delivered':
                return 'Delivered';
            case 'Processing':
                return 'Processing';
            case 'Cancelled':
                return 'Cancelled';
            default:
                return 'Delivered';
        }
    }

    // Create dynamic styles based on current theme
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        statusHeader: {
            paddingVertical: 20,
            paddingHorizontal: 16,
        },
        statusHeaderContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        statusText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            flex: 1,
        },
        downloadInvoiceButton: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        downloadInvoiceText: {
            color: 'white',
            fontSize: 14,
            fontWeight: '600',
        },
        itemsSection: {
            backgroundColor: colors.white,
            marginBottom: 8,
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
        },
        itemImage: {
            width: 50,
            height: 50,
            borderRadius: 6,
            marginRight: 12,
        },
        itemContent: {
            flex: 1,
        },
        itemName: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 2,
        },
        itemSize: {
            fontSize: 14,
        },
        itemQuantity: {
            fontSize: 14,
            fontWeight: '500',
        },
        paymentSection: {
            padding: 16,
            marginBottom: 8,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 12,
        },
        paymentRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        paymentLabel: {
            fontSize: 14,
        },
        paymentValue: {
            fontSize: 14,
            fontWeight: '500',
        },
        totalRow: {
            borderTopWidth: 1,
            paddingTop: 8,
            marginTop: 4,
        },
        totalLabel: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        totalValue: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        paymentMethodSection: {
            backgroundColor: colors.white,
            padding: 16,
            marginBottom: 8,
        },
        paymentMethod: {
            fontSize: 14,
            color: colors.text,
            fontWeight: '500',
        },
        orderDetailsSection: {
            backgroundColor: colors.white,
            padding: 16,
            marginBottom: 8,
        },
        detailRow: {
            marginBottom: 8,
        },
        detailLabel: {
            fontSize: 14,
            color: colors.muted,
            marginBottom: 2,
        },
        detailValue: {
            fontSize: 14,
            color: colors.text,
            fontWeight: '500',
        },
        addressValue: {
            fontSize: 14,
            color: colors.text,
            fontStyle: 'italic',
            marginTop: 2,
        },
        detailNote: {
            fontSize: 12,
            color: colors.muted,
            fontStyle: 'italic',
        },
        actionButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: colors.white,
        },
        primaryButton: {
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 6,
            flex: 1,
            marginLeft: 8,
            alignItems: 'center',
        },
        primaryButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
        secondaryButton: {
            backgroundColor: 'transparent',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: colors.muted,
            flex: 1,
            marginRight: 8,
            alignItems: 'center',
        },
        secondaryButtonText: {
            color: colors.muted,
            fontSize: 16,
            fontWeight: '600',
        },
    })

    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={colors.bg} barStyle={ Theme ? 'light-content' :'dark-content'}/>
        <ScrollView style={[styles.container,{backgroundColor:colors.bg}]} showsVerticalScrollIndicator={false}>
            {/* Status Header with Download Invoice Button */}
            <View style={[styles.statusHeader, getStatusHeaderStyle(orderData.status)]}>
                <View style={styles.statusHeaderContent}>
                    <Text style={styles.statusText}>{getStatusText(orderData.status)}</Text>
                    {orderData.status === 'Delivered' && (
                        <TouchableOpacity
                            style={styles.downloadInvoiceButton}
                            onPress={handleDownloadInvoice}
                        >
                            <Text style={styles.downloadInvoiceText}>Download invoice</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Order Items */}
            <View style={styles.itemsSection}>
                {renderItems()}
            </View>

            {/* Payment Summary */}
            {renderPaymentSummary()}

            {/* Payment Method */}
            <View style={styles.paymentMethodSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
                <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
            </View>

            {/* Order Details */}
            <View style={styles.orderDetailsSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Details</Text>
                <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.muted }]}>Order id</Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>Order #{orderData.orderId}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.muted }]}>Delivery Address:</Text>
                    <Text style={[styles.addressValue, { color: colors.text }]}>"{orderData.deliveryAddress}"</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.muted }]}>{orderData.date}</Text>
                    <Text style={[styles.detailNote, { color: colors.muted }]}>On behalf of the QR</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.muted }]}>{orderData.deliveryDate}</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity 
                    style={[styles.secondaryButton, { borderColor: colors.muted }]} 
                    onPress={() => navigation.navigate('HelpCenter')}
                >
                    <Text style={[styles.secondaryButtonText, { color: colors.muted }]}>Need Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]}>
                    <Text style={styles.primaryButtonText}>Reorder</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default OrderSummery