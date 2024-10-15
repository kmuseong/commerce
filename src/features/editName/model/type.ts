import { User } from '@/entities/auth/type';
import { EditNameApiProps } from '@/pages/ProfilePage/model/type';

export interface EditNameProps {
    mutate: ({ user, newName }: EditNameApiProps) => User | void;
}
