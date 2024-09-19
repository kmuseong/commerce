import React from 'react';
import classes from './SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SignupForm } from '@/features/signup';
import { Helmet } from 'react-helmet-async';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>로고이름 - 회원가입</title>
                <link rel="canonical" href="https://commerce-kappa-coral-63.vercel.app/signup" />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                회원가입
            </header>
            <SignupForm />
        </>
    );
};
