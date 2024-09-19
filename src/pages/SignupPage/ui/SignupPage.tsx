import React from 'react';
import classes from './SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SignupForm } from '@/features/signup';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 회원가입</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/signup`} />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                회원가입
            </header>
            <SignupForm />
        </>
    );
};
