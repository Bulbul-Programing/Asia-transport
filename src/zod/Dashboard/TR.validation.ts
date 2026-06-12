import z from "zod";

export const createTRValidationSchema = z.object({
    TRID: z
        .string()
        .min(1, { message: "TRID is required" }),

    shopName: z
        .string()
        .min(1, { message: "ShopId is required" }),

    quantity: z
        .number(),

    paymentStatus: z.boolean(),

    taka: z
        .number()
        .min(0, { message: "taka cannot be negative" }),

    bookingDate: z.coerce.date(),

    isOfficeDelivery: z.boolean(),

    note: z
        .string()
        .max(500, { message: "Note cannot exceed 500 characters" })
        .optional(),
});

export const createMultipleTRValidationSchema = z.array(createTRValidationSchema)