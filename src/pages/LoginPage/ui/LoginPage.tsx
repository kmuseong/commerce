import React from 'react';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { LoginForm } from '@/features/login';
import { Helmet } from 'react-helmet-async';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>로고이름 - 로그인</title>
                <link rel="canonical" href="https://commerce-kappa-coral-63.vercel.app/login" />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                로그인
            </header>
            <LoginForm />
        </>
    );
};
