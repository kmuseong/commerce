import supabase from '@/supabaseClient';

export const onDeleteProduct = async (id: string) => {
    try {
        await supabase.from('products').delete().eq('id', id);
    } catch (error) {
        console.log({ error });
    }
};
