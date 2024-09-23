import { Products } from '@/features/products';
import { Input } from '@/shared/components/ui/input';
import { Header } from '@/widgets/header/ui/Header';
import { Search } from 'lucide-react';
import React from 'react';
import classes from './ProductsPage.module.css';
import { ProductFiter } from '@/features/productFiter';
import { CartIcon } from '@/widgets/cartIcon';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { Footer } from '@/widgets/footer';
import { HomeIcon } from '@/widgets/icon';
import { CategoryIcon, ProfileIcon } from '@/widgets/icon/ui/Icon';

export const ProductsPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 상품 목록</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/products`} />
            </Helmet>

            <Header>
                <div className={classes.headerNav}>
                    <div>{LOGO_NAME}</div>
                    <CartIcon />
                </div>
                <div className={classes.search}>
                    <Input />
                    <Search />
                </div>
            </Header>

            <ProductFiter />

            <Products />

            <Footer>
                <CategoryIcon>리스트</CategoryIcon>

                <HomeIcon>홈</HomeIcon>

                <ProfileIcon>마이페이지</ProfileIcon>
            </Footer>
        </>
    );
};
