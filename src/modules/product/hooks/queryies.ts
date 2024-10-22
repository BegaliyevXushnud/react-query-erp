
import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrandById,getBrandCategoryById,getProduct } from "../service";



// ====== Get Product =========
export function useProduct(params:ParamsType){
    return useQuery({
        queryKey:["product", params],
        queryFn:() => getProduct(params),
    })
}

// ============= Get Brand By Category_Id ========
export function useBrandById(id:number){
    return useQuery({
        queryKey:["brand",id],
        queryFn:() => getBrandById(id)
    })
}
// ========= Get Brand Category By Brand-Id ===========
export function useBrandCategoryById(id:number){
    return useQuery({
        queryKey:["brand-category",id],
        queryFn:()=> getBrandCategoryById(id)
    })
}