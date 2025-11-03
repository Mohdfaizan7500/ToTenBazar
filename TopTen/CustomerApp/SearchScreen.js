import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View, Animated, Text, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors, { BRAND, DARK } from '../../src/constant/colors'
import { s, vs } from 'react-native-size-matters'
import { BackIcon, CrossIcon2, RightArrowICon, SearchIcon } from '../../src/SVGicons/icon'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../../config'

const SearchScreen = () => {
    const Theme = useSelector(state => state.auth.Theme)
    const colors = Theme ? DARK : BRAND
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Animation states
    const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [loader, setLoader] = useState(false)
    const [searchResults, setSearchResults] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTyping, setIsTyping] = useState(false); // Track typing state
    const [showProductCards, setShowProductCards] = useState(true); // Show product cards initially
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
    const [showProductSkeleton, setShowProductSkeleton] = useState(false); // Show product skeleton loader
    const [productCardsData, setProductCardsData] = useState([]); // Store product data for cards
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const shineAnim = useRef(new Animated.Value(0)).current;
    const productShineAnim = useRef(new Animated.Value(0)).current; // Separate shine anim for product skeleton

    // Debounce ref
    const debounceTimeoutRef = useRef(null);
    const searchInputRef = useRef(null);

    // Get access token from Redux state
    const accessToken = useSelector(state => state.auth.accessToken);

    // Keywords for animation
    const searchKeywords = [
        "Milak",
        "Bread",
        "Eggs",
        "Butter",
        "Cheese",
        "Yogurt",
        "Fruits",
        "Vegetables",
        "Rice",
        "Sugar"
    ];

    // Static product data for first-time render
    const staticProductData = [
        {
            id: 1,
            name: "Amul Fresh Milk",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹60",
            originalPrice: "₹70",
            weight: "500ml"
        },
        {
            id: 2,
            name: "Britannia Bread",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹45",
            originalPrice: "₹50",
            weight: "400g"
        },
        {
            id: 3,
            name: "Fresh Eggs",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹80",
            originalPrice: "₹90",
            weight: "6 pcs"
        },
        {
            id: 4,
            name: "Amul Butter",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹55",
            originalPrice: "₹60",
            weight: "100g"
        },
        {
            id: 5,
            name: "Basmati Rice",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹120",
            originalPrice: "₹140",
            weight: "1kg"
        },
        {
            id: 6,
            name: "Fresh Apples",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹180",
            originalPrice: "₹200",
            weight: "1kg"
        },
        {
            id: 7,
            name: "Yogurt",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹40",
            originalPrice: "₹45",
            weight: "400g"
        },
        {
            id: 8,
            name: "Sugar",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹45",
            originalPrice: "₹50",
            weight: "1kg"
        },
        {
            id: 9,
            name: "Potatoes",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹30",
            originalPrice: "₹35",
            weight: "1kg"
        },
        {
            id: 10,
            name: "Tomatoes",
            image: "https://cdn.grofers.com/app/images/products/full_screen/pro_379579.jpg?ts=1706183506",
            price: "₹25",
            originalPrice: "₹30",
            weight: "500g"
        }
    ];

    // Set static data on component mount
    useEffect(() => {
        if (productCardsData.length === 0) {
            setProductCardsData(staticProductData);
        }
    }, []);

    // API call function - FIXED: Don't set isTyping to false immediately
    const fetchBannerProducts = useCallback(async (searchTerm, page = 1, length = 10) => {
        // Don't call API if search term is empty
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setHasMore(true);
            setCurrentPage(1);
            setIsTyping(false);
            setShowProductCards(true);
            setProductCardsData(staticProductData);
            return;
        }

        try {
            setLoader(true);
            // REMOVED: setIsTyping(false) from here - let it stay true during API call

            const url = `${BASE_URL}/prod/product_suggetion?prod_name=${encodeURIComponent(searchTerm.trim())}`;

            console.log('🔍 Fetching banner products for:', searchTerm);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("📊 Banner products response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.log('❌ API Error Response:', errorText);

                // Handle specific error cases
                if (response.status === 400) {
                    throw new Error('Invalid request parameters. Please try again.');
                } else if (response.status === 401) {
                    throw new Error('Authentication failed. Please login again.');
                } else if (response.status === 500) {
                    throw new Error('Server error. Please try again later.');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('✅ Banner products API response:', data);

            // Handle the specific response structure
            let products = [];

            // Check for the exact structure from your response
            if (data.data && Array.isArray(data.data)) {
                products = data.data;
                console.log(`🎯 Found ${products.length} products for "${searchTerm}"`);
            } else {
                console.log('⚠️ Unexpected response structure:', data);
            }

            // Set search results based on the response
            if (page === 1) {
                setSearchResults(products);
            } else {
                setSearchResults(prev => [...prev, ...products]);
            }

            // Check if there are more pages
            setHasMore(false);
            setCurrentPage(page);

            return products;
        } catch (error) {
            console.log('❌ Error fetching banner products:', error);
            throw error;
        } finally {
            setLoader(false);
            setIsTyping(false); // FIXED: Set isTyping to false only when API call completes
        }
    }, [accessToken]);

    const fetchProductByName = async (productName) => {
        try {
            setShowProductSkeleton(true); // Show skeleton loader when API call starts
            setShowProductCards(false); // Hide product cards

            const response = await fetch(`${BASE_URL}/prod/product_suggetion?prod_name=${productName}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            })
            
            const data = await response.json();
            console.log('Response:', data);

            // Set the product cards data from API response
            if (data.data && Array.isArray(data.data)) {
                setProductCardsData(data.data);
            }

            // Hide skeleton and show product cards immediately when API response is received
            setShowProductSkeleton(false);
            setShowProductCards(true);

            return data;
        }
        catch (error) {
            console.log('Error:', error);
            // Hide skeleton and show product cards even on error
            setShowProductSkeleton(false);
            setShowProductCards(true);
            return null;
        }
    }

    // Function to handle product selection
    const handleProductSelect = useCallback(async (product) => {
        console.log('select:', product.name);
        setSearchText(product.name);
        setSelectedProduct(product);
        setShowProductCards(false); // Hide suggestions
        setShowProductSkeleton(true); // Show product skeleton loader

        // Fetch product data - the skeleton will hide when API response is received
        await fetchProductByName(product.name);
    }, []);

    // UPDATED: Immediate search function (no debounce)
    const immediateSearch = useCallback((searchTerm, page = 1) => {
        // Clear any existing timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Show typing state immediately
        if (page === 1) {
            setIsTyping(true);
            setShowProductCards(false); // Hide product cards when typing starts
            setSelectedProduct(null); // Clear selected product
        }

        // Call API immediately for every letter
        if (searchTerm.trim() !== '') {
            console.log('🔍 Immediate search for:', searchTerm, 'page:', page);
            fetchBannerProducts(searchTerm, page).catch(error => {
                console.log('❌ Search failed:', error.message);
                setIsTyping(false); // FIXED: Also set isTyping to false on error
            });
        } else {
            // Clear results if search is empty
            setSearchResults([]);
            setHasMore(true);
            setCurrentPage(1);
            setIsTyping(false);
            setShowProductCards(true); // Show product cards when search is empty
            setProductCardsData(staticProductData); // Reset to static data when search is cleared
            setSelectedProduct(null);
        }
    }, [fetchBannerProducts]);

    // UPDATED: Handle text input change - call API for every letter
    const handleTextChange = (text) => {
        setSearchText(text);
        
        // Call API immediately for every letter change
        immediateSearch(text, 1);
    };

    // Load more products for infinite scroll
    const loadMoreProducts = () => {
        if (!loader && hasMore && searchText.trim() !== '' && !isTyping) {
            fetchBannerProducts(searchText, currentPage + 1).catch(error => {
                console.log('❌ Load more failed:', error.message);
            });
        }
    };

    // Shining animation function for typing loader
    const startShineAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shineAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(shineAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    // Shining animation function for product skeleton
    const startProductShineAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(productShineAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(productShineAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    // NEW: Simple Loader Component for API fetching
    const SimpleLoader = () => (
        <View style={styles.simpleLoaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.gray[400] }]}>
                Searching for "{searchText}"...
            </Text>
        </View>
    );

    // NEW: Loading More Component for infinite scroll
    const LoadingMoreComponent = () => (
        <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={[styles.loadingMoreText, { color: colors.gray[400] }]}>
                Loading more products...
            </Text>
        </View>
    );

    // Product Skeleton Loader Component with Shine Effect
    const ProductSkeletonLoader = () => {
        const skeletonData = Array.from({ length: 10 }, (_, index) => ({ id: `skeleton-${index}` }));
        
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.skeletonHeader}>
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text style={[styles.skeletonHeaderText, { color: colors.gray[400] }]}>
                        Loading products...
                    </Text>
                </View>
                <FlatList
                    contentContainerStyle={{
                        gap: s(10),
                        alignItems: 'center',
                        paddingTop: s(10),
                        paddingHorizontal: s(20),
                        paddingBottom: s(20)
                    }}
                    data={skeletonData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ index }) => (
                        <View style={styles.productSkeletonContainer}>
                            {/* Product Image Skeleton */}
                            <View style={styles.productImageSkeleton}>
                                <Animated.View
                                    style={[
                                        styles.productShineEffect,
                                        {
                                            transform: [{
                                                translateX: productShineAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-100, 300]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </View>

                            {/* Product Name Skeleton */}
                            <View style={styles.productNameSkeleton}>
                                <Animated.View
                                    style={[
                                        styles.productShineEffect,
                                        {
                                            transform: [{
                                                translateX: productShineAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-100, 300]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </View>

                            {/* Product Weight Skeleton */}
                            <View style={styles.productWeightSkeleton}>
                                <Animated.View
                                    style={[
                                        styles.productShineEffect,
                                        {
                                            transform: [{
                                                translateX: productShineAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-100, 300]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </View>

                            {/* Price Container Skeleton */}
                            <View style={styles.priceContainerSkeleton}>
                                <View style={styles.priceSkeleton}>
                                    <Animated.View
                                        style={[
                                            styles.productShineEffect,
                                            {
                                                transform: [{
                                                    translateX: productShineAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [-100, 300]
                                                    })
                                                }]
                                            }
                                        ]}
                                    />
                                </View>
                                <View style={styles.originalPriceSkeleton}>
                                    <Animated.View
                                        style={[
                                            styles.productShineEffect,
                                            {
                                                transform: [{
                                                    translateX: productShineAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [-100, 300]
                                                    })
                                                }]
                                            }
                                        ]}
                                    />
                                </View>
                            </View>

                            {/* Add Button Skeleton */}
                            <View style={styles.addButtonSkeleton}>
                                <Animated.View
                                    style={[
                                        styles.productShineEffect,
                                        {
                                            transform: [{
                                                translateX: productShineAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-100, 300]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    )}
                    key="product-skeleton-loader"
                />
            </View>
        )
    }

    // Typing Loader Component - UPDATED: Added header with ActivityIndicator
    const TypingLoader = () => {
        const skeletonData = Array.from({ length: 8 }, (_, index) => ({ id: `typing-skeleton-${index}` }));
        
        return (
            <View style={{ flex: 1 }}>
                {/* <View style={styles.skeletonHeader}>
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text style={[styles.skeletonHeaderText, { color: colors.gray[400] }]}>
                        Searching...
                    </Text>
                </View> */}
                <FlatList
                    data={skeletonData}
                    keyExtractor={(item) => item.id}
                    renderItem={() => (
                        <View style={styles.loaderContainer}>
                            <View style={[styles.box, { backgroundColor: colors.gray[200] }]}>
                                <Animated.View
                                    style={[
                                        styles.shineEffect,
                                        {
                                            transform: [{
                                                translateX: shineAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-100, 300]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </View>

                            <View style={[styles.textContainer, { flex: 1 }]}>
                                <View style={[styles.textLine, { backgroundColor: colors.gray[200], width: '100%' }]}>
                                    <Animated.View
                                        style={[
                                            styles.shineEffect,
                                            {
                                                transform: [{
                                                    translateX: shineAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [-100, 300]
                                                    })
                                                }]
                                            }
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    key="typing-loader"
                />
            </View>
        )
    }

    // Animation function for keywords
    const startKeywordAnimation = () => {
        const animationDuration = 2000; // 2 seconds per keyword

        const animate = () => {
            // Only animate if search text is empty
            if (searchText === '' && showProductCards) {
                // Slide out current keyword and fade out
                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: -20,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    })
                ]).start(() => {
                    // Change to next keyword
                    setCurrentKeywordIndex((prevIndex) =>
                        (prevIndex + 1) % searchKeywords.length
                    );

                    // Reset animation values for new keyword (start from bottom)
                    slideAnim.setValue(20);
                    fadeAnim.setValue(0);

                    // Slide in new keyword and fade in
                    Animated.parallel([
                        Animated.timing(slideAnim, {
                            toValue: 0,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        })
                    ]).start();
                });
            }
        };

        // Start the animation loop
        const interval = setInterval(animate, animationDuration);
        return interval;
    };

    // Start animations when component mounts
    useEffect(() => {
        const animationInterval = startKeywordAnimation();
        startShineAnimation();
        startProductShineAnimation();

        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
            // Cleanup timeout on unmount
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchText, showProductCards]); // Re-run when searchText or showProductCards changes

    const handleClearSearch = () => {
        setSearchText('');
        setSearchResults([]);
        setHasMore(true);
        setCurrentPage(1);
        setIsTyping(false);
        setShowProductCards(true);
        setProductCardsData(staticProductData); // Reset to static data
        setSelectedProduct(null);
        setShowProductSkeleton(false);
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    };

    const handleSearchSubmit = () => {
        // Handle search functionality
        console.log('Search for:', searchText);
        if (searchText.trim() !== '') {
            // Clear any pending timeout and search immediately
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            setIsTyping(false);
            setShowProductCards(false);
            fetchBannerProducts(searchText, 1).catch(error => {
                console.log('❌ Search submit failed:', error.message);
            });
        }
    };

    const handleShowAllResults = () => {
        // Navigate to search results screen or show all results
        console.log('Show all results for:', searchText);
        navigation.navigate('SearchResultsScreen', {
            searchQuery: searchText,
            products: searchResults
        });
    };

    // Safe image source function
    const getImageSource = (imageUri) => {
        if (!imageUri || typeof imageUri !== 'string') {
            return require('../../src/images/default.jpg');
        }
        
        // Check if the URI is valid
        if (imageUri.startsWith('http://') || imageUri.startsWith('https://')) {
            return { uri: imageUri };
        }
        
        return require('../../src/images/default.jpg');
    };

    // Render search result item
    const renderSearchItem = ({ item, index }) => {
        const productImage = item?.image;
        const productName = item?.name || 'Product Name';
        const productId = item?.id || index;

        return (
            <TouchableOpacity
                style={[styles.productItemContainer]}
                onPress={() => handleProductSelect(item)}
            >
                <View style={styles.imageBox}>
                    <Image
                        source={getImageSource(productImage)}
                        style={styles.searchItemImage}
                        resizeMode='cover'
                        onError={(error) => console.log('❌ Image load error:', error.nativeEvent.error)}
                    />
                </View>
                <View style={[styles.productInfoContainer]}>
                    <Text style={styles.productname} numberOfLines={2}>
                        {productName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    // Render product card with actual API data
    const renderProductCard = ({ item, index }) => {
        // Check if it's static data or API data
        const isStaticData = item && item.price && typeof item.price === 'string' && item.price.startsWith('₹');
        
        const productImage = item?.image;
        const productName = item?.name || 'Product Name';
        const currentPrice = isStaticData ? item.price : '₹1000';
        const originalPrice = isStaticData ? item.originalPrice : '₹1100';
        const productWeight = isStaticData ? item.weight : '500g';

        return (
            <View style={styles.productCardContainer}>
                {/* Product Image */}
                <View style={styles.productImageContainer}>
                    <Image
                        source={getImageSource(productImage)}
                        style={styles.productImage}
                        resizeMode='contain'
                        onError={(error) => {
                            console.log('❌ Product image load error:', error.nativeEvent.error);
                        }}
                    />
                </View>

                {/* Product Name */}
                <Text style={styles.productName} numberOfLines={2}>
                    {productName}
                </Text>

                {/* Product Weight */}
                <Text style={styles.productWeight} numberOfLines={1}>
                    {productWeight}
                </Text>

                {/* Price Section */}
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{currentPrice}</Text>
                    <Text style={styles.originalPrice}>{originalPrice}</Text>
                </View>

                {/* Add Button */}
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const hasSearchResults = searchResults.length > 0;
    const showResults = !isTyping && !loader && searchText.trim() !== '';

    // Create proper data structure for product cards
    const productCardsDataFormatted = productCardsData.length > 0 
        ? productCardsData 
        : staticProductData;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
            <StatusBar backgroundColor={colors.bg} />
            <View style={[styles.searchbarContainer, {
                borderColor: colors.border,
                backgroundColor: colors.gray[100]
            }]}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
                        <BackIcon width={s(12)} height={s(12)} stroke={colors.gray[400]} />
                    </TouchableOpacity>

                    <View style={styles.searchInputWrapper}>
                        <TextInput
                            ref={searchInputRef}
                            value={searchText}
                            onChangeText={handleTextChange}
                            onSubmitEditing={handleSearchSubmit}
                            style={[styles.searchinput, { color: colors.text }]}
                            placeholderTextColor="transparent"
                            autoFocus={true}
                            returnKeyType="search"
                        />

                        {/* Animated Placeholder */}
                        {searchText === '' && showProductCards && (
                            <View style={styles.animatedPlaceholderContainer} pointerEvents="none">
                                <Text style={[styles.searchStaticText, { color: colors.gray[400] }]}>
                                    Search for{" "}
                                </Text>
                                <View style={styles.animatedKeywordContainer}>
                                    <Animated.Text
                                        style={[
                                            styles.animatedKeyword,
                                            {
                                                color: colors.gray[400],
                                                transform: [{ translateY: slideAnim }],
                                                opacity: fadeAnim
                                            }
                                        ]}
                                    >
                                        "{searchKeywords[currentKeywordIndex]}"
                                    </Animated.Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {searchText !== '' ? (
                    <TouchableOpacity style={styles.backbutton} onPress={handleClearSearch}>
                        <CrossIcon2 width={s(18)} height={s(18)} stroke={colors.gray[400]} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholderButton} />
                )}
            </View>

            {/* Main Content Area - UPDATED: Fixed loader visibility */}
            {showProductSkeleton ? (
                // Show product skeleton loader while API is fetching product details
                <ProductSkeletonLoader />
            ) : isTyping ? (
                // Show typing loader while user is typing - NOW VISIBLE!
                <TypingLoader />
            ) : loader ? (
                // Show simple loader when API is fetching search results
                <SimpleLoader />
            ) : showProductCards ? (
                // Show product cards with actual API data or static data
                <View style={{ flex: 1, backgroundColor: BRAND.bg }}>
                    <FlatList
                        data={productCardsDataFormatted}
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            gap: s(10),
                            alignItems: 'center',
                            paddingTop: s(20),
                            paddingHorizontal: s(20),
                            paddingBottom: s(20)
                        }}
                        keyExtractor={(item, index) => {
                            const id = item?.id || index;
                            return `product-card-${id}`;
                        }}
                        numColumns={2}
                        renderItem={renderProductCard}
                        showsVerticalScrollIndicator={false}
                        key="product-cards-grid"
                    />
                </View>
            ) : showResults ? (
                // Show search suggestions from API
                <View style={{ backgroundColor: colors.bg, flex: 1 }}>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item, index) => {
                            const id = item?.id || index;
                            return `search-result-${id}`;
                        }}
                        renderItem={renderSearchItem}
                        onEndReached={loadMoreProducts}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => (
                            <>
                                {loader && searchResults.length > 0 && (
                                    <LoadingMoreComponent />
                                )}
                                {searchText.length > 0 && !loader && (
                                    <TouchableOpacity
                                        style={[styles.showAllContainer]}
                                        onPress={handleShowAllResults}
                                    >
                                        <View style={[styles.iconBox, {
                                            backgroundColor: colors.primary + '10'
                                        }]}>
                                            <SearchIcon width={s(20)} height={s(20)} stroke={colors.primary} />
                                        </View>
                                        <View style={[styles.showAllTextContainer]}>
                                            <Text style={{ color: colors.gray[400] }}>Show all results for </Text>
                                            <Text style={styles.searchQueryText}>{searchText}</Text>
                                        </View>
                                        <RightArrowICon width={s(15)} height={s(15)} stroke={colors.gray[400]} />
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                        // ListEmptyComponent={() => (
                        //     !loader && searchText.trim() !== '' ? (
                        //         <View style={styles.noResultsContainer}>
                        //             <Text style={[styles.noResultsText, { color: colors.gray[400] }]}>
                        //                 No products found for "{searchText}"
                        //             </Text>
                        //         </View>
                        //     ) : null
                        // )}
                        key="search-results-list"
                    />
                </View>
            ) : null}
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbarContainer: {
        width: "90%",
        borderWidth: s(1),
        paddingHorizontal: s(5),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
        height: vs(35),
        marginTop: vs(7),
        borderRadius: s(5),
    },
    backbutton: {
        paddingHorizontal: s(5),
        paddingVertical: s(5)
    },
    placeholderButton: {
        paddingHorizontal: s(5),
        paddingVertical: s(5),
        width: s(28),
    },
    searchInputWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        height: '100%',
    },
    searchinput: {
        paddingStart: s(10),
        flex: 1,
        fontSize: s(14),
        paddingVertical: 0,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    animatedPlaceholderContainer: {
        position: 'absolute',
        left: s(10),
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    searchStaticText: {
        fontSize: s(12),
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    animatedKeywordContainer: {
        height: s(20),
        overflow: 'hidden',
        justifyContent: 'center',
    },
    animatedKeyword: {
        fontSize: s(12),
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    // NEW: Simple Loader Styles
    simpleLoaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BRAND.bg,
    },
    loadingText: {
        marginTop: s(15),
        fontSize: s(14),
        textAlign: 'center',
    },
    // NEW: Skeleton Header
    skeletonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: s(15),
        backgroundColor: BRAND.bg,
        borderBottomWidth: s(1),
        borderBottomColor: BRAND.border,
    },
    skeletonHeaderText: {
        marginLeft: s(10),
        fontSize: s(14),
    },
    // Existing loader styles
    loaderContainer: {
        gap: s(15),
        backgroundColor: BRAND.bg,
        paddingHorizontal: s(20),
        paddingVertical: s(15),
        flexDirection: "row"
    },
    box: {
        width: s(35),
        height: vs(35),
        borderRadius: s(8),
        overflow: 'hidden',
        position: 'relative'
    },
    textContainer: {
        justifyContent: 'center',
    },
    textLine: {
        height: vs(33),
        borderRadius: s(8),
        overflow: 'hidden',
    },
    shineEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        transform: [{ skewX: '-20deg' }],
    },
    // Product Skeleton Styles
    productSkeletonContainer: {
        width: Dimensions.get('window').width / 2 - s(25),
        height: vs(220),
        borderRadius: s(12),
        marginBottom: s(10),
        backgroundColor: BRAND.white,
        marginHorizontal: s(5),
        padding: s(10),
        borderWidth: s(1),
        borderColor: BRAND.gray[200],
        paddingBottom: s(15),
        overflow: 'hidden'
    },
    productImageSkeleton: {
        width: "100%",
        height: "50%",
        backgroundColor: BRAND.gray[100],
        borderRadius: s(8),
        marginBottom: s(8),
        overflow: 'hidden',
        position: 'relative'
    },
    productNameSkeleton: {
        height: s(14),
        backgroundColor: BRAND.gray[100],
        borderRadius: s(4),
        marginBottom: s(4),
        overflow: 'hidden',
        position: 'relative'
    },
    productWeightSkeleton: {
        height: s(12),
        backgroundColor: BRAND.gray[100],
        borderRadius: s(4),
        marginBottom: s(8),
        width: '60%',
        overflow: 'hidden',
        position: 'relative'
    },
    priceContainerSkeleton: {
        flexDirection: "row",
        alignItems: "center",
        gap: s(6),
        marginBottom: s(8)
    },
    priceSkeleton: {
        height: s(14),
        backgroundColor: BRAND.gray[100],
        borderRadius: s(4),
        width: s(40),
        overflow: 'hidden',
        position: 'relative'
    },
    originalPriceSkeleton: {
        height: s(12),
        backgroundColor: BRAND.gray[100],
        borderRadius: s(4),
        width: s(35),
        overflow: 'hidden',
        position: 'relative'
    },
    addButtonSkeleton: {
        height: s(30),
        backgroundColor: BRAND.gray[100],
        borderRadius: s(8),
        width: s(60),
        alignSelf: 'flex-end',
        overflow: 'hidden',
        position: 'relative'
    },
    productShineEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        transform: [{ skewX: '-20deg' }],
    },
    productItemContainer: {
        flexDirection: "row",
        paddingHorizontal: s(20),
        paddingVertical: s(12),
        backgroundColor: BRAND.bg,
        borderBottomColor: BRAND.border,
    },
    imageBox: {
        width: s(40),
        height: s(40),
        padding: s(7),
        backgroundColor: BRAND.white,
        borderWidth: s(1),
        borderColor: BRAND.border,
        borderRadius: s(6),
        overflow: "hidden",
        marginRight: s(12),
    },
    searchItemImage: {
        width: "100%",
        height: "100%"
    },
    productInfoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    productname: {
        fontSize: s(14),
        fontWeight: '500',
        color: BRAND.text,
        marginBottom: s(4),
    },
    productPrice: {
        fontSize: s(14),
        fontWeight: '600',
        color: BRAND.text,
    },
    originalPrice: {
        fontSize: s(12),
        color: BRAND.gray[400],
        textDecorationLine: 'line-through',
    },
    showAllContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: s(20),
        paddingVertical: s(15),
        backgroundColor: BRAND.bg,
        borderTopColor: BRAND.border,
    },
    iconBox: {
        width: s(40),
        height: s(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(6),
        marginRight: s(12),
    },
    showAllTextContainer: {
        flex: 1,
    },
    searchQueryText: {
        fontSize: s(14),
        fontWeight: '500',
        color: BRAND.text,
    },
    noResultsContainer: {
        padding: s(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    noResultsText: {
        fontSize: s(14),
        color: BRAND.gray[400],
        textAlign: 'center',
    },
    loadingMoreContainer: {
        padding: s(15),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: s(10),
    },
    loadingMoreText: {
        fontSize: s(12),
        color: BRAND.gray[400],
    },
    productCardContainer: {
        width: Dimensions.get('window').width / 2 - s(25),
        height: vs(220),
        borderRadius: s(12),
        marginBottom: s(10),
        backgroundColor: BRAND.white,
        marginHorizontal: s(5),
        padding: s(10),
        borderWidth: s(1),
        borderColor: BRAND.gray[200],
        paddingBottom: s(15)
    },
    productImageContainer: {
        width: "100%",
        height: "50%",
        backgroundColor: BRAND.gray[100],
        borderRadius: s(8),
        marginBottom: s(8),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    productImage: {
        width: "80%",
        height: "80%",
        mixBlendMode:'multiply'
    },
    productName: {
        fontSize: s(12),
        fontWeight: '500',
        color: BRAND.text,
        marginBottom: s(4)
    },
    productWeight: {
        fontSize: s(11),
        color: BRAND.gray[400],
        marginBottom: s(4)
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: s(6),
        marginBottom: s(8)
    },
    currentPrice: {
        fontSize: s(14),
        fontWeight: '600',
        color: BRAND.text
    },
    originalPrice: {
        fontSize: s(12),
        color: BRAND.gray[400],
        textDecorationLine: 'line-through'
    },
    addButtonContainer: {
        alignItems: 'flex-end',
        width: "100%",
        marginTop: s(5)
    },
    addButton: {
        backgroundColor: BRAND.primary,
        width: s(60),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: s(6),
        borderRadius: s(8)
    },
    addButtonText: {
        color: BRAND.white,
        fontSize: s(12),
        fontWeight: '500'
    },
})