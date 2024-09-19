import { CartProps } from '@/entities/cart/type';

export interface OrderReturnType {
    id: number;
    address_id: number;
    payment_id: string;
    status: string;
    total_amount: number;
    user_id: string;
    order_options?: CartProps[];
    created_at: string;
}
