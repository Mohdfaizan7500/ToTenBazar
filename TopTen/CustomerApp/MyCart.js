import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import BRAND from '../../src/constant/color'
import { s } from 'react-native-size-matters'
import { CheckIcon, CheckIcon2, DeleteIcon, MinusIcon, PlusIcon } from '../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'

const MyOrder = () => {
  // Static data for cart items
  const navigation = useNavigation()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Hybrid Tomato (Tamatan)',
      price: 45,
      quantity: 1,
      image: 'https://digital.loblaws.ca/PCX/20026703001_KG/en/1/20026703001_en_front_250.png',
      description: 'Fresh organic hybrid tomatoes',
      selected: true
    },
    {
      id: 2,
      name: 'Organic Carrot',
      price: 35,
      quantity: 2,
      image: 'https://www.trustbasket.com/cdn/shop/articles/Carrot.jpg?v=1688378789',
      description: 'Fresh organic carrots',
      selected: true
    },
    {
      id: 3,
      name: 'Fresh Broccoli',
      price: 60,
      quantity: 1,
      image: 'https://www.freshpoint.com/wp-content/uploads/2020/05/Freshpoint-Broccoli.jpg',
      description: 'Green fresh broccoli',
      selected: true
    },
    {
      id: 4,
      name: 'Organic Spinach',
      price: 30,
      quantity: 3,
      image: 'https://cdnprod.mafretailproxy.com/sys-master-root/h3c/h01/27195138703390/410456_1.jpg_480Wx480H',
      description: 'Fresh organic spinach leaves',
      selected: true
    }
  ])

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  // Function to toggle checkbox selection
  const toggleCheckbox = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  // Function to remove item from cart
  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(cartItems.filter(item => item.id !== id))
          }
        }
      ]
    )
  }

  // Function to handle order now
  // In MyOrder component, update the handleOrderNow function:
  const handleOrderNow = () => {
    const selectedItems = cartItems.filter(item => item.selected)

    if (selectedItems.length === 0) {
      Alert.alert('No Items Selected', 'Please select at least one item to order.')
      return
    }

    // Navigate to OrderDetails with all necessary data
    navigation.navigate('OrderDetails', {
      cartItems: selectedItems,
      totalInr: totalInr.toFixed(0),
      subtotalInr: subtotalInr.toFixed(0),
      discountInr: discountInr.toFixed(0),
      totalItems: totalItems
    })
  }

  // Convert USD to INR (approximate conversion rate)
  const usdToInr = (usd) => usd * 83

  // Calculate totals only for selected items
  const selectedItems = cartItems.filter(item => item.selected)
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = 4.5
  const deliveryFee = selectedItems.length > 0 ? 0 : 0 // Free delivery
  const total = subtotal - discount + deliveryFee

  // Convert to INR
  const subtotalInr = usdToInr(subtotal)
  const discountInr = usdToInr(discount)
  const totalInr = usdToInr(total)

  // Render empty cart state
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubText}>Add some items to get started</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={[
            styles.cartItem,
            !item.selected && styles.unselectedItem
          ]}>
            <TouchableOpacity
              style={[
                styles.checkBox,
                item.selected && styles.checkedBox
              ]}
              onPress={() => toggleCheckbox(item.id)}
            >
              {item.selected && <CheckIcon2 width={s(12)} height={s(12)} />}
            </TouchableOpacity>

            {/* Product Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode='contain'
              />
            </View>

            {/* Product Info */}
            <View style={styles.itemInfo}>
              <Text style={[
                styles.itemName,
                !item.selected && styles.unselectedText
              ]}>{item.name}</Text>
              <Text style={[
                styles.itemPrice,
                !item.selected && styles.unselectedText
              ]}>₹{usdToInr(item.price).toFixed(0)}</Text>

              <View style={styles.controlsContainer}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => decreaseQuantity(item.id)}
                    disabled={!item.selected}
                  >
                    <MinusIcon width={s(10)} height={s(10)} color={!item.selected ? '#ccc' : BRAND.muted} />
                  </TouchableOpacity>

                  <Text style={[
                    styles.quantityText,
                    !item.selected && styles.unselectedText
                  ]}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => increaseQuantity(item.id)}
                    disabled={!item.selected}
                  >
                    <PlusIcon width={s(10)} height={s(10)} color={!item.selected ? '#ccc' : BRAND.muted} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={styles.deleteButton}
                >
                  <DeleteIcon width={s(25)} height={s(25)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Payment Summary */}
      <View style={styles.paymentSummary}>
        <Text style={styles.summaryHeader}>Payment Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total Items ({totalItems})</Text>
          <Text style={styles.summaryAmount}>₹{subtotalInr.toFixed(0)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Delivery Fee</Text>
          <Text style={styles.freeText}>Free</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Discount</Text>
          <Text style={styles.discountText}>-₹{discountInr.toFixed(0)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>₹{totalInr.toFixed(0)}</Text>
        </View>
      </View>

      {/* Order Now Button */}
      <TouchableOpacity
        style={[
          styles.orderButton,
          selectedItems.length === 0 && styles.disabledButton
        ]}
        onPress={handleOrderNow}
        disabled={selectedItems.length === 0}
      >
        <Text style={styles.orderButtonText}>
          Order Now - ₹{totalInr.toFixed(0)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  cartItems: {
    flex: 1,
    marginTop: 12,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    gap: s(10),
    alignItems: 'center'
  },
  unselectedItem: {
    opacity: 0.6,
    backgroundColor: '#f0f0f0',
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND.primary,
    marginBottom: 8,
  },
  unselectedText: {
    color: '#999',
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(15)
  },
  quantityText: {
    fontSize: s(16),
    fontWeight: "600",
    color: BRAND.text,
    minWidth: s(20),
    textAlign: 'center'
  },
  imageContainer: {
    width: s(80),
    height: s(80),
    backgroundColor: '#fff',
    padding: s(10),
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  circle: {
    borderWidth: s(0.5),
    borderColor: BRAND.muted,
    alignItems: "center",
    justifyContent: "center",
    width: s(25),
    height: s(25),
    borderRadius: s(50)
  },
  checkBox: {
    width: s(20),
    height: s(20),
    borderWidth: s(0.5),
    borderRadius: s(3),
    borderColor: BRAND.muted,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  checkedBox: {
    backgroundColor: BRAND.orange,
    borderColor: BRAND.orange,
  },
  deleteButton: {
    padding: s(5),
  },
  paymentSummary: {
    backgroundColor: BRAND.white,
    borderWidth: 1,
    borderColor: BRAND.border,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  summaryHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  freeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  discountText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND.primary,
  },
  orderButton: {
    backgroundColor: BRAND.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})