import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  getAProductCategory,
  updateAProductCategory
} from "../features/pcategory/pcategorySlice";

let userSchema = object({
  title: string().required(`Category name is Required`),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getpCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory, updatedCategory,categoryName } =
    newCategory;
  useEffect(() => {
    if (getpCatId !== undefined) {
      dispatch(getAProductCategory(getpCatId));
      //formik.values.title = brandName
    } 
  }, [getpCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully");
    }
   
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading,createdCategory]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getpCatId !== undefined) {
        const data = { id: getpCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
      } else {
        dispatch(updateAProductCategory(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/category-list");
        }, 3000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getpCatId !== undefined ? "Edit" : " "}
        Add Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getpCatId !== undefined ? "Edit" : " "} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
