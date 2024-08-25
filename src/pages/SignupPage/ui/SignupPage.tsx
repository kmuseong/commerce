import React from 'react';
import classes from './SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SignupForm } from '@/features/signup';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={classes.layout}>
                <header className={classes.header}>
                    <ChevronLeft onClick={() => navigate(-1)} />
                    회원가입
                </header>
                <SignupForm />
            </div>
        </>
    );
};
