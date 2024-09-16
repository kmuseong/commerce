import { AddressType } from '@/entities/address/type';
import { CartProps } from '@/entities/cart/type';
import { OrderState } from '@/shared/stores/order/type';
import { create } from 'zustand';

const channel = new BroadcastChannel('order-channel');

export const useOrderStore = create<OrderState>((set) => ({
    address: null,
    selectProducts: [],
    changeAddress: (address: AddressType) => {
        set({ address });
        channel.postMessage({ address });
    },
    immediateItem: (product: CartProps) => {
        set({ selectProducts: [product] });
    },
    toggleSelectItem: (cart: CartProps) => {
        set((state) => {
            const isSelected = state.selectProducts.some((product) => product.id === cart.id);
            const updatedItems = isSelected
                ? state.selectProducts.filter((product) => product.id !== cart.id)
                : [...state.selectProducts, cart];

            channel.postMessage({ selectProducts: updatedItems });
            return { selectProducts: updatedItems };
        });
    },
    toggleSelectAll: (isAllSelected: boolean, carts: CartProps[]) => {
        set(() => {
            const updatedItems = isAllSelected ? [] : carts.map((item) => item);
            channel.postMessage({ selectProducts: updatedItems });
            return { selectProducts: updatedItems };
        });
    },
}));

channel.onmessage = (event) => {
    useOrderStore.setState(event.data);
};
