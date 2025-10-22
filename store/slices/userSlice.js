import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

export const checkUserStatus = createAsyncThunk("user/checkUserStatus", async (_, { dispatch, rejectWithValue }) => {
    try {
        const profilepic = await AsyncStorage.getItem("userprofilepic")
        console.log('profilepic on userslice:',profilepic)
        return {
            profilepic
        }
    } catch (error) {
        return rejectWithValue(error?.message || "Failed to check auth status");
    }
});

const initialState = {
    profilepic: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfilepic: (state, action) => {
            state.profilepic = action.payload
        },
        clearProfilepic: (state) => {
            state.profilepic = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserStatus.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(checkUserStatus.fulfilled, (state, action) => {
                state.isLoading = false
                state.profilepic = action.payload.profilepic
            })
            .addCase(checkUserStatus.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

    }
})

export const {
    setProfilepic,
    clearProfilepic
} = userSlice.actions

export default userSlice.reducer