import { AddressType } from '@/entities/address/type';
import { CartProps } from '@/entities/cart/type';

export interface OrderState {
    address: AddressType | null;
    selectProducts: CartProps[];
    changeAddress: (form: AddressType) => void;
    immediateItem: (product: CartProps) => void;
    toggleSelectItem: (cart: CartProps) => void;
    toggleSelectAll: (isAllSelected: boolean, carts: CartProps[]) => void;
}
