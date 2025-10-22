import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import BRAND from '../../src/constant/color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ClockIcon } from '../../src/SVGicons/icon';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isVerified, setIsVerified] = useState(false)
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)

  const navigation = useNavigation()

  // Refs must be declared at the top level, not conditionally
  const otpRef1 = useRef(null)
  const otpRef2 = useRef(null)
  const otpRef3 = useRef(null)
  const otpRef4 = useRef(null)

  const otpRefs = [otpRef1, otpRef2, otpRef3, otpRef4]

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setCanResend(true)
    }

    return () => clearInterval(interval)
  }, [timer, canResend])

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) { // Only allow single digits
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto focus next input when a digit is entered
      if (value && index < 3) {
        otpRefs[index + 1].current?.focus()
      }

      // Auto focus previous input when backspace is pressed
      if (value === '' && index > 0) {
        otpRefs[index - 1].current?.focus()
      }
    }
  }

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus()
    }
  }

  const handleVerify = () => {
    const enteredOtp = otp.join('')

    if(enteredOtp === '1234'){
      navigation.navigate('CustomerAppNav')
    }
    else{
      navigation.navigate('PartnerAppNav')
    }
    // if (enteredOtp.length === 4) {
    //   setIsVerified(true)
    //   // Handle verification logic here
    //   console.log('OTP Verified:', enteredOtp)
    // }
  }

  const handleResendOtp = () => {
    if (canResend) {
      setOtp(['', '', '', ''])
      setIsVerified(false)
      setTimer(30)
      setCanResend(false)
      // Focus first input after resend
      otpRefs[0].current?.focus()
      // Add resend OTP API call here
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? vs(90) : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with background elements */}
          <View style={styles.vegitableContainer}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.imageBox}>
              <Image
                source={require('../../src/images/vegitable.png')}
                style={styles.vegitableImage}
                resizeMode='contain'
              />
            </View>
          </View>

          {/* Form content */}
          <View style={styles.bottomContent}>
            <Text style={styles.title}>Verify your</Text>
            <Text style={styles.title}>phone number</Text>

            <Text style={styles.subtitle}>
              Enter the verification code we send you on: 708*****80
            </Text>

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              <Text style={styles.inputLabel}>Enter OTP</Text>
              <View style={styles.otpInputsContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={otpRefs[index]}
                    style={[
                      styles.otpInput,
                      digit && styles.otpInputFilled
                    ]}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlignVertical='center'
                    textAlign="center"
                    // placeholder="-"

                    placeholderTextColor={BRAND.muted}
                    selectionColor={BRAND.primary}
                  />
                ))}
              </View>
            </View>

            {/* Resend OTP */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code? </Text>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={!canResend}
              >
                <Text style={[
                  styles.resendLink,
                  !canResend && styles.resendLinkDisabled
                ]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>

            {/* Timer */}
            <View style={styles.timerContainer}>
              <ClockIcon width={s(20)} height={s(20)} />
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.button,
                otp.join('').length !== 4 && styles.buttonDisabled
              ]}
              disabled={otp.join('').length !== 4}
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>
                {isVerified ? 'Verified!' : 'Verify OTP'}
              </Text>
            </TouchableOpacity>

            {/* Back to Sign Up */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Wrong number? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.registerLink}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Extra space for keyboard */}
          <View style={styles.keyboardSpacer} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.bg
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  vegitableContainer: {
    width: "100%",
    height: vs(350),
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: s(600),
    height: vs(600),
    borderRadius: ms(1000),
    backgroundColor: BRAND.primary,
    top: vs(-260),
    right: s(-200),
  },
  circle2: {
    position: 'absolute',
    width: s(200),
    height: vs(200),
    borderRadius: ms(500),
    backgroundColor: '#59bd63',
    top: vs(-100),
    left: s(-50),
  },
  bottomContent: {
    paddingHorizontal: ms(24),
    paddingTop: mvs(20),
    paddingBottom: mvs(10),
  },
  title: {
    fontSize: ms(28),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
  },
  subtitle: {
    fontSize: ms(16),
    textAlign: 'left',
    color: '#666',
    marginTop: mvs(5),
    marginBottom: mvs(30),
    lineHeight: mvs(22),
  },
  otpContainer: {
    marginBottom: mvs(30),
  },
  inputLabel: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: mvs(10),
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mvs(10),
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: ms(8),
    width: s(60),
    height: vs(60),
    fontSize: ms(20),
    fontWeight: '600',
    color: BRAND.text,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    textAlignVertical: 'center', // Add this line for vertical centering
  },
  otpInputFilled: {
    borderColor: BRAND.primary,
    backgroundColor: '#fff',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: mvs(10),
  },
  resendText: {
    fontSize: ms(14),
    color: '#666',
  },
  resendLink: {
    fontSize: ms(14),
    color: BRAND.orange,
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: '#ccc',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(15),
    alignSelf: 'center',
    marginBottom: mvs(20),
  },
  timerText: {
    fontSize: ms(14),
    color: '#666',
    fontWeight: '500',
  },
  button: {
    backgroundColor: BRAND.primary,
    borderRadius: ms(8),
    paddingVertical: mvs(16),
    alignItems: 'center',
    marginBottom: mvs(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: ms(16),
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? mvs(30) : mvs(20),
    paddingVertical: mvs(10),
  },
  registerText: {
    fontSize: ms(14),
    color: '#666',
  },
  registerLink: {
    fontSize: ms(14),
    color: BRAND.primary,
    fontWeight: '600',
  },
  vegitableImage: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    width: s(630),
    height: vs(530),
    position: "absolute",
    top: vs(-100)
  },
  keyboardSpacer: {
    height: Platform.OS === 'ios' ? vs(100) : vs(50),
  },
})