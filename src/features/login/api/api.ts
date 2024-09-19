import { LoginFormType } from '@/entities/auth/type';
import supabase from '@/supabaseClient';

export const onLogin = async (form: LoginFormType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        ...form,
    });

    if (error) {
        throw new Error('로그인에 실패했습니다.');
    }

    const userId = data?.user?.id;

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, isSeller, nickname')
        .eq('id', userId)
        .single();

    if (userError) {
        throw new Error('회원정보가 없습니다.');
    }

    return userData;
};

export const getUserAndSaveToDB = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    if (data.user) {
        const { data: existingUser, error: selectError } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single(); // 단일 결과만 반환

        if (selectError) {
            throw new Error(selectError.message);
        }

        if (!existingUser) {
            const { data: insertData, error: insertError } = await supabase.from('users').insert({
                id: data.user.id,
                email: data.user.email,
                password: '',
                nickname: data.user.user_metadata?.name || 'Anonymous',
                isSeller: false,
            });

            if (insertError) {
                throw new Error(insertError.message);
            }

            return insertData;
        } else {
            return data;
        }
    }
};

export const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
