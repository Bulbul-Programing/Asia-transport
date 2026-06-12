import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import ManagementTableSkeleton from '../TableSkeleton';

const TRPageSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left Content */}
                <div className="space-y-2">
                    {/* Title */}
                    <Skeleton className="h-8 w-52" />

                    {/* Description */}
                    <Skeleton className="h-4 w-72" />
                </div>

                {/* Action Button */}
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
            <ManagementTableSkeleton columnCount={7} hasActions />
        </div>
    );
};

export default TRPageSkeleton;