import { ActivityIndicator, Animated, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native'
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { DARK, BRAND } from '../../../src/constant/colors'
import { BagIcon, BellIcon, DownArrowIcon, FavoriteIcon, LocationIcon, SearchIcon } from '../../../src/SVGicons/icon'
import { s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

// Import your API actions
import { fetchAllGroups, fetchBannerConfig, fetchBanners, fetchCategories, fetchGroups } from '../../../store/slices/userSlice'

const Home = () => {
  // Refs and state
  const flatListRef = useRef(null)
  const mainFlatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set(['banner', 'categories']))
  const [refreshing, setRefreshing] = useState(false)
  const Theme = useSelector(state => state?.auth?.Theme)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const colors = Theme ? DARK : BRAND;

  // Header animation values
  const scrollY = useRef(new Animated.Value(0)).current
  const headerTranslateY = useRef(new Animated.Value(0)).current
  const lastScrollY = useRef(0)
  const isAnimating = useRef(false)

  // Lazy loading thresholds
  const LAZY_LOAD_THRESHOLD = 2
  const ITEM_HEIGHT_ESTIMATE = 180

  // Header animation constants
  const HEADER_HEIGHT = vs(140)
  const SCROLL_THRESHOLD = 25

  // Redux selectors
  const Banner_Config = useSelector(state => state.user.Baner_Config)
  const ProductCategories = useSelector(state => state.user.categories)
  const allGroups = useSelector(state => state.user.allGroups)
  const groupProducts = useSelector(state => state.user.groupProducts)
  const isLoading = useSelector(state => state.user.isLoading)
  const error = useSelector(state => state.user.error)

  const allgroupnames = allGroups?.active_group_names;

  // Memoized data
  const slicedBannerConfig = useMemo(() =>
    Banner_Config ? Banner_Config.slice(0, 3) : [],
    [Banner_Config]
  )

  const randomCategories = useMemo(() => {
    if (!ProductCategories) return [];
    return [...ProductCategories]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }, [ProductCategories])

  // Static data
  const categoriesitem = useMemo(() => [
    {
      title: 'cafe',
      image: require('../../../src/images/cafe.png')
    },
    {
      title: 'Fashion',
      image: require('../../../src/images/fashion.png')
    },
    {
      title: 'Electronics',
      image: require('../../../src/images/electronics.png')
    },
    {
      title: 'Mobiles',
      image: require('../../../src/images/mobiles.png')
    }
  ], [])

  const BestDeal = useMemo(() => [
    {
      title: "Surf Excel Easy Wash Detergent Powder",
      image: require('../../../src/images/surf.png'),
      weight: "500 ml",
      price: 12,
      mrp: 14
    },
    {
      title: "Fortune Arhar Dal (Toor Dal)",
      image: require('../../../src/images/fortne.png'),
      weight: "340 ml",
      price: 18,
      mrp: 22
    },
    {
      title: "Maggi Noodles Masala",
      image: require('../../../src/images/cocacola.png'),
      weight: "70 g",
      price: 8,
      mrp: 10
    }
  ], [])

  // Price formatting function
  const formatPrice = useCallback((price) => {
    if (!price) return '₹0';
    return `₹${(parseInt(price) / 100).toLocaleString('en-IN')}`;
  }, []);

  // Calculate discount percentage
  const calculateDiscount = useCallback((originalPrice, sellingPrice) => {
    if (!originalPrice || !sellingPrice || originalPrice <= sellingPrice || originalPrice === 0) {
      return 0;
    }
    const discount = ((originalPrice - sellingPrice) / originalPrice) * 100;
    return Math.round(discount);
  }, []);

  // Refresh function
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      console.log('refres data ')
      // Dispatch all API calls needed for home screen
      await Promise.all([
        dispatch(fetchBannerConfig()),
        dispatch(fetchCategories()),
        dispatch(fetchAllGroups())
        // Add other API calls that your home screen needs
      ]);
    } catch (error) {
      console.log('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  // Smoother header animation handler - FIXED VERSION
  const handleHeaderAnimation = useCallback((currentOffset) => {
    const currentScrollY = currentOffset;
    const deltaY = currentScrollY - lastScrollY.current;

    if (isAnimating.current) return;

    // Show header when scrolling up, hide when scrolling down
    if (deltaY > 2 && currentScrollY > SCROLL_THRESHOLD && headerTranslateY._value === 0) {
      // Scrolling down - hide header
      isAnimating.current = true;
      Animated.timing(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    } else if (deltaY < -2 && headerTranslateY._value === -HEADER_HEIGHT) {
      // Scrolling up - show header
      isAnimating.current = true;
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    }

    lastScrollY.current = currentScrollY;
  }, [HEADER_HEIGHT, SCROLL_THRESHOLD]);

  // Combined scroll handler for lazy loading and header animation
  const handleMainScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const scrollPosition = contentOffset.y;
        const screenHeight = layoutMeasurement.height;

        // Handle header animation
        handleHeaderAnimation(scrollPosition);

        // Existing lazy loading logic
        const newVisibleSections = new Set(['banner', 'categories']);

        if (allgroupnames) {
          allgroupnames.forEach((groupName, index) => {
            const sectionPosition = (index * ITEM_HEIGHT_ESTIMATE) + 500;
            if (sectionPosition <= scrollPosition + (screenHeight * LAZY_LOAD_THRESHOLD)) {
              newVisibleSections.add(`group-${index}`);
            }
          });
        }

        setVisibleSections(newVisibleSections);
      }
    }
  );

  // Auto scroll logic
  useEffect(() => {
    if (slicedBannerConfig.length > 0 && flatListRef.current) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1 >= slicedBannerConfig.length ? 0 : prevIndex + 1;

          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
            viewPosition: 0.9,
          });

          return nextIndex;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [slicedBannerConfig.length]);

  // Event handlers
  const handleScrollEnd = useCallback((event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const cardWidth = Dimensions.get('window').width - 40 + s(25)
    const index = Math.round(contentOffsetX / cardWidth)
    setCurrentIndex(index)
  }, [])

  const handleScrollBegin = useCallback(() => {
    // Optional: Add logic to pause auto-scroll during manual scroll
  }, [])

  const handleCategoryPress = useCallback((item) => {
    console.log(item);
    navigation.navigate('CategoriesCatlog', {
      title: item.category
        .replace(/\n/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' & '),
      item: item, type: 'catogry'
    });
  }, [navigation])

  const formatString = useCallback((str) => {
    return str
      .split(' ')
      .filter(word => word.trim() !== '')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' & \n');
  }, [])

  // Render functions
  const renderBannerItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        index === currentIndex && styles.activeCard
      ]}
      onPress={() => {
        console.log(item)
        navigation.navigate('Catlog', {
          title: item.banner_name, type: 'banner', 
          bannerId: item.id,
          subcategoryId: 13
        })
      }}
    >
      <Image
        source={{ uri: item.banner_img }}
        style={styles.imageSize}
        resizeMode='stretch'
      />
      <View style={{ position: "absolute", bottom: s(10), left: s(10) }}>
        <Text style={styles.Banner_Name}>{item.banner_name}</Text>
      </View>
    </TouchableOpacity>
  ), [currentIndex])

  const renderPagerItem = useCallback(({ item, index }) => (
    <View style={[
      styles.pager,
      index === currentIndex && styles.activePager
    ]} />
  ), [currentIndex])

  const renderHorizontalCategoryItem = useCallback(({ item, index }) => (
    <View style={styles.categoryItemWrapper}>
      <View style={[styles.categoriesContainer, { backgroundColor: colors.gray[200] }]}>
        <Image
          source={item.image}
          style={styles.categoryImageFull}
          resizeMode='cover'
        />
      </View>
      <Text style={[styles.categoryItemTitle, { color: colors.text }]}>{item.title}</Text>
    </View>
  ), [])

  const renderGridCategoryItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={[styles.gridCategoryItem, { backgroundColor: colors.bg }]}
      onPress={() => handleCategoryPress(item)}>
      <View style={[styles.categoriesBox, { backgroundColor: colors.gray[200] }]}>
        <Image
          source={{ uri: item?.images?.[0]?.image_url }}
          style={styles.categoryImageFull}
          resizeMode='cover'
        />
      </View>
      <Text style={[styles.gridCategoryTitle, { color: colors.text }]}>
        {formatString(item.category)}
      </Text>
    </TouchableOpacity>
  ), [handleCategoryPress, formatString])

  const renderProductItem = useCallback(({ item, index }) => {
    const isApiData = item?.product_image && Array.isArray(item.product_image);
    
    // Calculate discount for API data
    const discountPercentage = isApiData ? 
      calculateDiscount(item.product_original_price, item.product_selling_price) : 
      item.mrp ? calculateDiscount(item.mrp * 100, item.price * 100) : 0;
    
    const hasDiscount = discountPercentage > 0;

    return (
      <TouchableOpacity style={[styles.productCard, { backgroundColor: colors.white }]} onPress={() => {
        console.log(item),
        navigation.navigate('AboutProductScreen', { item })
      }}>
        <View style={[styles.productImageContainer]}>
          <View style={{ borderRadius: s(6), overflow: "hidden", backgroundColor: BRAND.muted, position: 'relative' }}>
            <Image
              source={isApiData ? { uri: item?.product_image[0]?.image_url } : item.image}
              style={styles.productImage}
              resizeMode='cover'
            />
            {hasDiscount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {isApiData ? item?.product_name : item.title}
          </Text>
          <View style={styles.productDetails}>
            <View style={{ width: s(65), }}>
              <Text style={styles.productWeight} numberOfLines={1}>
                {isApiData ? (item.description || 'Product description') : item.weight}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>
                  {isApiData ? formatPrice(item.product_selling_price) : `₹${item.price}`}
                </Text>
                {hasDiscount && (
                  <Text style={styles.productMrp}>
                    {isApiData ? formatPrice(item.product_original_price) : `₹${item.mrp}`}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [formatPrice, calculateDiscount])

  // Optimized group sections with lazy loading
  const groupSections = useMemo(() => {
    if (!allgroupnames) return null;

    return allgroupnames.map((groupName, index) => {
      if (!visibleSections.has(`group-${index}`)) {
        return (
          <View key={`${groupName}-${index}`} style={[styles.lazyPlaceholder, { height: ITEM_HEIGHT_ESTIMATE }]}>
            <ActivityIndicator size={'small'} color={BRAND.primary} />
          </View>
        );
      }

      const groupData = groupProducts?.[groupName]?.[1]?.data;
      const displayData = groupData && groupData.length > 0 ? groupData : BestDeal;

      return (
        <View key={`${groupName}-${index}`} style={{ width: "100%", marginBottom: 0 }}>
          <View style={[styles.HeadingContainer, styles.bestDealHeading, { backgroundColor: colors.bg }]}>
            <Text style={[styles.HeadingText, { color: colors.text }]}>{groupName}</Text>
            <Text style={styles.SeeAllText} onPress={() => {
              console.log(displayData)
              navigation.navigate('Catlog', { title: groupName, type: 'group' })
            }}>See All</Text>
          </View>

          {displayData && displayData.length > 0 ? (
            <FlatList
              contentContainerStyle={[styles.productCardFlatlist, { backgroundColor: colors.bg }]}
              horizontal
              data={displayData}
              keyExtractor={(item, itemIndex) => `${groupName}-${itemIndex}`}
              renderItem={renderProductItem}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={3}
              maxToRenderPerBatch={5}
              windowSize={2}
              removeClippedSubviews={true}
            />
          ) : (
            <Text style={styles.noProductsText}>No products available</Text>
          )}
        </View>
      );
    });
  }, [allgroupnames, groupProducts, navigation, renderProductItem, visibleSections]);

  // Main content component with lazy loading
  const MainContent = useMemo(() => {
    return (
      <View style={styles.scrollingCardView}>
        {/* Banner Carousel - Always visible */}
        {slicedBannerConfig.length > 0 && (
          <>
            <FlatList
              ref={flatListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              contentContainerStyle={[styles.flatListCard, {}]}
              data={slicedBannerConfig}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderBannerItem}
              onMomentumScrollEnd={handleScrollEnd}
              onScrollBeginDrag={handleScrollBegin}
              getItemLayout={(data, index) => ({
                length: Dimensions.get('window').width - 40 + s(25),
                offset: (Dimensions.get('window').width - 40 + s(25)) * index,
                index,
              })}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={3}
            />

            {/* Pager Indicators */}
            <FlatList
              contentContainerStyle={styles.pagerFlatList}
              horizontal
              data={slicedBannerConfig}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPagerItem}
            />
          </>
        )}

        {/* Horizontal Categories - Always visible */}
        <FlatList
          contentContainerStyle={[styles.categoriesContainerFlatlist, { backgroundColor: colors.bg }]}
          data={categoriesitem}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHorizontalCategoryItem}
          scrollEnabled={false}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
        />

        {/* Shop By Category Header - Always visible */}
        <View style={[styles.HeadingContainer, { backgroundColor: colors.bg }]}>
          <Text style={[styles.HeadingText, { color: colors.text }]}>Shop By Category</Text>
          <Text style={styles.SeeAllText} onPress={() => navigation.navigate('Categories')}>See All</Text>
        </View>

        {/* Grid Categories - Always visible */}
        {visibleSections.has('categories') && (
          <View style={{ backgroundColor: colors.bg, marginBottom: s(12) }}>
            <FlatList
              contentContainerStyle={[styles.gridCategoriesContainer, {}]}
              data={randomCategories}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderGridCategoryItem}
              initialNumToRender={8}
              maxToRenderPerBatch={8}
              removeClippedSubviews={true}
            />
          </View>
        )}

        {/* Dynamic Group Sections with Lazy Loading */}
        {groupSections}

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
      </View>
    );
  }, [
    slicedBannerConfig,
    randomCategories,
    isLoading,
    error,
    groupSections,
    renderBannerItem,
    renderPagerItem,
    renderHorizontalCategoryItem,
    renderGridCategoryItem,
    handleScrollEnd,
    handleScrollBegin,
    navigation,
    visibleSections
  ]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar backgroundColor={BRAND.primary} barStyle="dark-content" />

      {/* Fixed Background Container - Separate from animated header */}
      <View style={styles.bgContainer} />

      {/* Animated Header Content */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: headerTranslateY }],
            height: HEADER_HEIGHT,
          }
        ]}
      >
        {/* Header Content */}
        <View style={styles.headerContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.locationContainer} onPress={() => navigation.navigate('Address')}>
              <View style={[styles.iconCircle, { backgroundColor: colors.white }]}>
                <LocationIcon width={s(20)} height={s(20)} stroke={BRAND.orange} />
              </View>
              <View>
                <View style={styles.addressHeader}>
                  <Text style={styles.homeText}>Home</Text>
                  <DownArrowIcon width={s(20)} height={s(20)} stroke={BRAND.white} />
                </View>
                <Text style={styles.address}>Karol Bagh, New Delhi</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
              <TouchableOpacity style={[styles.iconCircle, { backgroundColor: colors.bg }]} onPress={() => navigation.navigate('Notification')}>
                <BellIcon width={s(20)} height={s(20)} stroke={BRAND.orange} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconCircle, { backgroundColor: colors.bg }]} onPress={() => navigation.navigate('MyCart')}>
                <BagIcon width={s(20)} height={s(20)} stroke={BRAND.orange} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar - Now properly animated with header */}
          <View style={[styles.searchContainer, { backgroundColor: colors.gray[200] }]}>
            <SearchIcon width={s(20)} height={s(20)} stroke={colors.muted} />
            <TextInput
              placeholder='Search'
              placeholderTextColor={colors.muted}
              style={styles.searchinput}
            />
          </View>
        </View>
      </Animated.View>

      {/* Main Content with Lazy Loading and Pull to Refresh */}
      <FlatList
        ref={mainFlatListRef}
        style={styles.mainFlatList}
        data={[1]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => MainContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleMainScroll}
        scrollEventThrottle={16} // Increased for smoother animation
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        contentContainerStyle={styles.flatListContent}
        decelerationRate="normal"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[BRAND.primary]} // For Android
            tintColor={BRAND.primary} // For iOS
            progressBackgroundColor={colors.bg}
            title="Pull to refresh"
            titleColor={colors.text}
          />
        }
        // Additional props for better pull-to-refresh experience
        overScrollMode="always"
        alwaysBounceVertical={true}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.bg
  },
  // Fixed background that doesn't move
  bgContainer: {
    width: "100%",
    height: vs(180),
    borderBottomRightRadius: vs(50),
    borderBottomLeftRadius: vs(50),
    backgroundColor: BRAND.primary,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  // Animated header container (content only, no background)
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    elevation: 10,
  },
  headerContent: {
    width: '100%',
  },
  mainFlatList: {
    flex: 1,
    zIndex: 10,
  },
  flatListContent: {
    paddingTop: vs(100),
    paddingBottom: vs(8),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: s(16),
    paddingTop: vs(8),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
  },
  iconCircle: {
    backgroundColor: BRAND.white,
    padding: s(8),
    borderRadius: s(100),
    width: s(32),
    height: s(32),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  searchContainer: {
    width: "90%",
    backgroundColor: BRAND.white,
    height: vs(36),
    borderRadius: s(100),
    alignSelf: "center",
    marginTop: vs(8),
    marginBottom: vs(8),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(16),
    gap: s(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  searchinput: {
    flex: 1,
    fontSize: s(14),
    color: BRAND.text,
  },
  homeText: {
    color: BRAND.white,
    fontSize: s(12),
    fontWeight: '600',
  },
  address: {
    color: BRAND.white,
    fontSize: s(11),
    opacity: 0.9,
  },
  scrollingCardView: {
    width: "100%",
    alignItems: "center",
    paddingTop: vs(-16)
  },
  card: {
    width: Dimensions.get('window').width - s(32),
    height: vs(120),
    backgroundColor: BRAND.muted,
    marginHorizontal: s(8),
    overflow: "hidden",
    borderRadius: s(10),
    justifyContent: 'space-between',
    elevation: 4,
    opacity: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeCard: {
    opacity: 1,
    backgroundColor: BRAND.border,
    flexDirection: "row"
  },
  flatListCard: {
    paddingVertical: vs(4),
  },
  pager: {
    width: s(6),
    height: s(6),
    borderRadius: s(4),
    backgroundColor: BRAND.border,
  },
  activePager: {
    backgroundColor: BRAND.orange,
    width: s(16),
  },
  pagerFlatList: {
    alignSelf: 'center',
    gap: s(8),
    marginTop: vs(8),
  },
  imageSize: {
    width: "100%",
    height: "100%",
  },
  categoriesContainer: {
    width: Dimensions.get('window').width / s(4) - s(4),
    height: Dimensions.get('window').width / s(4) - s(4),
    borderRadius: s(10),
    marginRight: s(8),
    backgroundColor: BRAND.border,
    alignItems: "center",
    justifyContent: "center",
    padding: s(8)
  },
  categoriesContainerFlatlist: {
    paddingVertical: s(8),
    paddingHorizontal: s(8),
    backgroundColor: BRAND.bg
  },
  HeadingContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: s(12),
    backgroundColor: BRAND.bg
  },
  HeadingText: {
    fontSize: s(14),
    fontWeight: '700',
    color: BRAND.text
  },
  SeeAllText: {
    color: BRAND.orange,
    fontSize: s(12)
  },
  categoriesBox: {
    width: Dimensions.get('window').width / s(4) - s(16),
    height: Dimensions.get('window').width / s(4) - s(16),
    borderRadius: s(10),
    marginRight: s(4),
    backgroundColor: '#828d840d',
    alignItems: "center",
    justifyContent: "center",
    padding: s(2)
  },
  productCard: {
    width: s(140),
    height: vs(180),
    backgroundColor: BRAND.white,
    marginRight: s(8),
    borderRadius: s(10),
    paddingHorizontal: s(8),
    paddingTop: s(4),
    elevation: 2,
  },
  productCardFlatlist: {
    paddingHorizontal: s(8),
    paddingVertical: s(8),
    backgroundColor: BRAND.bg
  },
  categoryItemWrapper: {
    alignItems: "center",
    gap: s(4)
  },
  categoryImageFull: {
    width: "100%",
    height: "100%"
  },
  categoryItemTitle: {
    fontSize: s(11),
    color: BRAND.text
  },
  gridCategoriesContainer: {
    alignItems: "center",
    paddingVertical: s(8),
    backgroundColor: BRAND.bg,
  },
  gridCategoryItem: {
    backgroundColor: BRAND.bg,
    alignItems: "center",
    gap: s(4),
    width: Dimensions.get('window').width / 4,
    marginTop: s(8)
  },
  gridCategoryTitle: {
    textAlign: "center",
    fontSize: s(11),
    color: BRAND.text
  },
  bestDealHeading: {
    marginTop: vs(8)
  },
  productImageContainer: {
    width: "100%",
    height: "55%",
    borderRadius: s(10)
  },
  favoriteIcon: {
    position: "absolute",
    top: s(8),
    right: s(8),
    zIndex: 1
  },
  productImage: {
    width: "100%",
    height: "100%"
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  productTitle: {
    fontSize: s(11),
    color: BRAND.text,
    fontWeight: "700"
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  productWeight: {
    fontSize: s(11),
    color: BRAND.muted
  },
  priceContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: s(4),
  },
  productPrice: {
    fontSize: s(12),
    color: BRAND.text,
    fontWeight: '600'
  },
  productMrp: {
    color: BRAND.muted,
    textDecorationLine: "line-through",
    fontSize: s(11)
  },
  addButton: {
    backgroundColor: BRAND.primary,
    paddingHorizontal: s(12),
    paddingVertical: s(4),
    borderRadius: s(5)
  },
  addButtonText: {
    color: BRAND.white,
    fontSize: s(12),
    fontWeight: '500'
  },
  loadingContainer: {
    padding: s(16),
    alignItems: 'center'
  },
  loadingText: {
    color: BRAND.text,
    fontSize: s(12)
  },
  errorContainer: {
    padding: s(16),
    alignItems: 'center'
  },
  errorText: {
    color: BRAND.error,
    fontSize: s(12)
  },
  noProductsText: {
    textAlign: 'center',
    color: BRAND.muted,
    fontSize: s(12),
    padding: s(16)
  },
  lazyPlaceholder: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BRAND.bg,
    marginBottom: 8,
  },
  Banner_Name: {
    fontSize: s(20),
    color: '#fff',
    fontWeight: '800'
  },
  discountBadge: {
    position: 'absolute',
    top: s(4),
    left: s(4),
    backgroundColor: BRAND.orange,
    paddingHorizontal: s(4),
    paddingVertical: s(1),
    borderRadius: s(3),
  },
  discountText: {
    color: '#fff',
    fontSize: s(8),
    fontWeight: 'bold',
  }
})