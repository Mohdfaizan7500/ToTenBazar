import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Animated, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { CupponIcon } from '../../../src/SVGicons/icon'
import { s, vs, ms } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { BRAND, DARK } from '../../../src/constant/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { applyCoupon, fetchCoupons, removeCoupon } from '../../../store/slices/userSlice'
import { useRoute } from '@react-navigation/native'

const Offers = () => {
  const route = useRoute()
  const amount = route.params?.amount || 0
  console.log("amount:", amount)
  
  const Theme = useSelector(state => state.auth.Theme)
  const colors = Theme ? DARK : BRAND
  const {
    coupons,
    appliedCoupon,
    isCouponsLoading,
    couponsError,
    isApplyingCoupon
  } = useSelector(state => state.user);

  const dispatch = useDispatch();

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allCoupons, setAllCoupons] = useState([]);
  // Refresh control state
  const [refreshing, setRefreshing] = useState(false);

  console.log("coupons:", coupons)

  // Load initial coupons
  useEffect(() => {
    setCurrentPage(1);
    setAllCoupons([]);
    setHasMore(true);
    dispatch(fetchCoupons({ page: 1, limit: 10, loadMore: false }));
  }, [dispatch]);

  // Merge new coupons with existing ones
  useEffect(() => {
    if (coupons?.coupons) {
      if (currentPage === 1) {
        // First page - replace all coupons
        setAllCoupons(coupons.coupons);
      } else {
        // Subsequent pages - append coupons
        setAllCoupons(prev => [...prev, ...coupons.coupons]);
      }

      // Check if there are more pages to load
      if (coupons.pagination) {
        setHasMore(coupons.pagination.hasNext);
      } else {
        // Fallback if pagination data is not available
        const hasMoreCoupons = coupons.coupons && coupons.coupons.length >= 10;
        setHasMore(hasMoreCoupons);
      }
    }

    if (isLoadingMore) {
      setIsLoadingMore(false);
    }

    // Stop refresh when data is loaded
    if (refreshing) {
      setRefreshing(false);
    }
  }, [coupons, currentPage, isLoadingMore, refreshing]);

  // Check if coupon is applicable based on order amount
  const isCouponApplicable = useCallback((coupon) => {
    const minOrderAmount = coupon.min_order_amount || coupon.minimum_amount || 0;
    // Convert both amounts to numbers for comparison
    const minAmount = typeof minOrderAmount === 'string' ? parseFloat(minOrderAmount) : minOrderAmount;
    const orderAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Coupon is applicable if order amount meets minimum requirement
    return orderAmount >= minAmount;
  }, [amount]);

  // Filter coupons based on order amount
  const applicableCoupons = useMemo(() => {
    if (!allCoupons.length) return [];
    
    return allCoupons.filter(coupon => isCouponApplicable(coupon));
  }, [allCoupons, isCouponApplicable]);

  // Apply coupon function
  const handleApplyCoupon = useCallback((couponCode) => {
    dispatch(applyCoupon(couponCode));
  }, [dispatch]);

  // Clear applied coupon
  const handleRemoveCoupon = useCallback(() => {
    dispatch(removeCoupon());
  }, [dispatch]);

  // Load more coupons
  const loadMoreCoupons = useCallback(() => {
    if (!isLoadingMore && hasMore && !isCouponsLoading) {
      const nextPage = currentPage + 1;
      setIsLoadingMore(true);
      setCurrentPage(nextPage);
      dispatch(fetchCoupons({ page: nextPage, limit: 10, loadMore: true }));
    }
  }, [currentPage, isLoadingMore, hasMore, isCouponsLoading, dispatch]);

  // Refresh coupons - pull to refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(1);
    setAllCoupons([]);
    setHasMore(true);
    dispatch(fetchCoupons({ page: 1, limit: 10, loadMore: false }));
  }, [dispatch]);

  // Manual refresh function
  const handleManualRefresh = useCallback(() => {
    if (!refreshing && !isCouponsLoading) {
      handleRefresh();
    }
  }, [refreshing, isCouponsLoading, handleRefresh]);

  // Helper function to format amount (no division by 100)
  const formatAmount = useCallback((amount) => {
    if (!amount) return 0;
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    // Return the amount as is without dividing by 100
    return Math.floor(numericAmount);
  }, []);

  // Format coupon description based on discount type
  const formatCouponDescription = useCallback((coupon) => {
    const discountValue = formatAmount(coupon.discount_value || coupon.discount || 0);
    const discountType = coupon.discount_type?.toLowerCase() || 'percentage';
    const minOrderAmount = formatAmount(coupon.min_order_amount || coupon.minimum_amount || 0);

    if (discountType === 'percentage' || discountType === 'percent') {
      if (minOrderAmount > 0) {
        return `Get ${discountValue}% off on order above ₹${minOrderAmount}`;
      } else {
        return `Get ${discountValue}% off on your order`;
      }
    } else {
      // Flat discount
      if (minOrderAmount > 0) {
        return `Flat ₹${discountValue} off on order above ₹${minOrderAmount}`;
      } else {
        return `Flat ₹${discountValue} off on your order`;
      }
    }
  }, [formatAmount]);

  // Format discount badge display
  const formatDiscountBadge = useCallback((coupon) => {
    const discountValue = formatAmount(coupon.discount_value || coupon.discount || 0);
    const discountType = coupon.discount_type?.toLowerCase() || 'percentage';

    if (discountType === 'percentage' || discountType === 'percent') {
      return `${discountValue}% OFF`;
    } else {
      return `₹${discountValue} OFF`;
    }
  }, [formatAmount]);

  // Get amount needed for coupon
  const getAmountNeeded = useCallback((coupon) => {
    const minOrderAmount = coupon.min_order_amount || coupon.minimum_amount || 0;
    const minAmount = typeof minOrderAmount === 'string' ? parseFloat(minOrderAmount) : minOrderAmount;
    const orderAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    const amountNeeded = minAmount - orderAmount;
    return amountNeeded > 0 ? amountNeeded : 0;
  }, [amount]);

  // Format coupon data for display
  const formatCouponData = useCallback((coupon) => {
    const discountType = coupon.discount_type?.toLowerCase() || 'percentage';
    const discountValue = formatAmount(coupon.discount_value || coupon.discount || 0);
    const minOrderAmount = formatAmount(coupon.min_order_amount || coupon.minimum_amount || 0);
    const maxDiscount = coupon.max_discount_amount ? formatAmount(coupon.max_discount_amount) : null;
    const isApplicable = isCouponApplicable(coupon);
    const amountNeeded = getAmountNeeded(coupon);

    const description = formatCouponDescription(coupon);

    return {
      id: coupon.id || coupon.coupon_id,
      code: coupon.coupon_code || coupon.code || 'COUPON',
      description: description,
      discountType: discountType,
      discountValue: discountValue,
      minOrderAmount: minOrderAmount,
      maxDiscount: maxDiscount,
      validUntil: coupon.valid_until || coupon.expiry_date,
      note: coupon.note || '🔥 Limited Time Offer – Don\'t Miss Out!',
      isApplicable: isApplicable,
      amountNeeded: amountNeeded,
      originalData: coupon
    };
  }, [formatAmount, formatCouponDescription, isCouponApplicable, getAmountNeeded]);

  // Skeleton Loader Component with Shining Effect
  const SkeletonLoader = React.memo(() => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const startShimmer = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(shimmerAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(shimmerAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      startShimmer();
    }, [shimmerAnim]);

    const shimmerTranslate = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 100],
    });

    return (
      <View style={[styles.skeletonCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <Animated.View 
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslate }],
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }
          ]} 
        />
        
        {/* Header section */}
        <View style={styles.skeletonHeader}>
          <View style={[styles.skeletonCircle, { backgroundColor: colors.border }]} />
          <View style={[styles.skeletonBadge, { backgroundColor: colors.border }]} />
        </View>

        {/* Code and button section */}
        <View style={styles.skeletonRow}>
          <View style={[styles.skeletonTextLarge, { backgroundColor: colors.border }]} />
          <View style={[styles.skeletonButton, { backgroundColor: colors.border }]} />
        </View>

        {/* Description section */}
        <View style={styles.skeletonRow}>
          <View style={[styles.skeletonTextMedium, { backgroundColor: colors.border }]} />
        </View>

        {/* Additional info section */}
        <View style={styles.skeletonRow}>
          <View style={[styles.skeletonTextSmall, { backgroundColor: colors.border }]} />
        </View>

        {/* Note section */}
        <View style={styles.skeletonRow}>
          <View style={[styles.skeletonTextXSmall, { backgroundColor: colors.border }]} />
        </View>
      </View>
    );
  });

  // Render multiple skeleton loaders
  const renderSkeletonLoaders = useCallback(() => {
    return Array.from({ length: 5 }).map((_, index) => (
      <SkeletonLoader key={`skeleton-${index}`} />
    ));
  }, []);

  // Render footer with loading indicator
  const renderFooter = useCallback(() => {
    if (!isLoadingMore && !hasMore && applicableCoupons.length > 0) {
      return (
        <View style={styles.endOfList}>
          <Text style={[styles.endOfListText, { color: colors.muted }]}>
            No more offers available
          </Text>
        </View>
      );
    }

    if (!isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={[styles.footerText, { color: colors.text }]}>
          Loading more offers...
        </Text>
      </View>
    );
  }, [isLoadingMore, hasMore, applicableCoupons.length, colors]);

  // Render individual coupon item
  const renderCouponItem = ({ item }) => {
    const formattedCoupon = formatCouponData(item);
    const discountBadge = formatDiscountBadge(item);
    const isApplicable = formattedCoupon.isApplicable;
    const isApplied = appliedCoupon?.code === formattedCoupon.code;

    return (
      <View style={[
        styles.offerCard, 
        {
          backgroundColor: colors.white,
          borderColor: colors.border
        }
      ]}>
        <View style={styles.couponHeader}>
          <CupponIcon width={s(20)} height={s(20)} />
          <View style={[
            styles.couponBadge,
            {
              backgroundColor: formattedCoupon.discountType === 'percentage'
                ? '#FF6B6B'
                : '#4ECDC4'
            }
          ]}>
            <Text style={styles.couponBadgeText}>
              {discountBadge}
            </Text>
          </View>
        </View>

        <View style={styles.offerHeader}>
          <View style={styles.codeContainer}>
            <Text style={[
              styles.offerCode, 
              { color: colors.text }
            ]}>
              {formattedCoupon.code}
            </Text>
            {!isApplicable && (
              <Text style={styles.amountNeededText}>
                Add ₹{formattedCoupon.amountNeeded} more to apply
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.applyButton, 
              {
                backgroundColor: isApplied
                  ? colors.success
                  : isApplicable 
                    ? colors.orange 
                    : colors.muted
              }
            ]}
            onPress={() =>
              isApplied
                ? handleRemoveCoupon()
                : handleApplyCoupon(formattedCoupon.code)
            }
            disabled={!isApplicable || isApplyingCoupon}
          >
            <Text style={styles.applyButtonText}>
              {isApplied ? 'Applied' : 'Apply'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[
          styles.offerDescription, 
          { color: colors.text }
        ]}>
          {formattedCoupon.description}
        </Text>

        {formattedCoupon.maxDiscount && (
          <Text style={[styles.maxDiscountText, { color: colors.muted }]}>
            Max discount: ₹{formattedCoupon.maxDiscount}
          </Text>
        )}

        {formattedCoupon.validUntil && (
          <Text style={[styles.validityText, { color: colors.muted }]}>
            Valid until: {new Date(formattedCoupon.validUntil).toLocaleDateString()}
          </Text>
        )}

        <Text style={[styles.offerNote, { color: colors.muted }]}>
          {formattedCoupon.note}
        </Text>

        {isApplyingCoupon && isApplied && (
          <ActivityIndicator size="small" color={colors.primary} style={styles.loadingIndicator} />
        )}
      </View>
    );
  };

  // Render empty state
  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyContainer}>
      <CupponIcon width={s(80)} height={s(80)} />
      <Text style={[styles.emptyText, { color: colors.text }]}>
        {amount > 0 ? 'No applicable offers' : 'No offers available'}
      </Text>
      <Text style={[styles.emptySubText, { color: colors.muted }]}>
        {amount > 0 
          ? 'No coupons available for your current order amount'
          : 'Check back later for exciting offers!'}
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.primary }]}
        onPress={handleManualRefresh}
        disabled={refreshing}
      >
        {refreshing ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.retryButtonText}>Refresh</Text>
        )}
      </TouchableOpacity>
    </View>
  ), [colors, handleManualRefresh, amount, refreshing]);

  // Render loading state with skeleton cards
  if (isCouponsLoading && currentPage === 1 && applicableCoupons.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={renderSkeletonLoaders}
          contentContainerStyle={[styles.container, {
            backgroundColor: colors.bg,
            paddingBottom: vs(20),
            flexGrow: 1
          }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      </SafeAreaView>
    );
  }

  // Render error state
  if (couponsError && currentPage === 1 && applicableCoupons.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>Error loading coupons</Text>
          <Text style={[styles.errorSubText, { color: colors.muted }]}>{couponsError}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={handleManualRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.retryButtonText}>Retry</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <FlatList
        data={allCoupons}
        renderItem={renderCouponItem}
        keyExtractor={(item, index) => {
          const itemId = item.id || item.coupon_id || index;
          return `coupon_${itemId}_${index}`;
        }}
        contentContainerStyle={[styles.container, {
          backgroundColor: colors.bg,
          paddingBottom: vs(20),
          flexGrow: allCoupons.length === 0 ? 1 : 0
        }]}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreCoupons}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!isCouponsLoading ? renderEmptyState : null}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            title="Pull to refresh"
            titleColor={colors.text}
          />
        }
      />

      {/* Show applied coupon banner if any */}
      {appliedCoupon && (
        <View style={[styles.appliedCouponBanner, { backgroundColor: colors.success }]}>
          <Text style={styles.appliedCouponText}>
            ✅ Coupon "{appliedCoupon.code}" applied successfully!
          </Text>
          <TouchableOpacity onPress={handleRemoveCoupon}>
            <Text style={styles.removeCouponText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Offers

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    padding: s(12)
  },
  offerCard: {
    borderRadius: s(8),
    padding: s(12),
    marginBottom: vs(8),
    borderWidth: s(0.5),
  },
  // Skeleton Styles
  skeletonCard: {
    borderRadius: s(8),
    padding: s(12),
    marginBottom: vs(8),
    borderWidth: s(0.5),
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  skeletonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(12),
  },
  skeletonCircle: {
    width: s(20),
    height: s(20),
    borderRadius: s(10),
  },
  skeletonBadge: {
    width: s(40),
    height: vs(16),
    borderRadius: s(4),
  },
  skeletonRow: {
    marginBottom: vs(8),
  },
  skeletonTextLarge: {
    height: vs(16),
    borderRadius: s(4),
    width: '60%',
  },
  skeletonTextMedium: {
    height: vs(12),
    borderRadius: s(4),
    width: '90%',
  },
  skeletonTextSmall: {
    height: vs(10),
    borderRadius: s(4),
    width: '70%',
  },
  skeletonTextXSmall: {
    height: vs(8),
    borderRadius: s(4),
    width: '50%',
  },
  skeletonButton: {
    width: s(60),
    height: vs(24),
    borderRadius: s(5),
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(6)
  },
  couponBadge: {
    paddingHorizontal: s(6),
    paddingVertical: vs(2),
    borderRadius: s(4)
  },
  couponBadgeText: {
    color: 'white',
    fontSize: ms(10),
    fontWeight: 'bold'
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: vs(6)
  },
  codeContainer: {
    flex: 1,
    marginRight: s(8)
  },
  offerCode: {
    fontSize: ms(14),
    fontWeight: 'bold',
    marginBottom: vs(2)
  },
  amountNeededText: {
    fontSize: ms(10),
    color: '#FF6B6B',
    fontWeight: '500',
    marginTop: vs(2)
  },
  applyButton: {
    paddingHorizontal: s(12),
    paddingVertical: vs(6),
    borderRadius: s(5),
    minWidth: s(60),
    alignItems: 'center'
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: ms(11)
  },
  offerDescription: {
    fontSize: ms(11),
    marginBottom: vs(3),
    lineHeight: vs(14)
  },
  maxDiscountText: {
    fontSize: ms(9),
    marginBottom: vs(1)
  },
  validityText: {
    fontSize: ms(9),
    marginBottom: vs(2),
    fontStyle: 'italic'
  },
  offerNote: {
    fontSize: ms(9),
    fontStyle: 'italic'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: vs(12),
    fontSize: ms(14)
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(20)
  },
  errorText: {
    fontSize: ms(16),
    fontWeight: 'bold',
    marginBottom: vs(8)
  },
  errorSubText: {
    fontSize: ms(12),
    textAlign: 'center',
    marginBottom: vs(16)
  },
  retryButton: {
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
    borderRadius: s(5),
    minWidth: s(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(20),
    minHeight: vs(300)
  },
  emptyText: {
    fontSize: ms(16),
    fontWeight: 'bold',
    marginTop: vs(12),
    marginBottom: vs(4)
  },
  emptySubText: {
    fontSize: ms(12),
    textAlign: 'center',
    marginBottom: vs(16)
  },
  loadingIndicator: {
    marginTop: vs(4)
  },
  appliedCouponBanner: {
    padding: s(12),
    borderRadius: s(8),
    margin: s(12),
    marginBottom: vs(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appliedCouponText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1
  },
  removeCouponText: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: vs(12),
    gap: s(8)
  },
  footerText: {
    fontSize: ms(12),
  },
  endOfList: {
    padding: vs(12),
    alignItems: 'center'
  },
  endOfListText: {
    fontSize: ms(12),
    fontStyle: 'italic'
  }
})