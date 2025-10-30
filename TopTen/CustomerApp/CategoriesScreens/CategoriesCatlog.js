import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import BRAND from '../../../src/constant/color';
import { s, vs, ms } from 'react-native-size-matters';
import { SearchIcon } from '../../../src/SVGicons/icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearSubcategories, fetchSubcategories } from '../../../store/slices/userSlice';

const CategoriesCatlog = () => {
    const dispatch = useDispatch();
    const { subcategories, isLoading } = useSelector(state => state.user);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const route = useRoute();
    const item = route?.params?.item;
    const navigation = useNavigation();

    // Memoized data
    const currentCategoryId = item?.id;
    const currentSubcategories = useMemo(() =>
        subcategories[currentCategoryId]?.data || [],
        [subcategories, currentCategoryId]
    );

    // Memoized handlers
    const handleFetchSubcategories = useCallback((categoryId) => {
        dispatch(fetchSubcategories(categoryId));
    }, [dispatch]);

    const handleSubcategoryPress = useCallback((subcategory) => {
        setSelectedSubcategory(subcategory);
    }, []);

    // Effects
    useEffect(() => {
        if (item?.id) {
            handleFetchSubcategories(item.id);
        }
        return () => {
            dispatch(clearSubcategories());
        };
    }, [item?.id, handleFetchSubcategories, dispatch]);

    useEffect(() => {
        if (currentSubcategories.length > 0 && !selectedSubcategory) {
            setSelectedSubcategory(currentSubcategories[0]);
        }
    }, [currentSubcategories, selectedSubcategory]);

    // Memoized utility functions
    const getImageSource = useCallback((subcategory) => {
        const firstImage = subcategory.images?.[0];
        if (firstImage?.image_url?.trim()) {
            return { uri: firstImage.image_url };
        }
        return require('../../../src/images/ladyfinger.png');
    }, []);

    const getSubcategoryName = useCallback((subcategory) => {
        return subcategory.sc_name || subcategory.name || subcategory.title || 'Unnamed Category';
    }, []);

    // Static product data
    const productData = useMemo(() => [
        {
            id: 1,
            title: 'Hybrid Tomato (Tamatar)',
            image: require('../../../src/images/Tomato.png'),
            weight: 500,
            price: 45,
        },
        {
            id: 2,
            title: 'Lady Finger (Bhindi)',
            image: require('../../../src/images/ladyfinger.png'),
            weight: 500,
            price: 45,
        },
    ], []);

    // Memoized render items
    const renderSubcategoryItem = useCallback(({ item: subcategory }) => (
        <TouchableOpacity
            style={[
                styles.itemView,
                selectedSubcategory?.id === subcategory.id && styles.selectedItemView
            ]}
            onPress={() => handleSubcategoryPress(subcategory)}
        >
            <View style={styles.categoryImageView}>
                <Image
                    source={getImageSource(subcategory)}
                    style={styles.categoryImage}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.categoryTitle}>
                {getSubcategoryName(subcategory)}
            </Text>
        </TouchableOpacity>
    ), [selectedSubcategory, handleSubcategoryPress, getImageSource, getSubcategoryName]);

    const renderProductItem = useCallback(({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AboutProductScreen', { item })}>
            <View style={styles.productImageView}>
                <Image source={item.image} style={styles.productImage} resizeMode='contain' />
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
    ), [navigation]);

    // Memoized list components
    const SubcategoriesList = useMemo(() => (
        <FlatList
            data={currentSubcategories}
            keyExtractor={(item, index) => item.id ? item.id.toString() : `subcat-${index}`}
            renderItem={renderSubcategoryItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No subcategories found</Text>
                </View>
            }
        />
    ), [currentSubcategories, renderSubcategoryItem]);

    const ProductsList = useMemo(() => (
        <FlatList
            contentContainerStyle={styles.productListContent}
            data={productData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
        />
    ), [productData, renderProductItem]);

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.SearchContainer}>
                <SearchIcon width={s(25)} height={s(25)} stroke={BRAND.muted} />
                <TextInput
                    placeholder='Search'
                    style={styles.searchInput}
                    placeholderTextColor={BRAND.muted}
                />
            </View>

            {/* Main Content */}
            <View style={styles.ListContainer}>
                {/* Subcategories Sidebar */}
                <View style={styles.CategoriesContainer}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color={BRAND.primary} />
                        </View>
                    ) : (
                        SubcategoriesList
                    )}
                </View>

                {/* Products Grid */}
                <View style={styles.ProductContainer}>
                    <Text style={styles.sectionTitle}>
                        {selectedSubcategory ? getSubcategoryName(selectedSubcategory) : 'All Products'}
                    </Text>
                    {ProductsList}
                </View>
            </View>
        </View>
    );
};

export default CategoriesCatlog;

// Optimized styles
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2.9;

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
    },
    ProductContainer: {
        width: "75%",
        backgroundColor: BRAND.bg,
    },
    itemView: {
        marginBottom: vs(10),
        // borderRadius:s(12),
        alignItems: "center",
        paddingVertical: vs(8),
    },
    selectedItemView: {
        backgroundColor: BRAND.primary + '20',
        borderRightWidth: 3,
        borderRightColor: BRAND.orange,
    },
    categoryImageView: {
        width: "90%",
        height: vs(70),
        backgroundColor: '#FAFAFA',
        borderRadius: s(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: "80%",
        height: "80%",
    },
    categoryTitle: {
        fontSize: ms(12),
        fontWeight: '800',
        textAlign: "center",
        color: BRAND.text,
        paddingHorizontal: s(5),
    },
    productListContent: {
        gap: s(10),
        paddingVertical: vs(10),
    },
    card: {
        width: CARD_WIDTH,
        height: s(200),
        paddingTop: s(5),
        backgroundColor: BRAND.white,
        justifyContent: 'space-evenly',
        borderRadius: s(12),
        marginRight: s(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: vs(20),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: vs(50),
    },
    emptyText: {
        fontSize: ms(14),
        color: BRAND.muted,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: ms(18),
        fontWeight: 'bold',
        color: BRAND.text,
        marginTop: vs(10),
        marginBottom: vs(5),
        alignSelf: 'flex-start',
        marginLeft: s(15),
    },
});