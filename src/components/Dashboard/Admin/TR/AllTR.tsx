"use client"
import ManagementTable from '@/components/Shared/ManagementTable';
import { TTR, TTRResponse } from '@/types/Dashboard/TRType';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { TRColumns } from './TRColumns';
import { toast } from 'sonner';
import { deleteTR } from '@/service/Dashboard/TR/TRManagement';
import DeleteConfirmationDialog from '@/components/Shared/DeleteConfirmationDialog';
import TRViewDetailDialog from './TRViewDetailDialog';
import TRFormDialog from './TRFormDialog';
import { TShop } from '@/types/Dashboard/ShopType';

const AllTR = ({ TRS, shops }: { TRS: TTRResponse[], shops: TShop[] }) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingTR, setDeletingTR] = useState<TTRResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingTR, setViewingTR] = useState<TTRResponse | null>(null);
    const [editTR, setEditTR] = useState<TTRResponse | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (TR: TTRResponse) => {
        setViewingTR(TR);
    };

    const handleEdit = (TR: TTRResponse) => {
        setEditTR(TR)
    }

    const handleDelete = (TR: TTRResponse) => {
        setDeletingTR(TR);
    };

    const confirmDelete = async () => {
        if (!deletingTR) return;

        setIsDeleting(true);
        const result = await deleteTR(deletingTR.TRID);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Project deleted successfully");
            setDeletingTR(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete project");
        }
    };
    return (
        <div>
            <ManagementTable
                data={TRS}
                columns={TRColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(tr) => tr.id}
            />

            <TRFormDialog
                key={editTR?.id ?? "new"}
                open={!!editTR}
                onClose={() => setEditTR(null)}
                shops={shops}
                TR={editTR!}
                onSuccess={() => {
                    setEditTR(null);
                    handleRefresh();
                }}
            />

            <TRViewDetailDialog
                open={!!viewingTR}
                onClose={() => setViewingTR(null)}
                tr={viewingTR!}
            />

            <DeleteConfirmationDialog
                open={!!deletingTR}
                onOpenChange={(open) =>
                    !open && setDeletingTR(null)
                }
                onConfirm={confirmDelete}
                title="Delete TR"
                description={`Are you sure you want to delete ${deletingTR?.TRID}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default AllTR;