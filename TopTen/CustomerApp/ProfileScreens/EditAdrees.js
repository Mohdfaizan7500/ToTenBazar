import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { s, vs, ms } from 'react-native-size-matters';
import BRAND from '../../../src/constant/color';
import { useDispatch } from 'react-redux';
import { postUserAddress, updateUserAddress } from '../../../store/slices/userSlice';
import { Picker } from '@react-native-picker/picker';

const EditAddress = ({ route, navigation }) => {
    const { addressData, onSave } = route.params || {};

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        gali_no: '',
        floor_no: '',
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const parseAddress = (addressString) => {
        if (!addressString) return {};

        const lines = addressString.split('\n');
        let parsedData = {
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
        };

        if (lines.length > 0) {
            parsedData.address = lines[0].trim();
            const landmarkMatch = lines[0].match(/near\s+([^,]+)/i);
            if (landmarkMatch) {
                parsedData.landmark = landmarkMatch[1].trim();
            }
        }

        if (lines.length > 1) {
            const secondLine = lines[1].trim();
            const cityMatch = secondLine.match(/([A-Za-z\s]+)(?: - \d+)?$/);
            if (cityMatch) {
                parsedData.city = cityMatch[1].trim();
            }
        }

        if (lines.length > 2) {
            const thirdLine = lines[2].trim();
            const pincodeMatch = thirdLine.match(/\b(\d{6})\b/);
            if (pincodeMatch) {
                parsedData.pincode = pincodeMatch[1];
            }
            const stateMatch = thirdLine.match(/^([A-Za-z\s]+)(?:\s+-\s+\d+)?/);
            if (stateMatch) {
                parsedData.state = stateMatch[1].trim();
            }
        }

        return parsedData;
    };

    useEffect(() => {
        if (addressData) {
            const parsedAddress = parseAddress(addressData.address);

            setFormData({
                title: addressData.add_name || '',
                address: parsedAddress.address || addressData.address || '',
                landmark: parsedAddress.landmark || addressData.landmark || '',
                city: parsedAddress.city || addressData.city || '',
                state: parsedAddress.state || addressData.state || '',
                pincode: parsedAddress.pincode || addressData.pincode || '',
                country: 'India',
                gali_no: addressData.gali_no || '',
                floor_no: addressData.floor_no || '',
            });
        }
    }, [addressData]);

    const handleInputChange = (field, value) => {
        if (field === 'country') return;
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateFields = () => {
        let tempErrors = {};
        if (!formData.title.trim()) tempErrors.title = 'Address Title is required';
        if (!formData.address.trim()) tempErrors.address = 'Address is required';
        if (!formData.landmark.trim()) tempErrors.landmark = 'Landmark is required';
        if (!formData.city.trim()) tempErrors.city = 'City is required';
        if (!formData.state.trim()) tempErrors.state = 'State is required';
        if (!formData.pincode.trim()) tempErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) tempErrors.pincode = 'Pincode must be 6 digits';
        if (!formData.gali_no.trim()) tempErrors.gali_no = 'Gali Number is required';
        if (!formData.floor_no.trim()) tempErrors.floor_no = 'Floor Number is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSave = async () => {
        if (validateFields()) {
            let formattedAddress = {
                add_name: formData.title,
                floor_no: formData.floor_no,
                gali_no: formData.gali_no,
                landmark: formData.landmark,
                address: formData.address,
                pincode: formData.pincode,
                state: formData.state,
                city: formData.city,
                country: formData.country,
            };

            try {
                if (addressData && addressData.id) {
                    // Update existing address
                    formattedAddress.id = addressData.id; // Add ID for update
                    const updatedAddress = await dispatch(
                        updateUserAddress({ addressId: formattedAddress.id, addressData: formattedAddress })
                    ).unwrap();

                    console.log("Address updated successfully:", updatedAddress);
                } else {
                    // Save new address
                    const result = await dispatch(postUserAddress(formattedAddress));
                    if (result.type === 'user/postUserAddress/fulfilled') {
                        navigation.goBack();
                    }
                }
                if (onSave) onSave(formData);
            } catch (e) {
                console.error("Failed to save address:", e);
                // Optionally show error alert
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {[
                    { label: 'Address Title', field: 'title', dropdown: true },
                    { label: 'Address', field: 'address', multiline: true },
                    { label: 'Landmark', field: 'landmark' },
                    { label: 'City', field: 'city' },
                    { label: 'State', field: 'state' },
                    { label: 'Pincode', field: 'pincode', keyboardType: 'numeric', maxLength: 6 },
                    { label: 'Gali Number', field: 'gali_no' },
                    { label: 'Floor Number', field: 'floor_no' },
                ].map(({ label, field, multiline, keyboardType, maxLength, dropdown }) => (
                    <View key={field} style={styles.inputContainer}>
                        <Text style={styles.label}>{label}</Text>
                        {dropdown && field === 'title' ? (
                            <View style={[styles.textInput, styles.pickerContainer]}>
                                <Picker
                                    selectedValue={formData.title}
                                    onValueChange={(itemValue) => handleInputChange(field, itemValue)}
                                    mode="dropdown"
                                    style={styles.picker}

                                >
                                        <Picker.Item label="Select Address Title" value=""  />
                                        <Picker.Item label="Home" value="Home" />
                                        <Picker.Item label="Office" value="Office" />
                                        <Picker.Item label="Residence" value="Residence" />
                                        <Picker.Item label="Friend House" value="Friend House" />
                                </Picker>
                            </View>
                        ) : (
                            <TextInput
                                style={styles.textInput}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                placeholderTextColor={BRAND.muted}
                                value={formData[field]}
                                onChangeText={(text) => handleInputChange(field, text)}
                                multiline={multiline}
                                keyboardType={keyboardType}
                                maxLength={maxLength}
                            />
                        )}
                        {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
                    </View>
                ))}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                        style={[styles.textInput, { backgroundColor: '#f0f0f0' }]}
                        placeholder="India"
                        placeholderTextColor={BRAND.muted}
                        value={formData.country}
                        editable={false}
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>
                        {addressData ? 'Update Address' : 'Save Address'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditAddress;

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
        marginBottom: vs(10),
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
    pickerContainer: {
        paddingHorizontal: 0,
        // paddingVertical:60,
        justifyContent: 'center',
        height: vs(40),
        // backgroundColor:"red"
    },
    picker: {
        color: BRAND.text,
        fontSize: s(18),
        height: vs(70),
        width: '100%',
        // backgroundColor:"red"
    },
    errorText: {
        color: 'red',
        marginTop: vs(4),
        fontSize: ms(12),
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
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    saveButtonText: {
        color: BRAND.white,
        fontSize: ms(14),
        fontWeight: '600',
    },
});
