// types.ts or paramsType.ts (file name as per your preference)
import { SubCategorType } from "../modules/sub-category/type";
export interface ParamsType {
    limit?: number | undefined;
    page?: number | undefined;
    search?: string | undefined;
  }
  // types.ts or paramsType.ts (file name as per your preference)
export interface ModalPropType {
  id?: number | string;
  open: boolean;
  update: SubCategorType | null; // SubCategorType ni qo'shish
  handleClose: () => void;
  onSubmit: (values: SubCategorType) => void; // onSubmit xususiyati
}
