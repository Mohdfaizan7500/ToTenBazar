import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, Modal, Platform, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { CameraIcon, HeplIcon, MyOrderIcon, ProfileIcon, ProfileIcon2, RightArrowICon, SettingIcon, SignOutIcon } from '../../../src/SVGicons/icon'
import { s, vs, ms } from 'react-native-size-matters'
import BRAND from '../../../src/constant/color'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
  const iconWidth = s(16)
  const iconHeight = s(16)
  const [modalVisible, setModalVisible] = useState(false)

  const navigation = useNavigation();

  // Updated navigation function for nested navigator
  const navigateHandle = (screenName) => {
    navigation.navigate(screenName);
  }

  const SignOuthandle = () => {
    Alert.alert(
      'Sign Out',
      'Do you want to Sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            console.log('User signed out');
            // Add your sign out logic here
          },
        },
      ]
    );
  }

  const handleAvatarPress = () => {
    setModalVisible(true)
  }

  const handleCameraPress = () => {
    setModalVisible(true)
  }

  const handleTakePhoto = () => {
    setModalVisible(false)
    Alert.alert('Success', 'Take Photo option selected')
    // Add your camera logic here
  }

  const handleChooseFromGallery = () => {
    setModalVisible(false)
    Alert.alert('Success', 'Choose from Gallery option selected')
    // Add your gallery picker logic here
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BRAND.white} />
      {/* Avatar with Camera Icon */}
      <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image
            source={require('../../../src/images/UserImage.png')}
            style={styles.avatarImage}
            resizeMode='cover'
          />
        </View>
        <TouchableOpacity onPress={handleCameraPress} style={styles.cameraIconContainer}>
          <CameraIcon width={s(16)} height={s(16)} />
        </TouchableOpacity>
      </TouchableOpacity>

      <Text style={styles.name}>Albert Stevenson Bydzhist</Text>
      <Text style={styles.email}>AlbertStevenson@gmail.com</Text>

      <View style={styles.menuCard}>
        <MenuItem
          title="Personal Details"
          icon={<ProfileIcon2 width={iconWidth} height={iconHeight} />}
          onPress={() => navigateHandle('PersonalDetails')}
        />
        <View style={styles.divider} />
        <MenuItem
          title="Addresses"
          icon={<SettingIcon width={iconWidth} height={iconHeight} />}
          onPress={() => navigateHandle('Address')}
        />
        <View style={styles.divider} />
        <MenuItem
          title="My Orders"
          icon={<MyOrderIcon width={iconWidth} height={iconHeight} />}
          onPress={() => navigateHandle('MyOrder')}
        />
        <View style={styles.divider} />
        <MenuItem
          title="Help Center"
          icon={<HeplIcon width={iconWidth} height={iconHeight} />}
          onPress={() => navigateHandle('HelpCenter')}
        />
      </View>

      <TouchableOpacity style={styles.SignOutButton} onPress={SignOuthandle}>
        <SignOutIcon width={s(16)} height={s(16)} />
        <Text style={styles.signUptext}>Sign Out</Text>
      </TouchableOpacity>

      {/* Image Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Profile Photo</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleChooseFromGallery}
            >
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const MenuItem = ({ title, icon, onPress, isSignOut = false }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <View style={styles.iconBOx}>
        {icon}
      </View>
      <Text style={[
        styles.menuText,
        isSignOut && styles.signOutText
      ]}>{title}</Text>
    </View>
    {!isSignOut && <RightArrowICon width={s(14)} height={s(14)} />}
  </TouchableOpacity>
)

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.white,
    alignItems: "center",
    paddingTop: vs(15)
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: vs(8),
  },
  avatar: {
    width: s(120),
    height: s(120),
    borderRadius: s(60),
    backgroundColor: BRAND.bg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    borderWidth: s(2),
    borderColor: BRAND.primary,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cameraIconContainer: {
    position: "absolute",
    width: s(30),
    height: s(30),
    backgroundColor: BRAND.white,
    borderRadius: s(15),
    right: s(5),
    bottom: s(5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1.5),
    borderColor: BRAND.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: s(16),
    fontWeight: '600',
    marginBottom: vs(2),
    color: BRAND.text,
  },
  email: {
    fontSize: s(12),
    color: BRAND.muted,
  },
  menuCard: {
    marginTop: vs(12),
    width: "90%",
    backgroundColor: BRAND.white,
    borderRadius: s(10),
    borderWidth: s(1),
    borderColor: BRAND.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(12),
    paddingHorizontal: s(14),
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10)
  },
  divider: {
    height: s(1),
    backgroundColor: BRAND.border,
    marginHorizontal: s(10),
  },
  menuText: {
    fontSize: s(14),
    color: BRAND.text,
    fontWeight: '500',
  },
  signOutText: {
    color: BRAND.error,
    fontWeight: '600',
  },
  SignOutButton: {
    borderWidth: s(1),
    borderColor: BRAND.border,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    gap: s(6),
    paddingVertical: vs(10),
    marginTop: vs(12),
    borderRadius: s(100),
    flexDirection: "row",
    backgroundColor: BRAND.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  signUptext: {
    color: BRAND.error,
    fontSize: s(14),
    fontWeight: '500',
  },
  iconBOx: {
    padding: s(5),
    borderRadius: s(5),
    backgroundColor: BRAND.primary + '10',
    justifyContent: "center",
    alignItems: "center",
    width: s(32),
    height: s(32),
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    backgroundColor: BRAND.white,
    borderTopLeftRadius: s(12),
    borderTopRightRadius: s(12),
    paddingHorizontal: s(16),
    paddingTop: vs(16),
    paddingBottom: Platform.OS === 'ios' ? vs(25) : vs(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  modalTitle: {
    fontSize: s(16),
    fontWeight: '600',
    color: BRAND.text,
    textAlign: 'center',
    marginBottom: vs(16),
  },
  modalButton: {
    paddingVertical: vs(14),
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: s(15),
    color: BRAND.primary,
    fontWeight: '500',
  },
  modalDivider: {
    height: s(1),
    backgroundColor: BRAND.border,
    width: '100%',
  },
  cancelButton: {
    marginTop: vs(8),
  },
  cancelButtonText: {
    fontSize: s(15),
    color: BRAND.error,
    fontWeight: '600',
  },
})