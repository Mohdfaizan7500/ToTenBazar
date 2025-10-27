import { ActivityIndicator, Animated, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import BRAND from '../../../src/constant/color'
import { BagIcon, BellIcon, DownArrowIcon, FavoriteIcon, LocationIcon, SearchIcon } from '../../../src/SVGicons/icon'
import { s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  // Refs and state
  const flatListRef = useRef(null)
  const mainFlatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set(['banner', 'categories']))
  const navigation = useNavigation()

  // Header animation values
  const scrollY = useRef(new Animated.Value(0)).current
  const headerTranslateY = useRef(new Animated.Value(0)).current
  const lastScrollY = useRef(0)
  const isAnimating = useRef(false)

  // Lazy loading thresholds
  const LAZY_LOAD_THRESHOLD = 2
  const ITEM_HEIGHT_ESTIMATE = 200

  // Header animation constants
  const HEADER_HEIGHT = vs(160)
  const SCROLL_THRESHOLD = 30

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
    },
    {
      title: "Lay's Classic Potato Chips",
      image: require('../../../src/images/cocacola.png'),
      weight: "50 g",
      price: 15,
      mrp: 20
    },
    {
      title: "Colgate Strong Teeth Toothpaste",
      image: require('../../../src/images/cocacola.png'),
      weight: "100 g",
      price: 6,
      mrp: 8
    },
    {
      title: "Amul Butter",
      image: require('../../../src/images/cocacola.png'),
      weight: "100 g",
      price: 25,
      mrp: 30
    }
  ], [])

  // Smoother header animation handler
  const handleHeaderAnimation = useCallback((currentOffset) => {
    const currentScrollY = currentOffset;
    const deltaY = currentScrollY - lastScrollY.current;

    if (isAnimating.current) return;

    if (deltaY > 5 && currentScrollY > SCROLL_THRESHOLD) {
      isAnimating.current = true;
      Animated.spring(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        tension: 50,
        friction: 12,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    } else if (deltaY < -5) {
      isAnimating.current = true;
      Animated.spring(headerTranslateY, {
        toValue: 0,
        tension: 50,
        friction: 12,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    }

    lastScrollY.current = currentScrollY;
  }, [HEADER_HEIGHT]);

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
            const sectionPosition = (index * ITEM_HEIGHT_ESTIMATE) + 600;
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
    const cardWidth = Dimensions.get('window').width - 50 + s(30)
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
        .join(' & ')
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
    <LinearGradient
      colors={['red', 'blue']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        styles.card,
        index === currentIndex && styles.activeCard
      ]}>

      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{item?.banner_name}</Text>
        <TouchableOpacity style={styles.ShopNowButton}>
          <Text style={styles.ShopNowButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: item.banner_img }}
        style={styles.imageSize}
        resizeMode='cover'
      />
    </LinearGradient>
  ), [currentIndex])

  const renderPagerItem = useCallback(({ item, index }) => (
    <View style={[
      styles.pager,
      index === currentIndex && styles.activePager
    ]} />
  ), [currentIndex])

  const renderHorizontalCategoryItem = useCallback(({ item, index }) => (
    <View style={styles.categoryItemWrapper}>
      <View style={styles.categoriesContainer}>
        <Image
          source={item.image}
          style={styles.categoryImageFull}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.categoryItemTitle}>{item.title}</Text>
    </View>
  ), [])

  const renderGridCategoryItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={styles.gridCategoryItem}
      onPress={() => handleCategoryPress(item)}>
      <View style={styles.categoriesBox}>
        <Image
          source={{ uri: item?.images?.[0]?.image_url }}
          style={styles.categoryImageFull}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.gridCategoryTitle}>
        {formatString(item.category)}
      </Text>
    </TouchableOpacity>
  ), [handleCategoryPress, formatString])

  const renderProductItem = useCallback(({ item, index }) => {
    const isApiData = item?.product_image && Array.isArray(item.product_image);

    return (
      <TouchableOpacity style={styles.productCard} onPress={() => {
        console.log(item),
        navigation.navigate('AboutProductScreen', { item })
      }}>
        <View style={styles.productImageContainer}>
          <View style={{ borderRadius: s(8), overflow: "hidden", backgroundColor: BRAND.muted, }}>
            <Image
              source={isApiData ? { uri: item?.product_image[0]?.image_url } : item.image}
              style={styles.productImage}
              resizeMode='cover'
            />
          </View>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {isApiData ? item?.product_name : item.title}
          </Text>
          <View style={styles.productDetails}>
            <View style={{ width: s(70), }}>
              <Text style={styles.productWeight} numberOfLines={1}>
                {isApiData ? (item.description || 'Product description') : item.weight}
              </Text>
              <Text style={styles.productPrice}>
                ₹{isApiData ? (item.product_selling_price || 'N/A') : item.price}
                {!isApiData && item.mrp && (
                  <Text style={styles.productMrp}> ${item.mrp}</Text>
                )}
              </Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [])

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
          <View style={[styles.HeadingContainer, styles.bestDealHeading]}>
            <Text style={styles.HeadingText}>{groupName}</Text>
            <Text style={styles.SeeAllText} onPress={() => {
              console.log(displayData)
              navigation.navigate('Catlog', { title: groupName })
            }}>See All</Text>
          </View>

          {displayData && displayData.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.productCardFlatlist}
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
              contentContainerStyle={styles.flatListCard}
              data={slicedBannerConfig}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderBannerItem}
              onMomentumScrollEnd={handleScrollEnd}
              onScrollBeginDrag={handleScrollBegin}
              getItemLayout={(data, index) => ({
                length: Dimensions.get('window').width - 50 + s(30),
                offset: (Dimensions.get('window').width - 50 + s(30)) * index,
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
          contentContainerStyle={styles.categoriesContainerFlatlist}
          data={categoriesitem}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHorizontalCategoryItem}
          scrollEnabled={false}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
        />

        {/* Shop By Category Header - Always visible */}
        <View style={styles.HeadingContainer}>
          <Text style={styles.HeadingText}>Shop By Category</Text>
          <Text style={styles.SeeAllText} onPress={() => navigation.navigate('Categories')}>See All</Text>
        </View>

        {/* Grid Categories - Always visible */}
        {visibleSections.has('categories') && (
          <View style={{ backgroundColor: BRAND.bg, marginBottom: s(15) }}>
            <FlatList
              contentContainerStyle={styles.gridCategoriesContainer}
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
    <SafeAreaView style={styles.container}>
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
              <View style={styles.iconCircle}>
                <LocationIcon width={s(22)} height={s(22)} stroke={BRAND.orange} />
              </View>
              <View>
                <View style={styles.addressHeader}>
                  <Text style={styles.homeText}>Home</Text>
                  <DownArrowIcon width={s(22)} height={s(22)} stroke={BRAND.white} />
                </View>
                <Text style={styles.address}>Karol Bagh, New Delhi</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
              <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Notification')}>
                <BellIcon width={s(22)} height={s(22)} stroke={BRAND.orange} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('MyCart')}>
                <BagIcon width={s(22)} height={s(22)} stroke={BRAND.orange} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchIcon width={s(22)} height={s(22)} stroke={BRAND.muted} />
            <TextInput
              placeholder='Search'
              placeholderTextColor={BRAND.muted}
              style={styles.searchinput}
            />
          </View>
        </View>
      </Animated.View>

      {/* Main Content with Lazy Loading */}
      <FlatList
        ref={mainFlatListRef}
        style={styles.mainFlatList}
        data={[1]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => MainContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleMainScroll}
        scrollEventThrottle={8}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        contentContainerStyle={styles.flatListContent}
        decelerationRate="normal"
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
    height: vs(200),
    borderBottomRightRadius: vs(60),
    borderBottomLeftRadius: vs(60),
    backgroundColor: BRAND.primary,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0, // Lowest zIndex - stays behind everything
  },
  // Animated header container (content only, no background)
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20, // Highest zIndex - stays on top
    elevation: 10,
  },
  headerContent: {
    width: '100%',
    // backgroundColor:"red"
  },
  mainFlatList: {
    flex: 1,
    zIndex: 10, // Middle zIndex - scrolls behind header but above background
    elevation: 5,
  },
  flatListContent: {
    paddingTop: vs(110), // This should match HEADER_HEIGHT
    paddingBottom: vs(10),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: s(20),
    paddingTop: vs(10),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(5),
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
  iconCircle: {
    backgroundColor: BRAND.white,
    padding: s(10),
    borderRadius: s(100),
    width: s(35),
    height: s(35),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    width: "90%",
    backgroundColor: BRAND.white,
    height: vs(40),
    borderRadius: s(100),
    alignSelf: "center",
    marginTop: vs(10),
    marginBottom: vs(10),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(20),
    gap: s(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchinput: {
    flex: 1,
    fontSize: s(16),
    color: BRAND.text,
  },
  homeText: {
    color: BRAND.white,
    fontSize: s(14),
    fontWeight: '600',
  },
  address: {
    color: BRAND.white,
    fontSize: s(12),
    opacity: 0.9,
  },
  scrollingCardView: {
    width: "100%",
    alignItems: "center",
    paddingTop: vs(-20)
  },
  card: {
    width: Dimensions.get('window').width - s(40),
    height: vs(130),
    backgroundColor: BRAND.muted,
    marginHorizontal: s(10),
    paddingHorizontal: s(10),
    borderRadius: s(12),
    justifyContent: 'space-between',
    elevation: 5,
    opacity: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeCard: {
    opacity: 1,
    backgroundColor: BRAND.pink,
    flexDirection: "row"
  },
  cardContent: {
    width: '65%',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: vs(10),
    paddingLeft: s(10),
  },
  cardText: {
    color: BRAND.white,
    fontSize: s(16),
    fontWeight: '800',
  },
  flatListCard: {
    paddingVertical: vs(5),
  },
  pager: {
    width: s(8),
    height: s(8),
    borderRadius: s(5),
    backgroundColor: BRAND.border,
  },
  activePager: {
    backgroundColor: BRAND.orange,
    width: s(20),
  },
  pagerFlatList: {
    alignSelf: 'center',
    gap: s(10),
    marginTop: vs(10),
  },
  ShopNowButton: {
    backgroundColor: BRAND.orange,
    width: 100,
    verticalAlign: "bottom",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(5),
    borderRadius: s(10)
  },
  ShopNowButtonText: {
    color: BRAND.white,
    fontSize: s(14),
    fontWeight: '500'
  },
  imageSize: {
    width: s(100),
    height: vs(110),
    borderRadius: s(12),
  },
  categoriesContainer: {
    width: Dimensions.get('window').width / s(4) - s(2),
    height: Dimensions.get('window').width / s(4) - s(2),
    borderRadius: s(12),
    marginRight: s(10),
    backgroundColor: BRAND.border,
    alignItems: "center",
    justifyContent: "center",
    padding: s(10)
  },
  categoriesContainerFlatlist: {
    paddingVertical: s(10),
    paddingHorizontal: s(10),
    backgroundColor: BRAND.bg
  },
  HeadingContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: s(15),
    backgroundColor: BRAND.bg
  },
  HeadingText: {
    fontSize: s(16),
    fontWeight: '800',
    color: BRAND.text
  },
  SeeAllText: {
    color: BRAND.orange,
    fontSize: s(14)
  },
  categoriesBox: {
    width: Dimensions.get('window').width / s(4) - s(20),
    height: Dimensions.get('window').width / s(4) - s(20),
    borderRadius: s(12),
    marginRight: s(5),
    backgroundColor: '#828d840d',
    alignItems: "center",
    justifyContent: "center",
    padding: s(2)
  },
  productCard: {
    width: s(150),
    height: vs(200),
    backgroundColor: BRAND.white,
    marginRight: s(10),
    borderRadius: s(12),
    paddingHorizontal: s(10),
    paddingTop: s(5),
    elevation: 2
  },
  productCardFlatlist: {
    paddingHorizontal: s(10),
    paddingVertical: s(10),
    backgroundColor: BRAND.bg
  },
  categoryItemWrapper: {
    alignItems: "center",
    gap: s(5)
  },
  categoryImageFull: {
    width: "100%",
    height: "100%"
  },
  categoryItemTitle: {
    fontSize: s(12),
    color: BRAND.text
  },
  gridCategoriesContainer: {
    alignItems: "center",
    paddingVertical: s(10),
    backgroundColor: BRAND.bg,
  },
  gridCategoryItem: {
    backgroundColor: BRAND.bg,
    alignItems: "center",
    gap: s(5),
    width: Dimensions.get('window').width / 4,
    marginTop: s(10)
  },
  gridCategoryTitle: {
    textAlign: "center",
    fontSize: s(12),
    color: BRAND.text
  },
  bestDealHeading: {
    marginTop: vs(10)
  },
  productImageContainer: {
    width: "100%",
    height: "55%",
    borderRadius: s(12)
  },
  favoriteIcon: {
    position: "absolute",
    top: s(10),
    right: s(10),
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
    fontSize: s(12),
    color: BRAND.text,
    fontWeight: "800"
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  productWeight: {
    fontSize: s(12),
    color: BRAND.muted
  },
  productPrice: {
    fontSize: s(14),
    color: BRAND.text,
    fontWeight: '600'
  },
  productMrp: {
    color: BRAND.muted,
    textDecorationLine: "line-through",
    fontSize: s(12)
  },
  addButton: {
    backgroundColor: BRAND.primary,
    paddingHorizontal: s(15),
    paddingVertical: s(5),
    borderRadius: s(6)
  },
  addButtonText: {
    color: BRAND.white,
    fontSize: s(14),
    fontWeight: '500'
  },
  loadingContainer: {
    padding: s(20),
    alignItems: 'center'
  },
  loadingText: {
    color: BRAND.text,
    fontSize: s(14)
  },
  errorContainer: {
    padding: s(20),
    alignItems: 'center'
  },
  errorText: {
    color: BRAND.error,
    fontSize: s(14)
  },
  noProductsText: {
    textAlign: 'center',
    color: BRAND.muted,
    fontSize: s(14),
    padding: s(20)
  },
  lazyPlaceholder: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BRAND.bg,
    marginBottom: 10,
  }
})