import { ProductType } from '@/pages/ProductDetailPage/model/type';
import supabase from '@/supabaseClient';

export const getProduct = async (id: string) => {
    try {
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

        if (error) console.log({ error });

        return data?.[0] as ProductType;
    } catch (error) {
        console.log({ error });
    }
};

export const onDeleteProduct = async (id: string) => {
    try {
        await supabase.from('products').delete().eq('id', id);
    } catch (error) {
        console.log({ error });
    }
};
