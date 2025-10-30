import { StyleSheet, Text, View, Animated, StatusBar } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, refreshToken, updateUserProfile } from '../store/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = () => {
    const navigation = useNavigation()
    const fadeAnim = useRef(new Animated.Value(0)).current
    const dispatch = useDispatch()
    const timerRef = useRef(null)

    const checkAuthAndNavigate = async () => {
        try {
            console.log('Splash screen - Checking authentication')
            const accessToken = await AsyncStorage.getItem('accessToken')

            if (!accessToken) {
                console.log('No access token found, navigating to AuthFlow')
                navigation.replace('AuthFlow')
                return
            }

            // Try to fetch user profile with current token
            const result = await dispatch(fetchUserProfile(accessToken))

            if (fetchUserProfile.fulfilled.match(result)) {
                console.log('User profile fetched successfully, navigating to AuthFlow')
                // User is authenticated, navigate to main app
                timerRef.current = setTimeout(() => {
                    navigation.replace('AuthFlow')
                }, 2000)
            } else {
                console.log('User profile fetch failed, trying refresh token')
                // Try to refresh token
                const refreshResult = await dispatch(refreshToken())

                if (refreshToken.fulfilled.match(refreshResult)) {
                    console.log('Token refreshed successfully, fetching user profile again')
                    // Token refreshed, try to fetch profile again with new token
                    const newAccessToken = await AsyncStorage.getItem('accessToken')
                    const profileResult = await dispatch(fetchUserProfile(newAccessToken))

                    if (fetchUserProfile.fulfilled.match(profileResult)) {
                        console.log('User profile fetched after token refresh, navigating to AuthFlow')
                        timerRef.current = setTimeout(() => {
                            navigation.replace('AuthFlow')
                        }, 2000)
                    } else {
                        console.log('Still failed after token refresh, navigating to AuthFlow')
                        navigation.replace('AuthFlow')
                    }
                } else {
                    console.log('Token refresh failed, navigating to AuthFlow')
                    navigation.replace('AuthFlow')
                }
            }
        } catch (error) {
            console.error('Auth check error:', error)
            navigation.replace('AuthFlow')
        }
    }


    useEffect(() => {
        // Simple fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start()

        checkAuthAndNavigate()

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [navigation, fadeAnim])

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <Text style={styles.title}>Top Ten Bazar</Text>
                <Text style={styles.subtitle}>Welcome</Text>
            </Animated.View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46b652',
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#E5E7EB',
    }
})