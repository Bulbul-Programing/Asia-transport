"use client"
import ManagementPageHeader from '@/components/Shared/ManagementPageHeader';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import TRFormDialog from './TRFormDialog';
import { TShop } from '@/types/Dashboard/ShopType';

const TRManagementHeader = ({ shops }: { shops: TShop[] }) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        setIsDialogOpen(false)
        startTransition(() => {
            router.refresh();
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div>
            <TRFormDialog
                onClose={handleCloseDialog}
                open={isDialogOpen}
                onSuccess={handleSuccess}
                shops={shops}
            />

            <ManagementPageHeader
                title="TR Management"
                description="Manage all TR."
                action={{
                    label: "Add TR",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default TRManagementHeader;