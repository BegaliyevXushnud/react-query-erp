    // hooks/mutation.ts
    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import { createBrand, deleteBrand, updateBrand } from "../service";
    import { BrandType } from "../type";
    import { Notification } from "../../../utils/notification";

    // ============= Create ==============

    export function useCreateBrand() {
        const queryClient = useQueryClient();
        
        return useMutation({
            mutationFn: (data: FormData) => createBrand(data), 
            onSuccess: (response) => {
                Notification("success", response?.message); // Muvaffaqiyatli tugaganda notifikatsiya
            },
            onSettled: async (_, error) => {
                if (error) {
                    Notification("error", error?.message); // Xato bo'lsa, xatoni ko'rsatadi
                } else {
                    await queryClient.invalidateQueries({ queryKey: ["brand"] }); // "brand" querylarini qayta yuklash
                }
            },
        });
    }

    // =========== Update ===============
    export function useUpdateBrand() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data: BrandType) => updateBrand(data), // Expect BrandType here
            onSuccess: (response) => {
                Notification("success", response.message);
            },
            onSettled: async (_, error, variables) => {
                if (error) {
                    Notification("error", error.message);
                } else {
                    await queryClient.invalidateQueries({ queryKey: ["brand", { id: variables.id }] });
                }
            },
        });
    }

    // ============== Delete ==================
    export function useDeleteBrand() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: string | number) => deleteBrand(id),
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
