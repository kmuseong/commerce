import { AddressType } from '@/entities/address/type';
import { CartProps } from '@/entities/cart/type';

export interface ProcessPaymentProps {
    carts: CartProps[];
    address: AddressType;
    userId: string;
}

export interface PaymentProps {
    totalPrice: number;
    isDisabled: boolean;
}

export interface SaveToPaymentProps {
    paymentId: string;
    addressId: number;
    totalAmount: number;
    userId: string;
}

export interface SaveToPaymentOptionProps {
    orderId: number;
    carts: CartProps[];
}
