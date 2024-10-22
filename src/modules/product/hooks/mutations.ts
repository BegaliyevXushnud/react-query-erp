
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct,deleteProduct, updateProduct } from "../service";
import { Product } from "../types";
import { Notification } from "../../../utils/notification";

// ============= Create ==============
export function useCreateProduct(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:Product) => createProduct(data),
        onSuccess:(response)=>{
            Notification("success", response?.message)
        },
        onSettled:async(_,error)=> {
            if(error){
                Notification("error", error?.message)
            }else{
                await queryClient.invalidateQueries({queryKey:["product"]})
            }
        }
    })
}
 

// =========== Update ===============
export function useUpdateProduct() {
    const queryClient= useQueryClient()
    return useMutation({
        mutationFn:(data:Product) => updateProduct(data),
        onSuccess:(response) => {
            Notification("success", response.message)
        },
        onSettled:async (_,error, variables)=>{
            if(error){
                Notification("error",error.message)
            }else{
                await queryClient.invalidateQueries({queryKey:["product",{id:variables}]})
            }
        }
    })
}

// ============== Delete ==================
// ============== Delete ==================
export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => deleteProduct(id),
        onSuccess: (response) => {
            Notification("success", response.message)
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["product"] });
            }
        }
    });
}
