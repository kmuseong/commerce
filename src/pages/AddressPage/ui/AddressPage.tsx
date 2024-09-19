import { deleteAddress, getAddressList } from '@/pages/AddressPage/api/api';
import { Button } from '@/shared/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classes from './AddressPage.module.css';
import { X } from 'lucide-react';
import { Loading } from '@/widgets/Load';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { Address } from '@/widgets/address';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';
import { AddressType } from '@/entities/address/type';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';

export const AddressPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { address, changeAddress } = useOrderStore();
    const { user } = useAuthStore();
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
    const [searchParams] = useSearchParams();

    const addressNumber = Number(searchParams.get('select'));

    const { data } = useQuery({
        queryKey: ['getAddressList'],
        queryFn: () => getAddressList(user?.id as string),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['deleteAddress'],
        mutationFn: deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAddressList'],
            });
        },
    });

    const handleCloseWindow = () => {
        window.close();
    };

    const onChangeAddress = (form: AddressType) => {
        changeAddress(form);
        handleCloseWindow();
    };

    useEffect(() => {
        if (!address && data) {
            const defaultAddress = data.find((item) => item.isDefault);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            }
        }
    }, [address, data]);

    useEffect(() => {
        if (data) {
            const addressToSelect = data.find((item) => item.id === addressNumber);
            if (addressToSelect) {
                setSelectedAddress(addressToSelect);
            }
        }
    }, [addressNumber, data]);

    if (isPending) {
        return <Loading>주소 삭제 중입니다</Loading>;
    }

    return (
        <div>
            <Helmet>
                <title>{LOGO_NAME} - 배송지 목록</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/my/address`} />
            </Helmet>

            <header className="p-4 flex justify-between items-center">
                <div className="font-bold">배송지 정보</div>
                <X className="cursor-pointer" onClick={handleCloseWindow} />
            </header>

            <main className="flex flex-col gap-3 p-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/my/address/create')}>
                    배송지 추가하기
                </Button>

                <ul className="flex flex-col gap-2 h-full space-y-4">
                    {data?.map((item) => {
                        return (
                            <li key={item.id} className={classes.container}>
                                <input
                                    type="radio"
                                    name="select"
                                    className="mt-1"
                                    checked={selectedAddress?.id === item.id}
                                    onChange={() => {
                                        setSelectedAddress(item);
                                    }}
                                />
                                <div className="flex flex-col gap-2">
                                    <Address item={item} />

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate(`/my/address/${item.id}/edit`)}
                                        >
                                            수정하기
                                        </Button>

                                        {!item.isDefault && (
                                            <Button variant="outline" onClick={() => mutate(item.id)}>
                                                삭제하기
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </main>
            <div className="h-16" />
            <footer className={classes.footer}>
                <Button
                    className="w-full"
                    onClick={() => {
                        if (selectedAddress) {
                            onChangeAddress(selectedAddress);
                        }
                    }}
                >
                    변경하기
                </Button>
            </footer>
        </div>
    );
};
