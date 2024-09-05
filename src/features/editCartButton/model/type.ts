import { editProductSchema } from '@/features/editCartButton/model/validation';
import { z } from 'zod';

export interface BuyProductProps {
    price: string;
    id: number;
}

export interface EditCartProps {
    id: number;
    option: OptionType;
}

interface OptionType {
    roasting: string;
    grind: string;
    quantity: number;
}

export interface CartProps {
    id: number;
    quantity: number;
    roasting: string;
    grind: string;
    products: ProductType;
    user_id: string;
    product_id: number;
}

interface ProductType {
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
    product_images: ProductImageType[];
}

interface ProductImageType {
    id: number;
    image_url: string;
}

export type useEditProductFormType = z.infer<typeof editProductSchema>;
