import React from 'react';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { LoginForm } from '@/features/login';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.layout}>
            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                로그인
            </header>
            <LoginForm />
        </div>
    );
};
