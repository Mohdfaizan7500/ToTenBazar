import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BRAND from '../../src/constant/color'
import { s, vs } from 'react-native-size-matters'
import { ScrollView } from 'react-native-gesture-handler'
import { RightArrowICon } from '../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'

const MyOrder = () => {
    // All hooks must be called at the top level, unconditionally
    const [activeFilter, setActiveFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('newest') // 'newest' or 'oldest'
    const navigation = useNavigation() // This must be called unconditionally

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
                status: 'pending',
                date: '2024-01-15',
                time: '14:30'
            },
            {
                id: 'U2',
                orderNumber: 'NOVEMBER8%2',
                customerName: 'Sarah Johnson',
                address: '456 Oak Avenue, Floor 2',
                faculty: 'Yonsei University',
                additionalInfo: 'Building C, Room 301 - Ring bell twice',
                status: 'pending',
                date: '2024-01-14',
                time: '09:15'
            },
            {
                id: 'U3',
                orderNumber: 'NOVEMBER9%1',
                customerName: 'Mike Chen',
                address: '789 Park Lane, Unit 5C',
                faculty: 'Korea University',
                additionalInfo: 'Call before arrival - Gate 3',
                status: 'completed',
                date: '2024-01-13',
                time: '16:45'
            },
            {
                id: 'U4',
                orderNumber: 'NOVEMBER10%3',
                customerName: 'Emma Davis',
                address: '321 River Road, Suite 2A',
                faculty: 'Hongik University',
                additionalInfo: 'Leave at security desk if not home',
                status: 'pending',
                date: '2024-01-16',
                time: '11:20'
            },
            {
                id: 'U5',
                orderNumber: 'NOVEMBER11%5',
                customerName: 'Alex Rodriguez',
                address: '654 Hill Street, Apt 7D',
                faculty: 'Sungkyunkwan University',
                additionalInfo: 'No elevator - 3rd floor walkup',
                status: 'completed',
                date: '2024-01-12',
                time: '13:10'
            },
            {
                id: 'U6',
                orderNumber: 'NOVEMBER12%6',
                customerName: 'Lisa Wang',
                address: '987 Pine Street, Apt 3A',
                faculty: 'Hanyang University',
                additionalInfo: 'Delivery before 6 PM',
                status: 'pending',
                date: '2024-01-17',
                time: '10:00'
            }
        ]
    }

    const handleStartDelivery = (order) => {
        console.log(`Starting delivery for order ${order.id}`)
        
        // Navigate to DeliveredOrder screen and pass the order data
        navigation.navigate('StartDelivered', { 
            order: order
        })
    }

    const handleComplete = (order)=>{
        navigation.navigate('DeliverdOreder',{order})
    }

    const handleFilterPress = (filter) => {
        if (filter === 'sort') {
            setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')
            setActiveFilter('sort')
        } else {
            setActiveFilter(filter)
        }
    }

    // Format date to display
    const formatDate = (dateString, timeString) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return `${date.toLocaleDateString('en-US', options)} • ${timeString}`;
    }

    // Filter and sort orders
    const filteredAndSortedOrders = deliveryData.assignedOrders
        .filter(order => {
            if (activeFilter === 'all' || activeFilter === 'sort') return true
            return order.status === activeFilter
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);

            if (activeFilter === 'sort') {
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            }
            return dateB - dateA;
        });

    const renderOrderCard = (order) => (
        <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderId}>Order {order.id}</Text>
                    <Text style={styles.orderDate}>
                        {formatDate(order.date, order.time)}
                    </Text>
                </View>
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
                style={[
                    styles.startButton,
                    order.status === 'completed' && styles.completedButton
                ]}
                onPress={() => order.status === 'completed' ? handleComplete(order) : handleStartDelivery(order)}
                
            >
                <Text style={[
                    styles.startButtonText,
                    order.status === 'completed' && styles.completedButtonText
                ]}>
                    {order.status === 'completed' ? 'Completed' : 'Start Delivery'}
                </Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            {/* Filter Buttons Container */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScrollContent}
                >
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            activeFilter === 'sort' && styles.activeFilterButton
                        ]}
                        onPress={() => handleFilterPress('sort')}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            activeFilter === 'sort' && styles.activeFilterButtonText
                        ]}>
                            Sort {sortOrder === 'newest' ? '↓' : '↑'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            activeFilter === 'all' && styles.activeFilterButton
                        ]}
                        onPress={() => handleFilterPress('all')}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            activeFilter === 'all' && styles.activeFilterButtonText
                        ]}>
                            All
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            activeFilter === 'pending' && styles.activeFilterButton
                        ]}
                        onPress={() => handleFilterPress('pending')}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            activeFilter === 'pending' && styles.activeFilterButtonText
                        ]}>
                            To Deliver
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            activeFilter === 'completed' && styles.activeFilterButton
                        ]}
                        onPress={() => handleFilterPress('completed')}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            activeFilter === 'completed' && styles.activeFilterButtonText
                        ]}>
                            Completed
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Orders List */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    {activeFilter === 'sort' && (
                        <Text style={styles.sortIndicator}>
                            Sorted by date ({sortOrder === 'newest' ? 'Newest First' : 'Oldest First'})
                        </Text>
                    )}
                    {filteredAndSortedOrders.map(renderOrderCard)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.bg
    },
    filterContainer: {
        width: "100%",
        height: vs(50),
        backgroundColor: BRAND.white,
        borderBottomWidth: 1,
        borderBottomColor: BRAND.border,
    },
    filterScrollContent: {
        paddingHorizontal: s(15),
        alignItems: 'center',
        gap: s(10),
    },
    filterButton: {
        paddingHorizontal: s(20),
        paddingVertical: s(8),
        borderRadius: s(20),
        backgroundColor: BRAND.bg,
        borderWidth: 1,
        borderColor: BRAND.border,
        minWidth: s(80),
        alignItems: 'center',
    },
    activeFilterButton: {
        backgroundColor: BRAND.orange,
        borderColor: BRAND.orange,
    },
    filterButtonText: {
        fontSize: s(12),
        fontWeight: '600',
        color: BRAND.text,
    },
    activeFilterButtonText: {
        color: BRAND.white,
    },
    scrollView: {
        flex: 1,
        marginTop: 0,
    },
    section: {
        padding: s(15),
    },
    sortIndicator: {
        fontSize: s(12),
        color: BRAND.muted,
        textAlign: 'center',
        marginBottom: s(10),
        fontStyle: 'italic',
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
        alignItems: 'flex-start',
        marginBottom: s(6),
    },
    orderId: {
        fontSize: s(14),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: s(2),
    },
    orderDate: {
        fontSize: s(10),
        color: BRAND.muted,
        fontWeight: '500',
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
    completedButton: {
        backgroundColor: '#EB2227',
    },
    startButtonText: {
        color: BRAND.white,
        fontSize: s(13),
        fontWeight: 'bold',
    },
    completedButtonText: {
        color: BRAND.white,
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
})