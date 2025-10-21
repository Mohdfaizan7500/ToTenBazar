import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'

const EditAddress = ({ route, navigation }) => {
    const { addressData, onSave } = route.params || {};

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: ''
    })

    // Function to parse address string into different fields
    const parseAddress = (addressString) => {
        if (!addressString) return {};
        
        const lines = addressString.split('\n');
        let parsedData = {
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: ''
        };

        if (lines.length > 0) {
            // First line usually contains the main address
            parsedData.address = lines[0].trim();
            
            // Try to extract landmark from address (if present)
            const landmarkMatch = lines[0].match(/near\s+([^,]+)/i);
            if (landmarkMatch) {
                parsedData.landmark = landmarkMatch[1].trim();
            }
        }

        if (lines.length > 1) {
            // Second line might contain area and city
            const secondLine = lines[1].trim();
            const cityMatch = secondLine.match(/([A-Za-z\s]+)(?: - \d+)?$/);
            if (cityMatch) {
                parsedData.city = cityMatch[1].trim();
            }
        }

        if (lines.length > 2) {
            // Third line might contain state and pincode
            const thirdLine = lines[2].trim();
            
            // Extract pincode (6-digit number)
            const pincodeMatch = thirdLine.match(/\b(\d{6})\b/);
            if (pincodeMatch) {
                parsedData.pincode = pincodeMatch[1];
            }
            
            // Extract state (text before pincode)
            const stateMatch = thirdLine.match(/^([A-Za-z\s]+)(?:\s+-\s+\d+)?/);
            if (stateMatch) {
                parsedData.state = stateMatch[1].trim();
            }
        }

        return parsedData;
    }

    useEffect(() => {
        if (addressData) {
            const parsedAddress = parseAddress(addressData.address);
            
            setFormData({
                title: addressData.title || '',
                address: parsedAddress.address || addressData.address || '',
                landmark: parsedAddress.landmark || '',
                city: parsedAddress.city || '',
                state: parsedAddress.state || '',
                pincode: parsedAddress.pincode || ''
            });
        }
    }, [addressData])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = () => {
        console.log('Saved address:', formData)
        
        // Call the onSave callback if provided (for both edit and add new)
        if (onSave) {
            onSave(formData);
        }
        
        // Navigate back
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Title Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address Title</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g., Home, Office"
                        placeholderTextColor={BRAND.muted}
                        value={formData.title}
                        onChangeText={(text) => handleInputChange('title', text)}
                    />
                </View>

                {/* Address Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter full address"
                        placeholderTextColor={BRAND.muted}
                        value={formData.address}
                        onChangeText={(text) => handleInputChange('address', text)}
                        multiline
                    />
                </View>

                {/* Landmark Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Landmark</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter nearby landmark"
                        placeholderTextColor={BRAND.muted}
                        value={formData.landmark}
                        onChangeText={(text) => handleInputChange('landmark', text)}
                    />
                </View>

                {/* City Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter city"
                        placeholderTextColor={BRAND.muted}
                        value={formData.city}
                        onChangeText={(text) => handleInputChange('city', text)}
                    />
                </View>

                {/* State Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter state"
                        placeholderTextColor={BRAND.muted}
                        value={formData.state}
                        onChangeText={(text) => handleInputChange('state', text)}
                    />
                </View>

                {/* Pincode Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter 6-digit pincode"
                        placeholderTextColor={BRAND.muted}
                        value={formData.pincode}
                        onChangeText={(text) => handleInputChange('pincode', text)}
                        keyboardType="numeric"
                        maxLength={6}
                    />
                </View>
            </ScrollView>

            {/* Save Button - Fixed at bottom */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>
                        {addressData ? 'Update Address' : 'Save Address'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: s(15),
        paddingTop: vs(15),
        paddingBottom: vs(80),
    },
    inputContainer: {
        marginBottom: vs(12),
    },
    label: {
        fontSize: ms(14),
        fontWeight: '600',
        color: BRAND.text,
        marginBottom: vs(6),
    },
    textInput: {
        backgroundColor: BRAND.white,
        borderWidth: s(1),
        borderColor: BRAND.border,
        borderRadius: s(8),
        paddingHorizontal: s(12),
        paddingVertical: vs(10),
        fontSize: ms(13),
        color: BRAND.text,
        minHeight: vs(40),
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: BRAND.white,
        paddingHorizontal: s(15),
        paddingVertical: vs(12),
        borderTopWidth: s(1),
        borderTopColor: BRAND.border,
    },
    saveButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: vs(12),
        borderRadius: s(10),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    saveButtonText: {
        color: BRAND.white,
        fontSize: ms(14),
        fontWeight: '600',
    },
})