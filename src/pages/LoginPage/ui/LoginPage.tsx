import React from 'react';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { LoginForm } from '@/features/login';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 로그인</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/login`} />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                로그인
            </header>
            <LoginForm />
        </>
    );
};
