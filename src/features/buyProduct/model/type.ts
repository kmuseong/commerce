import { buyProductSchema } from '@/features/buyProduct/model/validation';
import { z } from 'zod';

export interface BuyProductProps {
    price: string;
    id: number;
}

export type useBuyProductFormType = z.infer<typeof buyProductSchema>;
