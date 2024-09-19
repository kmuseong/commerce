import { ProductType } from '@/entities/product/type';
import supabase from '@/supabaseClient';

export const getProducts = async (): Promise<ProductType[] | null> => {
    const { data: products, error } = await supabase.from('products').select(
        `
          *,
          product_images(*)
        `
    );

    if (error) {
        throw new Error(error.message);
    }

    return products;
};
