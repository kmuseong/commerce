import { ProductsType } from '@/features/recentProducts/model/type';
import supabase from '@/supabaseClient';

export const getRecentroducts = async () => {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select(
                `
          *,
          product_images(*)
        `
            )
            .limit(4);

        if (error) {
            return console.log({ error });
        }

        return products as ProductsType[];
    } catch (error) {
        console.log({ error });
    }
};
