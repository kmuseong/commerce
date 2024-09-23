import { ProductType } from '@/entities/product/type';
import supabase from '@/supabaseClient';

export const getRecentroducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select(
            `
          *,
          product_images(*)
        `
        )
        .limit(6);

    if (error) {
        throw new Error(error.message);
    }

    return products as ProductType[];
};
