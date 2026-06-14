'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createDailyExpense, updateDailyExpense } from "@/service/Dashboard/DailyExpense/DailyExpenseManagement";
import { TDailyExpensePayload, TDailyExpenseResponse } from "@/types/Dashboard/TDailyExpence";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IDailyExpenseFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    expense?: TDailyExpenseResponse;
}

// Fields split into required and optional for cleaner rendering
const REQUIRED_FIELDS: { name: keyof TDailyExpensePayload; label: string }[] = [
    { name: "labourSalary", label: "Labour Salary" },
    { name: "officeCost", label: "Office Cost" },
];

const OPTIONAL_FIELDS: { name: keyof TDailyExpensePayload; label: string }[] = [
    { name: "carRent", label: "Car Rent" },
    { name: "carNumber", label: "Car Number" },
    { name: "vanRepair", label: "Van Repair" },
    { name: "mobileBill", label: "Mobile Bill" },
    { name: "transportationCost", label: "Transportation Cost" },
    { name: "managerSalary", label: "Manager Salary" },
    { name: "stationery", label: "Stationery" },
    { name: "securitySalary", label: "Security Salary" },
    { name: "donation", label: "Donation" },
    { name: "compensation", label: "Compensation" },
    { name: "bkashBill", label: "bKash Bill" },
    { name: "electricityBill", label: "Electricity Bill" },
    { name: "officeRent", label: "Office Rent" },
    { name: "misc", label: "Miscellaneous" },
];

const DailyExpenseFormDialog = ({ open, onClose, onSuccess, expense }: IDailyExpenseFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const submitFormRef = useRef<HTMLFormElement>(null);
    const isEdit = !!expense;

    // ── date picker ────────────────────────────────────────────────
    const today = new Date();
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        expense?.date ? new Date(expense.date) : today
    );

    // ── server action ──────────────────────────────────────────────
    const [state, formAction, pending] = useActionState(
        isEdit ? updateDailyExpense.bind(null, expense!.id) : createDailyExpense,
        null
    );
    const prevStateRef = useRef(state);

    // ── handle server response ─────────────────────────────────────
    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message ?? (isEdit ? "Expense updated" : "Expense created"));
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, isEdit]);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    const handleSubmit = () => {
        if (!formRef.current) return;
        const data = new FormData(formRef.current);

        // Basic client-side guard
        const labourSalary = data.get("labourSalary");
        const officeCost = data.get("officeCost");
        if (!labourSalary || !officeCost || !date) {
            toast.error("Date, Labour Salary and Office Cost are required");
            return;
        }

        // Inject date and fire the hidden form
        const hiddenDateInput = submitFormRef.current?.querySelector<HTMLInputElement>(
            'input[name="date"]'
        );
        if (hiddenDateInput) {
            hiddenDateInput.value = date.toISOString();
        }

        // Copy all field values into the hidden form
        const hiddenJsonInput = submitFormRef.current?.querySelector<HTMLInputElement>(
            'input[name="expenseJson"]'
        );
        if (hiddenJsonInput) {
            const payload: Partial<TDailyExpensePayload> = { date };
            [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].forEach(({ name }) => {
                const raw = data.get(name as string) as string;
                if (raw !== "" && raw !== null) {
                    (payload as Record<string, unknown>)[name as string] = Number(raw);
                }
            });
            console.log("payload", payload);
            hiddenJsonInput.value = JSON.stringify(payload);
        }

        submitFormRef.current?.requestSubmit();
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-lg md:max-w-2xl">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Update Daily Expense" : "Create Daily Expense"}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                    <form ref={formRef} className="space-y-4">

                        {/* ── Date ── */}
                        <Field>
                            <FieldLabel>Date <span className="text-destructive">*</span></FieldLabel>
                            <Popover open={openDate} onOpenChange={setOpenDate}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" type="button" className="justify-start font-normal w-full">
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

                        {/* ── Required numeric fields ── */}
                        {REQUIRED_FIELDS.map(({ name, label }) => (
                            <Field key={name as string}>
                                <FieldLabel>{label} <span className="text-destructive">*</span></FieldLabel>
                                <Input
                                    name={name as string}
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    defaultValue={expense ? (expense[name as keyof TDailyExpenseResponse] as number) ?? "" : ""}
                                />
                            </Field>
                        ))}

                        {/* ── Optional numeric fields ── */}
                        <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground mb-3">Optional expenses</p>
                            <div className="space-y-4">
                                {OPTIONAL_FIELDS.map(({ name, label }) => (
                                    <Field key={name as string}>
                                        <FieldLabel>{label}</FieldLabel>
                                        <Input
                                            name={name as string}
                                            type="number"
                                            min={0}
                                            step="0.01"
                                            placeholder={`Enter ${label.toLowerCase()}`}
                                            defaultValue={expense ? (expense[name as keyof TDailyExpenseResponse] as number | null | undefined) ?? "" : ""}
                                        />
                                    </Field>
                                ))}
                            </div>
                        </div>
                    </form>

                    {/* ── Hidden form that fires the server action ── */}
                    <form ref={submitFormRef} action={formAction} className="hidden">
                        <input type="hidden" name="date" defaultValue="" />
                        <input type="hidden" name="expenseJson" defaultValue="" />
                    </form>
                </div>

                {/* ── Footer ── */}
                <div className="flex justify-end gap-2 px-6 py-4 border-t">
                    <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit} disabled={pending}>
                        {pending
                            ? isEdit ? "Updating..." : "Creating..."
                            : isEdit ? "Update Expense" : "Create Expense"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DailyExpenseFormDialog;
