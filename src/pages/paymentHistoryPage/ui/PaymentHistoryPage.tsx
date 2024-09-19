import { PaymentHistoryForm } from '@/features/paymentHistoryForm';
import { Header } from '@/widgets/header';
import { HomeIcon } from '@/widgets/homeIcon';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PaymentHistoryPage.module.css';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';

export const PaymentHistoryPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 주문내역</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/my/payment/history`} />
            </Helmet>

            <Header>
                <div className={classes.header}>
                    <div>
                        <ChevronLeft onClick={() => navigate('/')} />
                        주문 내역
                    </div>

                    <HomeIcon />
                </div>
            </Header>

            <PaymentHistoryForm />
        </>
    );
};
