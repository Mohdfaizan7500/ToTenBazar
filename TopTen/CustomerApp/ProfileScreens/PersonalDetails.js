import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, vs } from 'react-native-size-matters';
import BRAND from '../../../src/constant/color';
import { CameraIcon } from '../../../src/SVGicons/icon';
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from 'react-redux';
import { setProfilepic } from '../../../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserProfile } from '../../../store/slices/authSlice';

const PersonalDetails = () => {
  const navigation = useNavigation();
  const profile = useSelector(state => state?.auth?.profile);
  console.log(profile)
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [profilepic, setprofilepic] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phonenumber: '',
    location: '',
  });
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phonenumber: profile.phone_number || '',
        location: profile.location || '',
      });
      setprofilepic(profile.profile_pic || null);
      setPhoneVerified(profile.phone_verified || false);
      setEmailVerified(profile.email_verified || false);
    }
  }, [profile]);

  const handleSave = () => {
    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Error', error || 'Failed to update profile');
      });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCameraPress = () => setModalVisible(true);
  const handleAvatarPress = () => setModalVisible(true);
  const handleCancel = () => setModalVisible(false);

  const handleTakePhoto = () => {
    setModalVisible(false);
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    }).then(image => {
      dispatch(setProfilepic(image.path));
      AsyncStorage.setItem('userprofilepic', image.path);
      setprofilepic(image.path);
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to take photo');
      }
    });
  };

  const handleChooseFromGallery = () => {
    setModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    }).then(image => {
      dispatch(setProfilepic(image.path));
      AsyncStorage.setItem('userprofilepic', image.path);
      setprofilepic(image.path);
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to choose photo from gallery');
      }
    });
  };

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
              source={profilepic ? { uri: profilepic } : require('../../../src/images/UserImage.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity onPress={handleCameraPress} style={styles.cameraIconContainer}>
            <CameraIcon width={s(14)} height={s(14)} />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your First Name"
            placeholderTextColor={BRAND.muted}
            value={formData.first_name}
            onChangeText={text => handleChange('first_name', text)}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Last Name"
            placeholderTextColor={BRAND.muted}
            value={formData.last_name}
            onChangeText={text => handleChange('last_name', text)}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Phone Number"
            placeholderTextColor={BRAND.muted}
            keyboardType="phone-pad"
            value={formData.phonenumber}
            onChangeText={text => handleChange('phonenumber', text)}
          />
          <Text style={[styles.verificationText, phoneVerified ? styles.verified : styles.notVerified]}>
            {phoneVerified ? 'Phone Verified' : 'Phone Not Verified'}
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Email"
            placeholderTextColor={BRAND.muted}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={[styles.verificationText, emailVerified ? styles.verified : styles.notVerified]}>
            {emailVerified ? 'Email Verified' : 'Email Not Verified'}
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Location"
            placeholderTextColor={BRAND.muted}
            value={formData.location}
            onChangeText={text => handleChange('location', text)}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Profile Photo</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity style={styles.modalButton} onPress={handleChooseFromGallery}>
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
  );
};

export default PersonalDetails;

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
  verificationText: {
    marginTop: vs(6),
    fontSize: s(12),
  },
  verified: {
    color: 'green',
    fontWeight: '600',
  },
  notVerified: {
    color: 'red',
    fontWeight: '600',
  },
  saveButton: {
    width: '94%',
    alignSelf: 'center',
    backgroundColor: BRAND.primary,
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
    alignSelf: 'center',
  },
  avatar: {
    width: s(100),
    height: s(100),
    borderRadius: s(50),
    backgroundColor: BRAND.bg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: s(1.5),
    borderColor: BRAND.primary,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cameraIconContainer: {
    position: 'absolute',
    width: s(26),
    height: s(26),
    backgroundColor: BRAND.white,
    borderRadius: s(13),
    right: s(4),
    bottom: s(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: s(1),
    borderColor: BRAND.primary,
  },
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
});
