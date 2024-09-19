import classes from './ProductEditPage.module.css';
import React from 'react';
import { ProductEditForm } from '@/features/productEdit';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const ProductEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title>로고이름 - 상품수정페이지</title>
                <link rel="canonical" href={`https://commerce-kappa-coral-63.vercel.app/products/${id}/edit`} />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                상품수정
            </header>
            <ProductEditForm />
        </>
    );
};
