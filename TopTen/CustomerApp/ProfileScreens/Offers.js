import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CupponIcon } from '../../../src/SVGicons/icon'
import BRAND from '../../../src/constant/color'
import { s } from 'react-native-size-matters'

const Offers = () => {
  const offers = [
    {
      id: 1,
      code: 'SAVE15',
      description: 'Unlock 20% OFF on orders above #250!',
      note: '🔥 Limited Time Offer – Don\'t Miss Out!'
    },
    {
      id: 2,
      code: 'SAVE15',
      description: 'Unlock 20% OFF on orders above #250!',
      note: '🔥 Limited Time Offer – Don\'t Miss Out!'
    },
    {
      id: 3,
      code: 'SAVE15',
      description: 'Unlock 20% OFF on orders above #250!',
      note: '🔥 Limited Time Offer – Don\'t Miss Out!'
    },
    {
      id: 4,
      code: '27 x 20 | 15',
      description: 'Unlock 20% OFF on orders above #250!',
      note: '🔥 Limited Time Offer – Don\'t Miss Out!'
    }
  ]

  return (
    <ScrollView style={styles.container}>

      {offers.map((offer) => (
        <View key={offer.id} style={styles.offerCard}>
          <CupponIcon />
          <View style={styles.offerHeader}>
            <Text style={styles.offerCode}>{offer.code}</Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.offerDescription}>{offer.description}</Text>
          <Text style={styles.offerNote}>{offer.note}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

export default Offers

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  offerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND.text,
  },
  applyButton: {
    backgroundColor: BRAND.orange,
    paddingHorizontal: s(25),
    paddingVertical: 8,
    borderRadius: s(7),
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  offerDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  offerNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
})