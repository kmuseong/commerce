import { AddressProps } from '@/entities/address/type';
import supabase from '@/supabaseClient';

const resetDefault = async (isDefault: boolean, userId: string) => {
    if (isDefault) {
        const { error } = await supabase
            .from('address')
            .update({ is_default: false })
            .eq('user_id', userId)
            .eq('is_default', true);

        if (error) {
            throw new Error(error.message);
        }
    }
};

const checkExistingAddresses = async (userId: string) => {
    const { data, error } = await supabase.from('address').select('*').eq('user_id', userId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const onAddAddress = async ({ form, userId }: AddressProps) => {
    const existingAddresses = await checkExistingAddresses(userId!);

    if (existingAddresses.length === 0) {
        form.isDefault = true;
    }

    await resetDefault(form.isDefault!, userId!);

    const { error } = await supabase
        .from('address')
        .insert([
            {
                name: form.name,
                phone: form.phone,
                postal_code: form.postalCode,
                street_address: form.streetAddress,
                detail_address: form.detailAddress,
                request_message: form.message,
                is_default: form.isDefault,
                user_id: userId,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }
};
