import { getProducts } from '@/features/products/api/api';
import { Item } from '@/widgets/item';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Products: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getProducts'],
        queryFn: getProducts,
    });

    if (isLoading) {
        return <div>불러오는중...</div>;
    }

    return (
        <div className="grid grid-cols-3">
            {data?.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
};
