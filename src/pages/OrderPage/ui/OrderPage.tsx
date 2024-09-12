import { Header } from '@/widgets/header';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import classes from './OrderPage.module.css';
import { Button } from '@/shared/components/ui/button';
import { SelectAddress } from '@/features/address';

export const OrderPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>로고이름 - 주문</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/order`} />
            </Helmet>

            <Header>
                <div className={classes.nav}>
                    <ChevronLeft onClick={() => navigate(-1)} />
                    주문서
                </div>
            </Header>

            <SelectAddress />

            <div className={classes.footer}>
                <Button className="w-full">결제버튼</Button>
            </div>
        </>
    );
};
