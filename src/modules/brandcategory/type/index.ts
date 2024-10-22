    // types.ts
    export interface RecordType {
        id?: string | number;
        name: string | undefined;
    }

    export interface BrandCategoryType {
        id: string | number | undefined;
        name: string;
        brand_id: number;
    }
