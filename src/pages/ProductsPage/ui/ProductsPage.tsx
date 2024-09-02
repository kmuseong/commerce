import { Products } from '@/features/products';
import { Input } from '@/shared/components/ui/input';
import { Header } from '@/widgets/header/ui/Header';
import { Search, ShoppingBag } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProductsPage.module.css';
import { ProductFiter } from '@/features/productFiter';

export const ProductsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header>
                <div className={classes.headerNav}>
                    <div>로고</div>
                    <ShoppingBag onClick={() => navigate(`/cart`)} />
                </div>
                <div className={classes.search}>
                    <Input />
                    <Search />
                </div>
            </Header>

            <ProductFiter />

            <Products />
        </div>
    );
};
