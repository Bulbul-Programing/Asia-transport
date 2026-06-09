import z from "zod";

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(20, {
        error: "Password must be at most 20 characters long",
    }),
});

export const registerValidationSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 2 characters long"),

    email: z.email("Invalid email address"),

    shopName: z
        .string()
        .min(2, "Shop name must be at least 2 digits"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});

export const registerValidationSchemaForServer = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 2 characters long"),

    email: z.email("Invalid email address"),

    shopName: z
        .string()
        .min(2, "Shop name must be at least 2 digits"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Password must be at least 6 characters"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const createAdminUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters"),

    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password cannot exceed 20 characters"),

    profilePhoto: z
        .instanceof(File, { message: "Profile photo is required" })
        .refine((file) => file.size > 0, "Profile photo cannot be empty")
        .refine(
            (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Photo must be JPEG, PNG, or WEBP"
        ),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),

    phone: z
        .string()
        .trim()
        .regex(
            /^(\+8801|01)[3-9]\d{8}$/,
            "Phone number must be a valid Bangladeshi mobile number"
        ),
});

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
});