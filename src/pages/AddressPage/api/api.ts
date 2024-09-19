import { AddressType, RequestAddressType } from '@/entities/address/type';
import supabase from '@/supabaseClient';

export const getAddressList = async (userId: string): Promise<AddressType[] | null> => {
    const { data, error } = await supabase
        .from('address')
        .select('*')
        .eq('user_id', userId)
        .order('is_default', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    // 데이터를 원하는 형식으로 변환
    const formattedData: AddressType[] = data.map((item: RequestAddressType) => ({
        id: item.id,
        isDefault: item.is_default,
        name: item.name,
        phone: item.phone,
        postalCode: item.postal_code,
        message: item.request_message,
        streetAddress: item.street_address,
        detailAddress: item.detail_address,
    }));

    return formattedData;
};

export const deleteAddress = async (id: number) => {
    const { error } = await supabase.from('address').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
