import React from 'react';
import classes from './RecentProducts.module.css';
import { useQuery } from '@tanstack/react-query';
import { getRecentroducts } from '@/features/recentProducts/api/api';
import { Link } from 'react-router-dom';
import { Item } from '@/widgets/item';

export const RecentProducts: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getRecnetProducts'],
        queryFn: getRecentroducts,
    });

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div>
            <div className={classes.title}>
                <div className="font-bold">최신 상품</div> <Link to="/products">더보기</Link>
            </div>
            <div className="grid grid-cols-3">
                {data?.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};
