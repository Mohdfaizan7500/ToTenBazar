import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Platform,
    ScrollView,
    Pressable,
    Animated
} from 'react-native';
import BRAND from '../../../src/constant/color';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { SearchIcon } from '../../../src/SVGicons/icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearSubcategories, clearSubcategoriesProduct, fetchSubcategories, fetchSubcategoryDetails } from '../../../store/slices/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../../../config';
import { DARK } from '../../../src/constant/colors';

const CategoriesCatlog = () => {
    const dispatch = useDispatch();
    const { subcategories, isLoading } = useSelector(state => state.user);
    const accessToken = useSelector(state => state?.auth?.accessToken);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [productsLoading, setProductsLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Animation states
    const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const route = useRoute();
    const item = route?.params?.item;
    const type = route?.params?.type;

    const navigation = useNavigation();

    // Get screen dimensions
    const { width, height } = Dimensions.get('window');
    const isSmallScreen = width < 375;
    const isLargeScreen = width > 414;
    const isTablet = width > 768;

    // Keywords for animation
    const searchKeywords = useMemo(() => [
        "Milk",
        "Bread",
        "Eggs",
        "Butter",
        "Cheese",
        "Yogurt",
        "Fruits",
        "Vegetables"
    ], []);

    const currentCategoryId = item?.product;
    const currentSubcategories = useMemo(() =>
        subcategories[currentCategoryId]?.data || [],
        [subcategories, currentCategoryId]
    );

    const ITEMS_PER_PAGE = isTablet ? 12 : 10;
    const isMountedRef = useRef(true);
    const onEndReachedCalledDuringMomentumRef = useRef(true);

    // Animation functions
    const startKeywordAnimation = useCallback(() => {
        const animationDuration = 3000; // 2 seconds per keyword
        
        const animate = () => {
            // Slide out current keyword
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -30,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                })
            ]).start(() => {
                // Change keyword
                setCurrentKeywordIndex((prevIndex) => 
                    (prevIndex + 1) % searchKeywords.length
                );
                
                // Reset animation values for new keyword
                slideAnim.setValue(30); // Start from bottom
                fadeAnim.setValue(0);
                
                // Slide in new keyword
                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    })
                ]).start();
            });
        };

        // Start the animation loop
        const interval = setInterval(animate, animationDuration);
        return interval;
    }, [slideAnim, fadeAnim, searchKeywords.length]);

    // Responsive calculations
    const responsive = {
        cardWidth: isTablet ? width / 3.2 : width / 2.7,
        cardHeight: isTablet ? s(240) : s(200),
        imageHeight: isTablet ? s(120) : s(100),
        sidebarWidth: isTablet ? '25%' : '20%',
        productWidth: isTablet ? '72%' : '75%',
        fontSize: {
            small: isTablet ? ms(10) : ms(8),
            medium: isTablet ? ms(16) : ms(14),
            large: isTablet ? ms(20) : ms(18),
            xlarge: isTablet ? ms(24) : ms(16),
        },
        spacing: {
            small: isTablet ? s(8) : s(5),
            medium: isTablet ? s(12) : s(10),
            large: isTablet ? s(16) : s(15),
        }
    };

    const handleFetchSubcategoriesDetails = useCallback(async (subcategory_id, pageNum = 1) => {
        console.log('🔄 Fetching subcategory details for:', subcategory_id);

        try {
            setProductsLoading(true);
            setError(null);

            const apiUrl = `${BASE_URL}/prod/banner_product?subcategory_id=${subcategory_id}&page=${pageNum}&length=${ITEMS_PER_PAGE}`;
            console.log('📡 API URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log('📊 Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.log('❌ API Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Subcategory details response:', data);

            if (data.data && Array.isArray(data.data)) {
                console.log(`🎯 Found ${data.data.length} products for subcategory ${subcategory_id}`);

                if (pageNum === 1) {
                    setProducts(data.data);
                } else {
                    setProducts(prevProducts => [...prevProducts, ...data.data]);
                }

                setHasMore(data.data.length === ITEMS_PER_PAGE);
                setPage(pageNum + 1);

                return data.data;
            } else {
                console.log('⚠️ No products array found in response');
                setProducts([]);
                setHasMore(false);
                return [];
            }

        } catch (error) {
            console.log('❌ Error fetching subcategory details:', error);
            setError(error.message);
            setProducts([]);
            throw error;
        } finally {
            setProductsLoading(false);
            setLoadingMore(false);
        }
    }, [accessToken, ITEMS_PER_PAGE]);

    const handleFetchMoreProducts = useCallback(async () => {
        if (!loadingMore && hasMore && selectedSubcategory?.id && isMountedRef.current) {
            setLoadingMore(true);
            await handleFetchSubcategoriesDetails(selectedSubcategory.id, page);
        }
    }, [loadingMore, hasMore, selectedSubcategory, page, handleFetchSubcategoriesDetails]);

    // Fixed handler with proper error checking
    const handleFetchSubcategories = useCallback(async (id) => {
        try {
            const result = await dispatch(fetchSubcategories(id));
            console.log('result 32:', result);
            
            if (result?.payload?.category_id && result.payload.data?.data?.length > 0) {
                console.log('First subcategory ID:', result.payload.data.data[0].id);
                handleFetchSubcategoriesDetails(result.payload.data.data[0].id);
            } else {
                console.log('⚠️ No subcategories found for this category');
                setProducts([]);
                setProductsLoading(false);
                setError('No subcategories found for this category');
            }
        } catch (error) {
            console.log('❌ Error fetching subcategories:', error);
            setError('Failed to load subcategories');
            setProductsLoading(false);
        }
    }, [dispatch, handleFetchSubcategoriesDetails]);

    const handleSubcategoryPress = useCallback((subcategory) => {
        setSelectedSubcategory(subcategory);
        console.log('Selected subcategory:', subcategory);

        // Reset pagination for new subcategory
        setPage(1);
        setHasMore(true);
        setProducts([]);
        setProductsLoading(true);

        handleFetchSubcategoriesDetails(subcategory.id, 1);
    }, [handleFetchSubcategoriesDetails]);

    // Load more products
    const loadMoreData = useCallback(() => {
        // Prevent multiple calls during momentum scroll
        if (onEndReachedCalledDuringMomentumRef.current) {
            onEndReachedCalledDuringMomentumRef.current = false;
            return;
        }

        if (!loadingMore && hasMore && !productsLoading && selectedSubcategory?.id && isMountedRef.current) {
            console.log('Loading more products...', page);
            handleFetchMoreProducts();
        }
    }, [loadingMore, hasMore, productsLoading, selectedSubcategory, page, handleFetchMoreProducts]);

    // Handle momentum scroll
    const handleMomentumScrollBegin = useCallback(() => {
        onEndReachedCalledDuringMomentumRef.current = false;
    }, []);

    const handleMomentumScrollEnd = useCallback(() => {
        onEndReachedCalledDuringMomentumRef.current = true;
    }, []);

    // Effects
    useEffect(() => {
        isMountedRef.current = true;
        onEndReachedCalledDuringMomentumRef.current = true;

        if (item?.id) {
            handleFetchSubcategories(item.product);
        }
        return () => {
            isMountedRef.current = false;
            dispatch(clearSubcategories());
        };
    }, [item?.id, type, handleFetchSubcategories, dispatch]);

    useEffect(() => {
        if (currentSubcategories.length > 0 && !selectedSubcategory) {
            const firstSubcategory = currentSubcategories[0];
            setSelectedSubcategory(firstSubcategory);
            // Fetch products for the first subcategory
            if (firstSubcategory.id) {
                handleFetchSubcategoriesDetails(firstSubcategory.id, 1);
            }
        }
    }, [currentSubcategories, selectedSubcategory, handleFetchSubcategoriesDetails]);

    // Start animation when component mounts
    useEffect(() => {
        const animationInterval = startKeywordAnimation();
        
        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
        };
    }, [startKeywordAnimation]);

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

    // Format price to Indian Rupees
    const formatPrice = useCallback((price) => {
        if (!price) return '₹0';
        return `₹${(parseInt(price) / 100).toLocaleString('en-IN')}`;
    }, []);

    // Calculate discount percentage
    const calculateDiscount = useCallback((originalPrice, sellingPrice) => {
        if (!originalPrice || !sellingPrice || originalPrice <= sellingPrice || originalPrice === 0) {
            return '0% off';
        }
        const discount = ((originalPrice - sellingPrice) / originalPrice) * 100;
        return `${Math.round(discount)}% off`;
    }, []);

    // Skeleton Loaders
    const SubcategorySkeleton = useCallback(() => (
        <View style={styles.skeletonItemView}>
            <View style={[styles.skeletonCategoryImage, { height: isTablet ? vs(80) : vs(60) }]} />
            <View style={styles.skeletonCategoryTitle} />
        </View>
    ), [isTablet]);

    const ProductSkeleton = useCallback(() => (
        <View style={[styles.skeletonCard, { width: responsive.cardWidth, height: responsive.cardHeight }]}>
            <View style={[styles.skeletonProductImage, { height: responsive.imageHeight }]} />
            <View style={styles.skeletonProductName} />
            <View style={styles.skeletonProductInfo}>
                <View style={styles.skeletonProductDetails}>
                    <View style={styles.skeletonProductWeight} />
                    <View style={styles.skeletonProductPrice} />
                </View>
                <View style={styles.skeletonAddButton} />
            </View>
        </View>
    ), [responsive]);

    const renderSubcategorySkeleton = useCallback(() => (
        Array.from({ length: isTablet ? 6 : 8 }).map((_, index) => (
            <SubcategorySkeleton key={`skeleton-subcat-${index}`} />
        ))
    ), [isTablet, SubcategorySkeleton]);

    const renderProductSkeleton = useCallback(() => (
        Array.from({ length: isTablet ? 9 : 6 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-product-${index}`} />
        ))
    ), [isTablet, ProductSkeleton]);

    // Render load more footer
    const renderFooter = useCallback(() => {
        if (!loadingMore) return null;

        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color={BRAND.primary} />
                <Text style={styles.footerText}>Loading more products...</Text>
            </View>
        );
    }, [loadingMore]);

    // Product Image Component with Loading Indicator
    const ProductImageWithLoader = useCallback(({ source, style, discountText, hasDiscount }) => {
        const [imageLoading, setImageLoading] = useState(true);
        const [imageError, setImageError] = useState(false);

        const handleImageLoad = () => {
            setImageLoading(false);
        };

        const handleImageError = () => {
            setImageLoading(false);
            setImageError(true);
        };

        return (
            <View style={[styles.productImageView, { height: responsive.imageHeight }]}>
                {imageLoading && (
                    <View style={styles.imageLoaderContainer}>
                        <ActivityIndicator size="small" color={BRAND.primary} />
                    </View>
                )}
                <Image
                    source={!imageError ? source : require('../../../src/images/default.jpg')}
                    style={[
                        styles.productImage,
                        imageLoading && styles.hiddenImage
                    ]}
                    resizeMode='contain'
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                {hasDiscount && !imageLoading && (
                    <View style={styles.discountBadge}>
                        <Text style={[styles.discountText, { fontSize: responsive.fontSize.small }]}>
                            {discountText}
                        </Text>
                    </View>
                )}
            </View>
        );
    }, [responsive]);

    // Render items
    const renderSubcategoryItem = useCallback(({ item: subcategory }) => (
        <TouchableOpacity
            style={[
                styles.itemView,
                selectedSubcategory?.id === subcategory.id && styles.selectedItemView
            ]}
            onPress={() => handleSubcategoryPress(subcategory)}
        >
            <View style={[styles.categoryImageView, { height: isTablet ? vs(70) : vs(60) }]}>
                <Image source={getImageSource(subcategory)} style={styles.categoryImage} resizeMode='contain' />
            </View>
            <Text style={[styles.categoryTitle, { fontSize: responsive.fontSize.medium }]}>
                {getSubcategoryName(subcategory)}
            </Text>
        </TouchableOpacity>
    ), [selectedSubcategory, handleSubcategoryPress, getImageSource, getSubcategoryName, isTablet, responsive]);

    const renderProductItem = useCallback(({ item }) => {
        if (!item) {
            return (
                <View style={[styles.card, { width: responsive.cardWidth, height: responsive.cardHeight }]}>
                    <Text style={styles.errorText}>Invalid product</Text>
                </View>
            );
        }

        const productImage = item.image?.[0]?.image_url || item.product_image?.[0]?.image_url;
        const productName = item.product_name || item.name || 'Unnamed Product';
        const productUnit = item.product_unit || item.unit || '';
        const originalPrice = item.product_original_price || item.original_price;
        const sellingPrice = item.product_selling_price || item.selling_price;
        const discountPercentage = item.discount_percentage;

        // Determine discount display
        let discountText = '0% off';
        let hasDiscount = false;

        if (discountPercentage && discountPercentage > 0) {
            discountText = `${Math.round(discountPercentage)}% off`;
            hasDiscount = true;
        } else if (originalPrice && sellingPrice && originalPrice > sellingPrice) {
            const calculatedDiscount = ((originalPrice - sellingPrice) / originalPrice) * 100;
            discountText = `${Math.round(calculatedDiscount)}% off`;
            hasDiscount = true;
        }

        const hasPriceDifference = originalPrice && sellingPrice && originalPrice > sellingPrice;

        const imageSource = productImage ? { uri: productImage } : require('../../../src/images/default.jpg');

        return (
            <TouchableOpacity
                style={[styles.card, { width: responsive.cardWidth, height: responsive.cardHeight }]}
                onPress={() => navigation.navigate('AboutProductScreen', { item })}
            >
                <ProductImageWithLoader 
                    source={imageSource}
                    discountText={discountText}
                    hasDiscount={hasDiscount}
                />
                <Text style={[styles.productName, { fontSize: responsive.fontSize.medium }]} numberOfLines={2}>
                    {productName}
                </Text>
                {productUnit ? (
                    <Text style={[styles.productUnit, { fontSize: responsive.fontSize.small }]} numberOfLines={1}>
                        {productUnit}
                    </Text>
                ) : null}
                <View style={styles.productInfoContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.productPrice, { fontSize: responsive.fontSize.large }]}>
                            {formatPrice(sellingPrice)}
                        </Text>
                        {hasPriceDifference && (
                            <Text style={[styles.originalPrice, { fontSize: responsive.fontSize.medium }]}>
                                {formatPrice(originalPrice)}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: s(10) }}>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={[styles.addButtonText, { fontSize: responsive.fontSize.medium }]}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }, [navigation, formatPrice, responsive, ProductImageWithLoader]);

    const handleRetry = useCallback(() => {
        if (selectedSubcategory?.id) {
            handleFetchSubcategoriesDetails(selectedSubcategory.id, 1);
        } else if (item?.product) {
            handleFetchSubcategories(item.product);
        }
    }, [selectedSubcategory, item, handleFetchSubcategoriesDetails, handleFetchSubcategories]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={BRAND.white} barStyle={'light-contents'} />

            {/* Search Bar with Animated Keywords */}
            <Pressable style={styles.SearchContainer} onPress={()=>navigation.navigate('SearchScreen')}>
                <SearchIcon width={s(18)} height={s(18)} stroke={BRAND.muted} />
                <View style={styles.placeholderContainer}>
                    <Text style={styles.searchStaticText}>Search for </Text>
                    <View style={styles.animatedKeywordContainer}>
                        <Animated.Text 
                            style={[
                                styles.animatedKeyword,
                                { 
                                    fontSize: s(13),
                                    transform: [{ translateY: slideAnim }],
                                    opacity: fadeAnim
                                }
                            ]}
                        >
                            " {searchKeywords[currentKeywordIndex]} "
                        </Animated.Text>
                    </View>
                </View>
            </Pressable>

            {/* Rest of your component remains the same */}
            {/* Main Content */}
            <View style={styles.ListContainer}>
                {/* Subcategories Sidebar */}
                <View style={[styles.CategoriesContainer, { width: responsive.sidebarWidth }]}>
                    {isLoading ? (
                        <ScrollView style={styles.skeletonList}>
                            {renderSubcategorySkeleton()}
                        </ScrollView>
                    ) : (
                        <FlatList
                            data={currentSubcategories}
                            keyExtractor={(item, index) => item.product?.toString() || `subcat-${index}`}
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
                <View style={[styles.ProductContainer, { width: responsive.productWidth }]}>
                    <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.xlarge }]}>
                        {selectedSubcategory ? getSubcategoryName(selectedSubcategory) : 'All Products'}
                    </Text>

                    {productsLoading && !loadingMore ? (
                        <FlatList
                            contentContainerStyle={[styles.productListContent, { gap: responsive.spacing.small }]}
                            data={Array.from({ length: isTablet ? 9 : 6 })}
                            keyExtractor={(_, index) => `skeleton-${index}`}
                            numColumns={isTablet ? 3 : 2}
                            renderItem={() => <ProductSkeleton />}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>Error: {error}</Text>
                            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                                <Text style={styles.retryButtonText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <FlatList
                            contentContainerStyle={[styles.productListContent, { gap: responsive.spacing.small }]}
                            data={products}
                            keyExtractor={(item, index) => `${item.product || item.product_id}-${index}`}
                            numColumns={isTablet ? 3 : 2}
                            renderItem={renderProductItem}
                            showsVerticalScrollIndicator={false}
                            onEndReached={loadMoreData}
                            onEndReachedThreshold={0.8}
                            onMomentumScrollBegin={handleMomentumScrollBegin}
                            onMomentumScrollEnd={handleMomentumScrollEnd}
                            ListFooterComponent={renderFooter}
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No products found</Text>
                                </View>
                            }
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={isTablet ? 12 : 8}
                            updateCellsBatchingPeriod={50}
                            windowSize={isTablet ? 10 : 7}
                            initialNumToRender={isTablet ? 12 : 8}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CategoriesCatlog;

// Updated styles with animation styles
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.white,
    },
    SearchContainer: {
        width: "93%",
        height: isTablet ? vs(40) : vs(35),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: isTablet ? s(20) : s(15),
        borderWidth: s(1),
        borderColor: BRAND.border,
        alignSelf: "center",
        marginTop: isTablet ? s(15) : s(10),
        borderRadius: s(5),
    },
    placeholderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: s(15),
    },
    searchStaticText: {
        fontSize: s(13),
        color: DARK.gray[400],
    },
    animatedKeywordContainer: {
        height: s(20),
        overflow: 'hidden',
        marginLeft: s(5),
        // backgroundColor:"red"
    },
    animatedKeyword: {
        color: DARK.gray[400],
        // fontWeight: '600',
    },
    // ... rest of your existing styles remain the same
    ListContainer: {
        flexDirection: "row",
        marginTop: isTablet ? vs(15) : vs(10),
        flex: 1,
    },
    CategoriesContainer: {
        borderRightWidth: s(0.3),
        borderRightColor: BRAND.muted,
    },
    ProductContainer: {
        backgroundColor: BRAND.bg,
        flex: 1,
    },
    itemView: {
        marginBottom: isTablet ? vs(15) : vs(10),
        alignItems: "center",
        paddingVertical: isTablet ? vs(12) : vs(8),
    },
    selectedItemView: {
        backgroundColor: BRAND.white,
        borderRightWidth: 3,
        borderRightColor: BRAND.orange,
    },
    categoryImageView: {
        width: "90%",
        backgroundColor: '#dce2e6ff',
        borderRadius: isTablet ? s(14) : s(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: "80%",
        height: "80%",
        mixBlendMode:"multiply"
    },
    categoryTitle: {
        fontWeight: '800',
        textAlign: "center",
        color: BRAND.text,
        paddingHorizontal: s(5),
        marginTop: isTablet ? vs(5) : vs(3),
    },
    productListContent: {
        paddingHorizontal: isTablet ? s(10) : s(5),
        paddingVertical: isTablet ? vs(15) : vs(10),
    },
    card: {
        paddingTop: isTablet ? s(8) : s(5),
        backgroundColor: BRAND.white,
        justifyContent: 'space-evenly',
        borderRadius: isTablet ? s(14) : s(12),
        marginRight: isTablet ? s(12) : s(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.1,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    productImageView: {
        alignSelf: "center",
        width: "90%",
        backgroundColor: '#FAFAFA',
        borderRadius: isTablet ? s(10) : s(8),
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    hiddenImage: {
        opacity: 0,
    },
    imageLoaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: isTablet ? s(10) : s(8),
    },
    discountBadge: {
        position: 'absolute',
        top: isTablet ? s(6) : s(4),
        left: isTablet ? s(6) : s(4),
        backgroundColor: BRAND.orange,
        paddingHorizontal: isTablet ? s(6) : s(4),
        paddingVertical: isTablet ? s(2) : s(1),
        borderRadius: isTablet ? s(4) : s(3),
    },
    discountText: {
        color: '#fff',
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                lineHeight: isTablet ? ms(12) : ms(10),
            },
        }),
    },
    productName: {
        fontWeight: "500",
        marginHorizontal: isTablet ? s(12) : s(8),
        color: BRAND.text,
        ...Platform.select({
            ios: {
                lineHeight: isTablet ? ms(22) : ms(18),
            },
        }),
    },
    productUnit: {
        color: BRAND.muted,
        marginHorizontal: isTablet ? s(12) : s(8),
        marginBottom: isTablet ? vs(4) : vs(2),
    },
    productInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: isTablet ? s(12) : s(8),
    },
    priceContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: s(10)
    },
    productPrice: {
        fontWeight: '600',
        color: BRAND.text,
    },
    originalPrice: {
        color: BRAND.muted,
        textDecorationLine: 'line-through',
        marginTop: vs(2),
    },
    addButton: {
        paddingHorizontal: isTablet ? s(22) : s(18),
        width: s(70),
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: isTablet ? s(10) : s(8),
        paddingVertical: isTablet ? vs(8) : vs(6),
        backgroundColor: BRAND.primary,
    },
    addButtonText: {
        color: BRAND.white,
        fontWeight: "600",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isTablet ? vs(30) : vs(20),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isTablet ? vs(80) : vs(50),
    },
    emptyText: {
        color: BRAND.muted,
        textAlign: 'center',
        fontSize: isTablet ? ms(16) : ms(14),
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: isTablet ? s(20) : s(16),
    },
    errorText: {
        color: BRAND.error,
        textAlign: 'center',
        marginBottom: isTablet ? s(20) : s(16),
        fontSize: isTablet ? ms(15) : ms(13),
    },
    retryButton: {
        backgroundColor: BRAND.primary,
        paddingHorizontal: isTablet ? s(20) : s(16),
        paddingVertical: isTablet ? s(12) : s(8),
        borderRadius: isTablet ? s(8) : s(6),
    },
    retryButtonText: {
        color: BRAND.white,
        fontWeight: 'bold',
        fontSize: isTablet ? ms(13) : ms(11),
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: BRAND.text,
        marginTop: isTablet ? vs(8) : vs(5),
        alignSelf: 'flex-start',
        marginLeft: isTablet ? s(20) : s(15),
        marginBottom: isTablet ? vs(10) : vs(5),
    },
    footerContainer: {
        padding: isTablet ? s(20) : s(16),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: isTablet ? s(12) : s(8),
    },
    footerText: {
        color: BRAND.muted,
        fontSize: isTablet ? ms(13) : ms(11),
    },
    // Skeleton Styles
    skeletonList: {
        flex: 1,
    },
    skeletonItemView: {
        marginBottom: isTablet ? vs(15) : vs(10),
        alignItems: "center",
        paddingVertical: isTablet ? vs(12) : vs(8),
    },
    skeletonCategoryImage: {
        width: "90%",
        backgroundColor: '#F0F0F0',
        borderRadius: isTablet ? s(14) : s(12),
        marginBottom: isTablet ? vs(8) : vs(5),
    },
    skeletonCategoryTitle: {
        width: "80%",
        height: isTablet ? ms(14) : ms(12),
        backgroundColor: '#F0F0F0',
        borderRadius: isTablet ? s(6) : s(4),
    },
    skeletonCard: {
        paddingTop: isTablet ? s(8) : s(5),
        backgroundColor: BRAND.white,
        justifyContent: 'space-evenly',
        borderRadius: isTablet ? s(14) : s(12),
        marginRight: isTablet ? s(12) : s(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    skeletonProductImage: {
        alignSelf: "center",
        width: "90%",
        backgroundColor: '#F0F0F0',
        borderRadius: isTablet ? s(10) : s(8),
        marginBottom: isTablet ? vs(12) : vs(8),
    },
    skeletonProductName: {
        height: isTablet ? ms(18) : ms(16),
        backgroundColor: '#F0F0F0',
        borderRadius: isTablet ? s(6) : s(4),
        marginHorizontal: isTablet ? s(12) : s(8),
        marginBottom: isTablet ? vs(12) : vs(8),
    },
    skeletonProductInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: isTablet ? s(12) : s(8),
    },
    skeletonProductDetails: {
        flex: 1,
    },
    skeletonProductWeight: {
        height: isTablet ? ms(14) : ms(12),
        backgroundColor: '#F0F0F0',
        borderRadius: isTablet ? s(6) : s(4),
        marginBottom: isTablet ? vs(6) : vs(4),
        width: '60%',
    },
    skeletonProductPrice: {
        height: isTablet ? ms(18) : ms(16),
        backgroundColor: '#F0F0F0',
        borderRadius: isTablet ? s(6) : s(4),
        width: '40%',
    },
    skeletonAddButton: {
        paddingHorizontal: isTablet ? s(22) : s(18),
        borderRadius: isTablet ? s(10) : s(8),
        paddingVertical: isTablet ? vs(8) : vs(6),
        backgroundColor: '#F0F0F0',
        width: isTablet ? s(60) : s(50),
    },
});