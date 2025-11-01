import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View, Animated, Text, FlatList, Image } from 'react-native'
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
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const shineAnim = useRef(new Animated.Value(0)).current;

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

    // API call function - FIXED: Added required parameters
    const fetchBannerProducts = useCallback(async (searchTerm, page = 1, length = 10) => {
        try {
            setLoader(true);
            setIsTyping(false); // Hide typing state when API call starts
            
            // Build query parameters - FIXED: Include required subcategory_id
            let queryParams = `page=${page}&length=${length}&subcategory_id=13`;
            
            if (searchTerm && searchTerm.trim() !== '') {
                queryParams += `&prod_name=${encodeURIComponent(searchTerm.trim())}`;
            }

            const url = `${BASE_URL}/prod/banner_product?${queryParams}`;
            
            console.log('🔍 Fetching banner products from:', url);

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

            // Handle different response structures
            let products = [];
            if (data.data && Array.isArray(data.data)) {
                products = data.data;
            } else if (Array.isArray(data)) {
                products = data;
            } else if (data.products && Array.isArray(data.products)) {
                products = data.products;
            } else if (data.results && Array.isArray(data.results)) {
                products = data.results;
            }

            console.log(`🎯 Found ${products.length} products`);

            if (page === 1) {
                setSearchResults(products);
            } else {
                setSearchResults(prev => [...prev, ...products]);
            }

            // Check if there are more pages
            setHasMore(products.length === length);
            setCurrentPage(page);

            return products;
        } catch (error) {
            console.log('❌ Error fetching banner products:', error);
            
            // Show error message to user
            if (error.message.includes('banner_id or subcategory_id')) {
                console.log('⚠️ API requires banner_id or subcategory_id parameter');
            }
            
            throw error;
        } finally {
            setLoader(false);
        }
    }, [accessToken]);

    // Debounced search function
    const debouncedSearch = useCallback((searchTerm, page = 1) => {
        // Clear existing timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Show skeleton loader immediately when typing starts (for first page only)
        if (page === 1) {
            setIsTyping(true);
        }

        // Set new timeout
        debounceTimeoutRef.current = setTimeout(() => {
            if (searchTerm.trim() !== '') {
                console.log('🔍 Searching for:', searchTerm, 'page:', page);
                fetchBannerProducts(searchTerm, page).catch(error => {
                    console.log('❌ Search failed:', error.message);
                    // You can show an error message to the user here
                });
            } else {
                // Clear results if search is empty
                setSearchResults([]);
                setHasMore(true);
                setCurrentPage(1);
                setIsTyping(false);
            }
        }, 800); // 800ms delay after typing stops
    }, [fetchBannerProducts]);

    // Handle text input change
    const handleTextChange = (text) => {
        setSearchText(text);
        
        if (text.trim() === '') {
            // Clear immediately if text is empty
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            setSearchResults([]);
            setHasMore(true);
            setCurrentPage(1);
            setIsTyping(false);
        } else {
            // Trigger debounced search
            debouncedSearch(text, 1);
        }
    };

    // Load more products for infinite scroll
    const loadMoreProducts = () => {
        if (!loader && hasMore && searchText.trim() !== '' && !isTyping) {
            fetchBannerProducts(searchText, currentPage + 1).catch(error => {
                console.log('❌ Load more failed:', error.message);
            });
        }
    };

    const Loader = () => {
        return (
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
        )
    }

    // Shining animation function
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

    // Animation function for keywords
    const startKeywordAnimation = () => {
        const animationDuration = 2000; // 2 seconds per keyword

        const animate = () => {
            // Only animate if search text is empty
            if (searchText === '') {
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

        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
            // Cleanup timeout on unmount
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchText]); // Re-run when searchText changes

    const handleClearSearch = () => {
        setSearchText('');
        setSearchResults([]);
        setHasMore(true);
        setCurrentPage(1);
        setIsTyping(false);
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    };

    const handleSearchSubmit = () => {
        // Handle search functionality
        console.log('Search for:', searchText);
        if (searchText.trim() !== '') {
            // Clear any pending debounce and search immediately
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            setIsTyping(false);
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

    // Render search result item
    const renderSearchItem = ({ item, index }) => {
        // Safe access to item properties
        const productImage = item?.image?.[0]?.image_url || item?.product_image?.[0]?.image_url || item?.image_url;
        const productName = item?.product_name || item?.name || 'Product Name';
        const productId = item?.id || item?.product_id || index;
        const productPrice = item?.product_selling_price || item?.selling_price || item?.price;
        const originalPrice = item?.product_original_price || item?.original_price;

        return (
            <TouchableOpacity 
                style={[styles.productItemContainer]}
                onPress={() => {
                    // Navigate to product details
                    navigation.navigate('AboutProductScreen', { item });
                }}
            >
                <View style={styles.imageBox}>
                    <Image
                        source={productImage ? { uri: productImage } : require('../../src/images/default.jpg')}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode='cover'
                    />
                </View>
                <View style={[styles.productInfoContainer]}>
                    <Text style={styles.productname} numberOfLines={2}>
                        {productName}
                    </Text>
                    {productPrice && (
                        <Text style={styles.productPrice}>
                            ₹{(parseInt(productPrice) / 100).toLocaleString('en-IN')}
                        </Text>
                    )}
                    {originalPrice && originalPrice > productPrice && (
                        <Text style={styles.originalPrice}>
                            ₹{(parseInt(originalPrice) / 100).toLocaleString('en-IN')}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const hasSearchResults = searchResults.length > 0;
    const showSkeletonLoader = (isTyping || loader) && searchResults.length === 0;
    const showResults = !isTyping && !loader && searchText.trim() !== '';

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
                        {searchText === '' && (
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

            {/* Show skeleton loader during typing OR API loading */}
            {showSkeletonLoader ? (
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8]}
                    keyExtractor={(item, index) => `skeleton-${index}`}
                    renderItem={() => <Loader />}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={{ backgroundColor: colors.bg, flex: 1 }}>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item, index) => {
                            const id = item?.id || item?.product_id || index;
                            return `search-result-${id}`;
                        }}
                        renderItem={renderSearchItem}
                        onEndReached={loadMoreProducts}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => (
                            <>
                                {loader && searchResults.length > 0 && (
                                    <View style={styles.loadingMoreContainer}>
                                        <Text style={styles.loadingMoreText}>Loading more products...</Text>
                                    </View>
                                )}
                                {hasSearchResults && showResults && (
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
                                {!hasSearchResults && showResults && (
                                    <View style={styles.noResultsContainer}>
                                        <Text style={styles.noResultsText}>No results found for "{searchText}"</Text>
                                    </View>
                                )}
                            </>
                        )}
                        ListEmptyComponent={() => 
                            showResults && !hasSearchResults ? (
                                <View style={styles.noResultsContainer}>
                                    <Text style={styles.noResultsText}>No results found for "{searchText}"</Text>
                                </View>
                            ) : null
                        }
                    />
                </View>
            )}
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
    productItemContainer: {
        flexDirection: "row",
        paddingHorizontal: s(20),
        paddingVertical: s(12),
        backgroundColor: BRAND.bg,
        borderBottomWidth: s(1),
        borderBottomColor: BRAND.border,
    },
    imageBox: {
        width: s(50),
        height: s(50),
        backgroundColor: BRAND.white,
        borderWidth: s(1),
        borderColor: BRAND.border,
        borderRadius: s(6),
        overflow: "hidden",
        marginRight: s(12),
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
        borderTopWidth: s(1),
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
    },
    loadingMoreText: {
        fontSize: s(12),
        color: BRAND.gray[400],
    }
})