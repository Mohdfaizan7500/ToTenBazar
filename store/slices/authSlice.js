import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from '../../config';
import { fetchAllGroups, fetchBannerConfig, fetchCategories } from "./userSlice";

// Helper function to clean URL encoding issues
const cleanUrl = (url) => {
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

// Async thunk to fetch user profile using the saved access token
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (accessToken, { rejectWithValue }) => {
    try {
      console.log('Starting profile fetch');

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
      }

      const profile = await response.json();

      // Store profile data in AsyncStorage
      if (profile) {
        await AsyncStorage.setItem('profile', JSON.stringify(profile));
        if (profile.profile_pic_url) {
          // Clean the URL before storing
          const cleanProfilePic = cleanUrl(profile.profile_pic_url);
          await AsyncStorage.setItem('profile_pic', cleanProfilePic);
        }
      }

      console.log("Fetched profile:", profile);
      return profile;

    } catch (error) {
      console.error('Profile fetch error:', error);
      return rejectWithValue(error.message || "Failed to fetch user profile");
    }
  }
);

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, otp }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Save tokens and user data in AsyncStorage
      if (data.access && data.refresh) {
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);
        await AsyncStorage.setItem("user_type", JSON.stringify(data.user.user_type));
      } else {
        throw new Error("Invalid login response");
      }

      // Dispatch fetchUserProfile to load full user profile after login
      if (data.access) {
        await dispatch(fetchUserProfile(data.access));
        await dispatch(fetchBannerConfig());
        await dispatch(fetchCategories());
        await dispatch(fetchAllGroups())


      }

      return {
        access: data.access,
        refresh: data.refresh,
        user: data.user,
        user_type: data.user.user_type,
      };

    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const getOtp = createAsyncThunk(
  "auth/getOTP",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/login?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get OTP");
      }

      const data = await response.json();
      console.log("OTP session:", data);

      return { data };

    } catch (error) {
      console.error('OTP error:', error);
      return rejectWithValue(error.message || "Failed to get OTP");
    }
  }
);

// Async thunk for refreshing tokens
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Token refresh failed");
      }

      const data = await response.json();

      if (data.access && data.refresh) {
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);
      } else {
        throw new Error("Invalid refresh response");
      }

      return {
        access: data.access,
        refresh: data.refresh
      };

    } catch (error) {
      console.error('Token refresh error:', error);
      return rejectWithValue(error.message || "Token refresh failed");
    }
  }
);

// Async thunk to check auth status on app launch/load
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const access = await AsyncStorage.getItem("accessToken");
      const refresh = await AsyncStorage.getItem("refreshToken");
      const userTypeStr = await AsyncStorage.getItem("user_type");
      const profileStr = await AsyncStorage.getItem("profile");
      const profilePic = await AsyncStorage.getItem("profile_pic");

      const user_type = userTypeStr ? JSON.parse(userTypeStr) : null;
      const profile = profileStr ? JSON.parse(profileStr) : null;

      // Clean the profile_pic URL when retrieving from storage
      const cleanProfilePic = cleanUrl(profilePic);

      return {
        access,
        refresh,
        user_type,
        profile,
        profile_pic: cleanProfilePic
      };

    } catch (error) {
      console.error('Auth status check error:', error);
      return rejectWithValue(error.message || "Failed to check auth status");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedProfile, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken || await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      console.log('Update profile API response:', data);

      // Update profile in AsyncStorage
      await AsyncStorage.setItem('profile', JSON.stringify(data));

      return data;

    } catch (error) {
      console.error('Update profile error:', error);
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const uploadFileToS3 = createAsyncThunk(
  "auth/uploadFileToS3",
  async (file, { getState, rejectWithValue }) => {
    try {
      console.log('File for upload:', file);

      const state = getState();
      const accessToken = state.auth.accessToken || await AsyncStorage.getItem('accessToken');

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BASE_URL}/helper/s3file_api`, {
        method: 'POST',
        headers: {
          ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'File upload failed');
      }

      const data = await response.json();
      console.log('S3 API response:', data);

      // Clean the presigned_url before returning
      if (data.presigned_url) {
        data.presigned_url = cleanUrl(data.presigned_url);
      }

      return data;

    } catch (error) {
      console.error('File upload error:', error);
      return rejectWithValue(error.message || 'File upload failed');
    }
  }
);

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  user_type: null,
  profile: null,
  profile_pic: null,
  isLoading: false,
  error: null,
  profileKey: null,
  Theme: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set_profile_pic: (state, action) => {
      console.log("Updating profile picture:", action.payload);
      // Clean the URL before setting in state
      const cleanUrlValue = cleanUrl(action.payload);
      state.profile_pic = cleanUrlValue;
    },
    setTheme :(state,action)=>{
      state.Theme = action.payload
    },
    clearTokens: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.user_type = null;
      state.profile = null;
      state.profile_pic = null;
      state.profileKey = null;
      state.error = null;

      // Clear all stored data
      AsyncStorage.multiRemove([
        "user",
        "accessToken",
        "refreshToken",
        "user_type",
        "profile",
        "profile_pic"
      ]);
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.user_type = action.payload.user_type;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        // Clean the profile_pic_url before setting
        const cleanProfilePic = cleanUrl(action.payload?.profile_pic_url);
        state.profile_pic = cleanProfilePic;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get OTP
      .addCase(getOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.profile;
        state.user_type = action.payload.user_type;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        // profile_pic is already cleaned in the thunk
        state.profile_pic = action.payload.profile_pic;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = {
          ...state.profile,
          ...action.payload
        };
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Upload File to S3
      .addCase(uploadFileToS3.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFileToS3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileKey = action.payload?.key;
        // presigned_url is already cleaned in the thunk
        if (action.payload?.presigned_url) {
          console.log('Profile picture saved successfully');
          state.profile_pic = action.payload.presigned_url;
        }
        state.error = null;
      })
      .addCase(uploadFileToS3.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearTokens,
  set_profile_pic,
  clearError,
  setLoading,
  setTheme
} = authSlice.actions;

export default authSlice.reducer;