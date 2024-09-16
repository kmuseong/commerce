import { Skeleton } from '@/shared/components/ui/skeleton';
import React from 'react';

export const SkeletonUi: React.FC = () => {
    return (
        <div className="grid grid-cols-3">
            {Array.from({ length: 6 })?.map((_, index) => (
                <div key={index} className="flex flex-col border h-full">
                    <Skeleton className="h-[200px]" />
                    <div className="flex flex-col gap-3 p-2 h-[85px]">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};
