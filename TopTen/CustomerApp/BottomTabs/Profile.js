import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Platform,
  StatusBar,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  CameraIcon,
  HeplIcon,
  MoonIcon,
  MyOrderIcon,
  ProfileIcon2,
  RightArrowICon,
  SettingIcon,
  SignOutIcon,
  SunIcon,
} from '../../../src/SVGicons/icon';
import { s, vs } from 'react-native-size-matters';
import { BRAND, DARK } from '../../../src/constant/colors';
import { DarkTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearTokens, set_profile_pic, setTheme, uploadFileToS3 } from '../../../store/slices/authSlice';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const iconWidth = s(14);
  const iconHeight = s(14);
  const profile = useSelector(state => state?.auth?.profile);
  const profile_pic = useSelector(state => state?.auth?.profile_pic);
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const Theme = useSelector(state => state?.auth?.Theme)
  console.log("Theme", Theme)
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log('Profile pic on profile screen:', profile_pic);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Clean URL function to fix encoding issues
  const cleanProfilePicUrl = (url) => {
    if (!url) return null;

    // Fix double encoding issues that are happening
    let cleanUrl = url
      .replace(/%253A/g, ':')
      .replace(/%252F/g, '/')
      .replace(/%253F/g, '?')
      .replace(/%253D/g, '=')
      .replace(/%2526/g, '&')
      .replace(/%2525/g, '%');

    return cleanUrl;
  };

  // Helper to save or remove profile_pic safely in AsyncStorage
  const saveProfilePic = async (value) => {
    try {
      if (value == null || value === '') {
        await AsyncStorage.removeItem('profile_pic');
      } else {
        // Clean the URL before storing
        const cleanUrl = cleanProfilePicUrl(value);
        await AsyncStorage.setItem('profile_pic', cleanUrl);
      }
    } catch (error) {
      console.error('Error saving profile_pic:', error);
    }
  };

  const navigateHandle = screenName => {
    navigation.navigate(screenName);
  };

  const SignOuthandle = () => {
    Alert.alert(
      'Sign Out',
      'Do you want to Sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(clearTokens());
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
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

  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  const handleImageSelection = async (fromCamera) => {
    setModalVisible(false);

    // Check permissions
    if (fromCamera) {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Camera permission is required to take photos');
        return;
      }
    } else {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Storage permission is required to choose photos from gallery');
        return;
      }
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

          // Update Redux store and AsyncStorage
          dispatch(set_profile_pic(cleanUrl));
          await saveProfilePic(cleanUrl);
          Alert.alert('Success', 'Profile picture updated successfully');
        } else if (uploadResult?.payload?.key) {
          // If API returns key instead of presigned_url
          const baseUrl = 'https://s3.ap-south-1.amazonaws.com/toptenbazar/';
          const imageUrl = baseUrl + uploadResult.payload.key;
          const cleanUrl = cleanProfilePicUrl(imageUrl);

          dispatch(set_profile_pic(cleanUrl));
          await saveProfilePic(cleanUrl);
          Alert.alert('Success', 'Profile picture updated successfully');
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

  const handleTakePhoto = () => {
    handleImageSelection(true);
  };

  const handleChooseFromGallery = () => {
    handleImageSelection(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
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
            await saveProfilePic(null);
          },
        },
      ]
    );
  };

  function capitalizeFirstLetter(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Get clean image source
  const getImageSource = () => {
    const cleanPicUrl = cleanProfilePicUrl(profile_pic);

    if (cleanPicUrl) {
      return { uri: cleanPicUrl };
    } else if (profile?.profile_pic_url) {
      const cleanProfileUrl = cleanProfilePicUrl(profile.profile_pic_url);
      return cleanProfileUrl ? { uri: cleanProfileUrl } : require('../../../src/images/UserImage.png');
    } else {
      return require('../../../src/images/UserImage.png');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Theme ? DARK.bg : BRAND.bg }]}>
      <StatusBar backgroundColor={Theme ? DARK.bg : BRAND.bg} barStyle={Theme ? DARK.text : BRAND.text} />

      {/* Profile Picture Section */}
      <View style={styles.avatarSection}>
        <View
          style={styles.avatarContainer}
          disabled={uploading}
        >
          <View style={[styles.avatar, Theme && { borderColor: DARK.blue }]}>
            {uploading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={BRAND.primary} />
                <Text style={styles.uploadingText}>Uploading...</Text>
              </View>
            ) : (
              <Image
                source={getImageSource()}
                style={styles.avatarImage}
                resizeMode="cover"
                onError={(e) => {
                  console.log('Error loading profile image:', e.nativeEvent.error);
                  // Fallback is handled in getImageSource
                }}
              />
            )}
          </View>

        </View>

        {profile_pic && (
          <TouchableOpacity
            style={styles.removePhotoButton}
            onPress={handleRemovePhoto}
            disabled={uploading}
          >
            <Text style={[styles.removePhotoText, Theme && { color: DARK.text }]}>Remove Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.name, Theme && { color: DARK.text }]}>
        {capitalizeFirstLetter(profile?.first_name ?? '')}{' '}
        {capitalizeFirstLetter(profile?.last_name ?? '')}
      </Text>
      <Text style={styles.email}>{profile?.email ?? ''}</Text>

      <View style={[styles.menuCard, Theme && { backgroundColor: DARK.bg, borderColor: DARK.border }]}>
        <MenuItem
          title="Personal Details"
          icon={<ProfileIcon2 width={iconWidth} height={iconHeight} stroke={Theme ? DARK.text : BRAND.text} />}
          onPress={() => navigateHandle('PersonalDetails')}
          Theme={Theme}
        />
        <View style={[styles.divider, Theme && { backgroundColor: DARK.border }]} />
        <MenuItem
          title="Addresses"
          icon={<SettingIcon width={iconWidth} height={iconHeight} stroke={Theme ? DARK.text : BRAND.text} />}
          onPress={() => navigateHandle('Address')}
          Theme={Theme}

        />
        <View style={[styles.divider, Theme && { backgroundColor: DARK.border }]} />
        <MenuItem
          title="My Orders"
          icon={<MyOrderIcon width={iconWidth} height={iconHeight} stroke={Theme ? DARK.text : BRAND.text} />}
          onPress={() => navigateHandle('MyOrder')}
          Theme={Theme}

        />
        <View style={[styles.divider, Theme && { backgroundColor: DARK.border }]} />
        <MenuItem
          title="Help Center"
          icon={<HeplIcon width={iconWidth} height={iconHeight} stroke={Theme ? DARK.text : BRAND.text} />}
          onPress={() => navigateHandle('HelpCenter')}
          Theme={Theme}
        />
      </View>

      <TouchableOpacity
        style={[styles.SignOutButton, Theme && { backgroundColor: DARK.bg, borderColor: DARK.border }]}
        onPress={SignOuthandle}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={BRAND.error} />
        ) : (
          <>
            <SignOutIcon width={s(14)} height={s(14)} />
            <Text style={styles.signUptext}>Sign Out</Text>
          </>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Change Profile Photo</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleTakePhoto}
                disabled={uploading}
              >
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <View style={styles.modalDivider} />

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleChooseFromGallery}
                disabled={uploading}
              >
                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>

              <View style={[styles.modalDivider, Theme && { backgroundColor: DARK.border }]} />

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
                disabled={uploading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity style={[styles.ThemeCircle, { borderColor: Theme ? DARK.border : BRAND.border }]} onPress={() => {
        dispatch(setTheme(!Theme))
      }}>
        {
          Theme ?
            <MoonIcon width={s(18)} height={s(18)} fill={BRAND.white} />
            :
            <SunIcon width={s(18)} height={s(18)} />

        }

      </TouchableOpacity>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, icon, onPress, Theme }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <View style={[styles.iconBOx, Theme && { backgroundColor: DARK.gray[300] }]}>{icon}</View>
      <Text style={[styles.menuText, Theme && { color: DARK.text }]}>{title}</Text>
    </View>
    <RightArrowICon width={s(12)} height={s(12)} stroke={Theme ? DARK.border : BRAND.black} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.bg,
    alignItems: 'center',
    paddingTop: vs(12),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: vs(6),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: vs(8),
    marginTop: s(16)
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
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BRAND.bg,
  },
  uploadingText: {
    marginTop: vs(4),
    fontSize: s(9),
    color: BRAND.primary,
    fontWeight: '500',
  },
  cameraIconContainer: {
    position: 'absolute',
    width: s(22),
    height: s(22),
    backgroundColor: BRAND.white,
    borderRadius: s(11),
    right: s(3),
    bottom: s(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: s(0.8),
    borderColor: BRAND.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  removePhotoButton: {
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    borderRadius: s(12),
    backgroundColor: BRAND.error + '20',
  },
  removePhotoText: {
    fontSize: s(11),
    color: BRAND.error,
    fontWeight: '500',
  },
  name: {
    fontSize: s(14),
    fontWeight: '600',
    marginBottom: vs(1),
    color: BRAND.text,
  },
  email: {
    fontSize: s(11),
    color: BRAND.muted,
  },
  menuCard: {
    marginTop: vs(10),
    width: '90%',
    backgroundColor: BRAND.bg,
    borderRadius: s(8),
    borderWidth: s(0.8),
    borderColor: BRAND.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(10),
    paddingHorizontal: s(12),
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  divider: {
    height: s(0.8),
    backgroundColor: BRAND.border,
    marginHorizontal: s(8),
  },
  menuText: {
    fontSize: s(13),
    color: BRAND.text,
    fontWeight: '500',
  },
  SignOutButton: {
    borderWidth: s(0.8),
    borderColor: BRAND.border,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(5),
    paddingVertical: vs(8),
    marginTop: vs(10),
    borderRadius: s(100),
    flexDirection: 'row',
    backgroundColor: BRAND.bg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.02,
    shadowRadius: 1,
  },
  signUptext: {
    color: "#F14141",
    fontSize: s(13),
    fontWeight: '500',
  },
  iconBOx: {
    padding: s(4),
    borderRadius: s(4),
    backgroundColor: BRAND.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    width: s(28),
    height: s(28),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: BRAND.white,
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    paddingHorizontal: s(14),
    paddingTop: vs(12),
    paddingBottom: Platform.OS === 'ios' ? vs(20) : vs(12),
    marginHorizontal: s(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
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
    height: s(0.8),
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
  ThemeCircle: {
    width: s(36),
    height: s(36),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(0.8),
    borderColor: BRAND.border,
    borderRadius: s(100),
    position: "absolute",
    top: s(4),
    right: s(12)
  }
});

export default Profile;