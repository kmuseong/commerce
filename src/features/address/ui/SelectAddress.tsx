import { getSelectAddress } from '@/features/address/api/api';
import { Button } from '@/shared/components/ui/button';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';
import { Address } from '@/widgets/address';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export const SelectAddress: React.FC = () => {
    const { user } = useAuthStore();
    const { address, changeAddress } = useOrderStore();

    const { data, isLoading } = useQuery({
        queryKey: ['selectAddress'],
        queryFn: () => getSelectAddress(user?.id as string),
    });

    const openAddressWindow = () => {
        const newWindow = window.open(
            `/my/address?select=${address?.id}`,
            '주소설정',
            'width=600,height=800,left=100,top=100'
        );

        if (newWindow) {
            const timer = setInterval(() => {
                if (newWindow.closed) {
                    clearInterval(timer);
                }
            }, 500);
        }
    };

    useEffect(() => {
        changeAddress(data!);
    }, [changeAddress, data]);

    if (isLoading) {
        return <div>로딩중..</div>;
    }

    return (
        <div className="flex flex-col gap-2 p-4">
            {!data ? '배송지가 없습니다. 배송지를 추가해 주세요.' : <Address item={address || data} />}

            <Button onClick={openAddressWindow} variant="outline">
                주소설정
            </Button>
        </div>
    );
};
