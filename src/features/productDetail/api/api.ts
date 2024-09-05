import supabase from '@/supabaseClient';

export const getProduct = async (id: string) => {
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
