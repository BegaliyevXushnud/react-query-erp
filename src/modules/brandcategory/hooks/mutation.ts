// hooks/mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrandCategory, deleteBrandCategory, updateBrandCategory } from "../service"; 
import { BrandCategoryType } from "../type"; 
import { Notification } from "../../../utils/notification";

// ============= Create ==============
export function useCreateBrandCategory() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: BrandCategoryType) => createBrandCategory(data), 
        onSuccess: (response) => {
            Notification("success", response?.message);
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error?.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["brand-category"] });
            }
        },
    });
}

// =========== Update ================
export function useUpdateBrandCategory() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: BrandCategoryType) => updateBrandCategory(data), // BrandCategoryType qabul qilishi
        onSuccess: (response) => {
            Notification("success", response.message);
        },
        onSettled: async (_, error, variables) => {
            if (error) {
                Notification("error", error.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["brand", { id: variables.id }] }); // Variables.id ni bevosita ishlating
            }
        },
    });
}

// ============== Delete ==================
export function useDeleteBrandCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteBrandCategory(id),
        onSuccess: (response) => {
            Notification("success", response.message);
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["category"] });
            }
        },
    });
}
