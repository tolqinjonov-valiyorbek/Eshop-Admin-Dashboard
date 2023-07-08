import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import orderService from './orderService';





export const getOrders = createAsyncThunk("order/get-order", async(thunkAPI) => {
    try {
        return await orderService.getOrders();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

const initialState = {
    orders:[],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const orderSlice = createSlice({
    name:'c',
    initialState,
    reducars:{},
    extraReducers:(builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.v = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
    },
});


export default orderSlice.reducer;