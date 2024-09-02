import { Button } from '@/shared/components/ui/button';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import supabase from '@/supabaseClient';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { userID } = useParams();
    const { isAuthenticated, clearUser, user } = useAuthStore();

    console.log(userID);

    const logOut = async () => {
        await supabase.auth.signOut();
        clearUser();
        alert('로그아웃 되었습니다');
    };

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
