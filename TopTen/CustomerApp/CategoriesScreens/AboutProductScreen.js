import { StatusBar, StyleSheet, Text, View, ScrollView, Dimensions, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import BRAND from '../../../src/constant/color';
import { s, vs } from 'react-native-size-matters';
import { AddToCartIcon, MinusIcon, PlusIcon } from '../../../src/SVGicons/icon';

const { width: screenWidth } = Dimensions.get('window');

const AboutProductScreen = () => {
    // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL, BEFORE ANY CONDITIONAL LOGIC
    const route = useRoute();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    // Sample images - replace with your actual images
    const images = [
        'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg',
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS3DRPxLp5XH4U1fUPLQwkWQn7fUd368gb2lUCx9qEKuUb5LhktbVpEcMTg_3EP_rx99pWkU_cdJ_ZETZlfswgCjwu5DhipxhHqNXYkPJ0',
        'https://seedarmory.com/cdn/shop/products/plant_f32aa815-1d3b-4c20-a931-933ac9cc8a2c.jpg?v=1705893776&width=1445',
    ];

    // Product data
    const product = {
        name: 'Fresh Tomato (Tamatar)',
        category: 'Vegetables',
        currentPrice: 45,
        originalPrice: 65,
        unit: 'kg',
        description: 'The tomato is a fruit, commonly red in color, though yellow, orange, green, and other varieties are also grown. In India, it is widely cultivated and used in everyday cooking. All cultivated tomatoes are domesticated forms of the wild species Solanum lycopersicum, originally native to western South America, but now an integral part of Indian agriculture and cuisine. The tomato is a fruit, commonly red in color, though yellow, orange, green, and other varieties are also grown. In India, it is widely cultivated and used in everyday cooking. All cultivated tomatoes are domesticated forms of the wild species Solanum lycopersicum, originally native to western South America, but now an integral part of Indian agriculture and cuisine.'
    };

    // Check if route.params exists safely
    useEffect(() => {
        if (route.params) {
            console.log('Route params:', route.params);
        }
    }, [route.params]);

    useEffect(() => {
        let timer;
        if (isAutoScrollEnabled) {
            timer = setTimeout(() => {
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
        }

        return () => clearTimeout(timer);
    }, [currentIndex, isAutoScrollEnabled, images.length]);

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                setCurrentIndex(newIndex);
            }
        }
    );

    // Handle scroll begin to pause auto-scroll
    const handleScrollBegin = () => {
        setIsAutoScrollEnabled(false);
    };

    // Handle scroll end to resume auto-scroll after delay
    const handleScrollEnd = () => {
        setTimeout(() => setIsAutoScrollEnabled(true), 5000);
    };

    // Increase quantity function
    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Decrease quantity function
    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

    // Add to cart function
    const handleAddToCart = () => {
        // Calculate total price
        const totalPrice = product.currentPrice * quantity;
        
        // Create cart item object
        const cartItem = {
            product: product,
            quantity: quantity,
            totalPrice: totalPrice
        };
        
        console.log('Added to cart:', cartItem);
        
        // Here you can add to your cart state management (Redux, Context, etc.)
        // For example: dispatch(addToCart(cartItem));
        
        // Show success message
        alert(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
    };

    // If you need conditional rendering, do it AFTER all hooks
    // if (!route.params) {
    //     return <View><Text>Loading...</Text></View>;
    // }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* Image Carousel */}
            <View style={styles.imageContainer}>
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
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Pager Indicator */}
                <View style={styles.pagerContainer}>
                    {images.map((_, index) => {
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
                    })}
                </View>
            </View>

            {/* Content below images */}
            <View style={styles.contentContainer}>
                <View style={{ paddingHorizontal: s(20), gap: s(0) }}>
                    <View style={styles.typeBg}>
                        <Text style={styles.type}>{product.category}</Text>
                    </View>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>
                        ₹ {product.currentPrice}
                        <Text style={{
                            fontSize: s(16),
                            fontWeight: "400",
                            color: BRAND.muted
                        }}> / {product.unit}  ₹
                            <Text style={{ textDecorationLine: "line-through" }}> {product.originalPrice}</Text>
                        </Text>
                    </Text>
                    <Text style={styles.descriptionText}>Description</Text>
                </View>
                <View style={styles.line} />
                <View style={{ height: "45%" }}>
                    <ScrollView contentContainerStyle={{ paddingVertical: s(20), paddingHorizontal: s(20) }}>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.ButtonContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: s(15) }}>
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

export default AboutProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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