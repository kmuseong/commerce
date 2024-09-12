import { AddressType } from '@/entities/address/type';

export interface OrderState {
    address: AddressType | null;
    changeAddress: (form: AddressType) => void;
}
