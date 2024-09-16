import { CartFormProps, CartProps } from '@/entities/cart/type';
import supabase from '@/supabaseClient';

export const addCart = async ({ userId, productId, option }: CartFormProps): Promise<CartProps> => {
    const { data, error } = await supabase
        .from('carts')
        .insert([{ user_id: userId, product_id: productId, ...option }])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    const result = await addCartsItemInfo(data[0].id);

    return result;
};

export const addCartsItemInfo = async (id: number): Promise<CartProps> => {
    const { data, error } = await supabase
        .from('carts')
        .select(
            `
        *,
        products (
          *,
          product_images (*)
        )
      `
        )
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
