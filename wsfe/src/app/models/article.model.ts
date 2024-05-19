import { Category } from "./category.model";

export interface Article{
    id: number;
    title: string;
    description: string;
    type: Category
    createddate: Date;
}