import { User } from '@/entities/auth/type';

interface EditProps {
    user: User;
}

export interface EditNameApiProps extends EditProps {
    newName: string;
}
