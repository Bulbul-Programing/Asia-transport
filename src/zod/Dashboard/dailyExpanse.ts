import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const optionalFloat = z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .transform((v) => (v === "" || v === null || v === undefined ? null : Number(v)))
    .refine((v) => v === null || (!isNaN(v as number) && (v as number) >= 0), {
        message: "Must be a non-negative number",
    })
    .nullable()
    .optional();

const requiredFloat = (label: string) =>
    z
        .union([z.string(), z.number()])
        .transform((v) => Number(v))

const positiveInt = (label: string) =>
    z
        .union([z.string(), z.number()])
        .transform((v) => Number(v))
        .refine((v) => Number.isInteger(v) && v >= 0, {
            message: `${label} must be a non-negative integer`,
        });

// ─────────────────────────────────────────────────────────────────────────────
// DailyExpense — Create (client validation, flat shape)
// ─────────────────────────────────────────────────────────────────────────────

const partyLesSchema = z.object({
    trid: z.string(),
    partyLesAmount: z.number()
})

export const createDailyExpenseSchema = z.object({
    date: z.string().min(1, "Date is required"),
    labourSalary: requiredFloat("Labour salary"),
    officeCost: requiredFloat("Office cost"),
    partyLess: z.array(partyLesSchema),
    carRent: optionalFloat,
    carNumber: optionalFloat,
    vanRepair: optionalFloat,
    mobileBill: optionalFloat,
    transportationCost: optionalFloat,
    managerSalary: optionalFloat,
    stationery: optionalFloat,
    securitySalary: optionalFloat,
    donation: optionalFloat,
    compensation: optionalFloat,
    bkashBill: optionalFloat,
    electricityBill: optionalFloat,
    officeRent: optionalFloat,
    misc: optionalFloat,
});

// DailyExpense — Update (all fields optional)
export const updateDailyExpenseSchema = createDailyExpenseSchema.partial();

// ─────────────────────────────────────────────────────────────────────────────
// partyLes — Create
// ─────────────────────────────────────────────────────────────────────────────
export const createPartyLesSchema = z.object({
    whichDay: z.string().min(1, "Daily expense ID is required"),
    TR: z.string().min(1, "TR is required"),
    totalAmount: positiveInt("Total amount"),
    discountAmount: positiveInt("Discount amount"),
    note: z.string().min(1, "Note is required"),
});

// partyLes — Update
export const updatePartyLesSchema = createPartyLesSchema.partial();

// ─────────────────────────────────────────────────────────────────────────────
// Inferred types
// ─────────────────────────────────────────────────────────────────────────────
export type TCreateDailyExpenseInput = z.infer<typeof createDailyExpenseSchema>;
export type TUpdateDailyExpenseInput = z.infer<typeof updateDailyExpenseSchema>;
export type TCreatePartyLesInput = z.infer<typeof createPartyLesSchema>;
export type TUpdatePartyLesInput = z.infer<typeof updatePartyLesSchema>;