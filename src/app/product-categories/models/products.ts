// src/app/models/products.ts
import { Category } from './category';

export class Products {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stockQuantity!: number;
  imageUrl!: string;
  brand!: string;
  sku!: string;
  discountPercentage!: number;
  isActive: boolean = true;
  category!: Category;
}
