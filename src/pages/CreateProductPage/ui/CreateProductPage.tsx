import { CreateProductForm } from '@/features/createProduct';
import classes from './CreateProductPage.module.css';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon } from '@/widgets/icon';

export const CreateProductPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 상품 생성</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/create`} />
            </Helmet>

            <header className={classes.header}>
                <BackIcon />
                상품추가
            </header>
            <CreateProductForm />
        </>
    );
};
