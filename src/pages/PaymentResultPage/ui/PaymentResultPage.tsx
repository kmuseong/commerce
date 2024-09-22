import { confrimPayment } from '@/pages/PaymentResultPage/api/api';
import { Header } from '@/widgets/header';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import classes from './PaymentResultPage.module.css';
import { Button } from '@/shared/components/ui/button';
import { changePrice } from '@/shared/lib/utils';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon } from '@/widgets/icon';

export const PaymentResultPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentId } = location.state || {};

    const { data, isLoading } = useQuery({
        queryKey: ['confirmPayment'],
        queryFn: () => confrimPayment(paymentId),
    });

    if (isLoading) {
        return <div>로딩중..</div>;
    }

    if (!paymentId) return <Navigate to={'/'} />;

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 결제 정보</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/payment/${paymentId}`} />
            </Helmet>

            <div className="flex flex-col h-screen justify-around">
                <Header>
                    <div className="flex gap-2">
                        <BackIcon />
                        결제
                    </div>
                </Header>

                <div className={classes.container}>
                    <div className={classes.message}>
                        <div className={classes.title}>결제 완료</div>
                        <p>주문이 성공적으로 접수되었습니다.</p>

                        <div className="flex gap-4">
                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={() => navigate('/my/payment/history')}
                            >
                                주문내역 보기
                            </Button>
                            <Button className="w-full">계속 쇼핑하기</Button>
                        </div>
                    </div>

                    <div className={classes.content}>
                        <div className={classes.item}>
                            <h3>주문 번호</h3>
                            <p>{data?.id}</p>
                        </div>

                        <div className={classes.item}>
                            <h3>상품 정보</h3>
                            <div className="space-y-2">
                                <p>{data?.orderName}</p>
                                <p className="font-bold">{changePrice(data?.amount.total as number)}원</p>
                            </div>
                        </div>

                        <div className={classes.item}>
                            <h3>결제일</h3>
                            <p>{new Date(data?.paidAt as string).toLocaleString()}</p>
                        </div>

                        <div className={classes.item}>
                            <h3>배송지</h3>

                            <div className="space-y-2">
                                <p>{data?.customer.name}</p>
                                <p>{data?.customer.phoneNumber}</p>
                                <div>
                                    <p className="break-keep">{data?.customer.address.oneLine}</p>

                                    <p>({data?.customer.zipcode})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
