/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createDailyExpenseSchema, createPartyLesSchema, updateDailyExpenseSchema, updatePartyLesSchema } from "@/zod/Dashboard/dailyExpanse";


// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Pull every DailyExpense field out of FormData into a plain object */
const extractDailyExpenseFields = (formData: FormData) => ({
    date: formData.get("date"),
    labourSalary: formData.get("labourSalary"),
    officeCost: formData.get("officeCost"),
    carRent: formData.get("carRent"),
    carNumber: formData.get("carNumber"),
    vanRepair: formData.get("vanRepair"),
    mobileBill: formData.get("mobileBill"),
    transportationCost: formData.get("transportationCost"),
    managerSalary: formData.get("managerSalary"),
    stationery: formData.get("stationery"),
    securitySalary: formData.get("securitySalary"),
    donation: formData.get("donation"),
    compensation: formData.get("compensation"),
    bkashBill: formData.get("bkashBill"),
    electricityBill: formData.get("electricityBill"),
    officeRent: formData.get("officeRent"),
    misc: formData.get("misc"),
});

const extractPartyLesFields = (formData: FormData) => ({
    whichDay: formData.get("whichDay"),
    TR: formData.get("TR"),
    totalAmount: formData.get("totalAmount"),
    discountAmount: formData.get("discountAmount"),
    note: formData.get("note"),
});

// ═════════════════════════════════════════════════════════════════════════════
//  DAILY EXPENSE
// ═════════════════════════════════════════════════════════════════════════════

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createDailyExpense = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const rawPayload = extractDailyExpenseFields(formData);
            console.log(rawPayload);
        // Client-side Zod validation
        const validation = zodValidator(rawPayload, createDailyExpenseSchema);
        if (!validation.success) return validation;

        const res = await serverFetch.post("/daily-expense", {
            body: JSON.stringify(validation.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[createDailyExpense]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create Daily Expense. Please try again.",
        };
    }
};

// ── GET ALL (with query params for filtering / pagination) ────────────────────
export const getAllDailyExpenses = async (query?: Record<string, string>): Promise<any> => {
    try {
        const params = query ? "?" + new URLSearchParams(query).toString() : "";

        const res = await serverFetch.get(`/daily-expense${params}`);
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[getAllDailyExpenses]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch Daily Expenses.",
        };
    }
};

// ── GET ONE ───────────────────────────────────────────────────────────────────
export const getDailyExpenseById = async (id: string): Promise<any> => {
    try {
        const res = await serverFetch.get(`/daily-expense/${id}`);
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[getDailyExpenseById]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch Daily Expense.",
        };
    }
};

// ── UPDATE ────────────────────────────────────────────────────────────────────
export const updateDailyExpense = async (
    id: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const rawPayload = extractDailyExpenseFields(formData);

        // Remove empty / null optional fields so PATCH only sends changed values
        const filteredPayload = Object.fromEntries(
            Object.entries(rawPayload).filter(([, v]) => v !== null && v !== "")
        );

        const validation = zodValidator(filteredPayload, updateDailyExpenseSchema);
        if (!validation.success) return validation;

        const res = await serverFetch.patch(`/daily-expense/${id}`, {
            body: JSON.stringify(validation.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[updateDailyExpense]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update Daily Expense. Please try again.",
        };
    }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
export const deleteDailyExpense = async (id: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(`/daily-expense/${id}`);
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[deleteDailyExpense]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete Daily Expense. Please try again.",
        };
    }
};

// ═════════════════════════════════════════════════════════════════════════════
//  PARTY LES
// ═════════════════════════════════════════════════════════════════════════════

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createPartyLes = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const rawPayload = extractPartyLesFields(formData);

        const validation = zodValidator(rawPayload, createPartyLesSchema);
        if (!validation.success) return validation;

        const res = await serverFetch.post("/daily-expense/party-les", {
            body: JSON.stringify(validation.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[createPartyLes]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create PartyLes entry. Please try again.",
        };
    }
};

// ── GET ALL (scoped to a DailyExpense) ────────────────────────────────────────
export const getAllPartyLesByExpense = async (
    dailyExpenseId: string,
    query?: Record<string, string>
): Promise<any> => {
    try {
        const params = query ? "?" + new URLSearchParams(query).toString() : "";

        const res = await serverFetch.get(
            `/daily-expense/${dailyExpenseId}/party-les${params}`
        );
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[getAllPartyLesByExpense]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch PartyLes entries.",
        };
    }
};

// ── GET ONE ───────────────────────────────────────────────────────────────────
export const getPartyLesById = async (id: string): Promise<any> => {
    try {
        const res = await serverFetch.get(`/daily-expense/party-les/${id}`);
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[getPartyLesById]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch PartyLes entry.",
        };
    }
};

// ── UPDATE ────────────────────────────────────────────────────────────────────
export const updatePartyLes = async (
    id: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const rawPayload = extractPartyLesFields(formData);

        const filteredPayload = Object.fromEntries(
            Object.entries(rawPayload).filter(([, v]) => v !== null && v !== "")
        );

        const validation = zodValidator(filteredPayload, updatePartyLesSchema);
        if (!validation.success) return validation;

        const res = await serverFetch.patch(`/daily-expense/party-les/${id}`, {
            body: JSON.stringify(validation.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[updatePartyLes]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update PartyLes entry. Please try again.",
        };
    }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
export const deletePartyLes = async (id: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(`/daily-expense/party-les/${id}`);
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error("[deletePartyLes]", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete PartyLes entry. Please try again.",
        };
    }
};