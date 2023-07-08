import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import customerReducar from "../features/customers/customerSlice";
import  productReducar  from "../features/product/productSlice";
import brandReducar from '../features/brand/brandSlice'
import pcategoryReducar from "../features/pcategory/pcategorySlice";
import orderReducar from "../features/order/orderSlice";
 import uploadReducar from "../features/upload/uploadSlice";
import couponReducar from "../features/coupon/couponSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducar,
    product: productReducar,
    brand: brandReducar,
    pcategory: pcategoryReducar,
    order: orderReducar,
    upload: uploadReducar,
    coupon:couponReducar,
  },
});
