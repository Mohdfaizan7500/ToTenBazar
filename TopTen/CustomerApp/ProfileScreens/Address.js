import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Modal, StatusBar } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';
import { s, vs, ms } from 'react-native-size-matters';
import { AddressIcon, CheckIcon, CheckIcon2, CrossIcon, PaymentCheckBoxIcon, ThreeDotIcon, UncheckCheckBoxIcon } from '../../../src/SVGicons/icon';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { deleteUserAddress, fetchUserAddress, setSelectedAddress, setSelectedAddress as setSelectedAddressAction } from '../../../store/slices/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DARK, BRAND } from '../../../src/constant/colors';

const Address = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Selected address id from Redux
    const selectedAddressId = useSelector(state => state?.user?.selectedAddress, shallowEqual);
    const Theme = useSelector(state => state?.auth?.Theme, shallowEqual);
    const userAddresses = useSelector(state => state?.user?.address || [], shallowEqual);
    console.log('selected address id:', selectedAddressId)

    // Local state for modals and address for modals
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    // Save the full selected address object locally only when modals open
    const [modalAddress, setModalAddress] = useState(null);

    useEffect(() => {
        dispatch(fetchUserAddress());
    }, [dispatch]);

    useEffect(() => {
        if (!selectedAddressId && userAddresses.length > 0) {
            dispatch(setSelectedAddressAction(userAddresses[0].id));
        }
    }, [selectedAddressId, userAddresses, dispatch]);

    // Handler to open options modal for an address
    const handleThreeDotPress = useCallback((address) => {
        setModalAddress(address); // full address for editing or deleting
        setModalVisible(true);
    }, []);

    // Edit button pressed in modal
    const handleEdit = useCallback(() => {
        setModalVisible(false);
        if (modalAddress) {
            navigation.navigate('EditAdrees', { addressData: modalAddress });
        }
    }, [modalAddress, navigation]);

    // Delete button pressed in modal
    const handleDelete = useCallback(() => {
        setModalVisible(false);
        setDeleteModalVisible(true);
    }, []);

    // Confirm delete address action
    const confirmDelete = useCallback(async () => {
        setDeleteModalVisible(false);
        if (!modalAddress?.id) {
            Alert.alert("Error", "No address selected for deletion.");
            return;
        }
        try {
            await dispatch(deleteUserAddress(modalAddress.id)).unwrap();
            // Clear selection if deleted address was selected
            if (modalAddress.id === selectedAddressId) {
                dispatch(setSelectedAddressAction(null));
            }
            Alert.alert("Success", "Address deleted successfully");
            setModalAddress(null);
        } catch (error) {
            Alert.alert("Error", error || "Failed to delete address. Please try again.");
        }
    }, [dispatch, modalAddress, selectedAddressId]);

    // Close modals handlers
    const closeModal = useCallback(() => {
        setModalVisible(false);
        setModalAddress(null);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setDeleteModalVisible(false);
        setModalAddress(null);
    }, []);

    // Render Address Card
    const renderAddressCard = useCallback((address) => {
        // FIX: Check if selectedAddressId exists before accessing .id
        const isSelected = selectedAddressId ? selectedAddressId.id === address.id : false;
        
        return (
            <TouchableOpacity 
                onPress={() => {
                    console.log("tap:", address)
                    dispatch(setSelectedAddress(address))
                }}
                key={address.id}
                style={[
                    styles.addressCard, 
                    Theme && { backgroundColor: DARK.gray[100], borderColor: DARK.border },
                    isSelected && { borderColor: BRAND.orange }
                ]}
            >
                <TouchableOpacity
                    style={styles.ThreeDoteView}
                    onPress={() => handleThreeDotPress(address)}
                >
                    <ThreeDotIcon stroke={Theme ? DARK.muted : BRAND.text} width={s(18)} height={s(18)} />
                </TouchableOpacity>
                <View style={{ alignItems: "flex-start", height: "100%" }}>
                    <View style={styles.IconContaner}>
                        <AddressIcon width={s(24)} height={s(24)} />
                    </View>
                </View>
                <View style={styles.addressDetails}>
                    <Text style={[styles.addressTitle, Theme && { color: DARK.gray[600] }]}>{address.add_name}</Text>
                    <Text style={[styles.addressText, Theme && { color: DARK.gray[500] }]}>{address.address}</Text>
                    <Text style={[styles.addressText, Theme && { color: DARK.gray[500] }]}>{address.city}, {address.state}</Text>
                    <Text style={[styles.addressText, Theme && { color: DARK.gray[500] }]}>Floor: {address.floor_no}, Gali: {address.gali_no}</Text>
                    {address.landmark ? (
                        <Text style={[styles.addressText, Theme && { color: DARK.gray[500] }]}>Landmark: {address.landmark}</Text>
                    ) : null}
                    <Text style={[styles.addressText, Theme && { color: DARK.gray[500] }]}>Pincode: {address.pincode}</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(setSelectedAddressAction(address.id))}>
                    {isSelected ? <PaymentCheckBoxIcon /> : <UncheckCheckBoxIcon />}
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }, [Theme, selectedAddressId, dispatch, handleThreeDotPress]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Theme ? DARK.bg : BRAND.bg }]}>
            <StatusBar backgroundColor={Theme ? DARK.bg : BRAND.bg} barStyle={Theme ? 'light-content' : "dark-content"} />

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, Theme && { backgroundColor: DARK.bg }]}>
                {userAddresses.length === 0 ? (
                    <Text style={styles.noAddressText}>No addresses available.</Text>
                ) : (
                    userAddresses.map(renderAddressCard)
                )}
            </ScrollView>

            {/* Options Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={closeModal}
                >
                    <View style={[styles.modalContent, Theme && { backgroundColor: DARK.gray[200], borderColor: DARK.muted, borderWidth: s(1) }]}>
                        <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
                            <Text style={[styles.optionText, Theme && { color: DARK.gray[600] }]}>Edit</Text>
                        </TouchableOpacity>
                        <View style={[styles.divider, Theme && { backgroundColor: DARK.muted }]} />
                        <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
                            <Text style={[styles.optionText, styles.deleteText]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={closeDeleteModal}
            >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeDeleteModal}>
                    <View style={[styles.DeletModal, Theme && { backgroundColor: DARK.gray[200], borderColor: DARK.muted, borderWidth: s(1) }]}>
                        <View style={styles.deleteModalHeader}>
                            <Text style={[styles.deleteModalTitle, Theme && { color: DARK.gray[600] }]}>Delete Address</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={closeDeleteModal}>
                                <CrossIcon width={s(14)} height={s(14)} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.deleteModalText, Theme && { color: DARK.gray[600] }]}>Are you sure to delete this address?</Text>
                        <View style={styles.deleteModalButtons}>
                            <TouchableOpacity style={styles.deletModalButton} onPress={closeDeleteModal}>
                                <Text style={styles.BackButton}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.deletModalButton, styles.deleteConfirmButton]} onPress={confirmDelete}>
                                <Text style={[styles.BackButton, styles.deleteConfirmText]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Add New Address Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => {
                    if (userAddresses.length < 5) {
                        navigation.navigate('EditAdrees');
                    } else {
                        Alert.alert('Limit Reached', 'To add new address, please delete an existing one.');
                    }
                }}>
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Address;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: s(16),
        paddingTop: vs(16),
        paddingBottom: vs(90),
    },
    addressCard: {
        backgroundColor: BRAND.white,
        borderRadius: s(10),
        borderWidth: s(1),
        borderColor: BRAND.border,
        padding: s(12),
        marginBottom: vs(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: s(8),
    },
    addressDetails: {
        flex: 1,
    },
    addressTitle: {
        fontSize: ms(15),
        fontWeight: '600',
        color: BRAND.text,
        marginBottom: vs(4),
    },
    addressText: {
        fontSize: ms(12),
        color: BRAND.muted,
        lineHeight: vs(16),
        marginBottom: vs(2),
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: s(16),
        paddingVertical: vs(12),
    },
    addButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: vs(12),
        borderRadius: s(10),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    addButtonText: {
        color: BRAND.white,
        fontSize: ms(14),
        fontWeight: '600',
    },
    IconContaner: {
        width: s(40),
        height: s(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: s(10),
        backgroundColor: '#F18B4033',
    },
    ThreeDoteView: {
        position: 'absolute',
        right: s(8),
        top: s(8),
        padding: s(6),
        zIndex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000046',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: BRAND.white,
        borderRadius: s(10),
        width: '70%',
        maxWidth: s(200),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    optionButton: {
        paddingVertical: vs(12),
        paddingHorizontal: s(16),
        alignItems: 'center',
    },
    optionText: {
        fontSize: ms(14),
        fontWeight: '500',
        color: BRAND.text,
    },
    deleteText: {
        color: '#FF3B30',
    },
    divider: {
        height: 1,
        backgroundColor: BRAND.border,
    },
    DeletModal: {
        width: '85%',
        backgroundColor: BRAND.white,
        borderRadius: s(16),
        marginTop: vs(60),
        padding: s(16),
    },
    deleteModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: vs(12),
    },
    deleteModalTitle: {
        fontSize: ms(16),
        fontWeight: '700',
        color: BRAND.text,
    },
    closeButton: {
        padding: s(4),
    },
    deleteModalText: {
        fontSize: ms(14),
        color: BRAND.text,
        marginBottom: vs(16),
        lineHeight: vs(20),
    },
    deleteModalButtons: {
        flexDirection: 'row',
        gap: s(12),
    },
    deletModalButton: {
        flex: 1,
        paddingVertical: vs(10),
        borderRadius: s(8),
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    deleteConfirmButton: {
        backgroundColor: '#FF3B30',
    },
    deleteConfirmText: {
        color: BRAND.white,
        fontWeight: '600',
    },
    BackButton: {
        fontSize: ms(14),
        color: BRAND.text,
        fontWeight: '500',
    },
    noAddressText: {
        fontSize: ms(14),
        color: BRAND.muted,
        textAlign: 'center',
        marginTop: vs(40),
    },
});