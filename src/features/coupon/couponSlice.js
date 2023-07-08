import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import couponService from './couponService';
export const getAllCoupon = createAsyncThunk("coupon/get-coupon", async(thunkAPI) => {
    try {
        return await couponService.getCoupons();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const createACoupons = createAsyncThunk("coupon/create-coupon", async(couponData, thunkAPI) => {
    try{
        return await couponService.createCoupons(couponData);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getACoupon = createAsyncThunk("coupon/get-coupons", async(id,thunkAPI) => {
    try {
        return await couponService.getCoupon (id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteACoupon = createAsyncThunk("coupon/delete-coupons",
async(id, thunkAPI) => {
    try{
        return await couponService.deleteCoupon(id)
    }catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateACoupon = createAsyncThunk("coupon/update-coupon",
async(id, thunkAPI) => {
    try{
        return await couponService.updateCoupon(id)
    }catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetState = createAction("Reset_all");

const initialState = {
    coupons:[],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const couponSlice = createSlice({
    name:'coupons',
    initialState,
    reducars:{},
    extraReducers:(builder) => {
        builder
        .addCase(getAllCoupon.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.coupons = action.payload;
        })
        .addCase(getAllCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
        .addCase(createACoupons.pending, (state) => {
            state.isLoading = true;
        }).addCase(createACoupons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.createdCoupon = action.payload;
        })
        .addCase(createACoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
         
        
        .addCase(getACoupon.pending, (state) => {
            state.isLoading = true;
        }).addCase(getACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.couponName = action.payload[0].name;
            state.couponDiscount = action.payload[0].discount;
            state.couponExpiry = action.payload[0].expiry;
        })
        .addCase(getACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })

        .addCase(updateACoupon.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.updatedCoupon= action.payload;
        })
        .addCase(updateACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })

        .addCase(deleteACoupon.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.deletedCoupon = action.payload;
        })
        .addCase(deleteACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});


export default couponSlice.reducer;