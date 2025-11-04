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
    const [isTyping, setIsTyping] = useState(false);
    const [showProductCards, setShowProductCards] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductSkeleton, setShowProductSkeleton] = useState(false);
    const [productCardsData, setProductCardsData] = useState([]);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const shineAnim = useRef(new Animated.Value(0)).current;
    const productShineAnim = useRef(new Animated.Value(0)).current;

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

    // Fetch initial products on component mount
    useEffect(() => {
        // Show skeleton when component first loads
        setShowProductSkeleton(true);
        fetchProductByName("");
    }, []);

    // API call function for search suggestions
    const fetchBannerProducts = useCallback(async (searchTerm, page = 1, length = 10) => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setHasMore(true);
            setCurrentPage(1);
            setIsTyping(false);
            setShowProductCards(true);
            // Fetch default products when search is cleared
            fetchProductByName("");
            return;
        }

        try {
            setLoader(true);

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

            let products = [];

            // Handle API response data structure
            if (data.data && Array.isArray(data.data)) {
                products = data.data;
                console.log(`🎯 Found ${products.length} products for "${searchTerm}"`);
            } else {
                console.log('⚠️ Unexpected response structure:', data);
            }

            if (page === 1) {
                setSearchResults(products);
            } else {
                setSearchResults(prev => [...prev, ...products]);
            }

            setHasMore(false);
            setCurrentPage(page);

            return products;
        } catch (error) {
            console.log('❌ Error fetching banner products:', error);
            throw error;
        } finally {
            setLoader(false);
            setIsTyping(false);
        }
    }, [accessToken]);

    // Fetch products by name - UPDATED to handle API response properly
    const fetchProductByName = async (productName) => {
        try {
            // Only show skeleton for initial load or when clearing search
            if (!productName || productName.length <= 0) {
                setShowProductSkeleton(true);
                setShowProductCards(false);
            }

            let url = '';
            if (!productName || productName.length <= 0) {
                console.log("Fetching default products");
                url = `${BASE_URL}/prod/get_banner_products?page=1&length=22`;
            } else {
                url = `${BASE_URL}/prod/banner_product?page=1&length=5&prod_name=${productName}`
            }

            console.log('📡 API URL:', url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log('📊 Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ API Response data:', data);

            // Handle the API response data properly
            let products = [];

            // Check for different possible response structures
            if (data.data && Array.isArray(data.data)) {
                products = data.data;
            } else if (Array.isArray(data)) {
                products = data;
            } else if (data.products && Array.isArray(data.products)) {
                products = data.products;
            } else {
                console.log('⚠️ Unknown response structure:', data);
            }

            console.log(`📦 Processed ${products.length} products from API`);

            // Set the product cards data from API response
            setProductCardsData(products);

            // Hide skeleton and show product cards
            setShowProductSkeleton(false);
            setShowProductCards(true);

            return data;
        } catch (error) {
            console.log('❌ Error fetching products:', error);
            // Hide skeleton and show empty state
            setShowProductSkeleton(false);
            setShowProductCards(true);
            setProductCardsData([]); // Set empty array on error
            return null;
        }
    }

    // Function to handle product selection
    const handleProductSelect = useCallback(async (product) => {
        console.log('select:', product.name);
        setSearchText(product.name);
        setSelectedProduct(product);
        setShowProductCards(false);
        setShowProductSkeleton(true);

        // Fetch product data
        await fetchProductByName(product.name);
    }, []);

    // Immediate search function
    const immediateSearch = useCallback((searchTerm, page = 1) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (page === 1) {
            setIsTyping(true);
            setShowProductCards(false);
            setSelectedProduct(null);
        }

        if (searchTerm.trim() !== '') {
            console.log('🔍 Immediate search for:', searchTerm, 'page:', page);
            fetchBannerProducts(searchTerm, page).catch(error => {
                console.log('❌ Search failed:', error.message);
                setIsTyping(false);
            });
        } else {
            setSearchResults([]);
            setHasMore(true);
            setCurrentPage(1);
            setIsTyping(false);
            setShowProductCards(true);
            // Fetch default products when search is cleared
            fetchProductByName("");
            setSelectedProduct(null);
        }
    }, [fetchBannerProducts]);

    // Handle text input change
    const handleTextChange = (text) => {
        setSearchText(text);
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

    // Handle clear search - UPDATED to show product skeleton
    const handleClearSearch = () => {
        setSearchText('');
        setSearchResults([]);
        setHasMore(true);
        setCurrentPage(1);
        setIsTyping(false);
        
        // Show product skeleton while fetching default products
        setShowProductSkeleton(true);
        setShowProductCards(false);
        
        // Fetch default products when search is cleared
        fetchProductByName("");
        setSelectedProduct(null);
        
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    };

    const handleSearchSubmit = () => {
        console.log('Search for:', searchText);
        if (searchText.trim() !== '') {
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
        console.log('Show all results for:', searchText);
        fetchProductByName(searchText);
    };

    // Simple Loader Component for API fetching
    const SimpleLoader = () => (
        <View style={styles.simpleLoaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.gray[400] }]}>
                Searching for "{searchText}"...
            </Text>
        </View>
    );

    // Loading More Component for infinite scroll
    const LoadingMoreComponent = () => (
        <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={[styles.loadingMoreText, { color: colors.gray[400] }]}>
                Loading more products...
            </Text>
        </View>
    );

    // Empty State Component - UPDATED to include Show All button
    const EmptyStateComponent = () => (
        <View style={styles.emptyStateContainer}>
            <Text style={[styles.emptyStateText, { color: colors.gray[400] }]}>
                {searchText ? `No products found for "${searchText}"` : 'No products available'}
            </Text>
            
            {/* Show All Results Button when search has text but no results */}
            {searchText && !loader && !isTyping && (
                <TouchableOpacity
                    style={[styles.showAllContainer, styles.showAllButton]}
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

    // Typing Loader Component
    const TypingLoader = () => {
        const skeletonData = Array.from({ length: 8 }, (_, index) => ({ id: `typing-skeleton-${index}` }));

        return (
            <View style={{ flex: 1 }}>
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
        const animationDuration = 2000;

        const animate = () => {
            if (searchText === '' && showProductCards) {
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
                    setCurrentKeywordIndex((prevIndex) =>
                        (prevIndex + 1) % searchKeywords.length
                    );

                    slideAnim.setValue(20);
                    fadeAnim.setValue(0);

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
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchText, showProductCards]);

    // UPDATED: Improved image source function with better URL handling
    const getImageSource = (imageUri) => {
        console.log('🖼️ Processing image URI:', imageUri);

        // Handle array of images - take first image's image_url
        if (Array.isArray(imageUri) && imageUri.length > 0) {
            const firstImage = imageUri[0];
            const imageUrl = firstImage?.image_url || firstImage?.image;
            console.log('🖼️ Extracted from array:', imageUrl);
            return getImageSource(imageUrl); // Recursively process the extracted URL
        }

        // Handle image object with image_url
        if (imageUri && typeof imageUri === 'object' && imageUri.image_url) {
            console.log('🖼️ Extracted from object:', imageUri.image_url);
            return getImageSource(imageUri.image_url);
        }

        // Handle string URLs
        if (!imageUri || typeof imageUri !== 'string') {
            console.log('🖼️ Using default image - invalid URI');
            return require('../../src/images/default.jpg');
        }

        // Check if it's a complete URL
        if (imageUri.startsWith('http://') || imageUri.startsWith('https://')) {
            console.log('🖼️ Using network image:', imageUri);
            return { uri: imageUri };
        }

        // Check if it's a relative path that needs base URL
        if (imageUri.startsWith('/') || imageUri.includes('uploads/') || imageUri.includes('toptenbazar/')) {
            const fullUrl = `${BASE_URL}${imageUri.startsWith('/') ? '' : '/'}${imageUri}`;
            console.log('🖼️ Constructed full URL:', fullUrl);
            return { uri: fullUrl };
        }

        console.log('🖼️ Using default image - unknown format');
        return require('../../src/images/default.jpg');
    };

    // UPDATED: Improved price formatting with division by 100
    const formatPrice = (price) => {
        console.log('💰 Raw price:', price, 'Type:', typeof price);

        let numericPrice = 0;

        // Convert to number and divide by 100
        if (typeof price === 'number') {
            numericPrice = price / 100;
        } else if (typeof price === 'string') {
            // Remove any non-numeric characters except decimal point
            const cleanPrice = price.replace(/[^\d.]/g, '');
            numericPrice = parseFloat(cleanPrice) / 100;
        }

        // Handle NaN case
        if (isNaN(numericPrice)) {
            numericPrice = 0;
        }

        const formattedPrice = `₹${numericPrice}`;
        console.log('💰 Formatted price:', formattedPrice);
        return formattedPrice;
    };

    // UPDATED: Get product weight/unit information
    const getProductWeight = (item) => {
        const weight = item?.weight || item?.unit || item?.quantity || item?.size || '500g';
        console.log('⚖️ Product weight:', weight);
        return weight;
    };

    // Render search result item - UPDATED with better image handling
    const renderSearchItem = ({ item, index }) => {
        const productImage = item?.image || item?.image?.image_url || item?.image[0]?.image_url || item?.product_image;
        const productName = item?.name || item?.product_name || 'Product Name';
        const productId = item?.id || index;

        console.log('🔍 Search Item:', { productImage, productName });

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
                        onError={(error) => {
                            console.log('❌ Search item image load error:', error.nativeEvent.error);
                            console.log('❌ Problematic image URL:', productImage);
                        }}
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

    // UPDATED: Render product card with proper API data handling
    const renderProductCard = ({ item, index }) => {
        const productImage = item?.image || item?.image_url || item?.product_image || item?.images?.[0];
        const productName = item?.name || item?.product_name || 'Product Name';
        const currentPrice = formatPrice(item?.price || item?.current_price || item?.selling_price || 0);
        const originalPrice = formatPrice(item?.original_price || item?.mrp || item?.maximum_retail_price || item?.price || 0);
        const productWeight = getProductWeight(item);

        console.log('📦 Product Card Data:', {
            productImage,
            productName,
            currentPrice,
            originalPrice,
            productWeight
        });

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
                            console.log('❌ Problematic image URL:', productImage);
                        }}
                        onLoad={() => console.log('✅ Image loaded successfully:', productImage)}
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
                    {originalPrice !== currentPrice && (
                        <Text style={styles.originalPrice}>{originalPrice}</Text>
                    )}
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
    const hasProductCards = productCardsData.length > 0;

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

            {/* Main Content Area - UPDATED to prioritize skeleton */}
            {showProductSkeleton ? (
                <ProductSkeletonLoader />
            ) : isTyping ? (
                <TypingLoader />
            ) : loader ? (
                <SimpleLoader />
            ) : showProductCards ? (
                <View style={{ flex: 1, backgroundColor: BRAND.bg }}>
                    {hasProductCards ? (
                        <FlatList
                            data={productCardsData}
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
                            ListEmptyComponent={EmptyStateComponent}
                            key="product-cards-grid"
                        />
                    ) : (
                        <EmptyStateComponent />
                    )}
                </View>
            ) : showResults ? (
                <View style={{ backgroundColor: colors.bg, flex: 1 }}>
                    {hasSearchResults ? (
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
                            key="search-results-list"
                        />
                    ) : (
                        <EmptyStateComponent />
                    )}
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
    // Empty State - UPDATED
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: s(40),
    },
    emptyStateText: {
        fontSize: s(14),
        textAlign: 'center',
        marginBottom: s(20),
    },
    // Show All Button in Empty State
    showAllButton: {
        marginTop: s(20),
        width: '80%',
        alignSelf: 'center',
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
        mixBlendMode: 'multiply'
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