import { getCartListLength } from '@/widgets/cartIcon/api/api';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag } from 'lucide-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CartIcon.module.css';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';

export const CartIcon: FC<{ isBorder?: boolean }> = ({ isBorder = false }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const { data } = useQuery({
        queryKey: ['getCartLength'],
        queryFn: () => getCartListLength(user?.id as string),
    });

    return (
        <div className={isBorder ? classes.border : ''}>
            <div className={classes.container}>
                <ShoppingBag fill="white" strokeWidth={1} onClick={() => navigate(`/cart`)} />
                {data! > 0 && <div className={classes.count}>{data}</div>}
            </div>
        </div>
    );
};
