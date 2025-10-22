import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import { CheckIcon2 } from '../../src/SVGicons/icon'
import BRAND from '../../src/constant/color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const DeliverdOreder = () => {
  const navigation = useNavigation();

  // Static order data
  const orderData = {
    orderId: 'TOFENJERSPA4',
    deliveryAddress: '1254 Block A, Nepal Central Park, Cornouight Place, New Delhi',
    addressLine2: '10001 Block C',
    orderDate: '15 July 2025, 1:00 PM',
    totalAmount: '5767',
    paymentMethod: 'Pay on Delivery',
    items: [
      {
        id: 1,
        name: 'Hybrid Tomato (Tomato)',
        quantity: '5kg',
        price: '900',
        image: require('../../src/images/Tomato.png')
      },
      {
        id: 2,
        name: 'Fresh Carrots',
        quantity: '3kg',
        price: '450',
        image: require('../../src/images/Tomato.png') // You can replace with actual carrot image
      },
      {
        id: 3,
        name: 'Organic Potatoes',
        quantity: '4kg',
        price: '680',
        image: require('../../src/images/Tomato.png') // You can replace with actual potato image
      }
    ]
  }

  // Calculate total amount from items
  const calculatedTotal = orderData.items.reduce((total, item) => total + parseInt(item.price), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Delivered Section */}
        <View style={styles.deliveredHeader}>
          <View style={styles.statusBox}>
            <CheckIcon2 width={s(22)} height={s(22)} stroke={BRAND.primary} />
          </View>
          <Text style={styles.sectionHeader}>Delivered</Text>
        </View>
        <View style={styles.divider} />

        {/* Order Items */}
        {orderData.items.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <View style={styles.itemContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.itemImage}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        ))}

        {/* Total Amount */}
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{orderData.totalAmount}</Text>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Payment Method</Text>
          <Text style={styles.method}>{orderData.paymentMethod}</Text>
        </View>

        {/* Order Details */}
        <View style={styles.ordercard}>
          <Text style={styles.sectionHeader}>Order Details</Text>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Order id:</Text>
            <Text style={styles.detailValue}>Order #{orderData.orderId}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Delivery Address:</Text>
            <Text style={styles.detailValue}>
              {orderData.deliveryAddress}
            </Text>
            <Text style={styles.detailValue}>{orderData.addressLine2}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Order arrived at</Text>
            <Text style={styles.detailValue}>{orderData.orderDate}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Back to Home Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('PartnerMain')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default DeliverdOreder

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND.white,
  },
  container: {
    flex: 1,
    backgroundColor: BRAND.white,
  },
  contentContainer: {
    paddingHorizontal: s(16),
    paddingBottom: vs(100), // Extra padding for the fixed button
  },
  deliveredHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(15),
    // marginTop: vs(10),
  },
  statusBox: {
    width: s(50),
    height: s(50),
    backgroundColor: "#EEF9F0",
    borderRadius: s(12),
    justifyContent: "center",
    alignItems: "center",
    padding: s(8)
  },
  sectionHeader: {
    fontSize: ms(18),
    fontWeight: '600',
    marginBottom: vs(12),
    marginTop: vs(8),
    color: '#333',
  },
  divider: {
    height: vs(1),
    backgroundColor: '#e0e0e0',
    marginVertical: vs(8),
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: vs(8),
    marginBottom: vs(10),
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
    flex: 1,
  },
  imageContainer: {
    width: s(50),
    height: s(50),
    backgroundColor: "#EEF9F0",
    borderRadius: s(12),
    justifyContent: "center",
    alignItems: "center",
    padding: s(8)
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: ms(16),
    fontWeight: '500',
    color: '#333',
    marginBottom: vs(2),
  },
  itemQuantity: {
    fontSize: ms(14),
    color: BRAND.muted,
  },
  itemPrice: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#333',
  },
  totalAmountContainer: {
    borderWidth: s(1),
    paddingHorizontal: s(15),
    paddingVertical: vs(12),
    borderColor: BRAND.border,
    borderRadius: s(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: vs(10),
  },
  totalLabel: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: ms(16),
    fontWeight: '700',
    color: BRAND.primary,
  },
  paymentRow: {
    borderWidth: s(1),
    marginTop: vs(15),
    borderColor: BRAND.border,
    borderRadius: s(12),
    paddingHorizontal: s(15),
    paddingVertical: vs(12),
  },
  paymentLabel: {
    fontSize: ms(16),
    fontWeight: '700',
    color: '#333',
  },
  method: {
    fontSize: ms(14),
    color: BRAND.muted,
    marginTop: vs(8),
  },
  ordercard: {
    borderWidth: s(1),
    borderColor: BRAND.border,
    borderRadius: s(12),
    paddingHorizontal: s(15),
    paddingVertical: vs(15),
    marginTop: vs(15),
    marginBottom: vs(10),
  },
  detailItem: {
    marginBottom: vs(12),
  },
  detailLabel: {
    fontSize: ms(15),
    fontWeight: '600',
    color: '#333',
    marginBottom: vs(4),
  },
  detailValue: {
    fontSize: ms(14),
    color: '#666',
    lineHeight: ms(20),
  },
  button: {
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    bottom: vs(20),
    paddingVertical: vs(16),
    backgroundColor: BRAND.orange,
    borderRadius: s(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: ms(16),
    fontWeight: '600',
    textAlign: 'center',
    color: BRAND.white,
  },
})