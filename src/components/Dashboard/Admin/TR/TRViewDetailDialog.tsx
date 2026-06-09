"use client";

import InfoRow from "@/components/Shared/InoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { TTRResponse } from "@/types/Dashboard/TRType";
import {
    FileText,
    Store,
    Wallet,
    Calendar,
    Truck,
} from "lucide-react";

interface ITRViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    tr: TTRResponse | null;
}

const TRViewDetailDialog = ({
    open,
    onClose,
    tr,
}: ITRViewDetailDialogProps) => {
    return (
        <div>
            {tr && (
                <Dialog open={open} onOpenChange={onClose}>
                    <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                        <DialogHeader className="px-6 pt-6 pb-4">
                            <DialogTitle>TR Details</DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-6 pb-6">
                            {!tr && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                    <FileText className="h-10 w-10 mb-3" />
                                    <p className="text-lg font-medium">
                                        No TR data found
                                    </p>
                                    <p className="text-sm">
                                        Please select a valid TR record
                                    </p>
                                </div>
                            )}

                            {tr && (
                                <>
                                    {/* Header */}
                                    <div className="flex justify-between items-center gap-4 p-6 bg-linear-to-br from-primary/30 to-emerald-200/30 rounded-lg mb-6">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-1">
                                                TR #{tr.TRID}
                                            </h2>

                                            <Badge variant="outline">
                                                {tr.shopName}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-col gap-2 items-end">
                                            <Badge
                                                variant="secondary"
                                                className="text-lg px-4 py-2"
                                            >
                                                ৳ {tr.taka}
                                            </Badge>

                                            <Badge
                                                variant={
                                                    tr.paymentStatus
                                                        ? "default"
                                                        : "destructive"
                                                }
                                            >
                                                {tr.paymentStatus
                                                    ? "Paid"
                                                    : "Unpaid"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Transaction Information */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Wallet className="h-5 w-5 text-blue-600" />
                                                Transaction Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                <InfoRow
                                                    label="TR ID"
                                                    value={tr.TRID}
                                                />

                                                <InfoRow
                                                    label="Amount"
                                                    value={`৳ ${tr.taka}`}
                                                />

                                                <InfoRow
                                                    label="Quantity"
                                                    value={tr.quantity}
                                                />

                                                <InfoRow
                                                    label="Payment Status"
                                                    value={
                                                        tr.paymentStatus
                                                            ? "Paid"
                                                            : "Unpaid"
                                                    }
                                                />

                                                <InfoRow
                                                    label="Note"
                                                    value={
                                                        tr.note || "N/A"
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Shop Information */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Store className="h-5 w-5 text-green-600" />
                                                Shop Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                <InfoRow
                                                    label="Shop Name"
                                                    value={tr.shopName}
                                                />

                                                <InfoRow
                                                    label="Shop ID"
                                                    value={tr.shopId}
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Delivery Information */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Truck className="h-5 w-5 text-orange-600" />
                                                Delivery Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                <InfoRow
                                                    label="Office Delivery"
                                                    value={
                                                        tr.isOfficeDelivery
                                                            ? "Yes"
                                                            : "No"
                                                    }
                                                />

                                                <InfoRow
                                                    label="Booking Date"
                                                    value={formatDateTime(
                                                        tr.bookingDate
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Record Information */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-purple-600" />
                                                Record Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                <InfoRow
                                                    label="Created At"
                                                    value={formatDateTime(
                                                        tr.createdAt
                                                    )}
                                                />

                                                <InfoRow
                                                    label="Updated At"
                                                    value={formatDateTime(
                                                        tr.updateAt
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default TRViewDetailDialog;