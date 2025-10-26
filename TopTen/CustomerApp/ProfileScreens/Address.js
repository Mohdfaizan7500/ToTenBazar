import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { s, vs, ms } from 'react-native-size-matters';
import BRAND from '../../../src/constant/color';
import { AddressIcon, CrossIcon, ThreeDotIcon } from '../../../src/SVGicons/icon';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAddress, fetchUserAddress } from '../../../store/slices/userSlice';

const Address = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Select user address data from Redux
    const userAddresses = useSelector(state => state?.user?.address || []);
    // console.log("user address:", userAddresses);

    useEffect(() => {
        dispatch(fetchUserAddress());
    }, [dispatch]);

    const handleThreeDotPress = (address) => {
        setSelectedAddress(address);
        setModalVisible(true);
    };

    const handleEdit = () => {
        setModalVisible(false);
        navigation.navigate('EditAdrees', {
            addressData: selectedAddress,
            onSave: (updatedAddress) => {
                // You can implement update logic here or dispatch an update action
            },
        });
    };

    const handleDelete = () => {
        setModalVisible(false);
        // console.log('selected Address:',selectedAddress)
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        setDeleteModalVisible(false);

        if (!selectedAddress || !selectedAddress.id) {
            Alert.alert("Error", "No address selected for deletion.");
            return;
        }

        try {
            console.log('Deleting address ID:', selectedAddress.id);
            await dispatch(deleteUserAddress(selectedAddress.id)).unwrap();
            setSelectedAddress(null);
            Alert.alert("Success", "Address deleted successfully");
        } catch (error) {
            console.error("Delete address failed:", error);
            Alert.alert("Error", error || "Failed to delete address. Please try again.");
        }
    };


    const closeModal = () => {
        setModalVisible(false);
        setSelectedAddress(null);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedAddress(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {userAddresses.length === 0 ? (
                    <Text style={styles.noAddressText}>No addresses available.</Text>
                ) : (
                    userAddresses.map((address) => (
                        <View key={address.id} style={styles.addressCard}>
                            <TouchableOpacity
                                style={styles.ThreeDoteView}
                                onPress={() => handleThreeDotPress(address)}
                            >
                                <ThreeDotIcon />
                            </TouchableOpacity>
                            <View style={styles.IconContaner}>
                                <AddressIcon width={s(30)} height={s(30)} />
                            </View>
                            <View style={styles.addressDetails}>
                                <Text style={styles.addressTitle}>{address.add_name}</Text>
                                <Text style={styles.addressText}>{address.address}</Text>
                                <Text style={styles.addressText}>{address.city}, {address.state}</Text>
                                <Text style={styles.addressText}>Floor: {address.floor_no}, Gali: {address.gali_no}</Text>
                                <Text style={styles.addressText}>Landmark: {address.landmark}</Text>
                                <Text style={styles.addressText}>Pincode: {address.pincode}</Text>
                                <Text style={styles.addressText}>Country: {address.country}</Text>
                            </View>
                        </View>
                    ))
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
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={handleEdit}
                        >
                            <Text style={styles.optionText}>Edit</Text>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <TouchableOpacity
                            style={[styles.optionButton, styles.deleteButton]}
                            onPress={handleDelete}
                        >
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
                <TouchableOpacity
                    style={[styles.modalOverlay, { justifyContent: 'flex-start' }]}
                    activeOpacity={1}
                    onPress={closeDeleteModal}
                >
                    <View style={styles.DeletModal}>
                        <View style={styles.deleteModalHeader}>
                            <Text style={styles.deleteModalTitle}>Delete Confirmation</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeDeleteModal}
                            >
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.deleteModalText}>
                            Are you sure to delete this address?
                        </Text>

                        <View style={styles.deleteModalButtons}>
                            <TouchableOpacity
                                style={styles.deletModalButton}
                                onPress={closeDeleteModal}
                            >
                                <Text style={styles.BackButton}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.deletModalButton, { backgroundColor: '#FF0000' }]}
                                onPress={confirmDelete}
                            >
                                <Text style={[styles.BackButton, { color: BRAND.white }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Add New Address Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditAdrees', {
                    onSave: (newAddress) => {
                        // You can add new address logic here
                    }
                })}>
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Address;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: s(20),
        paddingTop: vs(20),
        paddingBottom: vs(100),
    },
    addressCard: {
        backgroundColor: BRAND.white,
        borderRadius: s(12),
        borderWidth: s(1),
        borderColor: BRAND.border,
        padding: s(16),
        marginBottom: vs(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        flexDirection: 'row',
        gap: s(10),
    },
    addressDetails: {
        flex: 1,
    },
    addressTitle: {
        fontSize: ms(18),
        fontWeight: '600',
        color: BRAND.text,
        marginBottom: vs(8),
    },
    addressText: {
        fontSize: ms(14),
        color: BRAND.muted,
        lineHeight: vs(20),
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: BRAND.white,
        paddingHorizontal: s(20),
        paddingVertical: vs(16),
        borderTopColor: BRAND.border,
    },
    addButton: {
        backgroundColor: BRAND.primary,
        paddingVertical: vs(14),
        borderRadius: s(12),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    addButtonText: {
        color: BRAND.white,
        fontSize: ms(16),
        fontWeight: '600',
    },
    IconContaner: {
        width: s(50),
        height: s(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: s(12),
        backgroundColor: '#F18B4033',
    },
    ThreeDoteView: {
        position: 'absolute',
        right: s(10),
        top: s(10),
        padding: s(10),
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
        borderRadius: s(12),
        padding: s(0),
        width: '80%',
        maxWidth: s(250),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    optionButton: {
        paddingVertical: vs(16),
        paddingHorizontal: s(20),
        alignItems: 'center',
    },
    optionText: {
        fontSize: ms(16),
        fontWeight: '500',
        color: BRAND.text,
    },
    deleteButton: {},
    deleteText: {
        color: '#FF3B30',
    },
    divider: {
        height: 1,
        backgroundColor: BRAND.border,
        marginHorizontal: s(10),
    },
    DeletModal: {
        width: '90%',
        height: vs(180),
        backgroundColor: BRAND.white,
        borderRadius: s(20),
        justifyContent: 'space-evenly',
        marginTop: s(20),
    },
    deleteModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: s(20),
        borderBottomWidth: s(0.5),
        paddingBottom: s(10),
        borderBottomColor: BRAND.muted,
    },
    deleteModalTitle: {
        fontSize: s(18),
        fontWeight: '800',
        color: BRAND.text,
    },
    closeButton: {
        padding: s(8),
    },
    deleteModalText: {
        fontSize: s(16),
        color: BRAND.text,
        textAlign: 'left',
        fontWeight: '800',
        marginHorizontal: s(20),
    },
    deleteModalButtons: {
        flexDirection: 'row',
        marginHorizontal: s(10),
    },
    deletModalButton: {
        backgroundColor: '#D9D9D9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: s(10),
        paddingVertical: s(8),
        borderRadius: s(12),
    },
    BackButton: {
        fontSize: s(18),
        color: BRAND.text,
    },
    noAddressText: {
        fontSize: ms(16),
        color: BRAND.muted,
        textAlign: 'center',
        marginTop: vs(40),
    },
});
