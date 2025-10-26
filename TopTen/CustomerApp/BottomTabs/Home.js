import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import BRAND from '../../../src/constant/color'
import { BagIcon, BellIcon, DownArrowIcon, FavoriteIcon, LocationIcon, SearchIcon } from '../../../src/SVGicons/icon'
import { s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Home = () => {
  // Refs and state
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigation = useNavigation()

  // Redux selectors - moved to individual selectors to prevent unnecessary re-renders
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

  // Static data - moved outside component or made stable with empty dependencies
  const categoriesitem = [
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
  ]

  const BestDeal = [
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
  ]

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

  // Render functions with stable dependencies
  const renderBannerItem = useCallback(({ item, index }) => (
    <View style={[
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
    </View>
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
          resizeMode="contain"
        />
      </View>
      <Text style={styles.gridCategoryTitle}>
        {formatString(item.category)}
      </Text>
    </TouchableOpacity>
  ), [handleCategoryPress, formatString])

  // Updated renderProductItem with stable dependencies
  const renderProductItem = useCallback(({ item, index }) => {
    // Check if item is from API (has images array) or static data
    const isApiData = item?.product_image && Array.isArray(item.product_image);

    return (
      <View style={styles.productCard}>
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
      </View>
    );
  }, [])

  // Memoized group sections to prevent unnecessary re-renders
  const groupSections = useMemo(() => {
    if (!allgroupnames) return null;

    return allgroupnames.map((groupName, index) => {
      const groupData = groupProducts?.[groupName]?.[1]?.data;
      const displayData = groupData && groupData.length > 0 ? groupData : BestDeal;

      return (
        <View key={`${groupName}-${index}`} style={{ width: "100%", marginBottom: 10 }}>
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
            />
          ) : (
            <Text style={styles.noProductsText}>No products available</Text>
          )}
        </View>
      );
    });
  }, [allgroupnames, groupProducts, navigation, renderProductItem]);

  // Main content component - memoized to prevent unnecessary re-renders
  const MainContent = useMemo(() => {
    return (
      <View style={styles.scrollingCardView}>
        {/* Banner Carousel */}
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

        {/* Horizontal Categories */}
        <FlatList
          contentContainerStyle={styles.categoriesContainerFlatlist}
          data={categoriesitem}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHorizontalCategoryItem}
          scrollEnabled={false}
        />

        {/* Shop By Category Header */}
        <View style={styles.HeadingContainer}>
          <Text style={styles.HeadingText}>Shop By Category</Text>
          <Text style={styles.SeeAllText} onPress={() => navigation.navigate('Categories')}>See All</Text>
        </View>

        {/* Grid Categories */}
        <View style={{ backgroundColor: BRAND.bg, marginBottom: s(15) }}>
          <FlatList
            contentContainerStyle={styles.gridCategoriesContainer}
            data={randomCategories}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGridCategoryItem}
          />
        </View>

        {/* Dynamic Group Sections */}
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
    navigation
  ]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BRAND.primary} barStyle="dark-content" />

      <View style={styles.bgContainer}></View>

      {/* Header */}
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

      {/* Main Content */}
      <FlatList
        style={styles.mainFlatList}
        data={[1]} // Dummy data for single item
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => MainContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Home

// Styles remain the same...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.bg
  },
  mainFlatList: {
    flex: 1,
  },
  bgContainer: {
    width: "100%",
    height: vs(200),
    borderBottomRightRadius: vs(60),
    borderBottomLeftRadius: vs(60),
    backgroundColor: BRAND.primary,
    position: "absolute",
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
    width: s(40),
    height: s(40),
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
    paddingBottom: vs(10),
    alignItems: "center",
    marginTop: vs(15),
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
    backgroundColor: BRAND.white,
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
    color: BRAND.text,
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
    backgroundColor: '#9DA49E0D',
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
  }
})