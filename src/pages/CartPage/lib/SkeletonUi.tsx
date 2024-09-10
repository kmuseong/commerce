import React from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const SkeletonUi: React.FC = () => {
    return (
        <div className="flex flex-col h-screen justify-between">
            <div>
                <Skeleton className="h-[100px] w-full" />
            </div>

            <ul className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map(() => (
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Skeleton className="h-[100px] w-[100px] rounded-xl" />

                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>

                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </ul>

            <div>
                <Skeleton className="h-[65px] w-full" />
            </div>
        </div>
    );
};
