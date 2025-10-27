import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DARK ,BRAND} from '../../../src/constant/colors'
import { s } from 'react-native-size-matters'

const MyOrder = () => {
  const navigation = useNavigation()
  const Theme = useSelector(state=>state?.auth?.Theme)
  const [cancelModalVisible, setCancelModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '14 July 2025, 12:00 PM',
      deliveryDate: '15 July 2025, 1:00 PM',
      amount: '45',
      status: 'Processing',
      canCancel: true,
      orderId: 'TORTS06759764',
      deliveryAddress: 'Zakko, A. Nood Central Park, Cearnought Place, New Delhi waters, n.d.',
      paymentMethod: 'Pay On Delivery',
      paymentSummary: {
        totalItems: 3,
        deliveryFee: 0,
        discount: 0,
        total: 45
      },
      items: [
        {
          id: 1,
          name: 'Hybrid Tomato (Tomaton)',
          image: 'https://images.unsplash.com/photo-1546470427-e212b7d310a2?w=150&h=150&fit=crop',
          quantity: 3,
          price: 45,
          size: 'Big'
        }
      ]
    },
    {
      id: 2,
      date: '13 June 2025, 11:00am',
      deliveryDate: '14 June 2025, 12:00 PM',
      amount: '45',
      status: 'Delivered',
      canCancel: false,
      orderId: 'TORTS06759765',
      deliveryAddress: '123 Main Street, City, State',
      paymentMethod: 'Credit Card',
      paymentSummary: {
        totalItems: 1,
        deliveryFee: 2,
        discount: 5,
        total: 42
      },
      items: [
        {
          id: 2,
          name: 'Smart Watch',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
          quantity: 1,
          price: 45,
          size: 'Standard'
        }
      ]
    },
    {
      id: 3,
      date: '12 June 2025, 10:00am',
      deliveryDate: '13 June 2025, 11:00 AM',
      amount: '45',
      status: 'Cancelled',
      canCancel: false,
      orderId: 'TORTS06759766',
      deliveryAddress: '456 Oak Avenue, City, State',
      paymentMethod: 'PayPal',
      paymentSummary: {
        totalItems: 1,
        deliveryFee: 3,
        discount: 0,
        total: 48
      },
      items: [
        {
          id: 3,
          name: 'Running Shoes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
          quantity: 1,
          price: 45,
          size: 'US 10'
        }
      ]
    },
    {
      id: 4,
      date: '11 June 2025, 09:00am',
      deliveryDate: '12 June 2025, 10:00 AM',
      amount: '45',
      status: 'Processing',
      canCancel: true,
      orderId: 'TORTS06759767',
      deliveryAddress: '789 Pine Road, City, State',
      paymentMethod: 'Pay On Delivery',
      paymentSummary: {
        totalItems: 1,
        deliveryFee: 0,
        discount: 0,
        total: 45
      },
      items: [
        {
          id: 4,
          name: 'Backpack',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop',
          quantity: 1,
          price: 45,
          size: 'Medium'
        }
      ]
    }
  ])

  const handleOrderPress = (order) => {
    navigation.navigate('OrderSummery', { order })
  }

  const handleProcessingPress = (orderId) => {
    console.log('Processing button pressed for order:', orderId)
  }

  const handleCancelPress = (order) => {
    setSelectedOrder(order)
    setCancelModalVisible(true)
  }

  const confirmCancelOrder = () => {
    if (selectedOrder) {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, status: 'Cancelled', canCancel: false }
            : order
        )
      )
      setCancelModalVisible(false)
      setSelectedOrder(null)
      console.log('Order cancelled:', selectedOrder.id)
    }
  }

  const closeCancelModal = () => {
    setCancelModalVisible(false)
    setSelectedOrder(null)
  }

  const renderStatusSection = (order) => {
    switch (order.status) {
      case 'Processing':
        return (
          <View style={styles.statusSection}>
            <TouchableOpacity 
              style={styles.processingButton}
              onPress={() => handleProcessingPress(order.id)}
            >
              <Text style={styles.processingButtonText}>Processing</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => handleCancelPress(order)}
            >
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        )
      case 'Delivered':
        return (
          <View style={styles.statusSection}>
            <TouchableOpacity 
              style={styles.deliveredButton}
              onPress={() => console.log('Delivered order details:', order.id)}
            >
              <Text style={styles.deliveredButtonText}>Delivered</Text>
            </TouchableOpacity>
          </View>
        )
      case 'Cancelled':
        return (
          <View style={styles.statusSection}>
            <TouchableOpacity 
              style={styles.cancelledButton}
              onPress={() => console.log('Cancelled order details:', order.id)}
            >
              <Text style={styles.cancelledButtonText}>Cancelled</Text>
            </TouchableOpacity>
          </View>
        )
      default:
        return null
    }
  }

  const renderOrderItems = (items) => {
    return items.map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemSize}>{item.size}</Text>
          <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
    ))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.ordersContainer,{backgroundColor : Theme ?DARK.bg:BRAND.bg}]} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={[styles.orderCard, Theme ?  {backgroundColor :DARK.white,borderColor:DARK.border,borderWidth:s(1)} : 
              {backgroundColor:BRAND.white,borderColor:DARK.border,borderWidth:s(1)}]}
            onPress={() => handleOrderPress(order)}
            activeOpacity={0.7}
          >
            <View style={styles.orderHeader}>
              <Text style={[styles.orderDate,{color :Theme ? DARK.gray[500] :BRAND.gray[500]}]}>Placed on {order.date}</Text>
              <Text style={[styles.orderAmount,{color :Theme ? DARK.gray[500] :BRAND.gray[500]}]}>${order.amount}</Text>
            </View>
            
            <View style={styles.itemsContainer}>
              {renderOrderItems(order.items)}
            </View>
            
            {renderStatusSection(order)}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cancel Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={closeCancelModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cancellation Confirmation</Text>
            
            <Text style={styles.modalMessage}>
              Are you sure to cancel this order?
            </Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={closeCancelModal}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmCancelButton}
                onPress={confirmCancelOrder}
              >
                <Text style={styles.confirmCancelButtonText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default MyOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // paddingTop: 10,
  },
  ordersContainer: {
    flex: 1,
    paddingTop:s(10),
    paddingHorizontal: 12,
  },
  orderCard: {
    // backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemsContainer: {
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemSize: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  processingButton: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFA500',
    minWidth: 100,
    alignItems: 'center',
  },
  processingButtonText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  deliveredButton: {
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#28a745',
    minWidth: 100,
    alignItems: 'center',
  },
  deliveredButtonText: {
    color: '#155724',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelledButton: {
    backgroundColor: '#F8D7DA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dc3545',
    minWidth: 100,
    alignItems: 'center',
  },
  cancelledButtonText: {
    color: '#721C24',
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmCancelButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  confirmCancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})