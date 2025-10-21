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
import React, { useState } from 'react'
import BRAND from '../../src/constant/color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { 
  scale as s, 
  verticalScale as vs, 
  moderateScale as ms,
  moderateVerticalScale as mvs 
} from 'react-native-size-matters'

const SignUp = () => {
  const [isAgreed, setIsAgreed] = useState(false)
  const navigation = useNavigation();

  const toggleAgreement = () => {
    setIsAgreed(!isAgreed)
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
            <Text style={styles.title}>Create your new</Text>
            <Text style={styles.title}>account.</Text>

            <Text style={styles.subtitle}>Please sign up to create your account</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={BRAND.muted}
                placeholder="Enter Your Full Name"
                returnKeyType="next"
                blurOnSubmit={false}
              />

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={BRAND.muted}
                placeholder="Enter Your Phone Number"
                keyboardType="phone-pad"
                returnKeyType="done"
              />
            </View>

            {/* Checkbox for terms agreement */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleAgreement}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
                {isAgreed && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.checkboxText}>
                I agree with <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, !isAgreed && styles.buttonDisabled]}
              disabled={!isAgreed}
            >
              <Text style={styles.buttonText}>Get OTP</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerLink}>Login</Text>
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

export default SignUp

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
     height: vs(240),
     overflow: 'hidden',
     backgroundColor: BRAND.bg,
     // zIndex:-1
   },
   circle1: {
     position: 'absolute',
     width: s(500),
     height: s(500),
     borderRadius: s(1000),
     backgroundColor: BRAND.primary,
     top: vs(-260),
     right: s(-150),
     opacity: 0.9,
   },
   circle2: {
     position: 'absolute',
     width: s(120),
     height: s(120),
     borderRadius: s(500),
     backgroundColor: '#9ee5a5ff',
     top: vs(-40),
     left: s(10),
     opacity: 0.8,
   },
  bottomContent: {
    paddingHorizontal: ms(24),
    // paddingBottom: mvs(10),
    backgroundColor:BRAND.bg
  },
  title: {
    fontSize: ms(26),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
  },
  subtitle: {
    fontSize: ms(16),
    textAlign: 'left',
    color: '#666',
    marginBottom: mvs(20),
  },
  inputContainer: {
    marginBottom: mvs(20),
  },
  inputLabel: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: vs(8),
    marginTop: vs(5),
  },
  textInput: {
    borderWidth: 1,
    color: BRAND.text,
    borderColor: '#ddd',
    borderRadius: ms(8),
    paddingHorizontal: ms(16),
    paddingVertical: Platform.OS === 'ios' ? vs(14) : vs(12),
    fontSize: ms(16),
    backgroundColor: '#f9f9f9',
  },
  // Checkbox styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vs(12),
    paddingHorizontal: ms(4),
  },
  checkbox: {
    width: ms(20),
    height: vs(20),
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: ms(4),
    marginRight: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginTop: vs(2),
  },
  checkboxChecked: {
    borderColor: BRAND.primary,
    backgroundColor: BRAND.primary,
  },
  checkboxInner: {
    width: ms(10),
    height: vs(10),
    backgroundColor: '#fff',
    borderRadius: ms(2),
  },
  checkboxText: {
    flex: 1,
    fontSize: ms(14),
    color: '#666',
    lineHeight: mvs(20),
  },
  linkText: {
    color: BRAND.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: BRAND.primary,
    borderRadius: ms(8),
    paddingVertical: vs(16),
    alignItems: 'center',
    marginBottom: vs(24),
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
    // marginBottom: Platform.OS === 'ios' ? vs(30) : vs(20),
    // paddingVertical: vs(10),
  },
  registerText: {
    fontSize: ms(14),
    color: '#666',
  },
  registerLink: {
    fontSize: ms(14),
    color: BRAND.orange,
    fontWeight: '600',
  },
  vegitableImage: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    width: s(380),
    height: vs(380),
    position: "absolute",
    top: vs(-60),
    right:s(-90)
  },
  keyboardSpacer: {
    height: Platform.OS === 'ios' ? vs(100) : vs(20),
  },
})