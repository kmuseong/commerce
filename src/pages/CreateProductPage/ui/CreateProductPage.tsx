import { CreateProductForm } from '@/features/createProduct';
import classes from './CreateProductPage.module.css';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>로고이름 - 상품생성</title>
                <link rel="canonical" href="https://commerce-kappa-coral-63.vercel.app/create" />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                상품추가
            </header>
            <CreateProductForm />
        </>
    );
};
