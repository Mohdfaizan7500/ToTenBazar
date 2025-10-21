import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import { RightArrowICon } from '../../src/SVGicons/icon'
import BRAND from '../../src/constant/color'

const AssignOrders = () => {
    // Static data for assigned orders
    const assignedOrders = [
        {
            id: '1',
            orderNumber: 'FOTHERBRAX4',
            customerName: 'John Smith',
            address: '123 Main Street, Apt 4B, Seoul, Korea'
        },
        {
            id: '2',
            orderNumber: 'FOTHER2R94A',
            customerName: 'Sarah Johnson',
            address: '456 Oak Avenue, Floor 2, Seoul, Korea'
        },
        {
            id: '3',
            orderNumber: 'FOTHER3X85B',
            customerName: 'Mike Chen',
            address: '789 Park Lane, Unit 5C, Seoul, Korea'
        }
    ]

    const handleStartDelivery = (orderId) => {
        console.log(`Starting delivery for order ${orderId}`)
    }

    const handleArrowPress = (orderId) => {
        console.log(`Arrow pressed for order ${orderId}`)
        // Navigate to order details or perform other action
    }

    // Right Arrow Icon Component
   

    return (
        <View style={styles.container}>
            
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {assignedOrders.map((order, index) => (
                    <View key={order.id}>
                        <View style={styles.orderCard}>
                            {/* Card Header with Order ID and Arrow */}
                            <View style={styles.cardHeader}>
                                <Text style={styles.orderHeader}>Order {order.id}</Text>
                                <TouchableOpacity
                                    style={styles.arrowButton}
                                    onPress={() => handleArrowPress(order.id)}
                                >
                                    <RightArrowICon width={s(14)} height={s(14)} />
                                </TouchableOpacity>
                            </View>

                            {/* Order Details */}
                            <View style={styles.orderDetails}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Customer Name</Text>
                                    <Text style={styles.detailValue}>{order.customerName}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Address</Text>
                                    <Text style={styles.detailValue}>{order.address}</Text>
                                </View>
                            </View>


                            <TouchableOpacity
                                style={styles.startButton}
                                onPress={() => handleStartDelivery(order.id)}
                            >
                                <Text style={styles.startButtonText}>Start Delivery</Text>
                            </TouchableOpacity>
                        </View>

                        {index < assignedOrders.length - 1 && <View style={styles.cardSpacing} />}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default AssignOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: s(12),
        paddingVertical: vs(8),
    },
    orderCard: {
        backgroundColor: '#ffffff',
        borderRadius: ms(10),
        padding: ms(12),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: ms(3),
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vs(8),
    },
    orderHeader: {
        fontSize: ms(15),
        fontWeight: '600',
        color: '#333',
    },
    arrowButton: {
        width: ms(32),
        height: ms(32),
        borderRadius: ms(16),
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    arrowIcon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        fontSize: ms(16),
        color: '#333',
        fontWeight: 'bold',
    },
    orderDetails: {
        marginBottom: vs(8),
    },
    detailRow: {
        marginBottom: vs(6),
    },
    detailLabel: {
        fontSize: ms(10),
        fontWeight: '500',
        color: '#888',
        marginBottom: vs(2),
    },
    detailValue: {
        fontSize: ms(12),
        fontWeight: '400',
        color: '#333',
    },
    divider: {
        height: vs(1),
        backgroundColor: '#e0e0e0',
        marginVertical: vs(8),
    },
    startButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: vs(10),
        paddingHorizontal: s(20),
        borderRadius: ms(6),
        alignItems: 'center',
    },
    startButtonText: {
        fontSize: ms(13),
        fontWeight: '600',
        color: '#ffffff',
    },
    cardSpacing: {
        height: vs(12),
    },
   
})