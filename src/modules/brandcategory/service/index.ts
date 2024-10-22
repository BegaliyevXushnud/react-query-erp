
import axiosInstance from "@api";

import { ParamsType } from "@types";
import { BrandCategoryType} from "../type";


//=========== Get ============
export const getBrandCategory = async (params:ParamsType = {search:"",limit:10, page:1})=>{
    const response = await axiosInstance.get("brand-category/search",{
        params,
    });
    return response?.data?.data
}

// Get BrandCategory By Id brand id ========
export const getBrandById = async () => {
    const response = await axiosInstance.get("brand/search   ");
    return response?.data?.data.brands;  
};

//======== Create ==============
export const createBrandCategory = async (data:FormData) => {
    const response = await axiosInstance.post("brand-category/create", data);
    return response?.data?.data
}

// ============== Update ===============
export const updateBrandCategory = async (data: BrandCategoryType) => {
    const { id, ...rest } = data;
    const response = await axiosInstance.patch(`brand-category/update/${id}`, rest); 
    return response?.data;
};


export const deleteBrandCategory = async (id:string | number) => {
    const response = await axiosInstance.delete(`brand-category/delete/${id}`);
    return response?.data
}