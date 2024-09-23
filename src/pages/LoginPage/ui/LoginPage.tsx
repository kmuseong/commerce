import React from 'react';
import classes from './LoginPage.module.css';
import { LoginForm } from '@/features/login';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon } from '@/widgets/icon';

export const LoginPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 로그인</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/login`} />
            </Helmet>

            <header className={classes.header}>
                <BackIcon />
                로그인
            </header>
            <LoginForm />
        </>
    );
};
