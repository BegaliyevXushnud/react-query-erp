

import axiosInstance from "@api";

import { ParamsType } from "@types";
import { Product } from "../types";


//=========== Get ============
export const getProduct = async (params:ParamsType = {search:"",limit:10, page:1})=>{
    const response = await axiosInstance.get("products/search",{
        params,
    });
    return response?.data?.data
}

// ======= Get Brand By category_Id ======
export const getBrandById = async (id:number | undefined) => {
    const response = await axiosInstance.get(`brand/category/${id}`)
    return response.data?.data
}
// ====== Get Brand Category by Brand_Id =========
export const getBrandCategoryById = async (id:number | undefined) => {
    const response = await axiosInstance.get(`brand-category/brand/${id}`)
    return response.data?.data
}
//======== Create ==============
// Product ni emas, FormData obyektini qabul qiladi
export const createProduct = async (data: FormData) => {
    const response = await axiosInstance.post("products/create", data, {
        headers: {
            "Content-Type": "multipart/form-data", // FormData yuborilayotganini ko'rsating
        },
    });
    return response?.data;
};


// ============== Update ===============
export const updateProduct = async (data:Product) => {
    const {id} = data;
    delete data.id;
    const response = await axiosInstance.patch(`products/update/${id}`,data)
    return response?.data
}

export const deleteProduct = async (id:string | number) => {
    const response = await axiosInstance.delete(`products/delete/${id}`);
    return response?.data
}