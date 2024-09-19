import React from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const SkeletonUi: React.FC = () => {
    return (
        <div className="flex flex-col h-screen justify-between">
            <div>
                <Skeleton className="h-[50px] w-full" />
            </div>

            <div className="p-4">
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>

            <div>
                <Skeleton className="h-[65px] w-full" />
            </div>
        </div>
    );
};
