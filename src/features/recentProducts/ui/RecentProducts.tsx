import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecentroducts } from '@/features/recentProducts/api/api';
import { Item } from '@/widgets/item';
import classes from './RecentProducts.module.css';

export const RecentProducts: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getRecnetProducts'],
        queryFn: getRecentroducts,
    });

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className={classes.list}>
            {data?.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
};
