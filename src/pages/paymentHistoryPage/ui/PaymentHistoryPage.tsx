import { PaymentHistoryForm } from '@/features/paymentHistoryForm';
import { Header } from '@/widgets/header';
import { HomeIcon } from '@/widgets/homeIcon';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PaymentHistoryPage.module.css';

export const PaymentHistoryPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
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
        </div>
    );
};
