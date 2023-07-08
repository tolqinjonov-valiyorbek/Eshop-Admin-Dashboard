import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import productService from './productService';


export const getProducts = createAsyncThunk("product/get-products", async(thunkAPI) => {
    try {
        return await productService.getProducts();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const createProducts = createAsyncThunk(
    "product/create-products",
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData);
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);
export const resetState = createAction("Reset_all");
const initialState = {
    products:[],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const productSlice = createSlice({
    name:'products',
    initialState:initialState,
    reducars:{},
    extraReducers:(builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
        .addCase(createProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(createProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.createdProduct = action.payload;
        })
        .addCase(createProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});


export default productSlice.reducer;