import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import BRAND from '../../../src/constant/color';
import { s, vs, ms } from 'react-native-size-matters';
import { SearchIcon } from '../../../src/SVGicons/icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearSubcategories, clearSubcategoriesProduct, fetchSubcategories, fetchSubcategoryDetails } from '../../../store/slices/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoriesCatlog = () => {
    const dispatch = useDispatch();
    const { subcategories, isLoading, subcategoriesProduct } = useSelector(state => state.user);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [productsLoading, setProductsLoading] = useState(true);
    const route = useRoute();
    const item = route?.params?.item;
    const type = route?.params?.type
    console.log('type:', type)
    console.log("subcategoriesProduct:", subcategoriesProduct)
    const navigation = useNavigation();

    const currentCategoryId = item?.id;
    const currentSubcategories = useMemo(() =>
        subcategories[currentCategoryId]?.data || [],
        [subcategories, currentCategoryId]
    );

    // Optimized handlers
    const handleFetchSubcategories = useCallback(async (id, type) => {
        const result = await dispatch(fetchSubcategories({ category_id: id, type: type }));
        console.log('result 32:', result)
        if (result?.payload?.category_id) {
            console.log(result.payload.data.data[0].id)
            handleFetchSubcategoriesDetails(result?.payload?.category_id, result.payload.data.data[0].id)
        }
    }, [dispatch]);

    const handleFetchSubcategoriesDetails = useCallback((category_id, subcategory_id) => {
        dispatch(clearSubcategoriesProduct())
        dispatch(fetchSubcategoryDetails({ category_id: category_id, subcategory_id: subcategory_id }))
    }, [dispatch])

    const handleSubcategoryPress = useCallback((subcategory) => {
        setSelectedSubcategory(subcategory);
        console.log(subcategory);
        handleFetchSubcategoriesDetails(subcategory.category,subcategory.id)
        // Simulate products loading when subcategory changes
        setProductsLoading(true);
        setTimeout(() => setProductsLoading(false), 1000);
    }, []);

    // Effects
    useEffect(() => {
        if (item?.id && type) {
            handleFetchSubcategories(item.id, type);
            setProductsLoading(true);
            setTimeout(() => setProductsLoading(false), 1500);
        }
        return () => dispatch(clearSubcategories());
    }, [item?.id]);

    useEffect(() => {
        if (currentSubcategories.length > 0 && !selectedSubcategory) {
            setSelectedSubcategory(currentSubcategories[0]);
        }
    }, [currentSubcategories, selectedSubcategory]);

    // Memoized utilities
    const getImageSource = useCallback((subcategory) => {
        const imageUrl = subcategory.images?.[0]?.image_url?.trim() || subcategory.image?.[0]?.image_url?.trim();
        return imageUrl ? { uri: imageUrl } : require('../../../src/images/default.jpg');
    }, []);

    const capitalizeFirstLetter = useCallback((str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1) : str
        , []);

    const getSubcategoryName = useCallback((subcategory) =>
        capitalizeFirstLetter(subcategory.sc_name || subcategory.name || subcategory.title) || 'Unnamed Category'
        , []);

    // Static data
    const productData = useMemo(() => [
        { id: 1, title: 'Hybrid Tomato (Tamatar)', image: require('../../../src/images/Tomato.png'), weight: 500, price: 45 },
        { id: 2, title: 'Lady Finger (Bhindi)', image: require('../../../src/images/ladyfinger.png'), weight: 500, price: 45 },
    ], []);

    // Skeleton Loaders
    const SubcategorySkeleton = useCallback(() => (
        <View style={styles.skeletonItemView}>
            <View style={styles.skeletonCategoryImage} />
            <View style={styles.skeletonCategoryTitle} />
        </View>
    ), []);

    const ProductSkeleton = useCallback(() => (
        <View style={styles.skeletonCard}>
            <View style={styles.skeletonProductImage} />
            <View style={styles.skeletonProductName} />
            <View style={styles.skeletonProductInfo}>
                <View style={styles.skeletonProductDetails}>
                    <View style={styles.skeletonProductWeight} />
                    <View style={styles.skeletonProductPrice} />
                </View>
                <View style={styles.skeletonAddButton} />
            </View>
        </View>
    ), []);

    const renderSubcategorySkeleton = useCallback(() => (
        Array.from({ length: 8 }).map((_, index) => (
            <SubcategorySkeleton key={`skeleton-subcat-${index}`} />
        ))
    ), []);

    const renderProductSkeleton = useCallback(() => (
        Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-product-${index}`} />
        ))
    ), []);

    // Render items
    const renderSubcategoryItem = useCallback(({ item: subcategory }) => (
        <TouchableOpacity
            style={[
                styles.itemView,
                selectedSubcategory?.id === subcategory.id && styles.selectedItemView
            ]}
            onPress={() => handleSubcategoryPress(subcategory)}
        >
            <View style={styles.categoryImageView}>
                <Image source={getImageSource(subcategory)} style={styles.categoryImage} resizeMode='contain' />
            </View>
            <Text style={styles.categoryTitle}>{getSubcategoryName(subcategory)}</Text>
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={BRAND.white} barStyle={'light-contents'} />

            {/* Search Bar */}
            <View style={styles.SearchContainer}>
                <SearchIcon width={s(18)} height={s(18)} stroke={BRAND.muted} />
                <TextInput placeholder='Search' style={styles.searchInput} placeholderTextColor={BRAND.muted} />
            </View>

            {/* Main Content */}
            <View style={styles.ListContainer}>
                {/* Subcategories Sidebar */}
                <View style={styles.CategoriesContainer}>
                    {isLoading ? (
                        <View style={styles.skeletonList}>
                            {renderSubcategorySkeleton()}
                        </View>
                    ) : (
                        <FlatList
                            data={currentSubcategories}
                            keyExtractor={(item, index) => item.id?.toString() || `subcat-${index}`}
                            renderItem={renderSubcategoryItem}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No subcategories found</Text>
                                </View>
                            }
                        />
                    )}
                </View>

                {/* Products Grid */}
                <View style={styles.ProductContainer}>
                    <Text style={styles.sectionTitle}>
                        {selectedSubcategory ? getSubcategoryName(selectedSubcategory) : 'All Products'}
                    </Text>

                    {productsLoading ? (
                        <FlatList
                            contentContainerStyle={styles.productListContent}
                            data={Array.from({ length: 6 })}
                            keyExtractor={(_, index) => `skeleton-${index}`}
                            numColumns={2}
                            renderItem={() => <ProductSkeleton />}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <FlatList
                            contentContainerStyle={styles.productListContent}
                            data={productData}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            renderItem={renderProductItem}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No products found</Text>
                                </View>
                            }
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
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
        height: vs(33),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: s(15),
        borderWidth: s(1),
        borderColor: BRAND.border,
        alignSelf: "center",
        marginTop: s(10),
        borderRadius: s(100),
    },
    searchInput: {
        fontSize: ms(14),
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
        width: "20%",
        borderRightWidth: s(0.3),
        borderRightColor: BRAND.muted,
    },
    ProductContainer: {
        width: "75%",
        backgroundColor: BRAND.bg,
    },
    itemView: {
        marginBottom: vs(10),
        alignItems: "center",
        paddingVertical: vs(8),
    },
    selectedItemView: {
        backgroundColor: BRAND.white,
        borderRightWidth: 3,
        borderRightColor: BRAND.orange,
    },
    categoryImageView: {
        width: "90%",
        height: vs(60),
        backgroundColor: '#dce2e6ff',
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
        gap: s(5),
        paddingHorizontal: s(5),
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
        fontSize: ms(16),
        fontWeight: 'bold',
        color: BRAND.text,
        marginTop: vs(5),
        alignSelf: 'flex-start',
        marginLeft: s(15),
    },
    // Skeleton Styles
    skeletonList: {
        flex: 1,
    },
    skeletonItemView: {
        marginBottom: vs(10),
        alignItems: "center",
        paddingVertical: vs(8),
    },
    skeletonCategoryImage: {
        width: "90%",
        height: vs(70),
        backgroundColor: '#F0F0F0',
        borderRadius: s(12),
        marginBottom: vs(5),
    },
    skeletonCategoryTitle: {
        width: "80%",
        height: ms(12),
        backgroundColor: '#F0F0F0',
        borderRadius: s(4),
    },
    skeletonCard: {
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
    skeletonProductImage: {
        height: s(100),
        alignSelf: "center",
        width: "90%",
        backgroundColor: '#F0F0F0',
        borderRadius: s(8),
        marginBottom: vs(8),
    },
    skeletonProductName: {
        height: ms(16),
        backgroundColor: '#F0F0F0',
        borderRadius: s(4),
        marginHorizontal: s(8),
        marginBottom: vs(8),
    },
    skeletonProductInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: s(8),
    },
    skeletonProductDetails: {
        flex: 1,
    },
    skeletonProductWeight: {
        height: ms(12),
        backgroundColor: '#F0F0F0',
        borderRadius: s(4),
        marginBottom: vs(4),
        width: '60%',
    },
    skeletonProductPrice: {
        height: ms(16),
        backgroundColor: '#F0F0F0',
        borderRadius: s(4),
        width: '40%',
    },
    skeletonAddButton: {
        paddingHorizontal: s(18),
        borderRadius: s(8),
        paddingVertical: vs(6),
        backgroundColor: '#F0F0F0',
        width: s(50),
    },
});