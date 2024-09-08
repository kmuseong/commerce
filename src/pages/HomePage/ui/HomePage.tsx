import { getUserAndSaveToDB } from '@/features/login/api/api';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import supabase from '@/supabaseClient';
import React, { useEffect } from 'react';
import { Search, Home, User, TextSearchIcon } from 'lucide-react';
import classes from './HomePage.module.css';
import { Input } from '@/shared/components/ui/input';
import { EventCarousel } from '@/features/eventCarousel';
import { RecentProducts } from '@/features/recentProducts';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/widgets/header/ui/Header';
import { CartIcon } from '@/widgets/cartIcon';
import { Helmet } from 'react-helmet-async';

export const HomePage: React.FC = () => {
    const { user, setUser } = useAuthStore();
    const navigate = useNavigate();

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
                <title>로고이름 - 메인</title>
                <link rel="canonical" href="https://commerce-kappa-coral-63.vercel.app" />
            </Helmet>

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

            <main className="h-full">
                <EventCarousel />
                <RecentProducts />
            </main>

            <div className={classes.space} />
            <nav className={classes.footerNav}>
                <div className={classes.navButton} onClick={() => navigate(`/products`)}>
                    <TextSearchIcon />
                    <div>리스트</div>
                </div>

                <div className={classes.navButton} onClick={() => navigate(`/`)}>
                    <Home />
                    <div>홈</div>
                </div>

                <div className={classes.navButton} onClick={() => navigate(`/profile`)}>
                    <User />
                    <div>마이페이지</div>
                </div>
            </nav>
        </>
    );
};
