import supabase from '@/supabaseClient';
import { User } from '@/entities/auth/type';
import { EditNameApiProps } from '@/pages/ProfilePage/model/type';

export const logOut = async () => {
    await supabase.auth.signOut();
};

export const editName = async ({ user, newName }: EditNameApiProps): Promise<User> => {
    if (user.nickname === newName) {
        return user;
    }

    if (!newName) {
        return user;
    }

    const { data, error } = await supabase.from('users').update({ nickname: newName }).eq('id', user.id).select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
};
