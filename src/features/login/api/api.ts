import { LoginType } from '@/features/login/model/type';
import supabase from '@/supabaseClient';

export const onLogin = async (form: LoginType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        ...form,
    });

    if (error) {
        return console.log('로그인 실패', { error });
    }

    const userId = data?.user?.id;
    if (!userId) {
        console.error('사용자 ID를 찾을 수 없습니다.');
        return;
    }

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, isSeller, nickname')
        .eq('id', userId)
        .single();

    if (userError) {
        console.error('추가 정보 조회 실패:', userError.message);
        return;
    }

    return userData;
};

export const getUserAndSaveToDB = async () => {
    try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            return console.log({ error });
        }

        if (data.user) {
            // 먼저 users 테이블에 해당 사용자가 존재하는지 확인합니다.
            const { data: existingUser, error: selectError } = await supabase
                .from('users')
                .select('id')
                .eq('id', data.user.id)
                .single(); // 단일 결과만 반환

            if (selectError) {
                return console.log({ selectError });
            }

            // 사용자가 존재하지 않을 경우에만 삽입
            if (!existingUser) {
                const { data: insertData, error: insertError } = await supabase.from('users').insert({
                    id: data.user.id,
                    email: data.user.email,
                    password: '',
                    nickname: data.user.user_metadata?.name || 'Anonymous',
                    isSeller: false,
                });

                if (insertError) {
                    return console.log({ insertError });
                }

                return insertData;
            } else {
                console.log('User already exists in the database.');
                return data;
            }
        }
    } catch (error) {
        console.log({ error });
    }
};

export const googleLogin = async () => {
    try {
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
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error during Google login:', error);
    }
};
