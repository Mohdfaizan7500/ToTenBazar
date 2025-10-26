import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs, ms, mvs } from 'react-native-size-matters'

const Catlog = () => {
    // Sample product data (you can replace with your actual data)
    const products = [
        {
            id: '1',
            name: 'Samsung Galaxy S23 Ultra',
            price: '₹94,999',
            originalPrice: '₹1,04,999',
            discount: '10% off',
            rating: '4.5',
            reviews: '12,345',
            image: 'https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s918-sm-s918bzkdins-thumb-534866512',
            isFavorite: false,
            delivery: 'Free delivery',
            exchange: 'Exchange available'
        },
        {
            id: '2',
            name: 'Apple iPhone 15 Pro Max',
            price: '₹1,39,900',
            originalPrice: '₹1,59,900',
            discount: '13% off',
            rating: '4.7',
            reviews: '8,765',
            image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=webp',
            isFavorite: true,
            delivery: 'Free delivery',
            exchange: 'No cost EMI'
        },
        {
            id: '3',
            name: 'OnePlus 11 5G',
            price: '₹56,999',
            originalPrice: '₹61,999',
            discount: '8% off',
            rating: '4.3',
            reviews: '9,876',
            image: 'https://image01.oneplus.net/ebp/202301/17/1-m00-3d-17-cpgm7wo1w_oaq8zhaajj3y8xr8w817.png',
            isFavorite: false,
            delivery: 'Free delivery',
            exchange: 'Exchange available'
        },
        {
            id: '4',
            name: 'Google Pixel 8 Pro',
            price: '₹1,06,999',
            originalPrice: '₹1,19,999',
            discount: '11% off',
            rating: '4.4',
            reviews: '5,432',
            image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/pixel_8_pro_obsidian_1.jpg',
            isFavorite: true,
            delivery: 'Free delivery',
            exchange: 'No cost EMI'
        },
        {
            id: '5',
            name: 'Xiaomi 13 Pro',
            price: '₹79,999',
            originalPrice: '₹89,999',
            discount: '11% off',
            rating: '4.2',
            reviews: '7,654',
            image: 'https://i02.appmifile.com/938_operator_in/07/06/2023/2d5a8e9c2c2c0c4d9e6a8e6a8e6a8e6a8.png',
            isFavorite: false,
            delivery: 'Free delivery',
            exchange: 'Exchange available'
        },
        {
            id: '6',
            name: 'Nothing Phone 2',
            price: '₹44,999',
            originalPrice: '₹49,999',
            discount: '10% off',
            rating: '4.1',
            reviews: '6,543',
            image: 'https://cdn.shopify.com/s/files/1/0586/8024/7537/products/NothingPhone2_White_front_back_1_1000x.png?v=1687862241',
            isFavorite: false,
            delivery: 'Free delivery',
            exchange: 'No cost EMI'
        },
        {
            id: '7',
            name: 'Realme GT 2 Pro',
            price: '₹39,999',
            originalPrice: '₹49,999',
            discount: '20% off',
            rating: '4.0',
            reviews: '4,321',
            image: 'https://image01.realme.net/general/20220104/1641288949999.png',
            isFavorite: true,
            delivery: 'Free delivery',
            exchange: 'Exchange available'
        },
        {
            id: '8',
            name: 'Vivo X90 Pro',
            price: '₹84,999',
            originalPrice: '₹94,999',
            discount: '11% off',
            rating: '4.3',
            reviews: '3,210',
            image: 'https://www.vivo.com/in/vivo%20x90%20pro-img.png',
            isFavorite: false,
            delivery: 'Free delivery',
            exchange: 'No cost EMI'
        }
    ];

    // Render each product item
    const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.productCard}>
            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <TouchableOpacity style={[
                    styles.favoriteButton,
                    item.isFavorite && styles.favoriteButtonActive
                ]}>
                    <Text style={[
                        styles.favoriteIcon,
                        item.isFavorite && styles.favoriteIconActive
                    ]}>
                        {item.isFavorite ? '♥' : '♡'}
                    </Text>
                </TouchableOpacity>

                {/* Discount Badge */}
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                </View>
            </View>

            {/* Product Details */}
            <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                </Text>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingText}>{item.rating} ★</Text>
                    </View>
                    <Text style={styles.reviewsText}>({item.reviews})</Text>
                </View>

                {/* Price */}
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{item.price}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>

                {/* Delivery & Exchange */}
                <View style={styles.extraInfo}>
                    <Text style={styles.deliveryText}>{item.delivery}</Text>
                    <Text style={styles.exchangeText}>{item.exchange}</Text>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Products Grid */}
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.columnWrapper}
            />
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
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: s(8),
        // margin: CARD_MARGIN,
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
        padding: s(12),
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: s(8),
        right: s(8),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: s(28),
        height: s(28),
        borderRadius: s(14),
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteButtonActive: {
        backgroundColor: '#ff3f6c',
    },
    favoriteIcon: {
        fontSize: s(16),
        color: '#757575',
    },
    favoriteIconActive: {
        color: '#fff',
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
        marginBottom: s(6),
        lineHeight: s(18),
        height: s(36),
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
        fontSize: s(16),
        fontWeight: 'bold',
        color: '#000',
        marginRight: s(6),
    },
    originalPrice: {
        fontSize: s(12),
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
})