import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import pCategoryService from './pcategoryService';



export const getCategories = createAsyncThunk("productCategory/get-categories", async(thunkAPI) => {
    try {
        return await pCategoryService.getProductCategories();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createCategory = createAsyncThunk("productCategory/create-category",
async(categoryData, thunkAPI) => {
    try{
        return await pCategoryService.createCategory(categoryData)
    }catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
}
)

export const updateAProductCategory = createAsyncThunk("productCategory/update-category",
async(category, thunkAPI) => {
    try{
        return await pCategoryService.updateProductCategory(category)
    }catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteAProductCategory = createAsyncThunk("productCategory/delete-category",
async(id, thunkAPI) => {
    try{
        return await pCategoryService.deleteProductCategory(id)
    }catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const getAProductCategory = createAsyncThunk("productCategory/product-category", async(id,thunkAPI) => {
    try {
        return await pCategoryService.getProductCategory(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})


const initialState = {
    pCategories:[],
    isError: false,
    isLoading: false,
    isSucces: false,
    message: ""
}

export const pCategorySlice = createSlice({
    name:'pCategories',
    initialState,
    reducars:{},
    extraReducers:(builder) => {
        builder
        .addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.pCategories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })

        .addCase(createCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(createCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.createdCategory = action.payload;
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })

        .addCase(updateAProductCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateAProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.updatedCategory = action.payload;
        })
        .addCase(updateAProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })

        .addCase(deleteAProductCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteAProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.deletedCategory = action.payload;
        })
        .addCase(deleteAProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })

        .addCase(getAProductCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSucces = true;
            state.categoryName = action.payload.title;
        })
        .addCase(getAProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucces = false;
            state.message = action.error;
        })
    },
});


export default pCategorySlice.reducer;