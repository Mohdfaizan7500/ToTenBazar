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
  ScrollView
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import BRAND from '../../src/constant/color';
import { SafeAreaView } from 'react-native-safe-area-context'
import {  s, vs, ms } from 'react-native-size-matters'

const Login = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
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
            bounces={false}
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
              <Text style={styles.title}>Login to your</Text>
              <Text style={styles.title}>account.</Text>

              <Text style={styles.subtitle}>Please sign in to your account</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={BRAND.muted}
                  placeholder="Enter Your Phone Number"
                  maxLength={10}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OTPScreen')}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Get OTP</Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.registerLink}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Extra space for keyboard */}
            <View style={styles.keyboardSpacer} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Login

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
    height: vs(330),
    overflow: 'hidden',
    backgroundColor: BRAND.bg,
    // zIndex:-1
  },
  circle1: {
    position: 'absolute',
    width: s(550),
    height: s(550),
    borderRadius: s(1000),
    backgroundColor: BRAND.primary,
    top: vs(-200),
    right: s(-200),
    opacity: 0.9,
  },
  circle2: {
    position: 'absolute',
    width: s(150),
    height: s(150),
    borderRadius: s(500),
    backgroundColor: '#9ee5a5ff',
    top: vs(-40),
    left: s(-10),
    opacity: 0.8,
  },
  bottomContent: {
    paddingHorizontal: s(24),
    // paddingTop: vs(30),
    // paddingBottom: vs(10),
    backgroundColor: BRAND.bg,
  },
  title: {
    fontSize: ms(28),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    lineHeight: ms(34),
  },
  subtitle: {
    fontSize: ms(16),
    textAlign: 'left',
    color: '#666',
    marginTop: vs(16),
    // marginBottom: vs(20),
    lineHeight: ms(22),
  },
  inputContainer: {
    marginBottom: vs(20),
  },
  inputLabel: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: vs(8),
    marginTop: vs(16),
  },
  textInput: {
    borderWidth: 1,
    color: BRAND.text,
    borderColor: '#ddd',
    borderRadius: s(8),
    paddingHorizontal: s(16),
    paddingVertical: Platform.OS === 'ios' ? vs(14) : vs(12),
    fontSize: ms(16),
    backgroundColor: '#f9f9f9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        // elevation: 2,
      },
    }),
  },
  button: {
    backgroundColor: BRAND.primary,
    borderRadius: s(8),
    paddingVertical: vs(16),
    alignItems: 'center',
    marginBottom: vs(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: BRAND.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
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
    paddingVertical: vs(10),
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
    width: s(480),
    height: vs(480),
    position: "absolute",
    top: vs(-45),
    right:s(-140),
  },
  keyboardSpacer: {
    height: Platform.OS === 'ios' ? vs(100) : vs(50),
  },
})