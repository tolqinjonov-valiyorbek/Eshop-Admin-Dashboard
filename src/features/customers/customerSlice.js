import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import customerService from './customerService'

export const getUsers = createAsyncThunk("customer/get-customers", async(user, thunkAPI) => {
    try {
        return await customerService.getUsers();
    }catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const initialState = {
    customers:[],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const customerSlice = createSlice({
    name:'users',
    initialState,
    reducars:{},
    extraReducers:(builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.customers = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
    },
});


export default customerSlice.reducer;