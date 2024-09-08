import { CartForm } from '@/features/cart';
import { getCarts } from '@/features/cart/api/api';
import { Header } from '@/widgets/header';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Home } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CartPage.module.css';
import { Button } from '@/shared/components/ui/button';
import { changePrice } from '@/shared/lib/utils';
import { Helmet } from 'react-helmet-async';

export const CartPage: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getCarts'],
        queryFn: getCarts,
    });

    const isAllSelected = data && selectedItems.length === data.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            if (data) {
                const allIds = data?.map((item) => item.id);
                setSelectedItems(allIds);
            }
        }
    };

    const toggleSelectItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    useEffect(() => {
        if (data) {
            const calculatedTotalPrice = data
                .filter((item) => selectedItems.includes(item.id))
                .reduce((sum, item) => {
                    return sum + parseFloat(item.products.price) * item.quantity;
                }, 0);

            setTotalPrice(calculatedTotalPrice);
        }
    }, [selectedItems, data]);

    if (isLoading) {
        return <div>로딩중..</div>;
    }

    return (
        <>
            <Helmet>
                <title>대충커피원두사이트 - 장바구니</title>
                <link rel="canonical" href="https://commerce-kappa-coral-63.vercel.app/cart" />
            </Helmet>

            <Header>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ChevronLeft onClick={() => navigate(-1)} />
                        <div>장바구니</div>
                    </div>

                    <Home onClick={() => navigate('/')} />
                </div>
                <div className="mt-5 font-normal">전체 {data?.length}</div>
            </Header>
            <main>
                <CartForm
                    data={data!}
                    isAllSelected={isAllSelected!}
                    selectedItems={selectedItems}
                    totalPrice={totalPrice}
                    toggleSelectAll={toggleSelectAll}
                    toggleSelectItem={toggleSelectItem}
                />
            </main>

            <div className={classes.space} />
            <nav className={classes.footerNav}>
                <Button className="w-full" disabled={selectedItems.length <= 0}>
                    {selectedItems.length > 0
                        ? `${changePrice(totalPrice)}원 구매하기 (${selectedItems.length}개)`
                        : '구매하기'}
                </Button>
            </nav>
        </>
    );
};
