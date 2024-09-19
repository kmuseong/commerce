import { ProductType } from '@/entities/product/type';
import supabase from '@/supabaseClient';

export const getProduct = async (id: string): Promise<ProductType | null> => {
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
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    return data?.[0];
};

export const onDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
