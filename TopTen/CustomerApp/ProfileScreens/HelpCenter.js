import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'
import { EmailIcon, LocationIcon, PhoneIcon } from '../../../src/SVGicons/icon'

const HelpCenter = () => {
    const handleEmailPress = () => {
        Linking.openURL('mailto:Toptambaran.hajpabasi@gmail.com')
    }

    const handlePhonePress = () => {
        Linking.openURL('tel:+918130005208')
    }

    const handleSocialMediaPress = (platform) => {
        const socialLinks = {
            'Instagram': 'https://instagram.com/yourusername',
            'Facebook': 'https://facebook.com/yourusername',
            'Twitter': 'https://twitter.com/yourusername',
            'LinkedIn': 'https://linkedin.com/in/yourusername'
        }
        if (socialLinks[platform]) {
            Linking.openURL(socialLinks[platform])
        }
    }

    const socialMediaItems = [
        {
            name: 'Instagram',
            icon: require('../../../src/images/insta.png'),
            onPress: () => handleSocialMediaPress('Instagram')
        },
        {
            name: 'Facebook',
            icon: require('../../../src/images/facebook.png'),
            onPress: () => handleSocialMediaPress('Facebook')
        },
        {
            name: 'Twitter',
            icon: require('../../../src/images/twitter.png'),
            onPress: () => handleSocialMediaPress('Twitter')
        },
        {
            name: 'LinkedIn',
            icon: require('../../../src/images/linkedin.png'),
            onPress: () => handleSocialMediaPress('LinkedIn')
        }
    ]

    const supportItems = [
        {
            type: 'phone',
            text: '+91 8130005208',
            onPress: handlePhonePress,
            icon: <PhoneIcon width={s(16)} height={s(16)} />
        },
        {
            type: 'email',
            text: 'Toptambaran.hajpabasi@gmail.com',
            onPress: handleEmailPress,
            icon: <EmailIcon width={s(16)} height={s(16)} />
        },
        {
            type: 'address',
            text: '9612 gaf no 12 main Jogotpur road\nnear Sachdeno convent school\nNew Delhi 110084',
            icon: <LocationIcon width={s(16)} height={s(16)} />
        }
    ]

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Social Media Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Social Media</Text>
                {socialMediaItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={item.icon}
                                style={styles.socialIcon}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Customer Support Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Customer Support</Text>
                {supportItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={item.onPress}
                        disabled={!item.onPress}
                    >
                        <View style={styles.iconContainer}>
                            {item.icon}
                        </View>
                        <Text style={styles.itemText}>{item.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

export default HelpCenter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.bg,
        paddingHorizontal: s(12),
        paddingTop: vs(12),
    },
    section: {
        marginBottom: vs(16),
    },
    sectionTitle: {
        fontSize: ms(15),
        fontWeight: '600',
        color: BRAND.text,
        marginBottom: vs(8),
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: s(20),
        paddingVertical: vs(8),
        paddingHorizontal: s(10),
        backgroundColor: BRAND.white,
        borderRadius: s(8),
        marginBottom: vs(6),
    },
    itemText: {
        fontSize: ms(14),
        fontWeight:"600",
        color: BRAND.text,
        lineHeight: vs(16),
        flex: 1,
    },
    iconContainer: {
        width: s(36),
        height: s(36),
        borderRadius: s(6),
        backgroundColor: '#EFEFEF',
        justifyContent: "center",
        alignItems: "center",
    },
    socialIcon: {
        width: s(20),
        height: s(20),
    }
})