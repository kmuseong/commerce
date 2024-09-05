import { buyProductSchema } from '@/features/buyProduct/model/validation';
import { z } from 'zod';

export interface BuyProductProps {
    price: string;
    id: number;
}

export interface AddCartProps {
    userId: string;
    productId: number;
    option: OptionType;
}

interface OptionType {
    roasting: string;
    grind: string;
    quantity: number;
}

export type useBuyProductFormType = z.infer<typeof buyProductSchema>;
