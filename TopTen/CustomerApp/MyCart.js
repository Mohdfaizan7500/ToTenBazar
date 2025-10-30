import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useCallback, useMemo, memo } from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import { BRAND, DARK } from '../../src/constant/colors'
import { CheckIcon, CheckIcon2, DeleteIcon, MinusIcon, PlusIcon } from '../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

// Skeleton Loader Component with Wave Effect
const SkeletonLoader = memo(({ colors }) => {
  return (
    <View style={[styles.skeletonContainer, { backgroundColor: colors.bg }]}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={[styles.skeletonItem, { backgroundColor: colors.gray[100], borderColor: colors.border }]}>
          <View style={[styles.skeletonCheckbox, { backgroundColor: colors.gray[300] }]} />
          <View style={[styles.skeletonImage, { backgroundColor: colors.gray[300] }]} />
          <View style={styles.skeletonContent}>
            <View style={[styles.skeletonText, { backgroundColor: colors.gray[300] }]} />
            <View style={[styles.skeletonText, { width: '40%', backgroundColor: colors.gray[300] }]} />
            <View style={styles.skeletonControls}>
              <View style={[styles.skeletonCircle, { backgroundColor: colors.gray[300] }]} />
              <View style={[styles.skeletonQuantity, { backgroundColor: colors.gray[300] }]} />
              <View style={[styles.skeletonCircle, { backgroundColor: colors.gray[300] }]} />
              <View style={[styles.skeletonDelete, { backgroundColor: colors.gray[300] }]} />
            </View>
          </View>
        </View>
      ))}
      <View style={[styles.skeletonSummary, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <View style={[styles.skeletonSummaryHeader, { backgroundColor: colors.gray[300] }]} />
        {[1, 2, 3].map((item) => (
          <View key={item} style={[styles.skeletonSummaryRow, { backgroundColor: colors.gray[300] }]} />
        ))}
        <View style={[styles.skeletonTotalRow, { backgroundColor: colors.gray[300] }]} />
      </View>
      <View style={[styles.skeletonButton, { backgroundColor: colors.gray[300] }]} />
    </View>
  )
})

// Memoized Cart Item Component to prevent unnecessary re-renders
const CartItem = memo(({
  item,
  onIncrease,
  onDecrease,
  onToggle,
  onRemove,
  colors
}) => {
  const usdToInr = useCallback((usd) => usd * 83, [])

  return (
    <View style={[
      styles.cartItem,
      { backgroundColor: colors.gray[100], borderColor: colors.border },
      !item.selected && [styles.unselectedItem, { backgroundColor: colors.gray[200] }]
    ]}>
      <TouchableOpacity
        style={[
          styles.checkBox,
          { borderColor: colors.muted, backgroundColor: colors.white },
          item.selected && [styles.checkedBox, { backgroundColor: colors.orange, borderColor: colors.orange }]
        ]}
        onPress={() => onToggle(item.id)}
      >
        {item.selected && <CheckIcon2 width={s(10)} height={s(10)} color={colors.white} />}
      </TouchableOpacity>

      <View style={[styles.imageContainer, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode='contain'
        />
      </View>

      <View style={styles.itemInfo}>
        <Text style={[
          styles.itemName,
          { color: colors.text },
          !item.selected && [styles.unselectedText, { color: colors.muted }]
        ]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[
          styles.itemPrice,
          { color: colors.primary },
          !item.selected && [styles.unselectedText, { color: colors.muted }]
        ]}>
          ₹{usdToInr(item.price).toFixed(0)}
        </Text>

        <View style={styles.controlsContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[
                styles.circle, 
                { borderColor: colors.muted },
                !item.selected && [styles.disabledCircle, { borderColor: colors.gray[400] }]
              ]}
              onPress={() => onDecrease(item.id)}
              disabled={!item.selected}
            >
              <MinusIcon
                width={s(8)}
                height={s(8)}
                stroke={!item.selected ? colors.gray[900] : colors.muted}
              />
            </TouchableOpacity>

            <Text style={[
              styles.quantityText,
              { color: colors.text },
              !item.selected && [styles.unselectedText, { color: colors.muted }]
            ]}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              style={[
                styles.circle, 
                { borderColor: colors.muted },
                !item.selected && [styles.disabledCircle, { borderColor: colors.gray[100] }]
              ]}
              onPress={() => onIncrease(item.id)}
              disabled={!item.selected}
            >
              <PlusIcon
                width={s(8)}
                height={s(8)}
                stroke={!item.selected ? colors.gray[100] : colors.muted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.deleteButton}
          >
            <DeleteIcon width={s(20)} height={s(20)} color={colors.muted} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})

const MyOrder = () => {
  const navigation = useNavigation()
  const Theme = useSelector(state => state?.auth?.Theme)

  const Color = Theme ? DARK : BRAND;
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
    return <SkeletonLoader colors={Color} />
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: Color.bg }]}>
        <Text style={[styles.emptyText, { color: Color.text }]}>Your cart is empty</Text>
        <Text style={[styles.emptySubText, { color: Color.muted }]}>Add some items to get started</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Color.bg }]}>
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
            colors={Color}
          />
        ))}
      </ScrollView>

      {/* Payment Summary */}
      <View style={[styles.paymentSummary, { backgroundColor: Color.white, borderColor: Color.border }]}>
        <Text style={[styles.summaryHeader, { color: Color.text }]}>Payment Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryText, { color: Color.muted }]}>Total Items ({totalItems})</Text>
          <Text style={[styles.summaryAmount, { color: Color.text }]}>₹{subtotalInr.toFixed(0)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryText, { color: Color.muted }]}>Delivery Fee</Text>
          <Text style={[styles.freeText, { color: Color.green }]}>Free</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryText, { color: Color.muted }]}>Discount</Text>
          <Text style={[styles.discountText, { color: Color.primary }]}>-₹{discountInr.toFixed(0)}</Text>
        </View>

        <View style={[styles.totalRow, { borderTopColor: Color.border }]}>
          <Text style={[styles.totalText, { color: Color.text }]}>Total</Text>
          <Text style={[styles.totalAmount, { color: Color.primary }]}>₹{totalInr.toFixed(0)}</Text>
        </View>
      </View>

      {/* Order Now Button */}
      <TouchableOpacity
        style={[
          styles.orderButton,
          { backgroundColor: Color.primary },
          selectedItems.length === 0 && [styles.disabledButton, { backgroundColor: Color.gray[400] }]
        ]}
        onPress={handleOrderNow}
        disabled={selectedItems.length === 0}
      >
        <Text style={styles.orderButtonText}>
          Order Now - ₹{totalInr.toFixed(0)}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default memo(MyOrder)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(12),
  },
  scrollContent: {
    paddingTop: vs(5),
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(12),
  },
  emptyText: {
    fontSize: ms(16),
    fontWeight: 'bold',
    marginBottom: vs(6),
  },
  emptySubText: {
    fontSize: ms(14),
    textAlign: 'center',
  },
  cartItems: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: s(10),
    borderRadius: s(8),
    marginBottom: vs(8),
    borderWidth: 1,
    gap: s(8),
    alignItems: 'center'
  },
  unselectedItem: {
    opacity: 0.6,
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
    fontSize: ms(12),
    fontWeight: '600',
    marginBottom: vs(1),
    lineHeight: ms(16),
  },
  itemPrice: {
    fontSize: ms(14),
    fontWeight: 'bold',
    marginBottom: vs(6),
  },
  unselectedText: {
    // Color handled via props
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(12)
  },
  quantityText: {
    fontSize: ms(14),
    fontWeight: "600",
    minWidth: s(18),
    textAlign: 'center'
  },
  imageContainer: {
    width: s(65),
    height: s(65),
    padding: s(8),
    borderRadius: s(10),
    borderWidth: 1,
  },
  circle: {
    borderWidth: s(0.5),
    alignItems: "center",
    justifyContent: "center",
    width: s(22),
    height: s(22),
    borderRadius: s(50)
  },
  disabledCircle: {
    // Border color handled via props
  },
  checkBox: {
    width: s(18),
    height: s(18),
    borderWidth: s(0.5),
    borderRadius: s(3),
    justifyContent: "center",
    alignItems: "center"
  },
  checkedBox: {
    // Background and border color handled via props
  },
  deleteButton: {
    padding: s(4),
  },
  paymentSummary: {
    borderWidth: 1,
    paddingHorizontal: s(12),
    paddingVertical: vs(10),
    borderRadius: s(8),
    marginBottom: vs(4),
  },
  summaryHeader: {
    fontSize: ms(12),
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: ms(11),
  },
  summaryAmount: {
    fontSize: ms(11),
    fontWeight: '600',
  },
  freeText: {
    fontSize: ms(12),
    fontWeight: '600',
  },
  discountText: {
    fontSize: ms(12),
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(4),
    paddingTop: vs(8),
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: ms(16),
    fontWeight: 'bold',
  },
  orderButton: {
    paddingVertical: vs(12),
    borderRadius: s(8),
    alignItems: 'center',
    marginBottom: vs(8),
  },
  disabledButton: {
    // Background color handled via props
  },
  orderButtonText: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: '#fff',
  },
  // Skeleton Loader Styles
  skeletonContainer: {
    flex: 1,
    paddingHorizontal: s(12),
  },
  skeletonItem: {
    flexDirection: 'row',
    padding: s(10),
    borderRadius: s(8),
    marginBottom: vs(8),
    borderWidth: 1,
    gap: s(8),
    alignItems: 'center'
  },
  skeletonCheckbox: {
    width: s(18),
    height: s(18),
    borderRadius: s(3),
  },
  skeletonImage: {
    width: s(65),
    height: s(65),
    borderRadius: s(10),
  },
  skeletonContent: {
    flex: 1,
    gap: vs(6),
  },
  skeletonText: {
    height: ms(14),
    borderRadius: s(4),
    width: '70%',
  },
  skeletonControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
  },
  skeletonCircle: {
    width: s(22),
    height: s(22),
    borderRadius: s(50),
  },
  skeletonQuantity: {
    width: s(18),
    height: ms(14),
    borderRadius: s(4),
  },
  skeletonDelete: {
    width: s(20),
    height: s(20),
    borderRadius: s(4),
    marginLeft: 'auto',
  },
  skeletonSummary: {
    borderWidth: 1,
    paddingHorizontal: s(12),
    paddingVertical: vs(10),
    borderRadius: s(8),
    marginBottom: vs(4),
    gap: vs(6),
  },
  skeletonSummaryHeader: {
    height: ms(12),
    borderRadius: s(4),
    width: '40%',
    marginBottom: vs(2),
  },
  skeletonSummaryRow: {
    height: ms(11),
    borderRadius: s(4),
    width: '100%',
  },
  skeletonTotalRow: {
    height: ms(14),
    borderRadius: s(4),
    width: '100%',
    marginTop: vs(4),
  },
  skeletonButton: {
    height: vs(45),
    borderRadius: s(8),
    marginBottom: vs(8),
  },
})