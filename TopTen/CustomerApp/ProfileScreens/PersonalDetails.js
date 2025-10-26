import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,
  StatusBar, Image, Modal, Alert, KeyboardAvoidingView, Platform,
  Animated, ActivityIndicator, PermissionsAndroid
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { s, vs } from 'react-native-size-matters';
import BRAND from '../../../src/constant/color';
import { CameraIcon } from '../../../src/SVGicons/icon';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set_profile_pic, updateUserProfile, uploadFileToS3 } from '../../../store/slices/authSlice';

const PersonalDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const profile = useSelector(state => state.auth.profile);
  const profileKey = useSelector(state => state.auth.profileKey);
  const profile_pic = useSelector(state => state.auth.profile_pic);
  const isLoading = useSelector(state => state.auth.loading);
  console.log('profile key :', profileKey)

  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phonenumber: '',
    location: '',
  });
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (profile) {
      const initialData = {
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phonenumber: profile.phone_number || '',
        location: profile.location || '',
      };
      setFormData(initialData);
      setPhoneVerified(profile.phone_verified || false);
      setEmailVerified(profile.email_verified || false);
    }
  }, [profile]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setHasChanges(false);
        setErrors({});
      };
    }, [])
  );

  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      // For Android 13+ (API level 33+)
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your photos to choose profile pictures',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // For older Android versions
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to choose photos',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Storage permission error:', error);
      return false;
    }
  };

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission Required',
          message: 'This app needs access to your camera to take photos',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  };

  // Check if permissions are granted
  const checkPermissions = async (fromCamera) => {
    if (Platform.OS === 'ios') return true;

    if (fromCamera) {
      const hasCameraPermission = await requestCameraPermission();
      if (!hasCameraPermission) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos. Please enable it in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'android') {
                  PermissionsAndroid.openSettings();
                }
              }
            }
          ]
        );
        return false;
      }
    } else {
      const hasStoragePermission = await requestStoragePermission();
      if (!hasStoragePermission) {
        Alert.alert(
          'Permission Required',
          'Storage permission is required to choose photos from gallery. Please enable it in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'android') {
                  PermissionsAndroid.openSettings();
                }
              }
            }
          ]
        );
        return false;
      }
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name?.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name?.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const saveProfilePicStorage = async (value) => {
    try {
      if (!value) {
        await AsyncStorage.removeItem('profile_pic');
      } else {
        // Ensure we store the clean URL without double encoding
        const cleanUrl = value.replace(/%253A/g, ':').replace(/%252F/g, '/');
        await AsyncStorage.setItem('profile_pic', cleanUrl);
      }
    } catch (error) {
      console.error('AsyncStorage error:', error);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving');
      return;
    }

    if (!hasChanges) {
      Alert.alert('No Changes', 'No changes were made to save');
      return;
    }

    try {
      const dataToSubmit = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        location: formData.location,
        ...(profileKey ? { profile_pic: profileKey } : {}),  // profileKey is your new image key in store
        cords: formData.cords,
        birth_date: formData.birth_date,
      };

      console.log('submit data for update profile:', dataToSubmit);

      const result = await dispatch(updateUserProfile(dataToSubmit)).unwrap();

      if (result) {
        // Clean the profile picture URL before storing
        // const currentProfilePic = cleanProfilePicUrl(dataToSubmit.profile_pic);

        // // Update Redux state with clean URL
        // dispatch(set_profile_pic(currentProfilePic));

        // // Save profile pic URL to AsyncStorage
        // await saveProfilePicStorage(currentProfilePic);

        setHasChanges(false);
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error?.message || 'Failed to update profile');
    }
  };




  // Clean URL function to fix encoding issues
  const cleanProfilePicUrl = (url) => {
    if (!url) return null;

    // Fix double encoding issues
    let cleanUrl = url
      .replace(/%253A/g, ':')
      .replace(/%252F/g, '/')
      .replace(/%253F/g, '?')
      .replace(/%253D/g, '=')
      .replace(/%2526/g, '&');

    return cleanUrl;
  };

  const handleChoosePhoto = async (fromCamera) => {
    setModalVisible(false);

    // Check and request permissions
    const hasPermission = await checkPermissions(fromCamera);
    if (!hasPermission) {
      return;
    }

    setUploading(true);

    try {
      const options = {
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        freeStyleCropEnabled: true,
        avoidEmptySpaceAroundImage: true,
        cropperCircleOverlay: true,
        includeBase64: false,
        mediaType: 'photo',
        forceJpg: true,
      };

      let image;
      if (fromCamera) {
        image = await ImagePicker.openCamera(options);
      } else {
        image = await ImagePicker.openPicker({
          ...options,
          multiple: false,
          waitAnimationEnd: true,
        });
      }

      if (image) {
        console.log('Selected image:', image);

        const file = {
          uri: image.path,
          type: image.mime || 'image/jpeg',
          name: image.filename || `profile_${Date.now()}.jpg`,
        };

        console.log('Uploading file:', file);
        const uploadResult = await dispatch(uploadFileToS3(file));

        if (uploadResult?.payload?.presigned_url) {
          // Clean the URL before storing
          const cleanUrl = cleanProfilePicUrl(uploadResult.payload.presigned_url);

          setHasChanges(true);
          // Update profile picture in Redux store with clean URL
          dispatch(set_profile_pic(cleanUrl));
          await saveProfilePicStorage(cleanUrl);
          
          Alert.alert('Success', 'Profile picture updated successfully');
        } else if (uploadResult?.payload?.key) {
          // If the API returns a key, construct the URL properly
          const baseUrl = 'https://s3.ap-south-1.amazonaws.com/toptenbazar/';
          const imageUrl = baseUrl + uploadResult.payload.key;

          setHasChanges(true);
          dispatch(set_profile_pic(imageUrl));
          await saveProfilePicStorage(imageUrl);
          Alert.alert('Success', 'Profile picture updated successfully');
        } else {
          throw new Error('No image URL received from server');
        }
      }
    } catch (error) {
      console.log('Image picker error:', error);
      if (error.code !== 'E_PICKER_CANCELLED') {
        let errorMessage = 'Failed to process image';

        if (error.code === 'E_PERMISSION_MISSING') {
          errorMessage = 'Permission denied. Please check app permissions in settings.';
        } else if (error.code === 'E_NO_LIBRARY_PERMISSION') {
          errorMessage = 'Gallery access denied. Please enable photo library permissions.';
        } else if (error.code === 'E_NO_CAMERA_PERMISSION') {
          errorMessage = 'Camera access denied. Please enable camera permissions.';
        } else if (error.message) {
          errorMessage = error.message;
        }

        Alert.alert('Error', errorMessage);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    Alert.alert(
      'Remove Profile Photo',
      'Are you sure you want to remove your profile photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            dispatch(set_profile_pic(null));
            await saveProfilePicStorage(null);
            setHasChanges(true);
          },
        },
      ]
    );
  };

  const renderImageSource = () => {
    // Clean the URL before using it
    const cleanPicUrl = cleanProfilePicUrl(profile_pic);

    if (cleanPicUrl) {
      return { uri: cleanPicUrl };
    } else if (profile?.profile_pic_url) {
      const cleanProfileUrl = cleanProfilePicUrl(profile.profile_pic_url);
      return cleanProfileUrl ? { uri: cleanProfileUrl } : require('../../../src/images/UserImage.png');
    } else if (profile?.profile_pic) {
      const cleanProfilePic = cleanProfilePicUrl(profile.profile_pic);
      return cleanProfilePic ? { uri: cleanProfilePic } : require('../../../src/images/UserImage.png');
    } else {
      return require('../../../src/images/UserImage.png');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor={BRAND.white} barStyle="dark-content" />

      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture Section */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.avatarContainer}
              disabled={uploading}
            >
              <View style={styles.avatar}>
                {uploading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={BRAND.primary} />
                    <Text style={styles.uploadingText}>Uploading...</Text>
                  </View>
                ) : (
                  <Image
                    source={renderImageSource()}
                    style={styles.avatarImage}
                    resizeMode="cover"
                    onError={(e) => {
                      console.log('Error loading profile image:', e.nativeEvent.error);
                      // Image will fallback to default due to renderImageSource logic
                    }}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.cameraIconContainer}
                disabled={uploading}
              >
                <CameraIcon width={s(14)} height={s(14)} />
              </TouchableOpacity>
            </TouchableOpacity>

            {profile_pic && (
              <TouchableOpacity
                style={styles.removePhotoButton}
                onPress={handleRemovePhoto}
              >
                <Text style={styles.removePhotoText}>Remove Photo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Form Fields */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.first_name && styles.inputError
              ]}
              placeholder="Enter Your First Name"
              placeholderTextColor={BRAND.muted}
              value={formData.first_name}
              onChangeText={text => handleChange('first_name', text)}
              maxLength={50}
              returnKeyType="next"
            />
            {errors.first_name && (
              <Text style={styles.errorText}>{errors.first_name}</Text>
            )}
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.last_name && styles.inputError
              ]}
              placeholder="Enter Your Last Name"
              placeholderTextColor={BRAND.muted}
              value={formData.last_name}
              onChangeText={text => handleChange('last_name', text)}
              maxLength={50}
              returnKeyType="next"
            />
            {errors.last_name && (
              <Text style={styles.errorText}>{errors.last_name}</Text>
            )}
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              editable={false}
              style={[styles.textInput, styles.disabledInput]}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={BRAND.muted}
              keyboardType="phone-pad"
              value={formData.phonenumber}
            />
            <View style={styles.verificationContainer}>
              <Text style={[
                styles.verificationText,
                phoneVerified ? styles.verified : styles.notVerified
              ]}>
                {phoneVerified ? '✓ Phone Verified' : '✗ Phone Not Verified'}
              </Text>
              {!phoneVerified && (
                <TouchableOpacity style={styles.verifyButton}>
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.email && styles.inputError
              ]}
              placeholder="Enter Your Email"
              placeholderTextColor={BRAND.muted}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
            />
            <View style={styles.verificationContainer}>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : (
                <>
                  <Text style={[
                    styles.verificationText,
                    emailVerified ? styles.verified : styles.notVerified
                  ]}>
                    {emailVerified ? '✓ Email Verified' : '✗ Email Not Verified'}
                  </Text>
                  {!emailVerified && (
                    <TouchableOpacity style={styles.verifyButton}>
                      <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Location"
              placeholderTextColor={BRAND.muted}
              value={formData.location}
              onChangeText={text => handleChange('location', text)}
              maxLength={100}
              returnKeyType="done"
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!hasChanges || isLoading) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!hasChanges || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={BRAND.white} size="small" />
          ) : (
            <Text style={styles.saveButtonText}>
              {hasChanges ? 'Save Changes' : 'No Changes'}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Profile Photo Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Change Profile Photo</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleChoosePhoto(true)}
                disabled={uploading}
              >
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <View style={styles.modalDivider} />

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleChoosePhoto(false)}
                disabled={uploading}
              >
                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>

              <View style={styles.modalDivider} />

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                disabled={uploading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.white
  },
  animatedContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: s(16),
    paddingTop: vs(16),
    paddingBottom: vs(16)
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: vs(20),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: vs(10),
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
    borderColor: BRAND.primary
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BRAND.bg,
  },
  uploadingText: {
    marginTop: vs(5),
    fontSize: s(10),
    color: BRAND.primary,
    fontWeight: '500',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  removePhotoButton: {
    paddingHorizontal: s(12),
    paddingVertical: vs(6),
    borderRadius: s(15),
    backgroundColor: BRAND.error + '20',
  },
  removePhotoText: {
    fontSize: s(12),
    color: BRAND.error,
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: vs(20)
  },
  label: {
    fontSize: s(14),
    fontWeight: '600',
    color: BRAND.text,
    marginBottom: vs(6)
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
    backgroundColor: BRAND.border,
    color: BRAND.muted,
  },
  inputError: {
    borderColor: BRAND.error,
    backgroundColor: BRAND.error + '10',
  },
  errorText: {
    marginTop: vs(4),
    fontSize: s(12),
    color: BRAND.error,
    fontWeight: '500',
  },
  verificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(6),
  },
  verificationText: {
    fontSize: s(12),
    fontWeight: '500',
  },
  verified: {
    color: BRAND.success,
  },
  notVerified: {
    color: BRAND.error,
  },
  verifyButton: {
    paddingHorizontal: s(12),
    paddingVertical: vs(4),
    borderRadius: s(12),
    backgroundColor: BRAND.primary + '20',
  },
  verifyButtonText: {
    fontSize: s(10),
    color: BRAND.primary,
    fontWeight: '600',
  },
  saveButton: {
    width: '94%',
    alignSelf: 'center',
    backgroundColor: BRAND.primary,
    borderRadius: s(8),
    paddingVertical: vs(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(10),
    marginBottom: vs(10),
    shadowColor: BRAND.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: BRAND.muted,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: BRAND.white,
    fontSize: s(16),
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: BRAND.white,
    borderTopLeftRadius: s(16),
    borderTopRightRadius: s(16),
    paddingHorizontal: s(14),
    paddingTop: vs(16),
    paddingBottom: Platform.OS === 'ios' ? vs(30) : vs(20),
    marginHorizontal: s(10),
  },
  modalTitle: {
    fontSize: s(16),
    fontWeight: '600',
    color: BRAND.text,
    textAlign: 'center',
    marginBottom: vs(16)
  },
  modalButton: {
    paddingVertical: vs(14),
    alignItems: 'center'
  },
  modalButtonText: {
    fontSize: s(16),
    color: BRAND.primary,
    fontWeight: '500'
  },
  modalDivider: {
    height: 0.5,
    backgroundColor: BRAND.border,
    width: '100%'
  },
  cancelButton: {
    marginTop: vs(6)
  },
  cancelButtonText: {
    fontSize: s(16),
    color: BRAND.error,
    fontWeight: '600'
  },
});

export default PersonalDetails;