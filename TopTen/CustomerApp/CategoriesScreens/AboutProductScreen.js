import { StatusBar, StyleSheet, Text, View, ScrollView, Dimensions, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useRoute } from '@react-navigation/native'
import BRAND from '../../../src/constant/color';
import { s, vs } from 'react-native-size-matters';
import { AddToCartIcon, MinusIcon, PlusIcon } from '../../../src/SVGicons/icon';

const { width: screenWidth } = Dimensions.get('window');

const AboutProductScreen = () => {
    const route = useRoute();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const autoScrollTimerRef = useRef(null);
    const scrollEndTimerRef = useRef(null);

    // Extract product data from route params
    const productData = route.params?.item;

    // Memoize product data to prevent recreation
    const product = useMemo(() => {
        if (!productData) return null;

        return {
            id: productData.id,
            name: productData.product_name,
            category: productData.group_name_display,
            currentPrice: productData.product_selling_price,
            originalPrice: productData.product_original_price,
            unit: productData.product_unit,
            discountPercentage: productData.discount_percentage,
            description: productData.description || `This is ${productData.product_name}, a premium product in the ${productData.group_name_display} category. Available at an amazing discounted price.`
        };
    }, [productData]);

    // Memoize images array from product_image
    const images = useMemo(() => {
        if (!productData?.product_image) return [];

        return productData.product_image.map(img =>
            typeof img === 'string' ? img : img.image_url || img.image
        ).filter(Boolean);
    }, [productData]);

    // Single optimized useEffect for route params
    useEffect(() => {
        if (productData) {
            console.log("Product data on about product screen:", productData);
        }
    }, [productData]);

    // Cleanup all timers and animations when component unmounts
    useEffect(() => {
        return () => {
            // Clear all timers
            if (autoScrollTimerRef.current) {
                clearTimeout(autoScrollTimerRef.current);
                autoScrollTimerRef.current = null;
            }
            
            if (scrollEndTimerRef.current) {
                clearTimeout(scrollEndTimerRef.current);
                scrollEndTimerRef.current = null;
            }

            // Stop any ongoing animations
            scrollX.stopAnimation();
            
            // Reset refs
            scrollViewRef.current = null;
            
            // You can also reset states here if needed, but they'll be garbage collected
            // when component unmounts. This is more for cleanup of active resources.
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
                autoScrollTimerRef.current = null;
            }
        };
    }, [currentIndex, isAutoScrollEnabled, images.length, scrollX]);

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
        
        // Clear any pending auto-scroll timer
        if (autoScrollTimerRef.current) {
            clearTimeout(autoScrollTimerRef.current);
            autoScrollTimerRef.current = null;
        }
    }, []);

    const handleScrollEnd = useCallback(() => {
        // Clear any existing timer
        if (scrollEndTimerRef.current) {
            clearTimeout(scrollEndTimerRef.current);
        }
        
        // Set new timer to resume auto-scroll
        scrollEndTimerRef.current = setTimeout(() => {
            setIsAutoScrollEnabled(true);
            scrollEndTimerRef.current = null;
        }, 5000);
    }, []);

    const handleIncreaseQuantity = useCallback(() => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }, []);

    const handleDecreaseQuantity = useCallback(() => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    }, []);

    const handleAddToCart = useCallback(() => {
        if (!product) return;

        const totalPrice = product.currentPrice * quantity;
        const cartItem = {
            product: product,
            quantity: quantity,
            totalPrice: totalPrice
        };

        console.log('Added to cart:', cartItem);
        alert(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
    }, [product, quantity]);

    // Memoize pager dots to prevent recalculation on every render
    const pagerDots = useMemo(() =>
        images.map((_, index) => {
            const inputRange = [
                (index - 1) * screenWidth,
                index * screenWidth,
                (index + 1) * screenWidth,
            ];

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 20, 8],
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

    // Format price with commas for better readability
    const formatPrice = (price) => {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '0';
    };

    // Show loading if no product data
    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading product...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

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

                        {/* Pager Indicator - Only show if multiple images */}
                        {images.length > 1 && (
                            <View style={styles.pagerContainer}>
                                {pagerDots}
                            </View>
                        )}
                    </>
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text>No Image Available</Text>
                    </View>
                )}
            </View>

            {/* Content below images */}
            <View style={styles.contentContainer}>
                <View style={{ paddingHorizontal: s(20), gap: s(0) }}>
                    <View style={styles.typeBg}>
                        <Text style={styles.type}>{product.category}</Text>
                    </View>
                    <Text style={styles.title}>{product.name}</Text>

                    {/* Discount Badge */}
                    {product.discountPercentage > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {product.discountPercentage}% OFF
                            </Text>
                        </View>
                    )}

                    <Text style={styles.price}>
                        ₹ {formatPrice(product.currentPrice)}
                        <Text style={styles.originalPrice}>
                            {' '}/ {product.unit}  ₹
                            <Text style={styles.discountedPrice}> {formatPrice(product.originalPrice)}</Text>
                        </Text>
                    </Text>
                    <Text style={styles.descriptionText}>Description</Text>
                </View>
                <View style={styles.line} />
                <View style={{ height: "45%" }}>
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
                            <MinusIcon width={s(15)} height={s(15)} />
                        </TouchableOpacity>
                        <Text style={styles.itemText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.circle}
                            onPress={handleIncreaseQuantity}
                        >
                            <PlusIcon width={s(15)} height={s(15)} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.addTocartButton}
                        onPress={handleAddToCart}
                    >
                        <AddToCartIcon width={s(22)} height={s(22)} />
                        <Text style={styles.AddtocartText}>Add to Cart</Text>
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
    },
    pagerContainer: {
        position: 'absolute',
        bottom: 120,
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    pagerDot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
    contentContainer: {
        position: "absolute",
        height: Dimensions.get('window').height / 1.6,
        width: "100%",
        bottom: 0,
        paddingTop: s(10),
        backgroundColor: BRAND.white,
        elevation: 5,
        borderTopRightRadius: s(20),
        borderTopLeftRadius: s(20)
    },
    title: {
        fontSize: s(24),
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        marginTop: s(8)
    },
    description: {
        fontSize: s(14),
        color: '#666',
        lineHeight: vs(20),
    },
    type: {
        color: BRAND.primary,
        fontSize: s(10),
        fontWeight: "800"
    },
    typeBg: {
        backgroundColor: '#dff8d8ff',
        width: s(80),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(20),
        paddingVertical: s(4)
    },
    price: {
        fontSize: s(28),
        fontWeight: "900",
        color: BRAND.primary,
        lineHeight: vs(30)
    },
    originalPrice: {
        fontSize: s(16),
        fontWeight: "400",
        color: BRAND.muted
    },
    discountedPrice: {
        textDecorationLine: "line-through"
    },
    discountBadge: {
        backgroundColor: BRAND.orange,
        paddingHorizontal: s(8),
        paddingVertical: s(4),
        borderRadius: s(4),
        alignSelf: 'flex-start',
        marginTop: s(5),
    },
    discountText: {
        color: BRAND.white,
        fontSize: s(12),
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: s(16),
        color: BRAND.orange,
        fontWeight: "500",
        paddingVertical: s(8)
    },
    line: {
        width: '100%',
        borderBottomWidth: s(0.5),
        borderColor: BRAND.muted
    },
    descriptionContainer: {
        paddingVertical: s(20),
        paddingHorizontal: s(20)
    },
    ButtonContainer: {
        width: "100%",
        backgroundColor: BRAND.white,
        height: vs(100),
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
        gap: s(15)
    },
    addTocartButton: {
        backgroundColor: BRAND.primary,
        flexDirection: "row",
        gap: s(10),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: s(15),
        paddingVertical: s(10),
        borderRadius: s(12)
    },
    AddtocartText: {
        fontSize: s(18),
        color: BRAND.white,
        fontWeight: '500'
    },
    circle: {
        borderWidth: s(0.5),
        borderColor: BRAND.muted,
        alignItems: "center",
        justifyContent: "center",
        width: s(40),
        height: s(40),
        borderRadius: s(50)
    },
    disabledCircle: {
        opacity: 0.5,
    },
    itemText: {
        fontSize: s(35),
        fontWeight: "600",
        color: BRAND.text
    }
});