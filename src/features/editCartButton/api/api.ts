import { CartProps } from '@/entities/cart/type';
import { EditCartProps } from '@/features/editCartButton/model/type';
import supabase from '@/supabaseClient';

export const getOption = async (id: number) => {
    const { data, error } = await supabase.from('carts').select('*').eq('id', id).single();

    if (error) {
        throw new Error(error.message);
    }

    return data as CartProps;
};

export const editOption = async ({ id, option }: EditCartProps) => {
    console.log(id, option);

    const { data, error } = await supabase
        .from('carts')
        .update({ ...option })
        .eq('id', id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
