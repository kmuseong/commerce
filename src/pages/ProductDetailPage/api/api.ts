import { ProductType } from '@/entities/product/type';
import supabase from '@/supabaseClient';

export const getProduct = async (id: string): Promise<ProductType> => {
    const { data, error } = await supabase
        .from('products')
        .select(
            `
            *,
            product_images (
                id,
                image_url
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

export const onDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
