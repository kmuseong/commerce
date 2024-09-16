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
import { SkeletonUi } from '@/pages/CartPage/lib/SkeletonUi';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';

export const CartPage: React.FC = () => {
    const { selectProducts } = useOrderStore();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getCarts'],
        queryFn: getCarts,
    });

    useEffect(() => {
        if (data) {
            const calculatedTotalPrice = data
                .filter((item) => selectProducts.includes(item))
                .reduce((sum, item) => {
                    return sum + parseFloat(item.products.price) * item.quantity;
                }, 0);

            setTotalPrice(calculatedTotalPrice);
        }
    }, [selectProducts, data]);

    if (isLoading) {
        return <SkeletonUi />;
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
                <CartForm data={data!} />
            </main>

            <div className={classes.space} />
            <nav className={classes.footerNav}>
                <Button className="w-full" disabled={selectProducts.length <= 0} onClick={() => navigate('/order')}>
                    {selectProducts.length > 0
                        ? `${changePrice(totalPrice)}원 구매하기 (${selectProducts.length}개)`
                        : '구매하기'}
                </Button>
            </nav>
        </>
    );
};
