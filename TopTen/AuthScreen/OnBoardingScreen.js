import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import BRAND from '../../src/constant/color'
import { s, vs, ms, mvs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setToken } from '../../store/slices/authSlice'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// Responsive scaling factors based on screen size
const getResponsiveScale = () => {
    if (screenHeight < 600) return 0.8; // Small screens
    if (screenHeight > 800) return 1.2; // Large screens
    return 1; // Normal screens
}

const scaleFactor = getResponsiveScale();

const OnBoardingScreen = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../src/images/Ellipse 4.png')}
                    style={styles.image}
                    resizeMode='stretch'
                />
                <Image
                    source={require('../../src/images/Ellipse 5.png')}
                    style={[
                        styles.ellipse5,
                        {
                            width: s(200 * scaleFactor),
                            height: vs(200 * scaleFactor)
                        }
                    ]}
                    resizeMode='stretch'
                />
                <Image
                    source={require('../../src/images/Onboarding.png')}
                    style={[
                        styles.onboardingImage,
                        {
                            width: s(650 * scaleFactor),
                            height: s(650 * scaleFactor),
                            right: s(-240 * scaleFactor)
                        }
                    ]}
                    resizeMode='contain'
                />
            </View>

            {/* Text Content Section */}
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>{`Delights for every \naisle`}</Text>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        From Top Departmental Stores To The Best
                    </Text>
                    <Text style={styles.description}>
                        Restaurants - Your Favorites Are Ready
                    </Text>
                    <Text style={styles.description}>
                        And Waiting. Place Your Order Now!
                    </Text>
                </View>

                {/* Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={async()=>{
                    // await dispatch(setToken("amaan"))
                    navigation.navigate('Login')}}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.bg || '#ffffff'
    },
    imageContainer: {
        width: "100%",
        height: vs(300),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: "110%",
        height: "100%",
        position: "absolute",
        top: vs(0),
        right: 0
    },
    ellipse5: {
        position: "absolute", 
        top: vs(0), 
        left: s(0),
    },
    onboardingImage: {
        position: "absolute",
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: s(20),
        paddingTop: vs(60),
    },
    heading: {
        fontSize: ms(36, 0.3), // Second parameter for factor
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'left',
        marginBottom: vs(8),
        lineHeight: mvs(40),
    },
    descriptionContainer: {
        marginTop: vs(20),
    },
    description: {
        fontSize: ms(16, 0.3),
        color: '#666',
        textAlign: 'left',
        lineHeight: mvs(22),
        marginBottom: vs(6),
        letterSpacing: ms(0.3),
    },
    button: {
        position: "absolute",
        bottom: vs(20),
        alignSelf: "center",
        backgroundColor: BRAND.primary,
        width: "100%",
        maxWidth: s(400),
        paddingVertical: vs(18),
        borderRadius: ms(12),
        shadowColor: BRAND.primary,
        shadowOffset: {
            width: 0,
            height: vs(4),
        },
        shadowOpacity: 0.3,
        shadowRadius: ms(5),
        elevation: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: ms(18, 0.3),
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: ms(0.5),
    },
})