import { AddressType } from '@/entities/address/type';
import { OrderState } from '@/shared/stores/order/type';
import { create } from 'zustand';

const channel = new BroadcastChannel('order-channel');

export const useOrderStore = create<OrderState>((set) => ({
    address: null,
    changeAddress: (address: AddressType) => {
        set({ address });
        channel.postMessage({ address });
    },
}));

channel.onmessage = (event) => {
    useOrderStore.setState(event.data);
};
