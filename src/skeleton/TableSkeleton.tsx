"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface ManagementTableSkeletonProps {
    columnCount: number;
    rowCount?: number;
    hasActions?: boolean;
}

const ManagementTableSkeleton = ({
    columnCount,
    rowCount = 6,
    hasActions = true,
}: ManagementTableSkeletonProps) => {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                {/* Header Skeleton */}
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-[80%]" />
                            </TableHead>
                        ))}
                        {hasActions && (
                            <TableHead className="w-[70px]">
                                <Skeleton className="h-4 w-8 mx-auto" />
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                {/* Body Skeleton */}
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                            {hasActions && (
                                <TableCell>
                                    <Skeleton className="h-8 w-8 rounded-md mx-auto" />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ManagementTableSkeleton;
