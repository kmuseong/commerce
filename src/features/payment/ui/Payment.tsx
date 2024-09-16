import { increaseProductsStock, processPayment } from '@/features/payment/api/api';
import { PaymentProps, ProcessPaymentProps } from '@/features/payment/model/type';
import { Button } from '@/shared/components/ui/button';
import { changePrice } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Payment: React.FC<PaymentProps> = ({ totalPrice, isDisabled }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { address, selectProducts } = useOrderStore();
    const { user } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationKey: ['payment'],
        mutationFn: ({ carts, address, userId }: ProcessPaymentProps) => processPayment({ carts, address, userId }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['getCarts'],
            });
            navigate(`/payment/${response?.paymentId}`, { state: { paymentId: response?.paymentId } });
        },
        onError: async (error) => {
            console.error('오류 발생', error);
            await increaseProductsStock(selectProducts.map((item) => item.products));
        },
    });

    if (isPending) {
        return <Button className="w-full">결제 진행중</Button>;
    }

    return (
        <Button
            className="w-full"
            disabled={isDisabled}
            onClick={() => mutate({ carts: selectProducts, address: address!, userId: user?.id as string })}
        >
            {changePrice(totalPrice)}원 결제하기
        </Button>
    );
};
