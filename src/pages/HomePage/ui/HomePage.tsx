import { getUserAndSaveToDB } from '@/features/login/api/api';
import { Button } from '@/shared/components/ui/button';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import supabase from '@/supabaseClient';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { isAuthenticated, clearUser, user, setUser } = useAuthStore();
    const navigate = useNavigate();

    const logOut = async () => {
        await supabase.auth.signOut();
        clearUser();
        alert('로그아웃 되었습니다');
    };

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
        <div>
            {isAuthenticated ? (
                <>
                    <Button onClick={logOut}>로그아웃</Button>
                    {user?.isSeller && <Button onClick={() => navigate('/create')}>제품등록</Button>}
                </>
            ) : (
                <Button onClick={() => navigate('/login')}>로그인</Button>
            )}
        </div>
    );
};
