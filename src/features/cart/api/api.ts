import { CartProps } from '@/entities/cart/type';
import supabase from '@/supabaseClient';

export const getCarts = async (): Promise<CartProps[] | null> => {
    const { data, error } = await supabase.from('carts').select(`
          *,
          products (
            *,
            product_images (*)
          )
        `);

    if (error) {
        throw new Error(error.message);
    }

    const mergedData: CartProps[] = [];

    data.forEach((cartItem: CartProps) => {
        const existingItemIndex = mergedData.findIndex((item) => item.product_id === cartItem.product_id);

        if (existingItemIndex !== -1) {
            mergedData[existingItemIndex].quantity += cartItem.quantity;
        } else {
            mergedData.push(cartItem);
        }
    });

    return mergedData;
};

export const deleteCartProduct = async (id: number) => {
    const { error } = await supabase.from('carts').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
