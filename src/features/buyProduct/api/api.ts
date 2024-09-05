import { AddCartProps } from '@/features/buyProduct/model/type';
import supabase from '@/supabaseClient';

export const addCart = async ({ userId, productId, option }: AddCartProps) => {
    console.log(option);

    const { data, error } = await supabase
        .from('carts')
        .insert([{ user_id: userId, product_id: productId, ...option }])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
