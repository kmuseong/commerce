import { CartProps } from '@/entities/cart/type';
import { getOption } from '@/features/editCartButton/api/api';
import { useEditProductFormType } from '@/features/editCartButton/model/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const editProductSchema = z.object({
    roasting: z.string().min(1, { message: '로스팅 정도를 선택해주세요.' }),
    grind: z.string().min(1, { message: '분쇄도를 선택해주세요.' }),
    quantity: z.number().min(1, { message: '수량은 최소 1개 이상이어야 합니다.' }),
});

export const useEditProductForm = (id: number) => {
    const form = useForm<useEditProductFormType>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            roasting: '',
            grind: '',
            quantity: 0,
        },
    });

    const { data, isLoading } = useQuery<CartProps, Error>({
        queryKey: ['getOption', id],
        queryFn: () => getOption(id),
    });

    useEffect(() => {
        if (data) {
            form.reset({
                roasting: data.roasting,
                grind: data.grind,
                quantity: data.quantity,
            });
        }
    }, [data, form]);

    return { form, isLoading };
};
