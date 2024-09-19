import { CreateProductForm } from '@/features/createProduct';
import classes from './CreateProductPage.module.css';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';

export const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 상품 생성</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/create`} />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                상품추가
            </header>
            <CreateProductForm />
        </>
    );
};
