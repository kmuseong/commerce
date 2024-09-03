import { AddCartProps } from '@/features/buyProduct/model/type';
import supabase from '@/supabaseClient';

export const addCart = async ({ userId, productId, count }: AddCartProps) => {
    try {
        const { data } = await supabase
            .from('carts')
            .insert([{ user_id: userId, product_id: productId, count }])
            .select();

        console.log({ data });
        return data;
    } catch (error) {
        console.log({ error });
    }
};
