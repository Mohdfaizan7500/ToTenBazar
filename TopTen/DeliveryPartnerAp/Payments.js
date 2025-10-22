import React, { useRef, useState, useEffect } from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import { CashIcon, MobileIcon, RightArrowICon, SlideArrow } from '../../src/SVGicons/icon'
import { StyleSheet, Text, View, Image, Animated, PanResponder } from 'react-native'
import BRAND from '../../src/constant/color'
import { useNavigation } from '@react-navigation/native'

const Payments = () => {
  const navigation = useNavigation();

  const paymentMethods = [
    { id: 'QR', label: 'By QR', icon: <MobileIcon width={s(25)} height={s(25)} /> },
    { id: 'Cash', label: 'By Cash', icon: <CashIcon width={s(25)} height={s(25)} /> },
  ]
  const pan = useRef(new Animated.Value(0)).current;
    const [isSlided, setIsSlided] = useState(false);
    const [buttonColor, setButtonColor] = useState(BRAND.primary);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                const buttonWidth = s(343);
                const maxSlide = buttonWidth - s(60);

                if (gestureState.dx >= 0 && gestureState.dx <= maxSlide) {
                    pan.setValue(gestureState.dx);

                    // Change button color based on slide progress
                    const progress = gestureState.dx / maxSlide;
                    if (progress > 0.3) {
                        setButtonColor('#FF4444');
                    } else {
                        setButtonColor(BRAND.primary);
                    }
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                const buttonWidth = s(343);
                const maxSlide = buttonWidth - s(60);
                const threshold = maxSlide * 0.8;

                if (gestureState.dx >= threshold) {
                    // Slide completed
                    Animated.timing(pan, {
                        toValue: maxSlide,
                        duration: 200,
                        useNativeDriver: false,
                    }).start(() => {
                        setIsSlided(true);
                        setButtonColor('#FF4444');
                        navigation.replace('CompleteDelivery');

                        
                    });
                } else {
                    // Slide not completed - reset to start
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start(() => {
                        setButtonColor(BRAND.primary);
                    });
                }
            },
        })
    ).current;




  return (
    <View style={styles.container}>
      <View style={styles.methodsContainer}>
        {paymentMethods.map((method) => (
          <View
            key={method.id}
            style={styles.methodButton}
          >
            <View style={styles.methodContent}>
              <View style={styles.iconContainer}>
                {method.icon}
              </View>
              <Text style={styles.methodText}>
                {method.label}
              </Text>
            </View>
            <View style={styles.arrowBox}>
              <RightArrowICon width={s(12)} height={s(12)} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Image
          source={require('../../src/images/QRCode.png')}
          style={styles.imageSize}
          resizeMode='contain'
        />
      </View>

      <View style={[styles.button, { backgroundColor: buttonColor }]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: pan }]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <SlideArrow stroke={BRAND.primary} width={s(16)} height={s(16)} />
        </Animated.View>
        <Text style={styles.buttonText}>
          Deliverd
        </Text>
      </View>


    </View>
  )
}

export default Payments

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: s(20),
    backgroundColor: BRAND.white,
    justifyContent: "space-between"
  },
  methodsContainer: {
    backgroundColor: BRAND.white,
    borderRadius: s(12),
  },
  methodButton: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: s(14),
    paddingVertical: s(8),
    borderRadius: s(8),
    marginBottom: s(12),
    borderWidth: s(1),
    borderColor: BRAND.border,
    backgroundColor: '#fafafa',
  },
  methodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10)
  },
  methodText: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#333',
  },
  summary: {
    width: '90%',
    height: "50%",
    alignSelf: "center",
    borderWidth: s(1),
    borderColor: BRAND.border,
    padding: s(16),
    backgroundColor: BRAND.white,
    borderRadius: s(12),
    alignItems: 'center',
  },
  iconContainer: {
    width: s(38),
    height: s(38),
    backgroundColor: "#4CAD7333",
    borderRadius: s(10),
    justifyContent: "center",
    alignItems: "center"
  },
  arrowBox: {
    width: s(30),
    height: s(30),
    borderWidth: s(1),
    borderColor: BRAND.border,
    borderRadius: s(50),
    justifyContent: "center",
    alignItems: "center",
  },
  imageSize: {
    width: "100%",
    height: "100%"
  },
  button: {
          // position: 'absolute',
          // bottom: vs(10),
          // left: s(16),
          // right: s(16),
          backgroundColor: BRAND.primary,
          paddingVertical: vs(14),
          borderRadius: s(12),
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
      },
      buttonText: {
          fontSize: ms(14),
          fontWeight: '600',
          color: BRAND.white,
      },
      circle: {
          width: s(40),
          height: s(40),
          backgroundColor: BRAND.white,
          borderRadius: s(20),
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          left: s(8),
          zIndex: 1,
          shadowColor: '#000',
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
      }

})