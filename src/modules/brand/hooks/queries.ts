

import { useQuery } from "@tanstack/react-query";
import { getBrand } from "../service";
import { ParamsType } from "@types";
import { getCategories  } from "../service";
export function useBrand(params:ParamsType){
    return useQuery({
        queryKey:["brand", params],
        queryFn:() => getBrand(params),
    })
}

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories, // barcha kategoriyalarni olish funksiyasi
    });
}