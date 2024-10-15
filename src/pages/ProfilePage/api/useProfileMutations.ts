import { useMutation } from '@tanstack/react-query';
import { User } from '@/entities/auth/type';
import { editName, logOut } from '@/pages/ProfilePage/api/api';
import { EditNameApiProps } from '@/pages/ProfilePage/model/type';

export const useProfileMutations = (setUser: (user: User) => void, clearUser: () => void) => {
    const { mutate: logoutMutate, isPending: logoutPending } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logOut,
        onSuccess: () => {
            clearUser();
            alert('로그아웃 되었습니다');
        },
    });

    const { mutate: editNameMutate, isPending: editNamePending } = useMutation({
        mutationKey: ['editName'],
        mutationFn: ({ user, newName }: EditNameApiProps) => editName({ user, newName }),
        onSuccess: (userData: User) => {
            setUser(userData);
        },
    });

    return { logoutMutate, logoutPending, editNameMutate, editNamePending };
};
