'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TShop } from '@/types/Dashboard/ShopType';
import { TRPayload } from '@/types/Dashboard/TRType';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Add this new component above TRFormDialog or in a separate file

const StagedTRsModal = ({
    open,
    onClose,
    pendingTRs,
    onUpdate,
    onRemove,
    shops,
}: {
    open: boolean;
    onClose: () => void;
    pendingTRs: TRPayload[];
    onUpdate: (index: number, updated: TRPayload) => void;
    onRemove: (index: number) => void;
    shops: TShop[];
}) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<TRPayload | null>(null);

    const startEdit = (i: number) => {
        setEditingIndex(i);
        setEditData({ ...pendingTRs[i] });
    };

    const saveEdit = () => {
        if (editingIndex !== null && editData) {
            onUpdate(editingIndex, editData);
            setEditingIndex(null);
            setEditData(null);
        }
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditData(null);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="max-h-[80vh] flex flex-col p-0 max-w-2xl">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Staged TRs ({pendingTRs.length})</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
                    {pendingTRs.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">
                            No TRs staged yet.
                        </p>
                    )}

                    {pendingTRs.map((tr, i) => (
                        <div key={i} className="rounded-md border bg-background p-4 space-y-3">
                            {editingIndex === i && editData ? (
                                /* ── inline edit form ── */
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field>
                                            <FieldLabel>TRID</FieldLabel>
                                            <Input
                                                type="number"
                                                value={editData.TRID ?? ""}
                                                onChange={(e) => setEditData({ ...editData, TRID: e.target.value })}
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Shop name</FieldLabel>
                                            <Input
                                                value={editData.shopName}
                                                onChange={(e) => setEditData({ ...editData, shopName: e.target.value })}
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Quantity</FieldLabel>
                                            <Input
                                                type="number"
                                                value={editData.quantity}
                                                onChange={(e) => setEditData({ ...editData, quantity: Number(e.target.value) })}
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Taka</FieldLabel>
                                            <Input
                                                type="number"
                                                value={editData.taka}
                                                onChange={(e) => setEditData({ ...editData, taka: Number() })}
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Payment status</FieldLabel>
                                            <Select
                                                value={String(editData.paymentStatus)}
                                                onValueChange={(v) => setEditData({
                                                    ...editData,
                                                    paymentStatus: v === 'true',
                                                })}
                                            >
                                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">Paid</SelectItem>
                                                    <SelectItem value="false">Unpaid</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                        <Field>
                                            <FieldLabel>Office Delivery</FieldLabel>
                                            <Select
                                                value={String(editData.isOfficeDelivery)}
                                                onValueChange={(v) => setEditData({
                                                    ...editData,
                                                    isOfficeDelivery: v === 'true',
                                                })}
                                            >
                                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">Office Delivery</SelectItem>
                                                    <SelectItem value="false">Home Delivery</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    </div>
                                    <Field>
                                        <FieldLabel>Note</FieldLabel>
                                        <textarea
                                            className="w-full rounded-md border p-2 text-sm"
                                            value={editData.note}
                                            onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                                        />
                                    </Field>
                                    <div className="flex gap-2 justify-end">
                                        <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                                            Cancel
                                        </Button>
                                        <Button type="button" size="sm" onClick={saveEdit}>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                /* ── read view ── */
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1 text-sm">
                                        <p>
                                            <span className="font-medium">#{tr.TRID ? tr.TRID : 0}</span>
                                            <span className="text-muted-foreground"> · {tr.shopName}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            Qty: {tr.quantity} · ৳{tr.taka} · {String(tr.paymentStatus)} · {String(tr.isOfficeDelivery)}
                                        </p>
                                        {tr.note && <p className="text-muted-foreground italic">{tr.note}</p>}
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => startEdit(i)}
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => onRemove(i)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StagedTRsModal;