import { Header } from '@/widgets/header';
import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import classes from './OrderPage.module.css';
import { SelectAddress } from '@/features/address';
import { Payment } from '@/features/payment';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';
import { changePrice } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { LOGO_NAME } from '@/shared/config/constants';

export const OrderPage: React.FC = () => {
    const navigate = useNavigate();
    const { selectProducts } = useOrderStore();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const totalPrice = selectProducts.reduce((acc, cur) => acc + parseInt(cur.products.price) * cur.quantity, 0);

    if (selectProducts.length === 0) {
        return <Navigate to={'/'} />;
    }

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 주문</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/order`} />
            </Helmet>

            <Header>
                <div className={classes.nav}>
                    <ChevronLeft onClick={() => navigate(-1)} />
                    주문서
                </div>
            </Header>

            <SelectAddress />

            <div className="flex flex-col gap-4 text-sm p-4">
                <div className={classes.line} />
                <h2 className="text-lg">주문 상품 {selectProducts.length}개</h2>

                {selectProducts.map((item) => (
                    <div className="flex gap-3" key={item.id}>
                        <img
                            className="w-24 object-cover rounded-md"
                            src={item.products.product_images[0]?.image_url}
                            alt={`${item.products.name} 이미지`}
                        />
                        <div>
                            <div className="text-gray-700">{item.products.name}</div>

                            <div className="flex gap-1 text-sm text-gray-400">
                                {item.roasting} / {item.grind} / {item.quantity}개
                            </div>

                            <div>{changePrice(parseInt(item.products.price) * item.quantity)}원</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 text-sm p-4">
                <div className={classes.line} />
                <h2 className="text-lg">결제 금액</h2>

                <ul className={classes.paymentList}>
                    <li className={classes.paymentAmountItem}>
                        <div>상품 금액</div>
                        <div>{changePrice(totalPrice)}원</div>
                    </li>
                    <li className={classes.paymentAmountItem}>
                        <div>할인 금액</div>
                        <div>0원</div>
                    </li>
                    <li className={classes.paymentAmountItem}>
                        <div>적립금</div>
                        <div>0원</div>
                    </li>
                    <li className={classes.paymentAmountItem}>
                        <div>배송비</div>
                        <div>무료</div>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4 text-sm p-4">
                <div className={classes.line} />
                <div className="flex">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="payment-check"
                            checked={isChecked}
                            onCheckedChange={(checked) => setIsChecked(checked === true)}
                        />
                        <label
                            htmlFor="payment-check"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        ></label>
                    </div>

                    <div>주문 내용을 확인했으며 결제에 동의합니다.</div>
                </div>
            </div>

            <div className={classes.space} />
            <div className={classes.footer}>
                <Payment totalPrice={totalPrice} isDisabled={!isChecked} />
            </div>
        </>
    );
};
