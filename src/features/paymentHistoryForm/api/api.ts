import { OrderReturnType } from '@/entities/order/type';
import supabase from '@/supabaseClient';

export const getHistoryList = async (userId: string): Promise<OrderReturnType[]> => {
    const { data, error } = await supabase
        .from('orders')
        .select(
            `
            *,
            order_options (
              *,
            products ( *,
                product_images ( * )
                )
            )
        `
        )
        .eq('user_id', userId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
