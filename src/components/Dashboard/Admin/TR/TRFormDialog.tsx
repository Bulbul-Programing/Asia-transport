'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { createTR, updateTR } from "@/service/Dashboard/TR/TRManagement";
import { TShop } from "@/types/Dashboard/ShopType";
import { TRPayload, TTRResponse } from "@/types/Dashboard/TRType";
import { Check, ChevronsUpDown, Eye } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import StagedTRsModal from "./submittedTR";

interface ITRFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    shops: TShop[];
    TR?: TTRResponse;
}

const TRFormDialog = ({ open, onClose, onSuccess, TR, shops }: ITRFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const submitFormRef = useRef<HTMLFormElement>(null);
    const updateSubmitFormRef = useRef<HTMLFormElement>(null)
    const isEdit = !!TR;
    const [comboValue, setComboValue] = useState("");

    // Add inside TRFormDialog, alongside other useState hooks
    const [stagedModalOpen, setStagedModalOpen] = useState(false);
    // handlers to pass down
    const handleUpdatePending = (index: number, updated: TRPayload) =>
        setPendingTRs((prev) => prev.map((tr, i) => (i === index ? updated : tr)));

    const handleRemovePending = (index: number) =>
        setPendingTRs((prev) => prev.filter((_, i) => i !== index));

    // ── shop combobox ──────────────────────────────────────────────
    const [openCombo, setOpenCombo] = useState(false);
    const [shopQuery, setShopQuery] = useState("");
    const existingShop = TR ? shops.find((shop) => shop.shopName === TR.shopName) ?? null : null;

    const [selectedShop, setSelectedShop] = useState<TShop | null>(existingShop);

    const filteredShops = shops.filter((shop) =>
        shop.shopName.toLowerCase().includes(shopQuery.toLowerCase())
    );

    // ── date picker ────────────────────────────────────────────────
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState<Date | undefined>(TR?.bookingDate ? new Date(TR.bookingDate) : yesterday);

    // ── staged TRs (local, not yet in DB) ────────────────────────
    const [pendingTRs, setPendingTRs] = useState<TRPayload[]>([]);
    const [lastTR, setLastTR] = useState('')

    // update information 
    const updateTRDataRef = useRef<TRPayload | undefined>(undefined);

    // ── server action for bulk create ──────────────────────────────
    //    For edit mode you still use the single-TR path
    const [state, formAction, pending] = useActionState(
        isEdit ? updateTR.bind(null, TR!.TRID) : createTR,
        null
    );
    const prevStateRef = useRef(state);

    // ── handle server action response ──────────────────────────────
    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message ?? (isEdit ? "TR updated" : "TRs created"));
            setPendingTRs([]);
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, isEdit]);

    const handleClose = () => {
        formRef.current?.reset();
        setPendingTRs([]);
        onClose();
    };

    // ── "Add TR" — push current field values into pendingTRs ───────
    const handleAddTR = () => {
        if (!formRef.current) return;
        const data = new FormData(formRef.current);

        const entry: TRPayload = {
            TRID: data.get("TRID") as string,
            shopName: shopQuery,
            quantity: Number(data.get("quantity") as string),
            paymentStatus: data.get("paymentStatus") === "true",
            taka: Number(data.get("taka") as string),
            bookingDate: date ?? new Date(),
            isOfficeDelivery: data.get("isOfficeDelivery") === "true",
            note: (data.get("note") as string) || undefined,
        };

        // basic client-side guard
        if (!entry.TRID || !entry.shopName || !entry.quantity) {
            toast.error("TRID, shop name and quantity are required");
            return;
        }


        const lastTRString = Number(entry.TRID) + 1
        setLastTR(lastTRString.toString())
        setPendingTRs((prev) => [...prev, entry]);
        formRef.current.reset();
        setShopQuery("");
        setSelectedShop(null);
        setDate(yesterday);
    };

    const handleUpdateTR = () => {
        if (!formRef.current) return;
        const data = new FormData(formRef.current);

        const entry: TRPayload = {
            TRID: data.get("TRID") as string,
            shopName: selectedShop?.shopName || shopQuery || "",
            quantity: Number(data.get("quantity") as string),
            paymentStatus: data.get("paymentStatus") === "true",
            taka: Number(data.get("taka") as string),
            bookingDate: date ?? new Date(),
            isOfficeDelivery: data.get("isOfficeDelivery") === "true",
            note: (data.get("note") as string) || undefined,
        };

        if (!entry.TRID || !entry.shopName || !entry.quantity) {
            toast.error("TRID, shop name and quantity are required");
            return;
        }

        // Set ref synchronously, then submit
        updateTRDataRef.current = entry;

        // Directly update the hidden input value before submitting
        const hiddenInput = updateSubmitFormRef.current?.querySelector<HTMLInputElement>(
            'input[name="updateTRsJson"]'
        );
        if (hiddenInput) {
            hiddenInput.value = JSON.stringify(entry);
        }

        updateSubmitFormRef.current?.requestSubmit();
    }

    // ── "Submit all" — inject JSON into hidden input & fire action ─
    const handleSubmitAll = () => {
        if (pendingTRs.length === 0) {
            toast.error("Add at least one TR first");
            return;
        }
        submitFormRef.current?.requestSubmit();
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-lg md:max-w-2xl">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Update TR" : "Create TR"}</DialogTitle>
                </DialogHeader>

                {/* ── staged list trigger ── */}
                {!isEdit && pendingTRs.length > 0 && (
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setStagedModalOpen(true)}
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        View staged TRs ({pendingTRs.length})
                    </Button>
                )}

                {/* ── staged TRs modal ── */}
                <StagedTRsModal
                    open={stagedModalOpen}
                    onClose={() => setStagedModalOpen(false)}
                    pendingTRs={pendingTRs}
                    onUpdate={handleUpdatePending}
                    onRemove={handleRemovePending}
                    shops={shops}
                />


                <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                    {/* ── entry form (local only, no action) ──────── */}
                    <form ref={formRef} className="space-y-4">

                        <Field>
                            <FieldLabel>TRID</FieldLabel>
                            <Input name="TRID" type="number" placeholder="TRID" defaultValue={TR ? TR.TRID : lastTR} />
                        </Field>

                        <Field>
                            <FieldLabel>Shop name</FieldLabel>
                            <Popover open={openCombo} onOpenChange={setOpenCombo}>
                                <PopoverTrigger asChild>
                                    <Button type="button" variant="outline" className="w-full justify-between">
                                        {selectedShop?.shopName || shopQuery || "Select or create shop"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command
                                        shouldFilter={false}
                                        value={comboValue}
                                        onValueChange={setComboValue}
                                    >
                                        <CommandInput
                                            placeholder="Search or type new shop..."
                                            value={shopQuery}
                                            onValueChange={(value) => {
                                                setShopQuery(value);
                                                setSelectedShop(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && filteredShops.length > 0) {
                                                    // Find the highlighted item — cmdk adds data-selected="true"
                                                    const highlighted = filteredShops.find((shop) =>
                                                        shop.shopName.toLowerCase() === shopQuery.toLowerCase()
                                                    ) ?? filteredShops[0]; // fallback to first if no exact match

                                                    if (highlighted) {
                                                        setSelectedShop(highlighted);
                                                        setShopQuery(highlighted.shopName);
                                                        setOpenCombo(false);
                                                        e.preventDefault();
                                                    }
                                                }
                                            }}
                                        />
                                        <CommandEmpty>
                                            <div className="p-2 text-sm text-gray-500">No shop found</div>
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {filteredShops.map((shop) => (
                                                <CommandItem
                                                    key={shop.id}
                                                    value={shop.shopName}      
                                                    onSelect={() => {
                                                        setSelectedShop(shop);
                                                        setShopQuery(shop.shopName);
                                                        setOpenCombo(false);
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", selectedShop?.id === shop.id ? "opacity-100" : "opacity-0")} />
                                                    {shop.shopName}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        {shopQuery && !filteredShops.some((s) => s.shopName.toLowerCase() === shopQuery.toLowerCase()) && (
                                            <div
                                                className="p-2 border-t cursor-pointer hover:bg-gray-100 text-sm"
                                                onClick={() => { setSelectedShop(null); setOpenCombo(false); }}
                                            >
                                                ➕ Create <b>``{shopQuery}``</b>
                                            </div>
                                        )}
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </Field>

                        <Field>
                            <FieldLabel>Quantity</FieldLabel>
                            <Input name="quantity" type="number" placeholder="Quantity" defaultValue={TR ? TR.quantity : 0} />
                        </Field>

                        <Field>
                            <FieldLabel>Payment status</FieldLabel>
                            <Select name="paymentStatus" defaultValue={(TR && TR.paymentStatus ? "true" : "false")}>
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Payment Status</SelectLabel>
                                        <SelectItem value="true">Paid</SelectItem>
                                        <SelectItem value="false">Unpaid</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Taka</FieldLabel>
                            <Input name="taka" type="number" placeholder="Taka" defaultValue={TR ? TR.taka : 0} />
                        </Field>

                        <Field>
                            <FieldLabel>Booking Date</FieldLabel>
                            <Popover open={openDate} onOpenChange={setOpenDate}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" type="button" className="justify-start font-normal">
                                        {date ? date.toLocaleDateString() : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        defaultMonth={date}
                                        captionLayout="dropdown"
                                        required
                                        onSelect={(d: Date) => { setDate(d); setOpenDate(false); }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </Field>
                    </form>

                    {/* ── hidden form that fires the server action ─── */}
                    {/* Carries the full pendingTRs array as JSON       */}
                    <form ref={submitFormRef} action={formAction} className="hidden">
                        <input
                            type="hidden"
                            name="trsJson"
                            value={JSON.stringify(pendingTRs)}
                        />
                    </form>
                    <form ref={updateSubmitFormRef} action={formAction} className="hidden">
                        <input
                            type="hidden"
                            name="updateTRsJson"
                            defaultValue=""   // value is set imperatively before submit
                        />
                    </form>

                </div>

                {/* ── footer ──────────────────────────────────────── */}
                <div className="flex justify-end gap-2 px-6 py-4 border-t">
                    <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
                        Cancel
                    </Button>

                    {/* Add current fields to staged list */}
                    {!isEdit && (
                        <div>
                            <Button type="button" variant="secondary" onClick={handleAddTR} disabled={pending}>
                                + Add TR
                            </Button>
                            {/* Submit everything to DB */}
                            <Button
                                type="button"
                                onClick={handleSubmitAll}
                                disabled={pending || (pendingTRs.length === 0)}
                            >
                                {pending
                                    ? "Creating..."
                                    : `Submit ${pendingTRs.length > 0 ? `(${pendingTRs.length})` : ""}`}
                            </Button>
                        </div>
                    )}

                    {isEdit && (
                        <Button type="button" variant="default" onClick={handleUpdateTR} disabled={pending}>
                            {pending
                                ? "Updating..."
                                : "Update TR"}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TRFormDialog;