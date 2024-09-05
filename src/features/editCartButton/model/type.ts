import { OptionType } from '@/entities/cart/type';
import { editProductSchema } from '@/features/editCartButton/model/validation';
import { z } from 'zod';

export interface EditCartButtonProps {
    price: string;
    id: number;
}

export interface EditCartProps {
    id: number;
    option: OptionType;
}

export type useEditProductFormType = z.infer<typeof editProductSchema>;
