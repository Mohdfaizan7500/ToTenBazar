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
    const skeletonElements = [1, 2, 3, 4, 5]; // For staggered wave effect

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

// Alternative: Staggered Wave Effect for more dynamic look
const StaggeredWaveSkeleton = () => {
    const animations = useRef(
        Array(6).fill(0).map(() => new Animated.Value(0))
    ).current;

    useEffect(() => {
        const animate = () => {
            const animationsArray = animations.map((anim, index) =>
                Animated.sequence([
                    Animated.delay(index * 150),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    })
                ])
            );

            Animated.stagger(100, animationsArray).start(() => {
                animations.forEach(anim => anim.setValue(0));
                animate();
            });
        };

        animate();
    }, []);

    return (
        <View style={styles.skeletonCard}>
            <Animated.View style={[styles.skeletonImage, { opacity: animations[0] }]} />
            <View style={styles.skeletonContent}>
                <Animated.View style={[styles.skeletonTitle, { opacity: animations[1] }]} />
                <Animated.View style={[styles.skeletonSubtitle, { opacity: animations[2] }]} />
                <Animated.View style={[styles.skeletonRating, { opacity: animations[3] }]} />
                <Animated.View style={[styles.skeletonPrice, { opacity: animations[4] }]} />
                <Animated.View style={[styles.skeletonButton, { opacity: animations[5] }]} />
            </View>
        </View>
    );
};

const Catlog = () => {
    const accessToken = useSelector(state => state?.auth?.accessToken)
    const route = useRoute();
    const groupName = route?.params?.title
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

    const fetchData = async (pageNum = 1, isLoadMore = false) => {
        if (groupName?.length > 0) {
            try {
                if (isLoadMore) {
                    setLoadingMore(true)
                } else {
                    if (pageNum === 1) {
                        setLoading(true)
                    }
                    setError(null)
                }

                const response = await fetch(
                    `${BASE_URL}/prod/get_group/products?group_name=${groupName}&page=${pageNum}&length=${ITEMS_PER_PAGE}`,
                    {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("response status:", response.status)

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch products by group")
                }

                const data = await response.json();
                console.log(`Products for group ${groupName}, page ${pageNum}:`, data);

                // Set the products from API response
                if (data.data && Array.isArray(data.data)) {
                    if (isLoadMore) {
                        // Append new products for lazy loading
                        setProducts(prevProducts => [...prevProducts, ...data.data])
                    } else {
                        // Replace products for initial load or refresh
                        setProducts(data.data)
                    }

                    // Check if there are more products to load
                    const totalRecords = data.recordsTotal || 0
                    const currentCount = isLoadMore ? products.length + data.data.length : data.data.length
                    setHasMore(currentCount < totalRecords)

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
    }

    // Initial load
    useEffect(() => {
        fetchData(1, false)
    }, [groupName])

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
        // Or use StaggeredWaveSkeleton for different effect:
        // <StaggeredWaveSkeleton />
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
        // Use the first image from product_image array
        const productImage = item.product_image?.[0]?.image_url;

        return (
            <TouchableOpacity style={styles.productCard} onPress={() => {
                console.log(item)
                navigation.navigate('AboutProductScreen',{item})
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
                    {item.discount_percentage && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {calculateDiscount(item.product_original_price, item.product_selling_price)}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Product Details */}
                <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.product_name}
                    </Text>

                    {/* Product Unit */}
                    {item.product_unit && (
                        <Text style={styles.productUnit} numberOfLines={1}>
                            {item.product_unit}
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
                            {formatPrice(item.product_selling_price)}
                        </Text>
                        {item.product_original_price && item.product_original_price > item.product_selling_price && (
                            <Text style={styles.originalPrice}>
                                {formatPrice(item.product_original_price)}
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
                    keyExtractor={(item, index) => `${item.id}-${index}`}
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
const CARD_MARGIN = s(8);
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    flatListContent: {
        padding: CARD_MARGIN,
        paddingBottom: s(20)
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: s(8),
        marginBottom: s(10),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: s(2),
        },
        shadowOpacity: 0.1,
        shadowRadius: s(3),
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: vs(150),
        backgroundColor: '#f8f8f8',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        position: 'absolute',
        top: s(8),
        left: s(8),
        backgroundColor: BRAND.orange,
        paddingHorizontal: s(6),
        paddingVertical: s(2),
        borderRadius: s(4),
    },
    discountText: {
        color: '#fff',
        fontSize: s(10),
        fontWeight: 'bold',
    },
    productDetails: {
        padding: s(12),
    },
    productName: {
        fontSize: s(14),
        fontWeight: '500',
        color: '#000',
        marginBottom: s(4),
        lineHeight: s(18),
        height: s(36),
    },
    productUnit: {
        fontSize: s(12),
        color: BRAND.muted,
        marginBottom: s(6),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: s(6),
    },
    ratingBox: {
        backgroundColor: '#388e3c',
        paddingHorizontal: s(6),
        paddingVertical: s(2),
        borderRadius: s(4),
        marginRight: s(6),
    },
    ratingText: {
        color: '#fff',
        fontSize: s(10),
        fontWeight: 'bold',
    },
    reviewsText: {
        fontSize: s(10),
        color: '#757575',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: s(6),
    },
    currentPrice: {
        fontSize: s(12),
        fontWeight: 'bold',
        color: '#000',
        marginRight: s(6),
    },
    originalPrice: {
        fontSize: s(10),
        color: '#757575',
        textDecorationLine: 'line-through',
    },
    extraInfo: {
        marginBottom: s(8),
    },
    deliveryText: {
        fontSize: s(10),
        color: '#388e3c',
        marginBottom: s(2),
    },
    exchangeText: {
        fontSize: s(10),
        color: '#ff3f6c',
    },
    addToCartButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: s(8),
        borderRadius: s(4),
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: s(12),
        fontWeight: 'bold',
    },

    // Skeleton Loader Styles with Wave Effect
    skeletonCard: {
        width: CARD_WIDTH,
        backgroundColor: '#e0e0e0',
        borderRadius: s(8),
        marginBottom: s(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: s(2) },
        shadowOpacity: 0.1,
        shadowRadius: s(3),
        elevation: 3,
        overflow: 'hidden',
    },
    skeletonImage: {
        width: '100%',
        height: vs(150),
        backgroundColor: '#c8c8c8',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonContent: {
        padding: s(12),
    },
    skeletonTitle: {
        height: s(16),
        backgroundColor: '#c8c8c8',
        borderRadius: s(4),
        marginBottom: s(8),
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonSubtitle: {
        height: s(12),
        backgroundColor: '#c8c8c8',
        borderRadius: s(4),
        marginBottom: s(8),
        width: '60%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonRating: {
        height: s(20),
        backgroundColor: '#c8c8c8',
        borderRadius: s(4),
        marginBottom: s(8),
        width: '40%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonPrice: {
        height: s(14),
        backgroundColor: '#c8c8c8',
        borderRadius: s(4),
        marginBottom: s(12),
        width: '50%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonButton: {
        height: s(32),
        backgroundColor: '#c8c8c8',
        borderRadius: s(4),
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
        padding: s(20),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: s(10),
    },
    footerText: {
        fontSize: s(14),
        color: BRAND.muted,
    },

    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: s(20),
    },
    errorText: {
        fontSize: s(14),
        color: BRAND.error,
        textAlign: 'center',
        marginBottom: s(20),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: s(20),
    },
    emptyText: {
        fontSize: s(16),
        color: BRAND.muted,
        marginBottom: s(20),
    },
    retryButton: {
        backgroundColor: BRAND.primary,
        paddingHorizontal: s(20),
        paddingVertical: s(10),
        borderRadius: s(6),
    },
    retryButtonText: {
        color: BRAND.white,
        fontSize: s(14),
        fontWeight: 'bold',
    },
})