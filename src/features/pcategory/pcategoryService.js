import axios from "axios";
import { base_url } from "../../utils/base_url";
import {config} from  '../../utils/axiosconfig'

const getProductCategories = async() => {
    const response = await axios.get(`${base_url}category/`);
    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.date));
    }
    return response.data;
}

const getProductCategory= async (id) => {
    const response = await axios.get(`${base_url} category/${id}`, config);
    return response.data;
  };
  
  const deleteProductCategory = async (id) => {
    const response = await axios.delete(`${base_url} category/${id}`, config);
    return response.data;
  };

  const updateProductCategory = async (category) => {
    const response = await axios.put(
      `${base_url} category/${category.id}`,
       {title: category.categoryData.title},
      config
    );
    return response.data;
  };
const pCategoryService = {
    getProductCategories,
    getProductCategory,
    deleteProductCategory,
    updateProductCategory
};

export default pCategoryService;