import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string, date, number } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { createACoupons, getACoupon, resetState, updateACoupon } from "../features/coupon/couponSlice";

let userSchema = object({
  name: string().required(`Coupon name is Required`),
  expiry: date().required(`Expiry Date is Required`),
  discount: number().required(`Discount Percentage is Required`),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    updatedCoupon,
    couponDiscount,
    couponExpiry,
  } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
       dispatch(resetState());
    }
  }, [getCouponId]);
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon updated Successfully");
      navigate('/admin/coupon-list')
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdCoupon]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry || "",
      discount: couponDiscount || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = {id: getCouponId, couponData: values}
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createACoupons(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/list-brand");
        }, 3000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            label="Enter Expiry Data"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3 "
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
