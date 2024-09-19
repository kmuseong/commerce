import { getProducts } from '@/features/products/api/api';
import { SkeletonUi } from '@/features/products/lib/SkeletonUi';
import { Item } from '@/widgets/item';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Products: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getProducts'],
        queryFn: getProducts,
    });

    if (isLoading) {
        return <SkeletonUi />;
    }

    return (
        <div className="grid grid-cols-3">
            {data?.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
};
