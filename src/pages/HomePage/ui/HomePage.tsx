import { getUserAndSaveToDB } from '@/features/login/api/api';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import supabase from '@/supabaseClient';
import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import classes from './HomePage.module.css';
import { EventCarousel } from '@/features/eventCarousel';
import { RecentProducts } from '@/features/recentProducts';
import { Link } from 'react-router-dom';
import { CartIcon } from '@/widgets/cartIcon';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { Footer } from '@/widgets/footer';
import { HomeIcon } from '@/widgets/icon';
import { CategoryIcon, ProfileIcon } from '@/widgets/icon/ui/Icon';

export const HomePage: React.FC = () => {
    const { user, setUser } = useAuthStore();

    useEffect(() => {
        const checkSession = async () => {
            await supabase.auth.getSession();
        };
        checkSession();
    }, []);

    useEffect(() => {
        if (!user) {
            const socialSession = async () => {
                try {
                    const response = await getUserAndSaveToDB();

                    if (response?.user) {
                        const userForm = {
                            id: response.user.id,
                            email: response.user.email || '',
                            isSeller: false,
                            nickname: response?.user?.user_metadata?.name || 'Anonymous',
                        };

                        setUser(userForm);
                    }
                } catch (error) {
                    console.log({ error });
                }
            };

            socialSession();
        }
    }, [setUser, user]);

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 메인</title>
                <link rel="canonical" href={import.meta.env.VITE_WEB_SITE_URL} />
            </Helmet>

            <header className={classes.header}>
                <div>
                    <div className="text-white">{LOGO_NAME}</div>
                    <div className={classes.button}>
                        <CartIcon />
                    </div>
                </div>
                <div className={classes.search}>
                    <Search color="#825a3d" />
                    <input placeholder="검색어를 입력해주세요." />
                </div>
            </header>

            <main className="h-full">
                <EventCarousel />

                <div className={classes.title}>
                    <div>
                        <p>Recent Products</p>
                        <p className="text-sm text-gray-400">최신 상품</p>
                    </div>
                    <Link to="/products">더보기</Link>
                </div>
                <RecentProducts />
            </main>

            <Footer>
                <CategoryIcon>리스트</CategoryIcon>

                <HomeIcon>홈</HomeIcon>

                <ProfileIcon>마이</ProfileIcon>
            </Footer>
        </>
    );
};
