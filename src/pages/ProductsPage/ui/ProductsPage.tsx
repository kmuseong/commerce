import { Products } from '@/features/products';
import { Input } from '@/shared/components/ui/input';
import { Header } from '@/widgets/header/ui/Header';
import { Search } from 'lucide-react';
import React from 'react';
import classes from './ProductsPage.module.css';
import { ProductFiter } from '@/features/productFiter';
import { CartIcon } from '@/widgets/cartIcon';

export const ProductsPage: React.FC = () => {
    return (
        <div>
            <Header>
                <div className={classes.headerNav}>
                    <div>로고</div>
                    <CartIcon />
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
