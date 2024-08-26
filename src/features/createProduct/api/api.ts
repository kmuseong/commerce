import { CreateFormType } from '@/features/createProduct/model/type';
import supabase from '@/supabaseClient';

export const onAddProduct = async (form: CreateFormType) => {
    try {
        const { data, error } = await supabase.from('products').insert([form]).select();

        if (error) {
            return console.log({ error });
        }

        return data[0];
    } catch (error) {
        console.log({ error });
    }
};
