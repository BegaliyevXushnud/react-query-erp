

import { useQuery } from "@tanstack/react-query";
import { getBrandCategory } from "../service";
import { ParamsType } from "@types";
import { getBrandById  } from "../service";
export function useBrandCategories(params:ParamsType){
    return useQuery({
        queryKey:["brand-category", params],
        queryFn:() => getBrandCategory(params),
    })
}

export function useBrand() {
    return useQuery({
        queryKey: ["brand"],
        queryFn: getBrandById, 
    });
}