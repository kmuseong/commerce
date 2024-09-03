import { CartProps } from '@/entities/cart/type';
import supabase from '@/supabaseClient';

export const getCarts = async (): Promise<CartProps[] | null> => {
    try {
        const { data, error } = await supabase.from('carts').select(`
          *,
          products (
            *,
            product_images (*)
          )
        `);

        if (error) {
            console.log({ error });
            return null;
        }

        const mergedData: CartProps[] = [];

        data.forEach((cartItem: CartProps) => {
            const existingItemIndex = mergedData.findIndex((item) => item.product_id === cartItem.product_id);

            if (existingItemIndex !== -1) {
                mergedData[existingItemIndex].count += cartItem.count;
            } else {
                mergedData.push(cartItem);
            }
        });

        return mergedData;
    } catch (error) {
        console.log({ error });
        return null;
    }
};

export const deleteCartProduct = async (id: number) => {
    try {
        await supabase.from('carts').delete().eq('id', id);
    } catch (error) {
        console.log(error);
    }
};
