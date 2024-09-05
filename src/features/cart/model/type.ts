import { CartProps } from '@/entities/cart/type';

export interface CartFormProps {
    data: CartProps[];
    isAllSelected: boolean;
    selectedItems: number[];
    totalPrice: number;
    toggleSelectAll: () => void;
    toggleSelectItem: (id: number) => void;
}
