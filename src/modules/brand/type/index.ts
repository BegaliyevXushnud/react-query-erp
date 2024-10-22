// types.ts
export interface RecordType {
    id?: string | number;
    name: string | undefined;
}

export interface BrandType {
    id?: string | number;
    name: string;
    category_id?: string | Blob;
    file?: File;
    description: string;
}
