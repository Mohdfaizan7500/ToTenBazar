import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Image, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BRAND from '../../../src/constant/color'
import { s } from 'react-native-size-matters'
import { NotificationIcon, PendinDIcon, RightArrowICon, SearchIcon, TotalDIcon } from '../../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    // Static data for deliveries

    const navigation = useNavigation();
    const deliveryData = {
        testDeliveries: 56,
        pendingDeliveries: 12,
        assignedOrders: [
            {
                id: 'U1',
                orderNumber: 'NOVEMBER7%4',
                customerName: 'John Smith',
                address: '123 Main Street, Apt 4B',
                faculty: 'Seoul National University',
                additionalInfo: 'ISR, Seoul, Korea: current task. como.gut?took, two such – HONU, each',
                status: 'pending'
            },
            {
                id: 'U2',
                orderNumber: 'NOVEMBER8%2',
                customerName: 'Sarah Johnson',
                address: '456 Oak Avenue, Floor 2',
                faculty: 'Yonsei University',
                additionalInfo: 'Building C, Room 301 - Ring bell twice',
                status: 'pending'
            },
            {
                id: 'U3',
                orderNumber: 'NOVEMBER9%1',
                customerName: 'Mike Chen',
                address: '789 Park Lane, Unit 5C',
                faculty: 'Korea University',
                additionalInfo: 'Call before arrival - Gate 3',
                status: 'pending'
            },
            {
                id: 'U4',
                orderNumber: 'NOVEMBER10%3',
                customerName: 'Emma Davis',
                address: '321 River Road, Suite 2A',
                faculty: 'Hongik University',
                additionalInfo: 'Leave at security desk if not home',
                status: 'pending'
            },
            {
                id: 'U5',
                orderNumber: 'NOVEMBER11%5',
                customerName: 'Alex Rodriguez',
                address: '654 Hill Street, Apt 7D',
                faculty: 'Sungkyunkwan University',
                additionalInfo: 'No elevator - 3rd floor walkup',
                status: 'pending'
            }
        ]
    }

    const handleStartDelivery = (orderId) => {
        console.log(`Starting delivery for order ${orderId}`)
    }

    const renderOrderCard = (order) => (
        <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order {order.id}</Text>
                <TouchableOpacity style={styles.statusBadge}>
                    <RightArrowICon />
                </TouchableOpacity>
            </View>

            <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.address}>{order.address}</Text>
            <Text style={styles.faculty}>{order.faculty}</Text>

            {order.additionalInfo && (
                <Text style={styles.additionalInfo}>{order.additionalInfo}</Text>
            )}

            <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleStartDelivery(order.id)}
            >
                <Text style={styles.startButtonText}>Start Delivery</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={BRAND.orange} barStyle="light-content" />

            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Image source={require('../../../src/images/user.png')}
                                style={styles.avatarImage}
                                resizeMode='contain'
                            />
                        </View>
                        <View>
                            <Text style={styles.welcomeText}>Welcome</Text>
                            <Text style={styles.userName}>Kamlesh</Text>
                        </View>
                    </View>
                    <NotificationIcon />
                </View>
                <View style={styles.searchContainer}>
                    <SearchIcon width={s(18)} height={s(18)} stroke={BRAND.muted} />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={BRAND.muted}
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* Content Section */}
            <ScrollView style={styles.scrollView}>
                {/* Delivery Stats Section */}
                <View style={styles.deliveryContainer}>
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <TotalDIcon />
                        </View>
                        <Text style={styles.totalText}>Total Deliveries</Text>
                        <Text style={styles.qty}>{deliveryData.testDeliveries}</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <PendinDIcon />
                        </View>
                        <Text style={styles.totalText}>Pending Deliveries</Text>
                        <Text style={styles.qty}>{deliveryData.pendingDeliveries}</Text>
                    </View>
                </View>

                {/* Assigned Orders Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Assigned Orders</Text>
                        <TouchableOpacity style={styles.seeAllButton} onPress={()=>navigation.navigate('AssignOrders')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {deliveryData.assignedOrders.map(renderOrderCard)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        justifyContent: "space-between",
        backgroundColor: BRAND.orange,
        paddingHorizontal: s(15),
        paddingTop: s(8),
        paddingBottom: s(20),
        borderBottomLeftRadius: s(30),
        borderBottomRightRadius: s(30),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: s(6),
        elevation: 6,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: s(12)
    },
    avatar: {
        width: s(35),
        height: s(35),
        borderRadius: s(8),
        overflow: "hidden",
        backgroundColor: BRAND.white
    },
    avatarImage: {
        width: "100%",
        height: "100%"
    },
    welcomeText: {
        fontSize: s(14),
        fontWeight: '400',
        color: BRAND.white
    },
    userName: {
        fontSize: s(18),
        color: BRAND.white,
        fontWeight: '700'
    },
    searchContainer: {
        width: "100%",
        backgroundColor: BRAND.white,
        paddingVertical: s(0),
        borderRadius: s(100),
        paddingHorizontal: s(10),
        marginTop: s(8),
        flexDirection: "row",
        alignItems: "center"
    },
    searchInput: {
        fontSize: s(13),
        color: BRAND.text,
        flex: 1,
        paddingStart: s(12)
    },
    scrollView: {
        flex: 1,
        marginTop: 0,
    },
    deliveryContainer: {
        marginTop: s(8),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: s(15)
    },
    card: {
        backgroundColor: BRAND.white,
        width: Dimensions.get('window').width / 2 - s(20),
        height: s(110),
        borderRadius: s(10),
        padding: s(12),
        borderWidth: s(1),
        borderColor: BRAND.border,
        gap: s(4)
    },
    iconContainer: {
        width: s(40),
        height: s(40),
        borderRadius: s(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4CAD7333"
    },
    totalText: {
        fontSize: s(11),
        fontWeight: '800',
        color: BRAND.text,
    },
    qty: {
        fontSize: s(16),
        fontWeight: '800',
        color: BRAND.orange
    },
    section: {
        padding: s(15),
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: s(8)
    },
    sectionTitle: {
        fontSize: s(16),
        fontWeight: 'bold',
        color: '#333',
    },
    seeAllButton: {
        padding: s(4)
    },
    seeAllText: {
        color: BRAND.orange,
        fontSize: s(14)
    },
    orderCard: {
        backgroundColor: '#ffffff',
        padding: s(12),
        borderRadius: s(10),
        marginBottom: s(8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: s(2),
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: s(6),
    },
    orderId: {
        fontSize: s(14),
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        backgroundColor: BRAND.white,
        borderWidth: s(1),
        width: s(26),
        height: s(26),
        justifyContent: "center",
        alignItems: "center",
        borderColor: BRAND.border,
        borderRadius: s(26),
    },
    orderNumber: {
        fontSize: s(12),
        color: '#666',
        marginBottom: s(3),
    },
    customerName: {
        fontSize: s(14),
        fontWeight: '600',
        color: '#333',
        marginBottom: s(3),
    },
    address: {
        fontSize: s(12),
        color: '#555',
        marginBottom: s(3),
    },
    faculty: {
        fontSize: s(11),
        color: '#777',
        marginBottom: s(6),
        fontStyle: 'italic',
    },
    additionalInfo: {
        fontSize: s(10),
        color: '#888',
        fontStyle: 'italic',
        marginBottom: s(8),
        backgroundColor: '#f9f9f9',
        padding: s(6),
        borderRadius: s(4),
    },
    startButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: s(8),
        paddingHorizontal: s(16),
        borderRadius: s(6),
        alignItems: 'center',
    },
    startButtonText: {
        color: '#fff',
        fontSize: s(13),
        fontWeight: 'bold',
    },
})