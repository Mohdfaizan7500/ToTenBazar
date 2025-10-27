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
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearGroupProducts, fetchProductsByGroup } from '../../store/slices/userSlice'
import BRAND from '../../src/constant/color'
import { BASE_URL } from '../../config'

// Shimmer Effect Component
const ShimmerEffect = () => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            shimmerAnim.setValue(0);
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => animate());
        };
        animate();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200]
    });

    return (
        <Animated.View
            style={[
                styles.shimmerOverlay,
                {
                    transform: [{ translateX }],
                },
            ]}
        />
    );
};

// Skeleton Loader Component with Shimmer
const ProductCardSkeleton = () => (
    <View style={styles.skeletonCard}>
        <View style={styles.skeletonImage}>
            <ShimmerEffect />
        </View>
        <View style={styles.skeletonContent}>
            <View style={styles.skeletonTitle}>
                <ShimmerEffect />
            </View>
            <View style={styles.skeletonSubtitle}>
                <ShimmerEffect />
            </View>
            <View style={styles.skeletonRating}>
                <ShimmerEffect />
            </View>
            <View style={styles.skeletonPrice}>
                <ShimmerEffect />
            </View>
            <View style={styles.skeletonButton}>
                <ShimmerEffect />
            </View>
        </View>
    </View>
);

const Catlog = () => {
    const accessToken = useSelector(state => state?.auth?.accessToken)
    const route = useRoute();
    const groupName = route?.params?.title
    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        if (groupName?.length > 0) {
            console.log('groupName:', groupName)
            const page = 1;
            const length = 10;
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`${BASE_URL}/prod/get_group/products?group_name=${groupName}&page=${page}&length=${length}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log("response status:", response.status)

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch products by group")
                }

                const data = await response.json();
                console.log(`Products for group ${groupName}:`, data);

                // Set the products from API response
                if (data.data && Array.isArray(data.data)) {
                    setProducts(data.data)
                } else {
                    setProducts([])
                }
            }
            catch (e) {
                console.log('error:', e)
                setError(e.message)
            }
            finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [groupName])

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

    // Render skeleton loader with shimmer
    const renderSkeletonItem = () => (
        <ProductCardSkeleton />
    );

    // Render each product item with API data
    const renderProductItem = ({ item }) => {
        // Use the first image from product_image array
        const productImage = item.product_image?.[0]?.image_url;

        return (
            <TouchableOpacity style={styles.productCard}>
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

            {/* Products Grid with Shimmer Skeleton Loader */}
            {loading ? (
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
                    <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No products found</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    columnWrapperStyle={styles.columnWrapper}
                    refreshing={loading}
                    onRefresh={fetchData}
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
        backgroundColor: '#ff3f6c',
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
        backgroundColor: '#ff3f6c',
        paddingVertical: s(8),
        borderRadius: s(4),
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: s(12),
        fontWeight: 'bold',
    },

    // Skeleton Loader Styles with Shimmer
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
        backgroundColor: '#c0c0c0',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonContent: {
        padding: s(12),
    },
    skeletonTitle: {
        height: s(16),
        backgroundColor: '#c0c0c0',
        borderRadius: s(4),
        marginBottom: s(8),
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonSubtitle: {
        height: s(12),
        backgroundColor: '#c0c0c0',
        borderRadius: s(4),
        marginBottom: s(8),
        width: '60%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonRating: {
        height: s(20),
        backgroundColor: '#c0c0c0',
        borderRadius: s(4),
        marginBottom: s(8),
        width: '40%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonPrice: {
        height: s(14),
        backgroundColor: '#c0c0c0',
        borderRadius: s(4),
        marginBottom: s(12),
        width: '50%',
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonButton: {
        height: s(32),
        backgroundColor: '#c0c0c0',
        borderRadius: s(4),
        overflow: 'hidden',
        position: 'relative',
    },

    // Shimmer Effect Styles
    shimmerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        transform: [{ skewX: '-20deg' }],
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