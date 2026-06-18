'use client'

import InputFieldError from "@/components/Shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

import {
    createDailyExpense,
    updateDailyExpense
} from "@/service/Dashboard/DailyExpense/DailyExpenseManagement";

import {
    TDailyExpensePayload,
    TDailyExpenseResponse
} from "@/types/Dashboard/TDailyExpence";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IDailyExpenseFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    expense?: TDailyExpenseResponse;
}

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

type PartyLessItem = {
    trid: string;
    partyLesAmount: number;
};

const DailyExpenseFormDialog = ({
    open,
    onClose,
    onSuccess,
    expense
}: IDailyExpenseFormDialogProps) => {

    const isEdit = !!expense;

    // date
    const today = new Date();
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        expense?.date ? new Date(expense.date) : today
    );

    // party less state (MULTIPLE ITEMS)
    const [partyLess, setPartyLess] = useState<PartyLessItem[]>([]);

    const [trid, setTrid] = useState("");
    const [partyLesAmount, setPartyLesAmount] = useState<number | "">("");

    // server action
    const [state, formAction, pending] = useActionState(
        isEdit
            ? updateDailyExpense.bind(null, expense!.id)
            : createDailyExpense,
        null
    );

    const prevStateRef = useRef(state);

    useEffect(() => {
        console.log(state);
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message ?? (isEdit ? "Expense updated" : "Expense created"));
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, isEdit]);

    const handleClose = () => {
        onClose();
    };

    // ADD PARTY LESS ITEM
    const handleAddPartyLess = () => {
        if (!trid || !partyLesAmount) {
            toast.error("Enter TR ID and Amount");
            return;
        }

        const exists = partyLess.find((p) => p.trid === trid);
        if (exists) {
            toast.error("This TR already added");
            return;
        }

        setPartyLess((prev) => [
            ...prev,
            { trid, partyLesAmount: Number(partyLesAmount) }
        ]);

        setTrid("");
        setPartyLesAmount("");
    };

    // REMOVE ITEM
    const handleRemovePartyLess = (trid: string) => {
        setPartyLess((prev) => prev.filter((p) => p.trid !== trid));
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-lg md:max-w-2xl">

                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit ? "Update Daily Expense" : "Create Daily Expense"}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                    {/* MAIN FORM */}
                    <form action={formAction} className="space-y-4">

                        {/* DATE */}
                        <Field>
                            <FieldLabel>Date *</FieldLabel>

                            <Popover open={openDate} onOpenChange={setOpenDate}>
                                <PopoverTrigger asChild>
                                    <Button type="button" variant="outline" className="w-full">
                                        {date ? date.toLocaleDateString() : "Select date"}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(d) => {
                                            setDate(d);
                                            setOpenDate(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </Field>

                        {/* REQUIRED FIELDS */}
                        {REQUIRED_FIELDS.map(({ name, label }) => (
                            <Field key={name as string}>
                                <FieldLabel>{label} *</FieldLabel>
                                <Input
                                    name={name as string}
                                    type="number"
                                    min={0}
                                    defaultValue={String(
                                        expense?.[name as keyof TDailyExpenseResponse] ?? ""
                                    )}
                                />
                            </Field>
                        ))}

                        {/* PARTY LESS SECTION */}
                        <FieldGroup>
                            <FieldLabel>Party Less</FieldLabel>

                            <div className="flex gap-2 mt-2">
                                <Input
                                    value={trid}
                                    onChange={(e) => setTrid(e.target.value)}
                                    placeholder="TR ID"
                                />

                                <Input
                                    value={partyLesAmount}
                                    onChange={(e) =>
                                        setPartyLesAmount(Number(e.target.value))
                                    }
                                    placeholder="Amount"
                                    type="number"
                                />

                                <Button
                                    type="button"
                                    onClick={handleAddPartyLess}
                                >
                                    Add
                                </Button>
                            </div>

                            {/* LIST */}
                            <div className="mt-3 space-y-2">
                                {partyLess.map((item) => (
                                    <div
                                        key={item.trid}
                                        className="flex justify-between border p-2 rounded"
                                    >
                                        <span>
                                            TR: {item.trid} | {item.partyLesAmount}
                                        </span>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                                handleRemovePartyLess(item.trid)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </FieldGroup>

                        {/* OPTIONAL FIELDS */}
                        <div className="pt-2 border-t space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Optional expenses
                            </p>

                            {OPTIONAL_FIELDS.map(({ name, label }) => (
                                <Field key={name as string}>
                                    <FieldLabel>{label}</FieldLabel>
                                    <Input
                                        name={name as string}
                                        type="number"
                                        min={0}
                                        defaultValue={String(
                                            expense?.[name as keyof TDailyExpenseResponse] ??
                                            ""
                                        )}
                                    />
                                </Field>
                            ))}
                        </div>

                        {/* HIDDEN DATA */}
                        <input
                            type="hidden"
                            name="date"
                            value={date?.toISOString() ?? ""}
                        />

                        {/* SEND PARTY LESS JSON */}
                        <input
                            type="hidden"
                            name="partyLess"
                            value={JSON.stringify(partyLess)}
                        />

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-2 border-t pt-4">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>

                            <Button type="submit" disabled={pending}>
                                {pending
                                    ? isEdit
                                        ? "Updating..."
                                        : "Creating..."
                                    : isEdit
                                        ? "Update Expense"
                                        : "Create Expense"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DailyExpenseFormDialog;