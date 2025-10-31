import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    Animated
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs, ms, mvs } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearGroupProducts, fetchProductsByGroup } from '../../store/slices/userSlice'
import BRAND from '../../src/constant/color'
import { BASE_URL } from '../../config'

// Wave Effect Component
const WaveEffect = () => {
    const waveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(waveAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100]
    });

    return (
        <Animated.View
            style={[
                styles.waveOverlay,
                {
                    transform: [
                        { translateX },
                        { skewX: '-20deg' }
                    ],
                },
            ]}
        />
    );
};

// Skeleton Loader Component with Wave Effect
const ProductCardSkeleton = () => {
    return (
        <View style={styles.skeletonCard}>
            <View style={styles.skeletonImage}>
                <WaveEffect />
            </View>
            <View style={styles.skeletonContent}>
                <View style={styles.skeletonTitle}>
                    <WaveEffect />
                </View>
                <View style={styles.skeletonSubtitle}>
                    <WaveEffect />
                </View>
                <View style={styles.skeletonRating}>
                    <WaveEffect />
                </View>
                <View style={styles.skeletonPrice}>
                    <WaveEffect />
                </View>
                <View style={styles.skeletonButton}>
                    <WaveEffect />
                </View>
            </View>
        </View>
    );
};

const Catlog = () => {
    const accessToken = useSelector(state => state?.auth?.accessToken)
    const route = useRoute();
    const groupName = route?.params?.title
    const type = route?.params?.type
    const bannerId = route?.params?.bannerId
    console.log('type:', type)
    console.log('bannerId:', bannerId)
    
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const ITEMS_PER_PAGE = 10

    // Fetch data based on type (banner or group)
    const fetchData = async (pageNum = 1, isLoadMore = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true)
            } else {
                if (pageNum === 1) {
                    setLoading(true)
                }
                setError(null)
            }

            let apiUrl = '';
            
            if (type === 'banner') {
                apiUrl = `${BASE_URL}/prod/banner_product?banner_id=${bannerId}&page=${pageNum}&length=${ITEMS_PER_PAGE}`;
            } else if (type === 'group') {
                apiUrl = `${BASE_URL}/prod/get_group/products?group_name=${groupName}&page=${pageNum}&length=${ITEMS_PER_PAGE}`;
            } else {
                throw new Error('Invalid type parameter');
            }

            console.log("API URL:", apiUrl);

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status)

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to fetch ${type} products`)
            }

            const data = await response.json();
            console.log(`${type} products, page ${pageNum}:`, data);

            let productData = [];
            let totalRecords = 0;

            if (type === 'banner') {
                productData = data.data || [];
                totalRecords = data.recordsTotal || 0;
            } else if (type === 'group') {
                productData = data.data || [];
                totalRecords = data.recordsTotal || 0;
            }

            if (Array.isArray(productData)) {
                if (isLoadMore) {
                    setProducts(prevProducts => [...prevProducts, ...productData])
                } else {
                    setProducts(productData)
                }

                const currentCount = isLoadMore ? products.length + productData.length : productData.length
                setHasMore(currentCount < totalRecords && productData.length === ITEMS_PER_PAGE)

            } else {
                if (!isLoadMore) {
                    setProducts([])
                }
                setHasMore(false)
            }

            setPage(pageNum + 1)
        }
        catch (e) {
            console.log('error:', e)
            setError(e.message)
        }
        finally {
            if (isLoadMore) {
                setLoadingMore(false)
            } else {
                setLoading(false)
            }
            setIsRefreshing(false)
        }
    }

    // Initial load
    useEffect(() => {
        if ((type === 'group' && groupName?.length > 0) || (type === 'banner' && bannerId)) {
            fetchData(1, false)
        } else {
            setLoading(false)
            setError('Missing required parameters')
        }
    }, [groupName, type, bannerId])

    // Load more data when reaching end of list
    const loadMoreData = () => {
        if (!loadingMore && hasMore && !loading) {
            console.log('Loading more products...', page)
            fetchData(page, true)
        }
    }

    // Pull to refresh
    const handleRefresh = () => {
        setIsRefreshing(true)
        setPage(1)
        setHasMore(true)
        fetchData(1, false)
    }

    // Format price to Indian Rupees
    const formatPrice = (price) => {
        if (!price) return '₹0';
        return `₹${parseInt(price).toLocaleString('en-IN')}`;
    }

    // Calculate discount percentage
    const calculateDiscount = (originalPrice, sellingPrice) => {
        if (!originalPrice || !sellingPrice) return '0% off';
        const discount = ((originalPrice - sellingPrice) / originalPrice) * 100;
        return `${Math.round(discount)}% off`;
    }

    // Render skeleton loader with wave effect
    const renderSkeletonItem = () => (
        <ProductCardSkeleton />
    );

    // Render load more footer
    const renderFooter = () => {
        if (!loadingMore) return null;

        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color={BRAND.primary} />
                <Text style={styles.footerText}>Loading more products...</Text>
            </View>
        );
    };

    // Render each product item with API data
    const renderProductItem = ({ item }) => {
        let productImage, productName, productUnit, originalPrice, sellingPrice, discountPercentage;

        if (type === 'banner') {
            productImage = item.image?.[0]?.image_url || item.product_image?.[0]?.image_url;
            productName = item.product_name || item.name;
            productUnit = item.product_unit || item.unit;
            originalPrice = item.product_original_price || item.original_price;
            sellingPrice = item.product_selling_price || item.selling_price;
            discountPercentage = item.discount_percentage;
        } else {
            productImage = item.product_image?.[0]?.image_url;
            productName = item.product_name;
            productUnit = item.product_unit;
            originalPrice = item.product_original_price;
            sellingPrice = item.product_selling_price;
            discountPercentage = item.discount_percentage;
        }

        return (
            <TouchableOpacity style={styles.productCard} onPress={() => {
                navigation.navigate('AboutProductScreen', { item })
            }}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: productImage }}
                        style={styles.productImage}
                        resizeMode='cover'
                        defaultSource={require('../../src/images/user.png')}
                    />

                    {/* Discount Badge */}
                    {discountPercentage && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {calculateDiscount(originalPrice, sellingPrice)}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Product Details */}
                <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {productName}
                    </Text>

                    {/* Product Unit */}
                    {productUnit && (
                        <Text style={styles.productUnit} numberOfLines={1}>
                            {productUnit}
                        </Text>
                    )}

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingBox}>
                            <Text style={styles.ratingText}>4.0 ★</Text>
                        </View>
                        <Text style={styles.reviewsText}>(1k)</Text>
                    </View>

                    {/* Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>
                            {formatPrice(sellingPrice)}
                        </Text>
                        {originalPrice && originalPrice > sellingPrice && (
                            <Text style={styles.originalPrice}>
                                {formatPrice(originalPrice)}
                            </Text>
                        )}
                    </View>

                    {/* Delivery & Exchange */}
                    <View style={styles.extraInfo}>
                        <Text style={styles.deliveryText}>Free delivery</Text>
                        <Text style={styles.exchangeText}>Exchange available</Text>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    };

    // Skeleton data for loading state
    const skeletonData = Array.from({ length: 6 }, (_, index) => ({ id: index }));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={BRAND.white} />

            {/* Products Grid with Wave Effect Skeleton Loader */}
            {loading && !isRefreshing ? (
                <FlatList
                    data={skeletonData}
                    renderItem={renderSkeletonItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    columnWrapperStyle={styles.columnWrapper}
                />
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => fetchData(1, false)}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No products found</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => fetchData(1, false)}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => `${item.id || item.product_id}-${index}`}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    columnWrapperStyle={styles.columnWrapper}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default Catlog

const { width } = Dimensions.get('window');
const CARD_MARGIN = s(4); // Reduced from s(8)
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 2.3; // Card size reduced to half

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    flatListContent: {
        padding: CARD_MARGIN, // Reduced
        paddingBottom: s(10) // Reduced from s(20)
    },
    columnWrapper: {
        justifyContent: 'space-evenly',
    },
    productCard: {
        width: CARD_WIDTH,
        // paddingHorizontal:s(20),
        backgroundColor: '#fff',
        borderRadius: s(6), // Reduced from s(8)
        marginBottom: s(6), // Reduced from s(10)
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: s(1), // Reduced from s(2)
        },
        shadowOpacity: 0.08, // Reduced from 0.1
        shadowRadius: s(2), // Reduced from s(3)
        elevation: 2, // Reduced from 3
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: vs(80), // Reduced from vs(150) - more than half
        backgroundColor: '#f8f8f8',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        position: 'absolute',
        top: s(4), // Reduced from s(8)
        left: s(4), // Reduced from s(8)
        backgroundColor: BRAND.orange,
        paddingHorizontal: s(4), // Reduced from s(6)
        paddingVertical: s(1), // Reduced from s(2)
        borderRadius: s(3), // Reduced from s(4)
    },
    discountText: {
        color: '#fff',
        fontSize: s(8), // Reduced from s(10)
        fontWeight: 'bold',
    },
    productDetails: {
        padding: s(8), // Reduced from s(12)
    },
    productName: {
        fontSize: s(10), // Reduced from s(14)
        fontWeight: '500',
        color: '#000',
        marginBottom: s(2), // Reduced from s(4)
        lineHeight: s(12), // Reduced from s(18)
        height: s(24), // Reduced from s(36)
    },
    productUnit: {
        fontSize: s(8), // Reduced from s(12)
        color: BRAND.muted,
        marginBottom: s(3), // Reduced from s(6)
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: s(3), // Reduced from s(6)
    },
    ratingBox: {
        backgroundColor: '#388e3c',
        paddingHorizontal: s(4), // Reduced from s(6)
        paddingVertical: s(1), // Reduced from s(2)
        borderRadius: s(3), // Reduced from s(4)
        marginRight: s(3), // Reduced from s(6)
    },
    ratingText: {
        color: '#fff',
        fontSize: s(8), // Reduced from s(10)
        fontWeight: 'bold',
    },
    reviewsText: {
        fontSize: s(8), // Reduced from s(10)
        color: '#757575',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: s(3), // Reduced from s(6)
    },
    currentPrice: {
        fontSize: s(9), // Reduced from s(12)
        fontWeight: 'bold',
        color: '#000',
        marginRight: s(3), // Reduced from s(6)
    },
    originalPrice: {
        fontSize: s(7), // Reduced from s(10)
        color: '#757575',
        textDecorationLine: 'line-through',
    },
    extraInfo: {
        marginBottom: s(4), // Reduced from s(8)
    },
    deliveryText: {
        fontSize: s(7), // Reduced from s(10)
        color: '#388e3c',
        marginBottom: s(1), // Reduced from s(2)
    },
    exchangeText: {
        fontSize: s(7), // Reduced from s(10)
        color: '#ff3f6c',
    },
    addToCartButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: s(4), // Reduced from s(8)
        borderRadius: s(3), // Reduced from s(4)
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: s(8), // Reduced from s(12)
        fontWeight: 'bold',
    },

    // Skeleton Loader Styles with Wave Effect
    skeletonCard: {
        width: CARD_WIDTH,
        backgroundColor: '#e0e0e0',
        borderRadius: s(6), // Reduced
        marginBottom: s(6), // Reduced
        shadowColor: '#000',
        shadowOffset: { width: 0, height: s(1) }, // Reduced
        shadowOpacity: 0.08, // Reduced
        shadowRadius: s(2), // Reduced
        elevation: 2, // Reduced
        overflow: 'hidden',
    },
    skeletonImage: {
        width: '100%',
        height: vs(80), // Reduced
        backgroundColor: '#c8c8c8',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonContent: {
        padding: s(8), // Reduced
    },
    skeletonTitle: {
        height: s(12), // Reduced from s(16)
        backgroundColor: '#c8c8c8',
        borderRadius: s(3), // Reduced
        marginBottom: s(4), // Reduced from s(8)
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonSubtitle: {
        height: s(8), // Reduced from s(12)
        backgroundColor: '#c8c8c8',
        borderRadius: s(3), // Reduced
        marginBottom: s(4), // Reduced from s(8)
        width: '60%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonRating: {
        height: s(14), // Reduced from s(20)
        backgroundColor: '#c8c8c8',
        borderRadius: s(3), // Reduced
        marginBottom: s(4), // Reduced from s(8)
        width: '40%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonPrice: {
        height: s(10), // Reduced from s(14)
        backgroundColor: '#c8c8c8',
        borderRadius: s(3), // Reduced
        marginBottom: s(6), // Reduced from s(12)
        width: '50%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonButton: {
        height: s(20), // Reduced from s(32)
        backgroundColor: '#c8c8c8',
        borderRadius: s(3), // Reduced
        overflow: 'hidden',
        position: 'relative',
    },

    // Wave Effect Styles
    waveOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },

    // Lazy Loading Footer
    footerContainer: {
        padding: s(10), // Reduced from s(20)
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: s(5), // Reduced from s(10)
    },
    footerText: {
        fontSize: s(10), // Reduced from s(14)
        color: BRAND.muted,
    },

    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: s(10), // Reduced from s(20)
    },
    errorText: {
        fontSize: s(10), // Reduced from s(14)
        color: BRAND.error,
        textAlign: 'center',
        marginBottom: s(10), // Reduced from s(20)
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: s(10), // Reduced from s(20)
    },
    emptyText: {
        fontSize: s(12), // Reduced from s(16)
        color: BRAND.muted,
        marginBottom: s(10), // Reduced from s(20)
    },
    retryButton: {
        backgroundColor: BRAND.primary,
        paddingHorizontal: s(10), // Reduced from s(20)
        paddingVertical: s(6), // Reduced from s(10)
        borderRadius: s(4), // Reduced from s(6)
    },
    retryButtonText: {
        color: BRAND.white,
        fontSize: s(10), // Reduced from s(14)
        fontWeight: 'bold',
    },
})