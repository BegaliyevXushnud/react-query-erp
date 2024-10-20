export interface SubCategorType {
    id:number | string;
    name: string;
    parent_category_id: number
    createdAt?: string;
}
export interface SubModalPropType {
    open: boolean;
    handleCancel: () => void;
    update: SubCategorType | null; 
    onSubmit: (values: SubCategorType) => void; // onSubmit xususiyati
  }
  