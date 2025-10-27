import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useCallback, useMemo, memo } from 'react'
import BRAND from '../../src/constant/color'
import { s, vs, ms } from 'react-native-size-matters'
import { CheckIcon, CheckIcon2, DeleteIcon, MinusIcon, PlusIcon } from '../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'

// Skeleton Loader Component with Wave Effect
const SkeletonLoader = memo(() => {
  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.skeletonItem}>
          <View style={styles.skeletonCheckbox} />
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonText} />
            <View style={[styles.skeletonText, { width: '40%' }]} />
            <View style={styles.skeletonControls}>
              <View style={styles.skeletonCircle} />
              <View style={styles.skeletonQuantity} />
              <View style={styles.skeletonCircle} />
              <View style={styles.skeletonDelete} />
            </View>
          </View>
        </View>
      ))}
      <View style={styles.skeletonSummary}>
        <View style={styles.skeletonSummaryHeader} />
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.skeletonSummaryRow} />
        ))}
        <View style={styles.skeletonTotalRow} />
      </View>
      <View style={styles.skeletonButton} />
    </View>
  )
})

// Memoized Cart Item Component to prevent unnecessary re-renders
const CartItem = memo(({
  item,
  onIncrease,
  onDecrease,
  onToggle,
  onRemove
}) => {
  const usdToInr = useCallback((usd) => usd * 83, [])

  return (
    <View style={[
      styles.cartItem,
      !item.selected && styles.unselectedItem
    ]}>
      <TouchableOpacity
        style={[
          styles.checkBox,
          item.selected && styles.checkedBox
        ]}
        onPress={() => onToggle(item.id)}
      >
        {item.selected && <CheckIcon2 width={s(12)} height={s(12)} />}
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode='contain'
        />
      </View>

      <View style={styles.itemInfo}>
        <Text style={[
          styles.itemName,
          !item.selected && styles.unselectedText
        ]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[
          styles.itemPrice,
          !item.selected && styles.unselectedText
        ]}>
          ₹{usdToInr(item.price).toFixed(0)}
        </Text>

        <View style={styles.controlsContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.circle, !item.selected && styles.disabledCircle]}
              onPress={() => onDecrease(item.id)}
              disabled={!item.selected}
            >
              <MinusIcon
                width={s(10)}
                height={s(10)}
                color={!item.selected ? '#ccc' : BRAND.muted}
              />
            </TouchableOpacity>

            <Text style={[
              styles.quantityText,
              !item.selected && styles.unselectedText
            ]}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              style={[styles.circle, !item.selected && styles.disabledCircle]}
              onPress={() => onIncrease(item.id)}
              disabled={!item.selected}
            >
              <PlusIcon
                width={s(10)}
                height={s(10)}
                color={!item.selected ? '#ccc' : BRAND.muted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.deleteButton}
          >
            <DeleteIcon width={s(25)} height={s(25)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})

const MyOrder = () => {
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
  const [isLoading, setIsLoading] = useState(false)

  // Memoized USD to INR conversion
  const usdToInr = useCallback((usd) => usd * 83, [])

  // Memoized cart operations
  const increaseQuantity = useCallback((id) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }, [])

  const decreaseQuantity = useCallback((id) => {
    setCartItems(prev => prev.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }, [])

  const toggleCheckbox = useCallback((id) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }, [])

  const removeItem = useCallback((id) => {
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
            setCartItems(prev => prev.filter(item => item.id !== id))
          }
        }
      ]
    )
  }, [])

  // Memoized calculations
  const { selectedItems, totalItems, subtotalInr, discountInr, totalInr } = useMemo(() => {
    const selected = cartItems.filter(item => item.selected)
    const totalItemsCount = selected.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = selected.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discount = 4.5
    const deliveryFee = selected.length > 0 ? 0 : 0
    const total = subtotal - discount + deliveryFee

    return {
      selectedItems: selected,
      totalItems: totalItemsCount,
      subtotalInr: usdToInr(subtotal),
      discountInr: usdToInr(discount),
      totalInr: usdToInr(total)
    }
  }, [cartItems, usdToInr])

  // Memoized order handler
  const handleOrderNow = useCallback(() => {
    if (selectedItems.length === 0) {
      Alert.alert('No Items Selected', 'Please select at least one item to order.')
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      navigation.navigate('OrderDetails', {
        cartItems: selectedItems,
        totalInr: totalInr.toFixed(0),
        subtotalInr: subtotalInr.toFixed(0),
        discountInr: discountInr.toFixed(0),
        totalItems: totalItems
      })
      setIsLoading(false)
    }, 500)
  }, [selectedItems, totalInr, subtotalInr, discountInr, totalItems, navigation])

  // Show skeleton loader during loading state
  if (isLoading) {
    return <SkeletonLoader />
  }

  // Empty cart state
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
      <ScrollView
        style={styles.cartItems}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onToggle={toggleCheckbox}
            onRemove={removeItem}
          />
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

export default memo(MyOrder)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: s(16),
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(16),
  },
  emptyText: {
    fontSize: ms(20),
    fontWeight: 'bold',
    color: '#666',
    marginBottom: vs(8),
  },
  emptySubText: {
    fontSize: ms(16),
    color: '#999',
    textAlign: 'center',
  },
  cartItems: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: s(12),
    borderRadius: s(10),
    marginBottom: vs(10),
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
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: ms(14),
    fontWeight: '600',
    color: '#333',
    marginBottom: vs(2),
    lineHeight: ms(18),
  },
  itemPrice: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: BRAND.primary,
    marginBottom: vs(8),
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
    fontSize: ms(16),
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
  disabledCircle: {
    borderColor: '#ccc',
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
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    borderRadius: s(10),
    marginBottom: vs(5),
  },
  summaryHeader: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: '#333',
    // marginBottom: vs(12),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: vs(4),
  },
  summaryText: {
    fontSize: ms(12),
    color: '#666',
  },
  summaryAmount: {
    fontSize: ms(12),
    fontWeight: '600',
    color: '#333',
  },
  freeText: {
    fontSize: ms(14),
    fontWeight: '600',
    color: '#4CAF50',
  },
  discountText: {
    fontSize: ms(14),
    fontWeight: '600',
    color: BRAND.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(6),
    paddingTop: vs(10),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: ms(18),
    fontWeight: 'bold',
    color: BRAND.primary,
  },
  orderButton: {
    backgroundColor: BRAND.primary,
    paddingVertical: vs(14),
    borderRadius: s(10),
    alignItems: 'center',
    marginBottom: vs(10),
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: '#fff',
  },
  // Skeleton Loader Styles
  skeletonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: s(16),
  },
  skeletonItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: s(12),
    borderRadius: s(10),
    marginBottom: vs(10),
    borderWidth: 1,
    borderColor: '#e8e8e8',
    gap: s(10),
    alignItems: 'center'
  },
  skeletonCheckbox: {
    width: s(20),
    height: s(20),
    borderRadius: s(3),
    backgroundColor: '#e0e0e0',
  },
  skeletonImage: {
    width: s(80),
    height: s(80),
    borderRadius: s(12),
    backgroundColor: '#e0e0e0',
  },
  skeletonContent: {
    flex: 1,
    gap: vs(8),
  },
  skeletonText: {
    height: ms(16),
    backgroundColor: '#e0e0e0',
    borderRadius: s(4),
    width: '70%',
  },
  skeletonControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(15),
  },
  skeletonCircle: {
    width: s(25),
    height: s(25),
    borderRadius: s(50),
    backgroundColor: '#e0e0e0',
  },
  skeletonQuantity: {
    width: s(20),
    height: ms(16),
    backgroundColor: '#e0e0e0',
    borderRadius: s(4),
  },
  skeletonDelete: {
    width: s(25),
    height: s(25),
    borderRadius: s(4),
    backgroundColor: '#e0e0e0',
    marginLeft: 'auto',
  },
  skeletonSummary: {
    backgroundColor: BRAND.white,
    borderWidth: 1,
    borderColor: BRAND.border,
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    borderRadius: s(10),
    marginBottom: vs(5),
    gap: vs(8),
  },
  skeletonSummaryHeader: {
    height: ms(14),
    backgroundColor: '#e0e0e0',
    borderRadius: s(4),
    width: '40%',
    marginBottom: vs(4),
  },
  skeletonSummaryRow: {
    height: ms(12),
    backgroundColor: '#e0e0e0',
    borderRadius: s(4),
    width: '100%',
  },
  skeletonTotalRow: {
    height: ms(16),
    backgroundColor: '#e0e0e0',
    borderRadius: s(4),
    width: '100%',
    marginTop: vs(6),
  },
  skeletonButton: {
    height: vs(50),
    backgroundColor: '#e0e0e0',
    borderRadius: s(10),
    marginBottom: vs(10),
  },
})