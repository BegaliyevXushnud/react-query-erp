
export interface RecordType {
    id:string | number,
    name:string
}
export interface BrandType {
    id?:string | number
    name:string,
    category_id?:string | Blob,
    file?:FormData,
    description:string
}