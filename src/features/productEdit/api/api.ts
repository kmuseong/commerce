import { ProductType, UpdateFormType } from '@/features/productEdit/model/type';
import supabase from '@/supabaseClient';

export const getProduct = async (id: string) => {
    try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id);

        if (error) console.log({ error });

        return data?.[0];
    } catch (error) {
        console.log({ error });
    }
};

export const updateProduct = async (id: string, form: UpdateFormType): Promise<ProductType | null> => {
    try {
        const { data, error } = await supabase.from('products').update(form).eq('id', id).select();

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return null;
        }

        return data[0] as ProductType;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};
