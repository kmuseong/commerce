import { AddressFormType } from '@/entities/address/type';
import { getAddress } from '@/pages/AddressEditPage/api/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useEditAddressSchema = z.object({
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    phone: z.string().min(1, { message: '전화번호를 입력해주세요.' }),
    postalCode: z.string().min(1, { message: '우편번호를 입력해주세요.' }),
    streetAddress: z.string().min(1, { message: '주소를 입력해주세요.' }),
    detailAddress: z.string().min(1, { message: '상세 주소를 입력해주세요.' }),
    message: z.string().optional(),
    isDefault: z.boolean().optional(),
});

export const useEditAddressForm = (id: number) => {
    const form = useForm<AddressFormType>({
        resolver: zodResolver(useEditAddressSchema),
        defaultValues: {
            name: '',
            phone: '',
            postalCode: '',
            streetAddress: '',
            detailAddress: '',
            message: '',
            isDefault: false,
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ['getAddress'],
        queryFn: () => getAddress(Number(id)),
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name,
                phone: data.phone,
                postalCode: data.postal_code,
                streetAddress: data.street_address,
                detailAddress: data.detail_address,
                message: data.request_message,
                isDefault: data.is_default,
            });
        }
    }, [data, form]);

    return { form, isLoading };
};
