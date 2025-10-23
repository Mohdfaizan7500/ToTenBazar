import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from '../../config';


// Async thunk to fetch user profile using the saved access token

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (accessToken, { rejectWithValue }) => {
    try {
      console.log('start facting profile')
      // const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) throw new Error("No access token found");

      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch user profile");
      }


      const profile = await response.json();
      if (profile) {
        await AsyncStorage.setItem('profile', JSON.stringify(profile))
      }

      console.log("fetched profile is:", profile)
      return profile; // Full user profile object
    } catch (error) {
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
        return rejectWithValue(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Save tokens and user data in AsyncStorage
      if (data.access && data.refresh) {
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);
        await AsyncStorage.setItem("user_type", JSON.stringify(data.user.user_type));

      } else {
        return rejectWithValue("Invalid login response");
      }
      const accessToken = data.access

      // Dispatch fetchUserProfile to load full user profile after login
      if (accessToken) {
        dispatch(fetchUserProfile(accessToken));

      }

      // Return tokens and minimal user info from login response
      return {
        access: data.access,
        refresh: data.refresh,
        user: data.user, // minimal user info if any
        user_type: data.user.user_type,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const GetOtp = createAsyncThunk(
  "auth/getOTP",
  async ({ username }, { dispatch, rejectWithValue }) => {
    try {
      // Call the API via GET with username query param
      const response = await fetch(`${BASE_URL}/auth/login?username=${encodeURIComponent(username)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("otp session:",data)

      // if (data.access && data.refresh) {
      //   await AsyncStorage.setItem("accessToken", data.access);
      //   await AsyncStorage.setItem("refreshToken", data.refresh);
      //   await AsyncStorage.setItem("user_type", JSON.stringify(data.user.user_type));
      // } else {
      //   return rejectWithValue("Invalid login response");
      // }



      return {
        data
      };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Async thunk for refreshing tokens (optional but recommended)
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Token refresh failed");
      }

      const data = await response.json();

      if (data.access && data.refresh) {
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);
      } else {
        return rejectWithValue("Invalid refresh response");
      }

      return { access: data.access, refresh: data.refresh };
    } catch (error) {
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
      const user = await AsyncStorage.getItem("user");
      const user_typeStr = await AsyncStorage.getItem("user_type");
      const user_type = user_typeStr ? JSON.parse(user_typeStr) : null;
      const profilestr = await AsyncStorage.getItem("profile");
      const profile = profilestr ? JSON.parse(profilestr) : null;




      return { access, refresh, user: user ? JSON.parse(user) : null, user_type, profile };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to check auth status");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedProfile, { getState, rejectWithValue }) => {
    try {
      // Get the token from state or AsyncStorage
      const state = getState();
      const accessToken = state.auth.accessToken || await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('No access token found');

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
        return rejectWithValue(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();

      // Update profile in AsyncStorage to keep local state consistent
      await AsyncStorage.setItem('profile', JSON.stringify(data));

      return data; // updated profile object
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);


const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  user_type: null,
  profile: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearTokens: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.user_type = null;
      state.profile = null;
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("accessToken");
      AsyncStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        // update user in AsyncStorage
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.user_type = action.payload.user_type;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // profile update reduser 
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTokens } = authSlice.actions;

export default authSlice.reducer;
