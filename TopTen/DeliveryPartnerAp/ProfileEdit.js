import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { s, vs } from 'react-native-size-matters'
import BRAND from '../../src/constant/color'
import { CameraIcon } from '../../src/SVGicons/icon'
import ImagePicker from "react-native-image-crop-picker";

const ProfileEdit = () => {
  const navigation = useNavigation()
  const [profilepic, setprofilepic] = useState('')

  const [modalVisible, setModalVisible] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: 'albertstevano@gmail.com'
  })

  const handleSave = () => {
    console.log('Saved data:', formData)
    Alert.alert("Success", 'Your profile has been Update')
    navigation.goBack()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCameraPress = () => {
    setModalVisible(true)
  }

  const handleAvatarPress = () => {
    setModalVisible(true)
  }
  const handleCancel = () => {
    setModalVisible(false)
  }
  const handleTakePhoto = () => {
    setModalVisible(false)
    // Alert.alert('Successh', 'Take Photo option selected ')
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      cropperCircleOverlay: true,
      includeBase64: true
    }).then(async (image) => {
      console.log("image:", image.path)
      setprofilepic(image?.path)
    }).catch(error => {
      console.log('Camera error:', error);
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'faild');
      }
    });
  }

  const handleChooseFromGallery = () => {
    setModalVisible(false)

    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      cropperCircleOverlay: true,
      includeBase64: true
    }).then(async (image) => {
      setprofilepic(image?.path)

    }).catch(error => {
      console.log('Gallery error:', error);
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Fails to choose photo from gaillry');
      }
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar backgroundColor={BRAND.white} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image
              source={profilepic ? { uri: profilepic } : require('../../src/images/UserImage.png')}
              style={styles.avatarImage}
              resizeMode='cover'
            />
          </View>
          <TouchableOpacity onPress={handleCameraPress} style={styles.cameraIconContainer}>
            <CameraIcon width={s(14)} height={s(14)} />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Full Name"
            placeholderTextColor={BRAND.muted}
            value={formData.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Phone Number"
            placeholderTextColor={BRAND.muted}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
        </View>


      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

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
    </KeyboardAvoidingView>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: s(16),
    paddingTop: vs(16),
    paddingBottom: vs(16),
  },
  headerTitle: {
    fontSize: s(20),
    fontWeight: '700',
    color: BRAND.text,
    marginBottom: vs(20),
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: vs(20),
  },
  label: {
    fontSize: s(14),
    fontWeight: '600',
    color: BRAND.text,
    marginBottom: vs(6),
  },
  textInput: {
    backgroundColor: BRAND.white,
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: s(10),
    paddingHorizontal: s(14),
    paddingVertical: vs(12),
    fontSize: s(14),
    color: BRAND.text,
  },
  disabledInput: {
    backgroundColor: '#f8f8f8',
    color: BRAND.muted,
  },
  saveButton: {
    width: "94%",
    alignSelf: "center",
    backgroundColor: BRAND.orange,
    borderRadius: s(8),
    paddingVertical: vs(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(10),
    marginBottom: vs(10),
  },
  saveButtonText: {
    color: BRAND.white,
    fontSize: s(16),
    fontWeight: '600',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: vs(20),
    alignSelf: "center"
  },
  avatar: {
    width: s(100),
    height: s(100),
    borderRadius: s(50),
    backgroundColor: BRAND.bg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    borderWidth: s(1.5),
    borderColor: BRAND.primary,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cameraIconContainer: {
    position: "absolute",
    width: s(26),
    height: s(26),
    backgroundColor: BRAND.white,
    borderRadius: s(13),
    right: s(4),
    bottom: s(4),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderColor: BRAND.primary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    backgroundColor: BRAND.white,
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    paddingHorizontal: s(14),
    paddingTop: vs(12),
    paddingBottom: Platform.OS === 'ios' ? vs(20) : vs(12),
  },
  modalTitle: {
    fontSize: s(14),
    fontWeight: '600',
    color: BRAND.text,
    textAlign: 'center',
    marginBottom: vs(12),
  },
  modalButton: {
    paddingVertical: vs(12),
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: s(14),
    color: BRAND.primary,
    fontWeight: '500',
  },
  modalDivider: {
    height: 0.5,
    backgroundColor: BRAND.border,
    width: '100%',
  },
  cancelButton: {
    marginTop: vs(6),
  },
  cancelButtonText: {
    fontSize: s(14),
    color: BRAND.error,
    fontWeight: '600',
  },
})