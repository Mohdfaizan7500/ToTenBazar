import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import BRAND from '../../src/constant/color';
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs, ms } from 'react-native-size-matters'
import { useSelector } from 'react-redux';

const Login = () => {
  const navigation = useNavigation()
  const token = useSelector(state => state.auth.token)
  const phoneInputRef = useRef(null)

  console.log("token on login screen:", token)

  const [formData, setFormData] = useState({
    phoneNumber: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Validation rules
  const validationRules = {
    phoneNumber: {
      required: true,
      minLength: 10,
      maxLength: 10,
      pattern: /^[6-9]\d{9}$/,
      message: {
        required: 'Phone number is required',
        minLength: 'Phone number must be 10 digits',
        maxLength: 'Phone number must be 10 digits',
        pattern: 'Please enter a valid Indian phone number'
      }
    }
  }

  // Validate single field
  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return ''

    if (rules.required && !value.trim()) {
      return rules.message.required
    }

    if (rules.minLength && value.length < rules.minLength) {
      return rules.message.minLength
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message.maxLength
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message.pattern
    }

    return ''
  }

  // Validate entire form
  const validateForm = () => {
    const newErrors = {}

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleInputChange = (name, value) => {
    // For phone number, only allow numbers and limit to 10 digits
    if (name === 'phoneNumber') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10)
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true)
  }

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false)
    // Validate field on blur
    const phoneError = validateField('phoneNumber', formData.phoneNumber)
    if (phoneError) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: phoneError
      }))
    }
  }

  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `${phone.slice(0, 3)} ${phone.slice(3)}`
    return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`
  }

  // Handle Get OTP
  const handleGetOTP = async () => {
    Keyboard.dismiss()

    if (!validateForm()) {
      // Scroll to first error field
      phoneInputRef.current?.focus()
      return
    }


    setIsSubmitting(true)
    if (formData.phoneNumber === '7078254220') {
      Alert.alert("Partner", "This number is for partner app.")
      navigation.navigate('PartnerLogin')
      setFormData('')
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      console.log('Phone number submitted:', formData.phoneNumber)

      // Success - Navigate to OTP screen
      navigation.navigate('OTPScreen', {
        phoneNumber: formData.phoneNumber,
        maskedPhone: `XXXXXX${formData.phoneNumber.slice(6)}`
      })

      // Optional: Show success message
      Alert.alert(
        'OTP Sent Successfully!',
        `We've sent a verification code to +91 ${formatPhoneNumber(formData.phoneNumber)}`,
        [
          {
            text: 'OK',
            style: 'default',
            onPress: () => console.log('OK Pressed')
          }
        ]
      )

    } catch (error) {
      console.error('Error sending OTP:', error)
      Alert.alert(
        'Error',
        'Failed to send OTP. Please check your connection and try again.',
        [{ text: 'Try Again' }]
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle form submission on "Done" keyboard button
  const handleSubmitEditing = () => {
    handleGetOTP()
  }

  // Check if form is valid
  const isFormValid = formData.phoneNumber.length === 10 &&
    /^[6-9]\d{9}$/.test(formData.phoneNumber)

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? vs(20) : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Header with background elements */}
            <View style={styles.headerContainer}>
              <View style={styles.backgroundCircles}>
                <View style={styles.circle1} />
                <View style={styles.circle2} />
              </View>

              <View style={styles.imageContainer}>
                <Image
                  source={require('../../src/images/vegitable.png')}
                  style={styles.headerImage}
                  resizeMode='contain'
                />
              </View>

              {/* Welcome Text */}
              {/* <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Welcome Back!</Text>
                <Text style={styles.welcomeSubtitle}>
                  Sign in to continue your journey with us
                </Text>
              </View> */}
            </View>

            {/* Form content */}
            <View style={styles.formContainer}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Login to your</Text>
                <Text style={styles.formTitle}>account</Text>
                <Text style={styles.formSubtitle}>
                  Please sign in to your account
                </Text>
              </View>

              {/* Phone Input */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionLabel}>Phone Number</Text>

                <View style={[
                  styles.inputWrapper,
                  isFocused && styles.inputFocused,
                  errors.phoneNumber && styles.inputError
                ]}>
                  <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                    <View style={styles.countryCodeSeparator} />
                  </View>

                  <TextInput
                    ref={phoneInputRef}
                    style={styles.phoneInput}
                    placeholder="Enter your phone number"
                    placeholderTextColor={BRAND.muted}
                    value={formatPhoneNumber(formData.phoneNumber)}
                    onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    maxLength={12} // 10 digits + 2 spaces
                    onSubmitEditing={handleSubmitEditing}
                    editable={!isSubmitting}
                    selectionColor={BRAND.primary}
                  />

                  {/* Clear button */}
                  {formData.phoneNumber.length > 0 && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => handleInputChange('phoneNumber', '')}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Error message */}
                {errors.phoneNumber ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>⚠️ {errors.phoneNumber}</Text>
                  </View>
                ) : (
                  <Text style={styles.helperText}>
                    Enter your 10-digit mobile number
                  </Text>
                )}
              </View>

              {/* Get OTP Button */}
              <TouchableOpacity
                style={[
                  styles.otpButton,
                  (!isFormValid || isSubmitting) && styles.otpButtonDisabled
                ]}
                onPress={handleGetOTP}
                activeOpacity={0.8}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.otpButtonTextLoading}>Sending OTP...</Text>
                  </View>
                ) : (
                  <Text style={styles.otpButtonText}>Get OTP</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => !isSubmitting && navigation.navigate('SignUp')}
                  activeOpacity={0.7}
                  disabled={isSubmitting}
                >
                  <Text style={[
                    styles.registerLink,
                    isSubmitting && styles.registerLinkDisabled
                  ]}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Terms and Privacy */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>{' '}
                  and acknowledge our{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
            </View>

            {/* Extra space for keyboard */}
            <View style={styles.keyboardSpacer} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.bg,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    height: vs(380),
    backgroundColor: BRAND.bg,
    overflow: 'hidden',
  },
  backgroundCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    width: s(600),
    height: s(600),
    borderRadius: s(300),
    backgroundColor: BRAND.primary,
    top: vs(-250),
    right: s(-200),
    opacity: 0.9,
  },
  circle2: {
    position: 'absolute',
    width: s(200),
    height: s(200),
    borderRadius: s(100),
    backgroundColor: '#9ee5a5',
    top: vs(-50),
    left: s(-30),
    opacity: 0.8,
  },
  imageContainer: {
    position: 'absolute',
    width: s(450),
    height: vs(450),
    top: vs(-30),
    right: s(-120),
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  welcomeContainer: {
    position: 'absolute',
    bottom: vs(40),
    left: s(24),
    right: s(24),
  },
  welcomeTitle: {
    fontSize: ms(32),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: vs(8),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcomeSubtitle: {
    fontSize: ms(16),
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: ms(22),
  },
  formContainer: {
    flex: 1,
    backgroundColor: BRAND.bg,
    borderTopLeftRadius: ms(24),
    borderTopRightRadius: ms(24),
    marginTop: vs(-50),
    paddingHorizontal: s(24),
    // paddingTop: vs(32),
    // paddingBottom: vs(20),
  },
  formHeader: {
    marginBottom: vs(32),
  },
  formTitle: {
    fontSize: ms(28),
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: ms(34),
  },
  formSubtitle: {
    fontSize: ms(16),
    color: BRAND.muted,
    marginTop: vs(8),
    lineHeight: ms(22),
  },
  inputSection: {
    marginBottom: vs(24),
  },
  sectionLabel: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#000000',
    marginBottom: vs(12),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: ms(12),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        // elevation: 2,
      },
    }),
  },
  inputFocused: {
    borderColor: BRAND.primary,
    backgroundColor: '#FAFFFB',
  },
  inputError: {
    borderColor: BRAND.error,
    backgroundColor: '#FFF5F5',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
    backgroundColor: '#F8F9FA',
    height: '100%',
  },
  countryCode: {
    fontSize: ms(16),
    fontWeight: '600',
    color: BRAND.text,
  },
  countryCodeSeparator: {
    width: 1,
    height: '60%',
    backgroundColor: '#E5E5E5',
    marginLeft: s(12),
  },
  phoneInput: {
    flex: 1,
    fontSize: ms(16),
    fontWeight: '500',
    color: BRAND.text,
    paddingVertical: Platform.OS === 'ios' ? vs(16) : vs(14),
    paddingHorizontal: s(12),
    backgroundColor: 'transparent',
  },
  clearButton: {
    paddingHorizontal: s(12),
    paddingVertical: vs(8),
  },
  clearButtonText: {
    fontSize: ms(16),
    color: BRAND.muted,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(8),
    paddingHorizontal: s(4),
  },
  errorText: {
    fontSize: ms(13),
    color: BRAND.error,
    fontWeight: '500',
  },
  helperText: {
    fontSize: ms(13),
    color: BRAND.muted,
    marginTop: vs(8),
    paddingHorizontal: s(4),
  },
  otpButton: {
    backgroundColor: BRAND.primary,
    borderRadius: ms(12),
    paddingVertical: vs(18),
    alignItems: 'center',
    marginBottom: vs(24),
    ...Platform.select({
      ios: {
        shadowColor: BRAND.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        // elevation: 4,
      },
    }),
  },
  otpButtonDisabled: {
    backgroundColor: '#CCCCCC',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        // elevation: 0,
      },
    }),
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpButtonText: {
    color: '#FFFFFF',
    fontSize: ms(16),
    fontWeight: '600',
  },
  otpButtonTextLoading: {
    color: '#FFFFFF',
    fontSize: ms(16),
    fontWeight: '600',
    marginLeft: vs(8),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    paddingHorizontal: s(16),
    fontSize: ms(14),
    color: BRAND.muted,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vs(24),
  },
  registerText: {
    fontSize: ms(14),
    color: BRAND.muted,
  },
  registerLink: {
    fontSize: ms(14),
    color: BRAND.orange,
    fontWeight: '600',
  },
  registerLinkDisabled: {
    color: '#CCCCCC',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: s(20),
  },
  termsText: {
    fontSize: ms(12),
    color: BRAND.muted,
    textAlign: 'center',
    lineHeight: ms(16),
  },
  termsLink: {
    color: BRAND.primary,
    fontWeight: '500',
  },
  keyboardSpacer: {
    height: Platform.OS === 'ios' ? vs(100) : vs(50),
  },
})