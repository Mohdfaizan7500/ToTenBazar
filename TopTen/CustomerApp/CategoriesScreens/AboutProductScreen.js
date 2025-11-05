import { StatusBar, StyleSheet, Text, View, ScrollView, Dimensions, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import BRAND from '../../../src/constant/color';
import { s, vs, ms } from 'react-native-size-matters';
import { AddToCartIcon, MinusIcon, PlusIcon, BackIcon, SearchIcon } from '../../../src/SVGicons/icon';
// Remove ShareIcon import if it doesn't exist
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchProductDetails } from '../../../store/slices/userSlice';
import { DARK } from '../../../src/constant/colors';

const { width: screenWidth } = Dimensions.get('window');

// Simple share icon component as fallback
const ShareIcon = ({ width, height, color }) => (
    <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
            width: width * 0.7,
            height: height * 0.7,
            borderWidth: 1,
            borderColor: color,
            borderRadius: 2,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                width: width * 0.3,
                height: height * 0.3,
                backgroundColor: color,
                borderRadius: 1,
            }} />
        </View>
    </View>
);

const AboutProductScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const KartInfo = useSelector(state => state.user.KartInfo);
    const dispatch = useDispatch();

    const {
        productDetails,
        isLoadingProductDetails,
        errorProductDetails
    } = useSelector(state => state.user);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const autoScrollTimerRef = useRef(null);
    const scrollEndTimerRef = useRef(null);

    // Extract product ID from route params
    const productId = route?.params?.item?.product;
    console.log("productId:", productId);

    // Fetch product details
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetails(productId));
        }
    }, [dispatch, productId]);

    // Get product details from API response
    const apiProductData = productDetails[productId]?.product;

    // Memoize product data to prevent recreation - using API data
    const product = useMemo(() => {
        if (!apiProductData) return null;

        // Divide prices by 100
        const currentPrice = apiProductData.selling_price ? apiProductData.selling_price / 100 : 0;
        const originalPrice = apiProductData.original_price ? apiProductData.original_price / 100 : 0;

        return {
            id: apiProductData.product,
            name: apiProductData.name,
            category: apiProductData.category,
            currentPrice: currentPrice,
            originalPrice: originalPrice,
            unit: apiProductData.unit,
            discountPercentage: apiProductData.discount_percentage,
            description: apiProductData.description || `This is ${apiProductData.name}, a premium product in the ${apiProductData.category} category. Available at an amazing discounted price.`,
            stock: apiProductData.stock
        };
    }, [apiProductData]);

    // Memoize images array from API product data
    const images = useMemo(() => {
        if (!apiProductData?.image) return [];

        return apiProductData.image.map(img =>
            img.image_url || img.image
        ).filter(Boolean);
    }, [apiProductData]);

    // Calculate total items in cart
    const totalCartItems = useMemo(() => {
        if (!KartInfo?.items) return 0;
        return KartInfo.items.reduce((total, item) => total + item.quantity, 0);
    }, [KartInfo]);

    // Log KartInfo changes
    useEffect(() => {
        console.log("Current KartInfo:", KartInfo);
    }, [KartInfo]);

    // Cleanup all timers and animations when component unmounts
    useEffect(() => {
        return () => {
            if (autoScrollTimerRef.current) {
                clearTimeout(autoScrollTimerRef.current);
            }
            if (scrollEndTimerRef.current) {
                clearTimeout(scrollEndTimerRef.current);
            }
            scrollX.stopAnimation();
        };
    }, []);

    // Optimized auto-scroll with cleanup
    useEffect(() => {
        if (!isAutoScrollEnabled || images.length <= 1) return;

        autoScrollTimerRef.current = setTimeout(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= images.length) {
                nextIndex = 0;
            }

            scrollViewRef.current?.scrollTo({
                x: nextIndex * screenWidth,
                animated: true
            });
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => {
            if (autoScrollTimerRef.current) {
                clearTimeout(autoScrollTimerRef.current);
            }
        };
    }, [currentIndex, isAutoScrollEnabled, images.length]);

    // Memoized scroll handler
    const onScroll = useMemo(() =>
        Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
                useNativeDriver: false,
                listener: (event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                    setCurrentIndex(newIndex);
                }
            }
        ),
        [scrollX]
    );

    // Memoized event handlers
    const handleScrollBegin = useCallback(() => {
        setIsAutoScrollEnabled(false);
        if (autoScrollTimerRef.current) {
            clearTimeout(autoScrollTimerRef.current);
        }
    }, []);

    const handleScrollEnd = useCallback(() => {
        if (scrollEndTimerRef.current) {
            clearTimeout(scrollEndTimerRef.current);
        }
        scrollEndTimerRef.current = setTimeout(() => {
            setIsAutoScrollEnabled(true);
        }, 5000);
    }, []);

    const handleIncreaseQuantity = useCallback(() => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }, []);

    const handleDecreaseQuantity = useCallback(() => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    }, []);

 const handleAddToCart = useCallback(() => {
    console.log("190",product)
    if (!product) {
        console.log('No product data available');
        return;
    }

    // Check stock availability
    if (product.stock < quantity) {
        alert(`Only ${product.stock} items available in stock!`);
        return;
    }

    // Get existing cart items from KartInfo or create empty array
    const existingItems = KartInfo?.items || [];
    
    // Transform existing items to only include product and quantity for API
    const transformedExistingItems = existingItems.map(item => ({
        product: item.product, // Use the product ID
        quantity: item.quantity
    }));

    // Check if product already exists in cart
    const existingProductIndex = transformedExistingItems.findIndex(item => item.product === product.product);
    
    let updatedItems;
    
    if (existingProductIndex !== -1) {
        // Update quantity if product exists
        updatedItems = transformedExistingItems.map((item, index) => 
            index === existingProductIndex 
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
    } else {
        // Add new product if it doesn't exist
        updatedItems = [
            ...transformedExistingItems,
            {
                product: productId,
                quantity: quantity
            }
        ];
    }

    // Create the payload with order_id from existing KartInfo or generate new one
    const payload = {
        order_id: KartInfo?.order_id || `TTB${Date.now()}ODR${Math.floor(Math.random() * 1000)}`,
        items: updatedItems
    };

    // Display both the API payload and current KartInfo details
    // console.log('=== ADD TO CART DETAILS ===');
    // console.log('API Payload being sent:');
    console.log(JSON.stringify(payload, null, 2));
    dispatch(addToCart(payload))
    
    // console.log('Current KartInfo from Redux:');
    // console.log(JSON.stringify({
    //     order_id: KartInfo?.order_id,
    //     items: KartInfo?.items || []
    // }, null, 2));
    
    // console.log('Product being added:');
    // console.log(JSON.stringify({
    //     id: product.id,
    //     name: product.name,
    //     price: product.currentPrice,
    //     quantity: quantity,
    //     stock: product.stock
    // }, null, 2));
    
    // console.log('Updated items count:', updatedItems.reduce((total, item) => total + item.quantity, 0));
    // console.log('================');

    // Dispatch the action with payload
    // dispatch(addToCart(payload));

    // Show success message
    alert('Product added to cart successfully!');
    
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
}, [product, quantity, dispatch, KartInfo]);

    // Navigation handlers
    const handleBackPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleSharePress = useCallback(() => {
        // Navigate to share screen or implement share functionality
        console.log('Share product:', product);
        navigation.navigate('SearchScreen')
        // alert('Share functionality to be implemented');
    }, [product]);

    // Calculate discount percentage if not provided
    const calculatedDiscount = useMemo(() => {
        if (product?.discountPercentage && product.discountPercentage > 0) {
            return product.discountPercentage;
        }
        if (product?.originalPrice && product?.currentPrice && product.originalPrice > product.currentPrice) {
            return Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
        }
        return 0;
    }, [product]);

    // Memoize pager dots
    const pagerDots = useMemo(() =>
        images.map((_, index) => {
            const inputRange = [
                (index - 1) * screenWidth,
                index * screenWidth,
                (index + 1) * screenWidth,
            ];

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [s(8), s(20), s(8)],
                extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
            });

            return (
                <Animated.View
                    key={index}
                    style={[
                        styles.pagerDot,
                        {
                            width: dotWidth,
                            opacity: opacity,
                        },
                    ]}
                />
            );
        }),
        [images.length, scrollX]
    );

    // Memoize carousel images
    const carouselImages = useMemo(() =>
        images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="cover"
                    defaultSource={require('../../../src/images/user.png')}
                />
            </View>
        )),
        [images]
    );

    // Format price with commas
    const formatPrice = (price) => {
        if (!price) return '0';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Show loading state
    if (isLoadingProductDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading product details...</Text>
            </View>
        );
    }

    // Show error state
    if (errorProductDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Error: {errorProductDetails}</Text>
            </View>
        );
    }

    // Show loading if no product data from API
    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading product...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* Cart Count Badge */}
            {totalCartItems > 0 && (
                <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
                </View>
            )}

            {/* Image Carousel */}
            <View style={styles.imageContainer}>
                {images.length > 0 ? (
                    <>
                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={onScroll}
                            onScrollBeginDrag={handleScrollBegin}
                            onMomentumScrollEnd={handleScrollEnd}
                            scrollEventThrottle={16}
                        >
                            {carouselImages}
                        </ScrollView>

                        {/* Top Navigation Circles */}
                        <View style={styles.topNavigationContainer}>
                            <TouchableOpacity style={styles.navCircle} onPress={handleBackPress}>
                                <BackIcon width={s(18)} height={s(18)} stroke={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navCircle} onPress={handleSharePress}>
                                <SearchIcon width={s(18)} height={s(18)} stroke={'#fff'} />
                            </TouchableOpacity>
                        </View>

                        {images.length > 1 && (
                            <View style={styles.pagerContainer}>
                                {pagerDots}
                            </View>
                        )}
                    </>
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No Image Available</Text>
                        {/* Top Navigation Circles for placeholder too */}
                        <View style={styles.topNavigationContainer}>
                            <TouchableOpacity style={styles.navCircle} onPress={handleBackPress}>
                                <BackIcon width={s(18)} height={s(18)} color={BRAND.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navCircle} onPress={handleSharePress}>
                                <ShareIcon width={s(18)} height={s(18)} color={BRAND.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>

            {/* Content below images */}
            <View style={styles.contentContainer}>
                <View style={styles.contentHeader}>
                    <View style={styles.typeBg}>
                        <Text style={styles.type}>{product.category}</Text>
                    </View>
                    <Text style={styles.title}>{product.name}</Text>

                    {/* Stock Information */}
                    <View style={styles.stockContainer}>
                        <Text style={styles.stockText}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </Text>
                    </View>

                    {calculatedDiscount > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {calculatedDiscount}% OFF
                            </Text>
                        </View>
                    )}

                    <Text style={styles.price}>
                        ₹ {formatPrice(product.currentPrice)}
                        {product.originalPrice > product.currentPrice && (
                            <Text style={styles.originalPrice}>
                                {' '}/ {product.unit}  ₹
                                <Text style={styles.discountedPrice}> {formatPrice(product.originalPrice)}</Text>
                            </Text>
                        )}
                    </Text>
                    <Text style={styles.descriptionText}>Description</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.descriptionWrapper}>
                    <ScrollView
                        contentContainerStyle={styles.descriptionContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.ButtonContainer}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={[styles.circle, quantity === 1 && styles.disabledCircle]}
                            onPress={handleDecreaseQuantity}
                            disabled={quantity === 1}
                        >
                            <MinusIcon width={s(12)} height={s(12)} />
                        </TouchableOpacity>
                        <Text style={styles.itemText}>{quantity}</Text>
                        <TouchableOpacity
                            style={[styles.circle, product.stock <= quantity && styles.disabledCircle]}
                            onPress={handleIncreaseQuantity}
                            disabled={product.stock <= quantity}
                        >
                            <PlusIcon width={s(12)} height={s(12)} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.addTocartButton, product.stock === 0 && styles.disabledButton]}
                        onPress={handleAddToCart}
                        disabled={product.stock === 0}
                    >
                        <AddToCartIcon width={s(18)} height={s(18)} />
                        <Text style={styles.AddtocartText}>
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default React.memo(AboutProductScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.bg
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BRAND.bg
    },
    loadingText: {
        fontSize: s(14),
        color: BRAND.text
    },
    errorText: {
        fontSize: s(14),
        color: BRAND.error
    },
    imageContainer: {
        width: "100%",
        height: "53%",
        position: 'relative',
    },
    imageWrapper: {
        width: screenWidth,
        height: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholderImage: {
        width: "100%",
        height: "100%",
        backgroundColor: BRAND.muted,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    placeholderText: {
        fontSize: s(14),
        color: BRAND.text
    },
    // Top Navigation Circles
    topNavigationContainer: {
        position: 'absolute',
        top: vs(40),
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: s(15),
    },
    navCircle: {
        width: s(40),
        height: s(40),
        borderRadius: s(20),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    pagerContainer: {
        position: 'absolute',
        bottom: vs(100),
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: s(10),
        paddingVertical: s(5),
    },
    pagerDot: {
        height: s(8),
        borderRadius: s(4),
        backgroundColor: BRAND.white,
        marginHorizontal: s(4),
    },
    contentContainer: {
        position: "absolute",
        height: Dimensions.get('window').height / 1.6,
        width: "100%",
        bottom: 0,
        paddingTop: vs(10),
        backgroundColor: BRAND.white,
        elevation: 5,
        borderTopRightRadius: s(20),
        borderTopLeftRadius: s(20)
    },
    contentHeader: {
        paddingHorizontal: s(15),
        gap: vs(5),
    },
    title: {
        fontSize: s(20),
        fontWeight: 'bold',
        color: BRAND.text,
        marginTop: vs(5)
    },
    description: {
        fontSize: s(13),
        color: BRAND.text,
        lineHeight: vs(18),
    },
    type: {
        color: BRAND.primary,
        fontSize: s(9),
        fontWeight: "800"
    },
    typeBg: {
        backgroundColor: '#dff8d8ff',
        width: s(70),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(15),
        paddingVertical: vs(3)
    },
    price: {
        fontSize: s(24),
        fontWeight: "900",
        color: BRAND.primary,
        lineHeight: vs(26)
    },
    originalPrice: {
        fontSize: s(14),
        fontWeight: "400",
        color: BRAND.muted
    },
    discountedPrice: {
        textDecorationLine: "line-through"
    },
    discountBadge: {
        backgroundColor: BRAND.orange,
        paddingHorizontal: s(6),
        paddingVertical: vs(2),
        borderRadius: s(3),
        alignSelf: 'flex-start',
    },
    discountText: {
        color: BRAND.white,
        fontSize: s(10),
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: s(14),
        color: BRAND.orange,
        fontWeight: "500",
        paddingVertical: vs(6)
    },
    line: {
        width: '100%',
        borderBottomWidth: s(0.5),
        borderColor: BRAND.muted,
        marginVertical: vs(8),
    },
    descriptionWrapper: {
        height: "45%",
    },
    descriptionContainer: {
        paddingVertical: vs(15),
        paddingHorizontal: s(15)
    },
    ButtonContainer: {
        width: "100%",
        backgroundColor: BRAND.white,
        height: vs(80),
        position: "absolute",
        elevation: 15,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: s(15)
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: s(12)
    },
    addTocartButton: {
        backgroundColor: BRAND.primary,
        flexDirection: "row",
        gap: s(8),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: s(12),
        paddingVertical: vs(8),
        borderRadius: s(10)
    },
    disabledButton: {
        backgroundColor: BRAND.muted,
    },
    AddtocartText: {
        fontSize: s(16),
        color: BRAND.white,
        fontWeight: '500'
    },
    circle: {
        borderWidth: s(0.5),
        borderColor: BRAND.muted,
        alignItems: "center",
        justifyContent: "center",
        width: s(35),
        height: s(35),
        borderRadius: s(18)
    },
    disabledCircle: {
        opacity: 0.5,
    },
    itemText: {
        fontSize: s(28),
        fontWeight: "600",
        color: BRAND.text
    },
    stockContainer: {
        marginBottom: vs(2),
    },
    stockText: {
        fontSize: s(11),
        color: BRAND.primary,
        fontWeight: '500',
    },
    cartBadge: {
        position: 'absolute',
        top: vs(50),
        right: s(20),
        backgroundColor: BRAND.primary,
        width: s(20),
        height: s(20),
        borderRadius: s(10),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 10,
    },
    cartBadgeText: {
        color: BRAND.white,
        fontSize: s(12),
        fontWeight: 'bold',
    }
});