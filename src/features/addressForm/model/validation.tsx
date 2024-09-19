import { AddressFormType } from '@/entities/address/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const addressSchema = z.object({
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    phone: z.string().min(1, { message: '전화번호를 입력해주세요.' }),
    postalCode: z.string().min(1, { message: '우편번호를 입력해주세요.' }),
    streetAddress: z.string().min(1, { message: '주소를 입력해주세요.' }),
    detailAddress: z.string().min(1, { message: '상세 주소를 입력해주세요.' }),
    message: z.string().optional(),
    isDefault: z.boolean().optional(),
});

export const useAddressForm = () => {
    const form = useForm<AddressFormType>({
        resolver: zodResolver(addressSchema),
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

    return form;
};
