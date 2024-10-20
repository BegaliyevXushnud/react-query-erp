// src/modules/sub-category/hooks/mutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategory, deleteSubCategory, updateSubCategory } from "../service";
import { SubCategorType } from "../type";
import { Notification } from "../../../utils/notification";

// ============= Create ============== 
export function useCreateSubCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SubCategorType) => createSubCategory(data),
        onSuccess: (response) => {
            Notification("success", response?.message);
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", (error as any)?.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["subcategory"] });
            }
        },
    });
}

// =========== Update =============== 
export function useUpdateSubCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number | string; data: SubCategorType }) => updateSubCategory(id, data),
        onSuccess: (response) => {
            Notification("success", response?.message);
        },
        onSettled: async (_, error, variables) => {
            if (error) {
                Notification("error", (error as any)?.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["subcategory", { id: variables.id }] });
            }
        },
    });
}

// ============== Delete ================== 
export function useDeleteSubCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteSubCategory(id),
        onSuccess: (response) => {
            Notification("success", response?.message);
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", (error as any)?.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["subcategory"] });
            }
        },
    });
}
