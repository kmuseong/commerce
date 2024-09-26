import React from 'react';
import classes from './SignupPage.module.css';
import { SignupForm } from '@/features/signup';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon } from '@/widgets/icon';
import { Header } from '@/widgets/header';

export const SignupPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 회원가입</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/signup`} />
            </Helmet>

            <Header>
                <div className={classes.header}>
                    <BackIcon />
                    회원가입
                </div>
            </Header>

            <SignupForm />
        </>
    );
};
