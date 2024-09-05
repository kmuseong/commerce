import supabase from '@/supabaseClient';

export const onDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
