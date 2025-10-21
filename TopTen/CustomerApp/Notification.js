import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { CheckIcon, ClroseIcon2, DiscountIcon, EmailIcon, ProfileIcon2 } from '../../src/SVGicons/icon'
import { s } from 'react-native-size-matters'
import BRAND from '../../src/constant/color'

const Notification = () => {
  const notifications = [
    {
      id: 1,
      time: 'Today',
      title: '30% Special Discount!',
      description: 'Special promotion only valid today',
      type: 'promotion',
      icon: <DiscountIcon />
    },
    {
      id: 2,
      time: 'Today',
      title: 'Your Order Has Been Taken by the Driver',
      description: 'Recently!',
      type: 'order',
      icon: <CheckIcon/>
    },
    {
      id: 3,
      time: 'Today',
      title: 'Your Order Has Been Canceled',
      date: '19Jun2023',
      type: 'order_canceled',
      icon: <ClroseIcon2/>
    },
    {
      id: 4,
      time: 'Yesterday',
      title: '35% Special Discount!',
      description: 'Special promotion only valid today',
      type: 'promotion',
      icon: <EmailIcon width={s(25)} height={s(25)} fill={BRAND.orange} />
    },
    {
      id: 5,
      time: 'Yesterday',
      title: 'Account Setup Successful!!',
      description: 'Special promotion only valid today',
      type: 'account',
      icon: <ProfileIcon2 fill={'#000'}/>
    },
    {
      id: 6,
      time: '2022',
      title: 'Special Offer! 60% Off',
      description: 'Special offer for new account, valid until',
      date: '20 Nov 2022',
      type: 'promotion',
      icon: '🎁'
    }
  ]

  // Sort by time groups: Today -> Yesterday -> 2022
  const sortedNotifications = [...notifications].sort((a, b) => {
    const timeOrder = { 'Today': 1, 'Yesterday': 2, '2022': 3 }
    return timeOrder[a.time] - timeOrder[b.time]
  })

  const groupNotificationsByTime = (notifications) => {
    const grouped = {}
    notifications.forEach(notification => {
      if (!grouped[notification.time]) {
        grouped[notification.time] = []
      }
      grouped[notification.time].push(notification)
    })
    return grouped
  }

  const groupedNotifications = groupNotificationsByTime(sortedNotifications)

  const getIconColor = (type) => {
    const colors = {
      promotion: '#4CAF50',
      order: '#2196F3',
      order_canceled: '#F44336',
      account: '#9C27B0'
    }
    return colors[type] || '#666'
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Object.keys(groupedNotifications).map((timeGroup) => (
          <View key={timeGroup} style={styles.timeGroup}>
            <Text style={styles.timeGroupTitle}>{timeGroup}</Text>
            {groupedNotifications[timeGroup].map((notification) => (
              <View key={notification.id} style={styles.notificationCard}>
                <View style={styles.notificationHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${getIconColor(notification.type)}20` }]}>
                    <Text style={[styles.iconText, { color: getIconColor(notification.type) }]}>
                      {notification.icon}
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {notification.description && (
                      <Text style={styles.notificationDescription}>
                        {notification.description}
                      </Text>
                    )}
                    {notification.date && (
                      <Text style={styles.notificationDate}>
                        {notification.date}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  timeGroup: {
    marginBottom: 25,
  },
  timeGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 5,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
})