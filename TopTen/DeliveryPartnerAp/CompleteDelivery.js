import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BRAND from '../../src/constant/color'
import { Delivered } from '../../src/SVGicons/icon'
import { ms, s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const CompleteDelivery = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../src/images/background.png')}
                style={{ flex: 1 }}
                resizeMode='contain'
            >
                <View style={styles.SubContainer}>
                    <View style={{ justifyContent:"center",alignItems:"center" }}>
                        <Delivered width={s(180)} height={s(180)} />
                        {/* <View style={{backgroundColor:"blue",width:s(250), height:s(250),position:"absolute",borderRadius:s(100)}}>
                            <FastImage source={require('../../src/images/confirm2.gif')}
                                style={{ width: '100%', height: '100%' ,backgroundColor:"red"}}
                                resizeMode='contain'
                            />
                        </View> */}
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.title}>Order Delivered</Text>
                        <Text style={styles.subTitle}>{`You’ve successfully delivered the order.\n Thank you for your great work!`}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.replace('PartnerMain')}>
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default CompleteDelivery

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.white,
    },
    SubContainer: {
        flex: 1,
        alignItems: "center",
        // justifyContent:"center",
        paddingTop: vs(120),
        gap: vs(30)
    },
    title: {
        fontSize: s(25),
        fontWeight: '800',
        color: BRAND.text
    },
    subTitle: {
        fontSize: s(14),
        fontWeight: '500',
        color: BRAND.muted,
        textAlign: "center",
        marginTop: vs(10)
    },
    buttonText: {
        fontSize: ms(16),
        fontWeight: '600',
        color: BRAND.white,
    },
    button: {
        width: "90%",
        backgroundColor: BRAND.orange,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: s(15),
        alignSelf: "center",
        paddingVertical: s(15),
        borderRadius: s(10)


    }
})