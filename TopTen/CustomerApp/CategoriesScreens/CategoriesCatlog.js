import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import BRAND from '../../../src/constant/color';
import { s, vs, ms } from 'react-native-size-matters';
import { SearchIcon } from '../../../src/SVGicons/icon';
import { useNavigation } from '@react-navigation/native';

const CategoriesCatlog = ({ route }) => {
    const { title } = route.params || {};
    const navigation = useNavigation();

    const categories = [
        {
            title: "Tomatoes",
            image: require('../../../src/images/amruud.png')
        },
        {
            title: "Potatoes",
            image: require('../../../src/images/Watermallon.png')
        },
        {
            title: "Spinach",
            image: require('../../../src/images/mango.png')
        },
        {
            title: "Lettuce",
            image: require('../../../src/images/Exotic.png')
        },
        {
            title: "Cabbage",
            image: require('../../../src/images/palak.png')
        },
        {
            title: "Cauliflower",
            image: require('../../../src/images/pattagobi.png')
        },
    ];

    const product = [
        {
            title: 'Hybrid Tomato (Tamatar)',
            image: require('../../../src/images/Tomato.png'),
            weight: 500,
            price: 45,
        },
        {
            title: 'Lady Finger (Bhindi)',
            image: require('../../../src/images/ladyfinger.png'),
            weight: 500,
            price: 45,
        }, {
            title: 'Green Chilli (Hari Mirch)',
            image: require('../../../src/images/harimirch.png'),
            weight: 500,
            price: 45,
        }, {
            title: 'Cluster Beans (Gawar Phali)',
            image: require('../../../src/images/phali.png'),
            weight: 500,
            price: 45,
        }, {
            title: 'Cabbage (Patta Gobhi)',
            image: require('../../../src/images/pattagobi.png'),
            weight: 500,
            price: 45,
        }, {
            title: 'Capsicum(Shimla Mirch)',
            image: require('../../../src/images/chilli.png'),
            weight: 500,
            price: 45,
        }, {
            title: 'Hybrid Tomato (Tamatar)',
            image: require('../../../src/images/Tomato.png'),
            weight: 500,
            price: 45,
        }, {
            title: 'Hybrid Tomato (Tamatar)',
            image: require('../../../src/images/Tomato.png'),
            weight: 500,
            price: 45,
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.SearchContainer}>
                <SearchIcon width={s(25)} height={s(25)} stroke={BRAND.muted} />
                <TextInput 
                    placeholder='Search'
                    style={styles.searchInput}
                    placeholderTextColor={BRAND.muted}
                />
            </View>
            <View style={styles.ListContainer}>
                <View style={styles.CategoriesContainer}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.itemView}>
                                <View style={styles.categoryImageView}>
                                    <Image
                                        source={item.image}
                                        style={styles.categoryImage}
                                        resizeMode='contain'
                                    />
                                </View>
                                <Text style={styles.categoryTitle}>{item.title}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.ProductContainer}>
                    <FlatList
                        contentContainerStyle={styles.productListContent}
                        data={product}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('AboutProductScreen',{item})}>
                                <View style={styles.productImageView}>
                                    <Image
                                        source={item.image}
                                        style={styles.productImage}
                                        resizeMode='contain'
                                    />
                                </View>
                                <Text style={styles.productName}>{item.title}</Text>
                                <View style={styles.productInfoContainer}>
                                    <View>
                                        <Text style={styles.productWeight}>{item.weight}g</Text>
                                        <Text style={styles.productPrice}>₹ {item.price}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.addButton}>
                                        <Text style={styles.addButtonText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

export default CategoriesCatlog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.white,
    },
    SearchContainer: {
        width: "90%",
        height: vs(40),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: s(15),
        borderWidth: s(1),
        borderColor: BRAND.border,
        alignSelf: "center",
        borderRadius: s(100),
        marginTop: vs(10),
    },
    searchInput: {
        fontSize: ms(16),
        marginStart: s(10),
        color: BRAND.text,
        flex: 1,
    },
    ListContainer: {
        flexDirection: "row",
        marginTop: vs(10),
        flex: 1,
    },
    CategoriesContainer: {
        width: "25%",
        borderRightWidth: s(0.5),
        borderRightColor: BRAND.muted,
        height: "100%",
    },
    ProductContainer: {
        width: "75%",
        alignItems: "center",
        height: "100%",
        backgroundColor: BRAND.bg,
    },
    itemView: {
        width: "100%",
        marginBottom: vs(10),
        alignItems: "center",
        gap: s(5),
    },
    categoryImageView: {
        width: "90%",
        height: vs(70),
        backgroundColor: '#FAFAFA',
        borderRadius: s(12),
    },
    categoryImage: {
        width: "100%",
        height: "100%",
    },
    categoryTitle: {
        fontSize: ms(12),
        fontWeight: '800',
        textAlign: "center",
        color: BRAND.text,
    },
    productListContent: {
        gap: s(10),
        paddingVertical: vs(10),
    },
    card: {
        width: Dimensions.get('window').width / 2.9,
        height: s(200),
        paddingTop: s(5),
        backgroundColor: BRAND.white,
        justifyContent: 'space-evenly',
        borderRadius: s(12),
        marginRight: s(10),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    productImageView: {
        height: s(100),
        alignSelf: "center",
        width: "90%",
        backgroundColor: '#FAFAFA',
        borderRadius: s(8),
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    productName: {
        fontSize: ms(14),
        fontWeight: "500",
        marginHorizontal: s(8),
        color: BRAND.text,
        lineHeight: ms(18),
    },
    productInfoContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        marginHorizontal: s(8),
    },
    productWeight: {
        fontSize: ms(14), 
        color: BRAND.muted,
        marginBottom: vs(2),
    },
    productPrice: {
        fontSize: ms(18),
        fontWeight: '600',
        color: BRAND.text,
    },
    addButton: {
        paddingHorizontal: s(18),
        borderRadius: s(8),
        paddingVertical: vs(6),
        backgroundColor: BRAND.primary,
    },
    addButtonText: {
        fontSize: ms(16), 
        color: BRAND.white, 
        fontWeight: "600",
    },
})