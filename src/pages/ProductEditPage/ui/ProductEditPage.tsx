import classes from './ProductEditPage.module.css';
import React from 'react';
import { ProductEditForm } from '@/features/productEdit';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductEditPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.layout}>
            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                상품수정
            </header>
            <ProductEditForm />
        </div>
    );
};
