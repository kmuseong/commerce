import React from 'react';
import classes from './RecentProducts.module.css';
import { useQuery } from '@tanstack/react-query';
import { getRecentroducts } from '@/features/recentProducts/api/api';
import { useNavigate } from 'react-router-dom';
import { Item } from '@/widgets/item';

export const RecentProducts: React.FC = () => {
    const navigate = useNavigate();

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
                <div>최신 상품</div> <span onClick={() => navigate('/products')}>더보기</span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
                {data?.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};
