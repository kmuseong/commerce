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
        .select('id,email, isSeller,nickname')
        .eq('id', userId)
        .single();

    if (userError) {
        console.error('추가 정보 조회 실패:', userError.message);
        return;
    }

    return userData;
};
