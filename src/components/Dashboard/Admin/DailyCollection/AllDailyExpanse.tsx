"use client"

import ManagementTable from '@/components/Shared/ManagementTable';
import { TDailyExpenseResponse } from '@/types/Dashboard/TDailyExpence';
import React, { useState, useTransition } from 'react';
import { DailyExpenseColumns } from './DailyExpanceColumns';
import { useRouter } from 'next/navigation';

const AllDailyExpanse = ({ dailyExpanses }: { dailyExpanses: TDailyExpenseResponse[] }) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deleteExpanse, setDeleteExpanse] = useState<TDailyExpenseResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingDailyExpanse, setViewingDailyExpanse] = useState<TDailyExpenseResponse | null>(null);
    const [editDailyExpanse, setEditDailyExpanse] = useState<TDailyExpenseResponse | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (TR: TDailyExpenseResponse) => {
        setViewingDailyExpanse(TR);
    };

    const handleEdit = (TR: TDailyExpenseResponse) => {
        setEditDailyExpanse(TR)
    }

    const handleDelete = (TR: TDailyExpenseResponse) => {
        setDeleteExpanse(TR);
    };

    // const confirmDelete = async () => {
    //     if (!deletingTR) return;

    //     setIsDeleting(true);
    //     const result = await deleteTR(deletingTR.TRID);
    //     setIsDeleting(false);

    //     if (result.success) {
    //         toast.success(result.message || "Project deleted successfully");
    //         setDeletingTR(null);
    //         handleRefresh();
    //     } else {
    //         toast.error(result.message || "Failed to delete project");
    //     }
    // };
    return (
        <div>
            <ManagementTable
                data={dailyExpanses}
                columns={DailyExpenseColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(tr) => tr.id}

            />
        </div>
    );
};

export default AllDailyExpanse;