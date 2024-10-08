import { AddressProps, RequestAddressType } from '@/entities/address/type';
import supabase from '@/supabaseClient';

export const getAddress = async (id: number): Promise<RequestAddressType | null> => {
    const { data, error } = await supabase.from('address').select('*').eq('id', id).single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const updateAddress = async ({ form, id }: AddressProps) => {
    if (form.isDefault) {
        const { error: updateError } = await supabase
            .from('address')
            .update({ is_default: false })
            .eq('is_default', true)
            .neq('id', id);

        if (updateError) {
            throw new Error(updateError.message);
        }
    }

    const { data, error } = await supabase
        .from('address')
        .update({
            name: form.name,
            phone: form.phone,
            postal_code: form.postalCode,
            street_address: form.streetAddress,
            detail_address: form.detailAddress,
            request_message: form.message,
            is_default: form.isDefault,
        })
        .eq('id', id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
