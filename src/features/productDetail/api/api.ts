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
