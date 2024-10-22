
export interface RecordType {
    id:string | number,
    name:string
}
// src/types/index.ts or another relevant file
export interface Product {
    id?: string | number;
    name: string;
    price: number; // Add price field
    category_id: number; // Add category_id field
    brand_id: number; // Add brand_id field
    brand_category_id: number; // Add brand_category_id field
    files?: File; // Optionally add files for clarity
}
