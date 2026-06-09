/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerValidationSchema, registerValidationSchemaForServer } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payloadForValidate = {
            name: formData.get("name"),
            email: formData.get("email"),
            shopName: formData.get("shopName"),
            password: formData.get("password")
        };

        if (zodValidator(payloadForValidate, registerValidationSchema).success === false) {
            return zodValidator(payloadForValidate, registerValidationSchema);
        }
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            shopName: formData.get("shopName"),
            password: formData.get("password")
        };

        const validatedPayload: any = zodValidator(payload, registerValidationSchemaForServer).data;

        const res = await serverFetch.post("/user", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}