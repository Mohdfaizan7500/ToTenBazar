import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, RefreshControl } from 'react-native'
import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import { BRAND, DARK } from '../../src/constant/colors'
import { DeleteIcon, MinusIcon, PlusIcon } from '../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { GetKartInfo, addToCart } from '../../store/slices/userSlice'

// Skeleton Loader Component with Wave Effect
const SkeletonLoader = memo(({ colors }) => {
  return (
    <View style={[styles.skeletonContainer, { backgroundColor: colors.bg }]}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={[styles.skeletonItem, { backgroundColor: colors.gray[100], borderColor: colors.border }]}>
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
  onRemove,
  colors
}) => {
  // Format price - divide by 100 if it's in paise
  const formatPrice = useCallback((price) => {
    if (!price) return 0;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    // If price seems too high (like 1802400), assume it's in paise and convert to rupees
    return numericPrice > 1000 ? numericPrice / 100 : numericPrice;
  }, [])

  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image load success
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Handle image load error
  const handleImageError = useCallback(() => {
    setImageLoaded(false);
  }, []);

  // Get image source - always show default first, then actual image when loaded
  const imageSource = useMemo(() => {
    const imageUri = item.image || item.product_image;

    if (!imageUri) {
      return require('../../src/images/default.jpg');
    }

    return { uri: imageUri };
  }, [item.image, item.product_image]);

  return (
    <View style={[
      styles.cartItem,
      { backgroundColor: colors.gray[100], borderColor: colors.border }
    ]}>
      <View style={[styles.imageContainer, { backgroundColor: colors.white, borderColor: colors.border }]}>
        {/* Default image as fallback */}
        <Image
          source={require('../../src/images/default.jpg')}
          style={styles.defaultImage}
          resizeMode='contain'
        />

        {/* Actual product image */}
        {(item.image || item.product_image) && (
          <Image
            source={imageSource}
            style={[
              styles.productImage,
              imageLoaded ? styles.imageLoaded : styles.imageLoading
            ]}
            resizeMode='contain'
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </View>

      <View style={styles.itemInfo}>
        <Text style={[
          styles.itemName,
          { color: colors.text }
        ]} numberOfLines={2}>
          {item.name || item.product_name || 'Product Name'}
        </Text>

        <Text style={[
          styles.itemPrice,
          { color: colors.primary }
        ]}>
          ₹{formatPrice(item.price || item.unit_price).toFixed(0)}
        </Text>

        {item.quantity && (
          <Text style={[styles.itemQuantity, { color: colors.muted }]}>
            Quantity: {item.quantity}
          </Text>
        )}

        <View style={styles.controlsContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[
                styles.circle,
                { borderColor: colors.muted }
              ]}
              onPress={() => onDecrease(item.id)}
            >
              <MinusIcon
                width={s(8)}
                height={s(8)}
                stroke={colors.muted}
              />
            </TouchableOpacity>

            <Text style={[
              styles.quantityText,
              { color: colors.text }
            ]}>
              {item.quantity || 1}
            </Text>

            <TouchableOpacity
              style={[
                styles.circle,
                { borderColor: colors.muted }
              ]}
              onPress={() => onIncrease(item.id)}
            >
              <PlusIcon
                width={s(8)}
                height={s(8)}
                stroke={colors.muted}
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
  const dispatch = useDispatch()

  // Get cart data from Redux store
  const { KartInfo, isKartInfoLoading, kartInfoError } = useSelector(state => state.user)
  console.log("kartInfo:", KartInfo)

  const Color = Theme ? DARK : BRAND;
  const [refreshing, setRefreshing] = useState(false)
  const [localCartItems, setLocalCartItems] = useState([])

  // Fetch cart data on component mount
  useEffect(() => {
    dispatch(GetKartInfo())
  }, [dispatch])

  // Update local cart items when KartInfo changes
  useEffect(() => {
    if (KartInfo?.items) {
      setLocalCartItems(KartInfo.items)
    }
  }, [KartInfo])

  // Refresh cart data
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(GetKartInfo()).finally(() => setRefreshing(false))
  }, [dispatch])

  // Transform API data to cart items format based on your actual API response
  const cartItems = useMemo(() => {
    if (!localCartItems || !Array.isArray(localCartItems)) {
      console.log("No cart items found in localCartItems:", localCartItems)
      return []
    }

    console.log("Processing cart items:", localCartItems)

    return localCartItems.map(item => {
      return {
        id: item.id || `item-${Math.random()}`,
        product_id: item.product?.id || item.product, // Extract product ID for payload
        name: item.product?.name || item.product_name || 'Unknown Product',
        price: item.unit_price || item.price || 0,
        quantity: item.quantity || 1,
        image: item.product?.image || item.product_image || null,
        description: item.product?.description || ''
      }
    })
  }, [localCartItems])

  const [isLoading, setIsLoading] = useState(false)

  // Common function to update cart via API
  const updateCartViaAPI = useCallback((updatedItems) => {
    const payload = {
      order_id: KartInfo.order_id,
      items: updatedItems.map(item => ({
        product: item.product?.id || item.product,
        quantity: item.quantity
      }))
    };

    console.log('Cart update payload:', payload);

    return dispatch(addToCart(payload))
      .then(() => {
        // Refresh cart data to ensure sync with server
        dispatch(GetKartInfo());
      })
      .catch((error) => {
        console.error('Error updating cart:', error);
        // Revert local state if API call fails
        dispatch(GetKartInfo());
        throw error;
      });
  }, [dispatch, KartInfo]);

  // Memoized cart operations - all using the same API
  const increaseQuantity = useCallback((id) => {
    const updatedLocalItems = localCartItems.map(item =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );

    // Update local state immediately for better UX
    setLocalCartItems(updatedLocalItems);

    // Update via API
    updateCartViaAPI(updatedLocalItems)
      .catch(() => {
        // Error handling is done in updateCartViaAPI
      });
  }, [dispatch, localCartItems, updateCartViaAPI])

  const decreaseQuantity = useCallback((id) => {
    const itemToUpdate = localCartItems.find(item => item.id === id);
    if (!itemToUpdate) return;

    let updatedLocalItems;

    if ((itemToUpdate.quantity || 1) > 1) {
      // Decrease quantity
      updatedLocalItems = localCartItems.map(item =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      );
    } else {
      // Remove item if quantity becomes 0
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from your cart?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              const itemsAfterRemoval = localCartItems.filter(item => item.id !== id);
              setLocalCartItems(itemsAfterRemoval);
              updateCartViaAPI(itemsAfterRemoval);
            }
          }
        ]
      );
      return;
    }

    // Update local state immediately for better UX
    setLocalCartItems(updatedLocalItems);

    // Update via API
    updateCartViaAPI(updatedLocalItems)
      .catch(() => {
        // Error handling is done in updateCartViaAPI
      });
  }, [dispatch, localCartItems, updateCartViaAPI])

  // Remove item function using the same API
  const removeItem = useCallback((itemIdToRemove) => {
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
            // Update local state immediately for better UX
            const updatedLocalItems = localCartItems.filter(item => item.id !== itemIdToRemove);
            setLocalCartItems(updatedLocalItems);

            // Update via API
            updateCartViaAPI(updatedLocalItems)
              .catch(() => {
                // Error handling is done in updateCartViaAPI
              });
          }
        }
      ]
    )
  }, [localCartItems, updateCartViaAPI])

  // Memoized calculations - convert paise to rupees
  const { totalItems, subtotalInr, discountInr, totalInr, deliveryFee } = useMemo(() => {
    const totalItemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)

    // Calculate subtotal - convert from paise to rupees if needed
    const subtotalPaise = cartItems.reduce((sum, item) => {
      const price = item.price || 0
      const quantity = item.quantity || 1
      return sum + (price * quantity)
    }, 0)

    // Convert to rupees (divide by 100 if it's in paise)
    const subtotal = subtotalPaise > 1000 ? subtotalPaise / 100 : subtotalPaise

    // Use API values or defaults
    const discount = KartInfo?.discount_amount || 0
    const deliveryFee = KartInfo?.delivery_charge || 0

    // Convert total amount from API if available, otherwise calculate
    let total = 0
    if (KartInfo?.total_amount) {
      total = KartInfo.total_amount > 1000 ? KartInfo.total_amount / 100 : KartInfo.total_amount
    } else {
      total = Math.max(0, subtotal - discount + deliveryFee)
    }

    return {
      totalItems: totalItemsCount,
      subtotalInr: subtotal,
      discountInr: discount,
      deliveryFee: deliveryFee,
      totalInr: total
    }
  }, [cartItems, KartInfo])

  // Memoized order handler
  const handleOrderNow = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart before ordering.')
      return
    }

    setIsLoading(true)

    // Navigate to order details with dynamic data
    navigation.navigate('OrderDetails', {
      cartItems: cartItems,
      totalInr: totalInr.toFixed(0),
      subtotalInr: subtotalInr.toFixed(0),
      discountInr: discountInr.toFixed(0),
      deliveryFee: deliveryFee.toFixed(0),
      totalItems: totalItems,
      orderId: KartInfo?.order_id // Pass the order ID if available
    })

    setIsLoading(false)
  }, [cartItems, totalInr, subtotalInr, discountInr, deliveryFee, totalItems, navigation, KartInfo])

  // Show skeleton loader during loading state
  if (isKartInfoLoading && localCartItems.length === 0) {
    return <SkeletonLoader colors={Color} />
  }

  // Show error state
  if (kartInfoError) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: Color.bg }]}>
        <Text style={[styles.emptyText, { color: Color.error }]}>Error Loading Cart</Text>
        <Text style={[styles.emptySubText, { color: Color.muted }]}>{kartInfoError}</Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: Color.primary }]}
          onPress={onRefresh}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: Color.bg }]}>
        <Text style={[styles.emptyText, { color: Color.text }]}>Your cart is empty</Text>
        <Text style={[styles.emptySubText, { color: Color.muted }]}>Add some items to get started</Text>
        <TouchableOpacity
          style={[styles.shopButton, { backgroundColor: Color.primary }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Color.bg }]}>
      <ScrollView
        style={styles.cartItems}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Color.primary]}
            tintColor={Color.primary}
          />
        }
      >
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
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
          <Text style={[deliveryFee === 0 ? styles.freeText : styles.summaryAmount,
          deliveryFee === 0 ? { color: Color.green } : { color: Color.text }]}>
            {deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(0)}`}
          </Text>
        </View>

        {discountInr > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, { color: Color.muted }]}>Discount</Text>
            <Text style={[styles.discountText, { color: Color.primary }]}>-₹{discountInr.toFixed(0)}</Text>
          </View>
        )}

        <View style={[styles.totalRow, { borderTopColor: Color.border }]}>
          <Text style={[styles.totalText, { color: Color.text }]}>Total</Text>
          <Text style={[styles.totalAmount, { color: Color.primary }]}>₹{totalInr.toFixed(0)}</Text>
        </View>
      </View>

      {/* Order Now Button */}
      <TouchableOpacity
        style={[
          styles.orderButton,
          { backgroundColor: Color.primary }
        ]}
        onPress={handleOrderNow}
        disabled={cartItems.length === 0 || isLoading}
      >
        <Text style={styles.orderButtonText}>
          {isLoading ? 'Processing...' : `Order Now - ₹${totalInr.toFixed(0)}`}
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
    marginBottom: vs(16),
  },
  retryButton: {
    paddingHorizontal: s(24),
    paddingVertical: vs(10),
    borderRadius: s(8),
  },
  retryButtonText: {
    color: '#fff',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  shopButton: {
    paddingHorizontal: s(24),
    paddingVertical: vs(12),
    borderRadius: s(8),
  },
  shopButtonText: {
    color: '#fff',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  cartItems: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: s(10), // This is the box padding (10)
    borderRadius: s(8),
    marginBottom: vs(8),
    borderWidth: 1,
    gap: s(8),
    alignItems: 'center'
  },
  imageContainer: {
    width: s(65),
    height: s(65),
    padding: s(10), // Inner padding for the image box
    borderRadius: s(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  defaultImage: {
    width: '100%',
    height: '100%',
  },
  productImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageLoaded: {
    opacity: 1,
  },
  imageLoading: {
    opacity: 0,
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
    marginBottom: vs(2),
  },
  itemQuantity: {
    fontSize: ms(11),
    marginBottom: vs(4),
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
  circle: {
    borderWidth: s(0.5),
    alignItems: "center",
    justifyContent: "center",
    width: s(22),
    height: s(22),
    borderRadius: s(50)
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
    marginBottom: vs(8),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(6),
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