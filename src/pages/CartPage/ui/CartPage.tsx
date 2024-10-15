import { CartForm } from '@/features/cart';
import { getCarts } from '@/features/cart/api/api';
import { Header } from '@/widgets/header';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CartPage.module.css';
import { Button } from '@/shared/components/ui/button';
import { changePrice } from '@/shared/lib/utils';
import { Helmet } from 'react-helmet-async';
import { SkeletonUi } from '@/pages/CartPage/lib/SkeletonUi';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon, HomeIcon } from '@/widgets/icon';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { RecentProducts } from '@/features/recentProducts';
import { Footer } from '@/widgets/footer';

export const CartPage: React.FC = () => {
    const { selectProducts } = useOrderStore();
    const { user } = useAuthStore();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getCarts'],
        queryFn: () => getCarts(user?.id as string),
        enabled: !!user,
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
                <title>{LOGO_NAME} - 장바구니</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/cart`} />
            </Helmet>

            <Header>
                <div className={classes.header}>
                    <div className={classes['header-title']}>
                        <BackIcon />
                        <div>장바구니</div>
                    </div>

                    <HomeIcon />
                </div>
                {data && <div className={classes['cart-count']}>전체 {data?.length}</div>}
            </Header>
            <main>
                {data && data.length > 0 ? (
                    <CartForm data={data} />
                ) : (
                    <div>
                        <div className="text-center py-28 space-y-4">
                            <div>장바구니에 담은 상품이 없습니다.</div>
                            {!user?.id && (
                                <Button size="sm" onClick={() => navigate('/login')}>
                                    로그인
                                </Button>
                            )}
                        </div>

                        <div>
                            <div className="px-4">Recent Products</div>
                            <RecentProducts />
                        </div>
                    </div>
                )}
            </main>

            <Footer className="bg-white">
                {data ? (
                    <Button className="w-full" disabled={selectProducts.length <= 0} onClick={() => navigate('/order')}>
                        {selectProducts.length > 0
                            ? `${changePrice(totalPrice)}원 구매하기 (${selectProducts.length}개)`
                            : '구매하기'}
                    </Button>
                ) : (
                    <Button className="w-full" onClick={() => navigate(-1)}>
                        쇼핑하러 가기
                    </Button>
                )}
            </Footer>
        </>
    );
};
