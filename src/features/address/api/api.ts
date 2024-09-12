import { AddressType } from '@/entities/address/type';
import supabase from '@/supabaseClient';

export const getSelectAddress = async (userId: string): Promise<AddressType | null> => {
    const { data, error } = await supabase
        .from('address')
        .select('*')
        .eq('user_id', userId)
        .eq('is_default', true)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    const formatData = {
        id: data.id,
        isDefault: data.is_default,
        name: data.name,
        phone: data.phone,
        postalCode: data.postal_code,
        message: data.request_message,
        streetAddress: data.street_address,
        detailAddress: data.detail_address,
    };

    return formatData;
};
