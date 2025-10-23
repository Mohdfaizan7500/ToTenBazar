import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BRAND from '../../src/constant/color'
import { s, vs, ms } from 'react-native-size-matters'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setToken } from '../../store/slices/authSlice'

const PartnerLogin = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const dispatch = useDispatch();


  const validateForm = () => {
    const newErrors = {}
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number'
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Indian phone number'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    if (field === 'phoneNumber') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10)
      setFormData(prev => ({ ...prev, [field]: numericValue }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleLogin = async () => {
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      if (formData.phoneNumber === '7078254220' && formData.password === '123456') {
        // Alert.alert('Login Successful!', 'Welcome back, Partner!')
        await AsyncStorage.setItem('token', '1235')
        dispatch(setToken('1235'))

      } else {
        Alert.alert('Login Failed', 'Invalid phone number or password.')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const isFormValid = formData.phoneNumber.length === 10 && formData.password.length >= 6

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BRAND.white} barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.backgroundContainer}>
            <Image source={require('../../src/images/Ellipse 4.png')} style={styles.ellipse4} resizeMode="contain" />
            <View style={styles.ellipse5Container}>
              <Image source={require('../../src/images/Ellipse 5.png')} style={styles.ellipse5} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Partner Login</Text>
              <Text style={styles.subtitle}>Sign in to access your partner dashboard</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={[styles.inputWrapper, errors.phoneNumber && styles.inputError]}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your phone number"
                  placeholderTextColor={BRAND.muted}
                  value={formData.phoneNumber}
                  onChangeText={(value) => handleInputChange('phoneNumber', value)}
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!isSubmitting}
                  selectionColor={BRAND.primary}
                />
              </View>
              {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <TextInput
                  style={[styles.textInput, styles.passwordInput]}
                  placeholder="Enter your password"
                  placeholderTextColor={BRAND.muted}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={secureTextEntry}
                  editable={!isSubmitting}
                  selectionColor={BRAND.primary}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={toggleSecureEntry} disabled={isSubmitting}>
                  <Text style={styles.eyeButtonText}>{secureTextEntry ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={[styles.loginButton, (!isFormValid || isSubmitting) && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={!isFormValid || isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.loginButtonText}>Signing In...</Text>
                </View>
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Demo Credentials:</Text>
              <Text style={styles.demoText}>Phone: 7078254220</Text>
              <Text style={styles.demoText}>Password: 123456</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default PartnerLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.white
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundContainer: {
    position: 'relative',
    height: vs(250),
    width: '100%',
    overflow: 'hidden',
  },
  ellipse4: {
    position: 'absolute',
    top: vs(-100),
    right: s(-50),
    width: s(400),
    height: vs(400),
  },
  ellipse5Container: {
    position: 'absolute',
    top: vs(40),
    left: s(20),
    width: s(120),
    height: s(120),
  },
  ellipse5: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: s(24),
    paddingTop: vs(20),
    marginTop: vs(-30),
  },
  header: {
    alignItems: 'center',
    marginBottom: vs(40),
  },
  title: {
    fontSize: ms(32),
    fontWeight: 'bold',
    color: BRAND.text,
    marginBottom: vs(8),
  },
  subtitle: {
    fontSize: ms(16),
    color: BRAND.muted,
    textAlign: 'center',
    lineHeight: ms(22),
  },
  inputGroup: {
    marginBottom: vs(24),
  },
  inputLabel: {
    fontSize: ms(16),
    fontWeight: '600',
    color: BRAND.text,
    marginBottom: vs(8),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: ms(12),
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  inputError: {
    borderColor: BRAND.error,
    backgroundColor: '#FFF5F5',
  },
  countryCode: {
    paddingHorizontal: s(16),
    paddingVertical: vs(14),
    fontSize: ms(16),
    fontWeight: '600',
    color: BRAND.text,
    backgroundColor: '#F0F0F0',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  textInput: {
    flex: 1,
    fontSize: ms(16),
    color: BRAND.text,
    paddingVertical: vs(14),
    paddingHorizontal: s(16),
  },
  passwordInput: {
    paddingRight: s(50),
  },
  eyeButton: {
    position: 'absolute',
    right: s(16),
    padding: vs(4),
  },
  eyeButtonText: {
    fontSize: ms(18),
  },
  errorText: {
    fontSize: ms(12),
    color: BRAND.error,
    marginTop: vs(4),
    marginLeft: s(4),
  },
  loginButton: {
    backgroundColor: BRAND.primary,
    borderRadius: ms(12),
    paddingVertical: vs(16),
    alignItems: 'center',
    marginBottom: vs(30),
    marginTop: vs(10),
    shadowColor: BRAND.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: ms(16),
    fontWeight: '600',
  },
  demoContainer: {
    backgroundColor: '#F8F9FA',
    padding: s(16),
    borderRadius: ms(8),
    borderLeftWidth: 4,
    borderLeftColor: BRAND.primary,
  },
  demoTitle: {
    fontSize: ms(14),
    fontWeight: '600',
    color: BRAND.text,
    marginBottom: vs(4),
  },
  demoText: {
    fontSize: ms(12),
    color: BRAND.muted,
    lineHeight: ms(16),
  },
})