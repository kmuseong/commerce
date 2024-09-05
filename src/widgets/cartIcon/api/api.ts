import { CartProps } from '@/entities/cart/type';
import supabase from '@/supabaseClient';

export const getCartListLength = async (id: string) => {
    const { data: carts, error } = await supabase.from('carts').select('*').eq('user_id', id); // 특정 유저의 카트 항목 가져오기

    if (error) {
        throw new Error(error.message);
    }

    const uniqueProducts = carts.reduce((acc, item) => {
        if (!acc.some((cartItem: CartProps) => cartItem.product_id === item.product_id)) {
            acc.push(item);
        }
        return acc;
    }, []);

    return uniqueProducts.length;
};
