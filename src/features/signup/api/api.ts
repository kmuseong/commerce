import { SignupFormType } from '@/entities/auth/type';
import supabase from '@/supabaseClient';

export const onSignup = async (form: SignupFormType) => {
    // auth
    const { data, error } = await supabase.auth.signUp({
        ...form,
    });

    if (error) {
        throw new Error(error.message);
    }

    const { error: insertError } = await supabase.from('users').insert({
        id: data.user?.id, // 회원가입 성공 시 받아온 data중 id(uid) 값을 가져온다.
        email: data.user?.email,
        created_at: data.user?.created_at,
        nickname: form.nickname,
        password: form.password,
        isSeller: form.isSeller,
    });

    if (insertError) {
        throw new Error(insertError.message);
    }
};
