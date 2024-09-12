import { addressSchema } from '@/features/addressForm/model/validation';
import { z } from 'zod';

export type AddressFormType = z.infer<typeof addressSchema>;

export interface AddressType extends AddressFormType {
    id: number;
}

export interface RequestAddressType {
    id: number;
    is_default: boolean;
    name: string;
    phone: string;
    postal_code: string;
    detail_address: string;
    request_message: string;
    street_address: string;
}

export interface AddressProps {
    form: AddressFormType;
    userId?: string;
    id?: number;
}
