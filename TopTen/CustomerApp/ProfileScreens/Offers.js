import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CupponIcon } from '../../../src/SVGicons/icon'
import { s, vs, ms } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { BRAND, DARK } from '../../../src/constant/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const Offers = () => {
  const Theme = useSelector(state => state.auth.Theme)
  const colors = Theme ? DARK : BRAND

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
        {offers.map((offer) => (
          <View key={offer.id} style={[styles.offerCard, { 
            backgroundColor: colors.white,
            borderColor: colors.border 
          }]}>
            <CupponIcon />
            <View style={styles.offerHeader}>
              <Text style={[styles.offerCode, { color: colors.text }]}>{offer.code}</Text>
              <TouchableOpacity style={[styles.applyButton, { backgroundColor: colors.orange }]}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.offerDescription, { color: colors.text }]}>{offer.description}</Text>
            <Text style={[styles.offerNote, { color: colors.muted }]}>{offer.note}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Offers

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: s(12)
  },
  offerCard: {
    borderRadius: s(8),
    padding: s(12),
    marginBottom: vs(12),
    borderWidth: s(0.5),
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(6)
  },
  offerCode: {
    fontSize: ms(14),
    fontWeight: 'bold'
  },
  applyButton: {
    paddingHorizontal: s(16),
    paddingVertical: vs(6),
    borderRadius: s(5)
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: ms(12)
  },
  offerDescription: {
    fontSize: ms(12),
    marginBottom: vs(2)
  },
  offerNote: {
    fontSize: ms(10),
    fontStyle: 'italic'
  }
})