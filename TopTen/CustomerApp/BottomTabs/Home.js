import { Dimensions, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import BRAND from '../../../src/constant/color'
import { BagIcon, BellIcon, DownArrowIcon, FavoriteIcon, LocationIcon, SearchIcon } from '../../../src/SVGicons/icon'
import { s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  // All hooks must be called at the top level, in the same order
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigation = useNavigation() // This must be called after useState but before useEffect

  const scrollCard = [
    {
      title: 'Are you a Coca-Cola? Because you\'re soda-lightful!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you Lay\'s? Because I can\'t stop thinking about you!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Is your name Cadbury? Because you\'re irresistibly sweet!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you Maggi? Because you\'re ready in 2 minutes!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you Pepsi? Because you\'re the choice of a new generation!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you Oreo? Because you\'re the best part of my day!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you Red Bull? Because you give me wings!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you KitKat? Because I need a break with you!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you Domino\'s? Because you\'ve delivered love to my heart!',
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: 'Are you McDonald\'s? Because I\'m lovin\' it!',
      image: require('../../../src/images/cocacola.png')
    }
  ]

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

  const categories = [
    {
      title: `Vegetables \n& Fruits`,
      image: require('../../../src/images/fruits.png')
    },
    {
      title: `Dairy \n& Breakfast`,
      image: require('../../../src/images/dairy.png')
    },
    {
      title: `Cold Drinks \n& Juices`,
      image: require('../../../src/images/cocacola.png')
    },
    {
      title: `Instant \n& Frozen Food`,
      image: require('../../../src/images/instant.png')
    },
    {
      title: `Tea \n& Coffee`,
      image: require('../../../src/images/cafe.png')
    },
    {
      title: `Atta, Rice \n& Dal`,
      image: require('../../../src/images/atta.png')
    },
    {
      title: `Masala, Oil \n& Dry Fruits`,
      image: require('../../../src/images/masale.png')
    },
    {
      title: `Chicken, Meat \n& Fish`,
      image: require('../../../src/images/fish.png')
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
    const interval = setInterval(() => {
      if (flatListRef.current) {
        let nextIndex = currentIndex + 1
        if (nextIndex >= scrollCard.length) {
          nextIndex = 0
        }

        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
          viewPosition: 0.5
        })
        setCurrentIndex(nextIndex)
      }
    }, 300000)

    return () => clearInterval(interval)
  }, [currentIndex, scrollCard.length])

  // Handle scroll end to update current index
  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const cardWidth = Dimensions.get('window').width - 50 + s(30)
    const index = Math.round(contentOffsetX / cardWidth)
    setCurrentIndex(index)
  }

  // Handle scroll begin to reset timer (optional)
  const handleScrollBegin = () => {
    // You can add logic here to pause auto-scroll during manual scroll
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BRAND.primary} barStyle="dark-content" />

      <View style={styles.bgContainer}></View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer} onPress={()=>navigation.navigate('Address')}>
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

      <View style={styles.searchContainer}>
        <SearchIcon width={s(22)} height={s(22)} stroke={BRAND.muted} />
        <TextInput
          placeholder='Search'
          placeholderTextColor={BRAND.muted}
          style={styles.searchinput}
        />
      </View>

      {/* Replace ScrollView with FlatList for main content */}
      <FlatList
        style={styles.mainFlatList}
        data={[1]} // Dummy data
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <View style={styles.scrollingCardView}>
            {/* Banner Carousel FlatList */}
            <FlatList
              ref={flatListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              contentContainerStyle={styles.flatListCard}
              data={scrollCard}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={[
                  styles.card,
                  index === currentIndex && styles.activeCard
                ]}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardText}>{item.title}</Text>
                    <TouchableOpacity style={styles.ShopNowButton}>
                      <Text style={styles.ShopNowButtonText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                  <Image source={item.image}
                    style={styles.imageSize}
                    resizeMode='cover'
                  />
                </View>
              )}
              onMomentumScrollEnd={handleScrollEnd}
              onScrollBeginDrag={handleScrollBegin}
              getItemLayout={(data, index) => ({
                length: Dimensions.get('window').width - 50 + s(30),
                offset: (Dimensions.get('window').width - 50 + s(30)) * index,
                index,
              })}
            />

            {/* Pager Indicators FlatList */}
            <FlatList
              contentContainerStyle={styles.pagerFlatList}
              horizontal
              data={scrollCard}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={[
                  styles.pager,
                  index === currentIndex && styles.activePager
                ]} />
              )}
            />

            {/* Horizontal Categories FlatList */}
            <FlatList
              contentContainerStyle={styles.categoriesContainerFlatlist}
              data={categoriesitem}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
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
              )}
            />

            <View style={styles.HeadingContainer}>
              <Text style={styles.HeadingText}>Shop By Category</Text>
              <Text style={styles.SeeAllText} onPress={() => navigation.navigate('Categories')}>See All</Text>
            </View>

            {/* Grid Categories FlatList */}
            <View style={{ backgroundColor: BRAND.bg }}>
              <FlatList
                contentContainerStyle={styles.gridCategoriesContainer}
                data={categories}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.gridCategoryItem}>
                    <View style={styles.categoriesBox}>
                      <Image
                        source={item.image}
                        style={styles.categoryImageFull}
                        resizeMode='contain'
                      />
                    </View>
                    <Text style={styles.gridCategoryTitle}>{item.title}</Text>
                  </View>
                )}
              />
            </View>

            <View style={[styles.HeadingContainer, styles.bestDealHeading]}>
              <Text style={styles.HeadingText}>Best Deal</Text>
              <Text style={styles.SeeAllText}>See All</Text>
            </View>

            <FlatList
              contentContainerStyle={styles.productCardFlatlist}
              horizontal
              data={BestDeal}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.productCard}>
                  <View style={styles.productImageContainer}>
                    <TouchableOpacity style={styles.favoriteIcon}>
                      <FavoriteIcon width={s(20)} height={s(20)} />
                    </TouchableOpacity>
                    <Image
                      source={item.image}
                      style={styles.productImage}
                      resizeMode='contain'
                    />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <View style={styles.productDetails}>
                      <View>
                        <Text style={styles.productWeight}>{item.weight}</Text>
                        <Text style={styles.productPrice}>
                          $ {item.price}
                          <Text style={styles.productMrp}> ${item.mrp}</Text>
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />

            {/* Must Have */}
            <View style={[styles.HeadingContainer, styles.mustHaveHeading]}>
              <Text style={styles.HeadingText}>Must-Have</Text>
              <Text style={styles.SeeAllText}>See All</Text>
            </View>

            <FlatList
              contentContainerStyle={styles.productCardFlatlist}
              horizontal
              data={BestDeal}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.productCard}>
                  <View style={styles.productImageContainer}>
                    <TouchableOpacity style={styles.favoriteIcon}>
                      <FavoriteIcon width={s(20)} height={s(20)} />
                    </TouchableOpacity>
                    <Image
                      source={item.image}
                      style={styles.productImage}
                      resizeMode='contain'
                    />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <View style={styles.productDetails}>
                      <View>
                        <Text style={styles.productWeight}>{item.weight}</Text>
                        <Text style={styles.productPrice}>
                          $ {item.price}
                          <Text style={styles.productMrp}> ${item.mrp}</Text>
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Home

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
    // backgroundColor:"red",
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
    marginHorizontal: s(20),
    paddingHorizontal: s(10),
    paddingStart: s(20),
    borderRadius: s(12),
    justifyContent: 'space-between',
    elevation: 5,
    opacity: 0.7,
  },
  activeCard: {
    opacity: 1,
    backgroundColor: BRAND.white,
    flexDirection: "row"
  },
  cardContent: {
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: vs(10),
    width: '65%'
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
    height: '100%',
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
    backgroundColor: BRAND.bg
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
    marginTop: vs(15)
  },
  mustHaveHeading: {
    marginTop: vs(15)
  },
  productImageContainer: {
    width: "100%",
    height: "55%",
    borderRadius: s(12)
  },
  favoriteIcon: {
    position: "absolute",
    top: s(10),
    right: s(10)
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
  }
})