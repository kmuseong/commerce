import { getHistoryList } from '@/features/paymentHistoryForm/api/api';
import { changePrice } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './PaymentHistoryForm.module.css';
import { formatDate } from 'date-fns';

export const PaymentHistoryForm: React.FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getHistoryList', user?.id],
        queryFn: () => getHistoryList(user?.id as string),
    });

    const goToProductDetail = (id: number) => {
        navigate(`/product/${id}`);
    };

    if (isLoading) {
        return <div>로딩중..</div>;
    }

    return (
        <div>
            <ul className={classes.list}>
                {data?.map((item) => {
                    const formatItem = item?.order_options?.[0];

                    return (
                        <li key={item.id}>
                            <div className={classes.header}>
                                <p className={classes.date}>{formatDate(item.created_at, 'yy.MM.dd')}</p>
                                <Link to="#" className="text-xs underline text-gray-500">
                                    주문 상세
                                </Link>
                            </div>
                            <div className={classes.status}>{item.status}</div>
                            <div className={classes.card}>
                                <img
                                    className={classes.image}
                                    src={formatItem?.products?.product_images?.[0]?.image_url || ''}
                                    alt={`${formatItem?.products?.name || '상품'} 이미지`}
                                    onClick={() => goToProductDetail(formatItem?.product_id as number)}
                                />
                                <div className={classes.info}>
                                    <div
                                        className={classes.title}
                                        onClick={() => goToProductDetail(formatItem?.product_id as number)}
                                    >
                                        {formatItem?.products?.name || '상품명 없음'}
                                    </div>

                                    <div className={classes.option}>
                                        {formatItem?.roasting || '없음'} / {formatItem?.grind || '없음'} /{' '}
                                        {formatItem?.quantity || 0}개
                                    </div>

                                    <div className={classes.price}>
                                        {changePrice(Number(formatItem?.products?.price || 0))}원
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
