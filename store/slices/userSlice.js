import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config";
import { Alert } from "react-native";

export const checkUserStatus = createAsyncThunk("user/checkUserStatus", async (_, { dispatch, rejectWithValue }) => {
    try {
        // const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');
        // const profilepic = await AsyncStorage.getItem("userprofilepic")
        await dispatch(fetchBannerConfig());
        await dispatch(fetchCategories());
        await dispatch(fetchAllGroups())
        // await dispatch()
        // console.log('profilepic on userslice:', profilepic)
        return {
            // profilepic
        }
    } catch (error) {
        return rejectWithValue(error?.message || "Failed to check auth status");
    }
});

export const fetchProductsByGroup = createAsyncThunk(
    "prod/fetchProductsByGroup",
    async ({ group_name, page = 1, length = 10 }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            // const url = new URL(`${BASE_URL}/prod/get_group/products`);
            // url.searchParams.append('group_name', group_name);
            // url.searchParams.append('page', page.toString());
            // url.searchParams.append('length', length.toString());
            // console.log('url for fetching products by group name:', url)

            const response = await fetch(`${BASE_URL}/prod/get_group/products?group_name=${group_name}&page=${page}&length=${length}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("response status:", response.status)

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch products by group");
            }

            const data = await response.json();
            console.log(`Products for group ${group_name}:`, data);
            return {
                group_name,
                data,
                page,
                length
            };
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch products by group");
        }
    }
);


export const fetchAllGroups = createAsyncThunk(
    "prod/fetchAllGroups",
    async (_, { getState, rejectWithValue, dispatch }) => { // Added dispatch here
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/prod/get_group/all_group`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch groups");
            }

            const data = await response.json();
            console.log('All Groups:', data?.active_group_names);
            const arr = data?.active_group_names;

            // Use Promise.all to wait for all product fetches to complete
            if (arr && Array.isArray(arr)) {
                const productFetchPromises = arr.map(groupName =>
                    dispatch(fetchProductsByGroup({ group_name: groupName, page: 1, length: 10 }))
                );
                await Promise.all(productFetchPromises);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch groups");
        }
    }
);

export const fetchSubcategories = createAsyncThunk(
    "prod/fetchSubcategories",
    async (category_id, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/prod/get_subcategory?category_id=${category_id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch subcategories");
            }

            const data = await response.json();
            console.log(`Subcategories for category ${category_id}:`, data);
            return {
                category_id,
                data
            };
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch subcategories");
        }
    }
);

export const fetchUserAddress = createAsyncThunk(
    "user/fetchUserAddress",
    async (_, { getState, rejectWithValue }) => {
        try {
            console.log('start')
            // Access token from Redux state, fallback to AsyncStorage if not found
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/auth/address`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });
            //   console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch address");
            }
            const data = await response.json();
            console.log('responce on address api:', data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch address");
        }
    }
);

export const postUserAddress = createAsyncThunk(
    "user/postUserAddress",
    async (addressData, { getState, rejectWithValue }) => {
        try {
            console.log("start")
            // Get access token either from Redux state or fallback to AsyncStorage
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/auth/address`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addressData)
            });
            console.log("add adress responce:", typeof (response))
            console.log("add adress 66responce:", response)



            // if (!response.ok) {
            //     const errorData = await response.json();
            //     return rejectWithValue(errorData.message || "Failed to post address");
            // }
            if (!response.ok) {
                console.log("in ok if75 adress responce:", response)

                const errorData = await response.json();
                console.log("Error response data 78:", errorData?.add_name[0]);
                Alert.alert('Error', errorData?.add_name[0])
                return rejectWithValue(errorData);
            }


            const data = await response.json();
            console.log('response from POST address api:', data);
            console.log("near  85 data responce:", response)

            return data;

        } catch (error) {
            return rejectWithValue(error.message || "Failed to post address");
        }
    }
);

export const deleteUserAddress = createAsyncThunk(
    "user/deleteUserAddress",
    async (addressId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/auth/address/${addressId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to delete address");
            }

            return addressId;  // return deleted address ID on success
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete address");
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    "user/updateUserAddress",
    async ({ addressId, addressData }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/auth/address/${addressId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addressData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to update address");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to update address");
        }
    }
);

export const fetchBannerConfig = createAsyncThunk(
    "prod/fetchBannerConfig",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/prod/banner_config`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch banner config");
            }

            const data = await response.json();
            console.log('Baner Config:', data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch banner config");
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "prod/fetchCategories",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth?.accessToken || await AsyncStorage.getItem('accessToken');

            const response = await fetch(`${BASE_URL}/prod/get_cat`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch categories");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch categories");
        }
    }
);







const initialState = {
    // profilepic: null,
    Baner_Config: null,
    allGroups: null,
    address: null,
    categories: null,
    groupProducts: {},
    subcategories: {},
    isLoading: false,
    error: null,
    selectedAddress: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setProfilepic: (state, action) => {
        //     state.profilepic = action.payload;
        // },
        // clearProfilepic: (state) => {
        //     state.profilepic = null;
        // },
        clearGroupProducts: (state, action) => {
            state.groupProducts = {};
        },
        clearGroupProductsByGroup: (state, action) => {
            const groupName = action.payload;
            delete state.groupProducts[groupName];
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload
        },
        clearSubcategories: (state, action) => {
            state.subcategories = {}
        }
    },
    extraReducers: (builder) => {
        builder
            // Add this to your existing extraReducers builder
            .addCase(fetchSubcategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSubcategories.fulfilled, (state, action) => {
                state.isLoading = false;
                const { category_id, data } = action.payload;

                // Store subcategories by category_id
                state.subcategories[category_id] = data;
            })
            .addCase(fetchSubcategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add cases for fetchProductsByGroup
            .addCase(fetchProductsByGroup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsByGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                const { group_name, data, page } = action.payload;

                // Store products by group name and page
                if (!state.groupProducts[group_name]) {
                    state.groupProducts[group_name] = {};
                }
                state.groupProducts[group_name][page] = data;
            })
            .addCase(fetchProductsByGroup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add new cases for fetchAllGroups
            .addCase(fetchAllGroups.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllGroups.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allGroups = action.payload;
            })
            .addCase(fetchAllGroups.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(checkUserStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkUserStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.profilepic = action.payload.profilepic;
            })
            .addCase(checkUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.address = action.payload;
            })
            .addCase(fetchUserAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(postUserAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postUserAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(state.address)) {
                    state.address.push(action.payload);
                } else {
                    state.address = [action.payload];
                }
            })
            .addCase(postUserAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUserAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                // Remove the deleted address from state.address array
                if (Array.isArray(state.address)) {
                    state.address = state.address.filter(addr => addr.id !== action.payload);
                }
            })
            .addCase(deleteUserAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(state.address)) {
                    // Replace the updated address in array by matching id
                    state.address = state.address.map(addr =>
                        addr.id === action.payload.id ? action.payload : addr
                    );
                }
            })
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // banner config 
            .addCase(fetchBannerConfig.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBannerConfig.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Baner_Config = action.payload;
            })
            .addCase(fetchBannerConfig.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // catageries reducer 
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});


export const {
    // setProfilepic,
    // clearProfilepic,
    clearGroupProducts, clearGroupProductsByGroup,
    setSelectedAddress,
    clearSubcategories,

} = userSlice.actions;

export default userSlice.reducer;
