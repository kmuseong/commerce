import { ProductType } from '@/entities/product/type';

export interface CartProps {
    id?: number;
    quantity: number;
    roasting: string;
    grind: string;
    products: ProductType;
    user_id: string;
    product_id: number;
}

export interface CartFormProps {
    userId: string;
    productId: number;
    option: OptionType;
}

export interface OptionType {
    roasting: string;
    grind: string;
    quantity: number;
}
