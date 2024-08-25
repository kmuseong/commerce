import { LoginType } from '@/features/login/model/type';
import supabase from '@/supabaseClient';

export const onLogin = async (form: LoginType) => {
    const { error } = await supabase.auth.signInWithPassword({
        ...form,
    });

    if (error) {
        return console.log('로그인 실패', { error });
    }
};
