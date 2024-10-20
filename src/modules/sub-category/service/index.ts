import axiosInstance from "@api";
import { SubCategorType } from "../type";

// ========================================  GET SUB_CATEGORY  ============================================
// ========================================  GET SUB_CATEGORY  ============================================
export const getSubCategory = async (parent_id: number) => {
    if (isNaN(parent_id)) {
        throw new Error("Invalid parent_id"); // Xatolikni aniqlash
    }
    const response = await axiosInstance.get(`/sub-category/search/${parent_id}`); // parent_id yordamida API ga so'rov yuborish
    return response?.data;
};
// ========================================  CREATE SUB_CATEGORY  ============================================
export const createSubCategory = async (data: SubCategorType) => {
    const response = await axiosInstance.post("sub-category/create", data);
    return response?.data;
};

// ========================================  UPDATE SUB_CATEGORY  ============================================
export const updateSubCategory = async (id: number | string, data: SubCategorType) => {
    const response = await axiosInstance.put(`sub-category/update/${id}`, data);
    return response?.data;
};

// ========================================  DELETE SUB_CATEGORY  ============================================
export const deleteSubCategory = async (id: number | string) => {
    const response = await axiosInstance.delete(`/sub-category/delete/${id}`);
    return response?.data;
};
