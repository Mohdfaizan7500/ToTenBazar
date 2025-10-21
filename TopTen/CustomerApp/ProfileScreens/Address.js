import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import { s, vs, ms } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'
import { AddressIcon, CrossIcon, ThreeDotIcon } from '../../../src/SVGicons/icon'
import { useNavigation } from '@react-navigation/native'

const Address = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            title: "Delhi Kirit Nagar",
            address: "1234, Block A, Near Central Park,\nConnaught Place, New Delhi - 110001,\nIndia"
        },
        {
            id: 2,
            title: "Mumbai Bandra",
            address: "5678, Silver Heights, Bandra West,\nNear Bandra Station, Mumbai - 400050,\nIndia"
        },
        {
            id: 3,
            title: "Bangalore Koramangala",
            address: "91011, 4th Block, Koramangala,\nNear Forum Mall, Bangalore - 560034,\nIndia"
        }
    ]);

    const handleThreeDotPress = (address) => {
        setSelectedAddress(address);
        setModalVisible(true);
    };

    const handleEdit = () => {
        setModalVisible(false);
        // Navigate to EditAddress screen with the selected address data
        navigation.navigate('EditAdrees', { 
            addressData: selectedAddress,
            onSave: (updatedAddress) => {
                // Update the address in the list
                setAddresses(prevAddresses =>
                    prevAddresses.map(addr => 
                        addr.id === selectedAddress.id 
                            ? { ...addr, ...updatedAddress }
                            : addr
                    )
                );
            }
        });
    };

    const handleDelete = () => {
        setModalVisible(false);
        setDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (selectedAddress) {
            setAddresses(prevAddresses =>
                prevAddresses.filter(address => address.id !== selectedAddress.id)
            );
            setDeleteModalVisible(false);
            setSelectedAddress(null);
            Alert.alert("Success", "Address deleted successfully");
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
                {/* Map through addresses array */}
                {addresses.map((address) => (
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
                            <Text style={styles.addressTitle}>{address.title}</Text>
                            <Text style={styles.addressText}>{address.address}</Text>
                        </View>
                    </View>
                ))}
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

            {/* Add New Address Button - Fixed at bottom */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditAdrees', { 
                    onSave: (newAddress) => {
                        // Add new address to the list
                        setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
                    }
                })}>
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Address

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
        flexDirection: "row",
        gap: s(10)
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
        alignItems: "center",
        justifyContent: "center",
        borderRadius: s(12),
        backgroundColor: '#F18B4033'
    },
    ThreeDoteView: {
        position: 'absolute',
        right: s(10),
        top: s(10),
        padding: s(10),
        zIndex: 1,
    },
    // Modal Styles
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
    deleteButton: {
        // Additional styles for delete button if needed
    },
    deleteText: {
        color: '#FF3B30',
    },
    divider: {
        height: 1,
        backgroundColor: BRAND.border,
        marginHorizontal: s(10),
    },
    // Delete Modal Styles
    DeletModal: {
        width: "90%",
        height: vs(180),
        backgroundColor: BRAND.white,
        borderRadius: s(20),
        justifyContent: 'space-evenly',
        marginTop: s(20)
    },
    deleteModalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: s(20),
        borderBottomWidth: s(0.5),
        paddingBottom: s(10),
        borderBottomColor: BRAND.muted
    },
    deleteModalTitle: {
        fontSize: s(18),
        fontWeight: '800',
        color: BRAND.text
    },
    closeButton: {
        padding: s(8)
    },
    deleteModalText: {
        fontSize: s(16),
        color: BRAND.text,
        textAlign: 'left',
        fontWeight: "800",
        marginHorizontal: s(20)
    },
    deleteModalButtons: {
        flexDirection: "row",
        marginHorizontal: s(10)
    },
    deletModalButton: {
        backgroundColor: '#D9D9D9',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: s(10),
        paddingVertical: s(8),
        borderRadius: s(12)
    },
    BackButton: {
        fontSize: s(18),
        color: BRAND.text
    }
})