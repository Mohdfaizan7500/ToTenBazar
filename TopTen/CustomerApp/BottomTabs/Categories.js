import { Alert, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BRAND from '../../../src/constant/color'
import { s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const Categories = () => {

  const navigation = useNavigation();

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
    },
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BRAND.bg} barStyle="dark-content" />
      <View style={styles.FlateListContainer}>
        <FlatList
          contentContainerStyle={styles.gridCategoriesContainer}
          data={categories}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.gridCategoryItem}
              onPress={() => navigation.navigate('CategoriesCatlog', {
                title: item.title.replace(/\n/g, ' ') // Remove newlines for header
              })}
            >
              <View style={styles.categoriesBox}>
                <Image
                  source={item.image}
                  style={styles.categoryImage}
                  resizeMode='contain'
                />
              </View>
              <Text style={styles.gridCategoryTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.white,
  },
  FlateListContainer: {
    marginHorizontal: s(5)

  },
  gridCategoriesContainer: {
    paddingVertical: vs(20),
    backgroundColor: BRAND.white
  },
  gridCategoryItem: {
    alignItems: "center",
    marginBottom: vs(20),
    width: Dimensions.get('window').width / 4,
  },
  categoriesBox: {
    width: s(60),
    height: s(60),
    borderRadius: s(12),
    backgroundColor: '#9DA49E0D',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: s(8)
  },
  categoryImage: {
    width: "80%",
    height: "80%"
  },
  gridCategoryTitle: {
    textAlign: "center",
    fontSize: s(12),
    color: BRAND.text,
    fontWeight: '500',
    lineHeight: s(16)
  }
})