import { useBuyProductFormType } from '@/features/buyProduct/model/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const buyProductSchema = z.object({
    roasting: z.string().min(1, { message: '로스팅 정도를 선택해주세요.' }),
    grind: z.string().min(1, { message: '분쇄도를 선택해주세요.' }),
    quantity: z.number().min(1, { message: '수량은 최소 1개 이상이어야 합니다.' }),
});

export const useBuyProductForm = () => {
    const form = useForm<useBuyProductFormType>({
        resolver: zodResolver(buyProductSchema),
        defaultValues: {
            roasting: '',
            grind: '',
            quantity: 1,
        },
    });

    return form;
};
