import { StyleSheet, Text, View, Animated, StatusBar } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'


const Splash = () => {
    const navigation = useNavigation()
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Simple fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start()

        // Navigate after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('AuthFlow')
        }, 3000)

        return () => clearTimeout(timer)
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