

// import axiosInstance from "@api";

// import { ParamsType } from "@types";
// import { Category } from "../type";


// //=========== Get ============
// export const getCategory = async (params:ParamsType = {search:"",limit:10, page:1})=>{
//     const response = await axiosInstance.get("ads/search",{
//         params,
//     });
//     return response?.data?.data
// }

// //======== Create ==============
// export const createCategory = async (data:Category) => {
//     const response = await axiosInstance.post("ads/create", data);
//     return response?.data
// }

// // ============== Update ===============
// export const updateCategory = async (data:Category) => {
//     const {id} = data;
//     delete data.id;
//     const response = await axiosInstance.patch(`ads/update/${id}`,data)
//     return response?.data
// }

// export const deleteCategory = async (id:string | number) => {
//     const response = await axiosInstance.delete(`ads/delete/${id}`);
//     return response?.data
// }