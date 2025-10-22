import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem("token")
        console.log('token on authslice:', token)
        return {
            token
        }
    } catch (error) {
        return rejectWithValue(error?.message || "Failed to check auth status");
    }
});



const initialState = {
    token: null,
    isLoading: false,
    error: null,
    logout :null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearToken: (state) => {
            state.token = null
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.token
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const {
    setToken,
    clearToken
} = authSlice.actions

export default authSlice.reducer