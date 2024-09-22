import { PaymentHistoryForm } from '@/features/paymentHistoryForm';
import { Header } from '@/widgets/header';
import React from 'react';
import classes from './PaymentHistoryPage.module.css';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon, HomeIcon } from '@/widgets/icon';

export const PaymentHistoryPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 주문내역</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/my/payment/history`} />
            </Helmet>

            <Header>
                <div className={classes.header}>
                    <div>
                        <BackIcon />
                        주문 내역
                    </div>

                    <HomeIcon />
                </div>
            </Header>

            <PaymentHistoryForm />
        </>
    );
};
