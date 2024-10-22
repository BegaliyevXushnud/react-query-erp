
import axiosInstance from "@api";

import { ParamsType } from "@types";
import { RecordType } from "../type";


//=========== Get ============
export const getBrand = async (params:ParamsType = {search:"",limit:10, page:1})=>{
    const response = await axiosInstance.get("brand/search",{
        params,
    });
    return response?.data?.data
}

// Get Brand By Id category id ========
export const getCategories = async () => {
    const response = await axiosInstance.get("category/search   ");
    return response?.data?.data.categories;  
};

//======== Create ==============
export const createBrand = async (data:FormData) => {
    const response = await axiosInstance.post("brand/create", data);
    return response?.data?.data
}

// ============== Update ===============
export const updateBrand = async (data: RecordType) => {
    const { id, ...rest } = data;
    const response = await axiosInstance.patch(`brand/update/${id}`, rest); // category_id ni olib tashladik
    return response?.data;
};


export const deleteBrand = async (id:string | number) => {
    const response = await axiosInstance.delete(`brand/delete/${id}`);
    return response?.data
}