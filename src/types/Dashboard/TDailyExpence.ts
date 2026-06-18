export type TDailyExpensePayload = {
    date: Date;

    // required
    labourSalary: number;
    officeCost: number;

    // optional
    partyLes?: number;
    carRent?: number | null;
    carNumber?: number | null;
    vanRepair?: number | null;
    mobileBill?: number | null;
    transportationCost?: number | null;
    managerSalary?: number | null;
    stationery?: number | null;
    securitySalary?: number | null;
    donation?: number | null;
    compensation?: number | null;
    bkashBill?: number | null;
    electricityBill?: number | null;
    officeRent?: number | null;
    misc?: number | null;
};

// ── Shape returned from the DB / API ──────────────────────────────────────────
export type TDailyExpenseResponse = TDailyExpensePayload & {
    id: string;
    createdAt: Date;
    updateAt: Date;
};

// ── Server-action return value ────────────────────────────────────────────────
export type TDailyExpenseActionResult = {
    success: boolean;
    message?: string;
    data?: TDailyExpenseResponse;
} | null;
