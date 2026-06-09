/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { hostImages } from "@/utils/ImageUpload";
import { changePasswordSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";

export async function updateMyProfile(formData: FormData) {
    try {
        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        const updatePayload = data

        // Add the file if it exists
        const file = formData.get('file') as File;

        if (file?.size > 0) {
            const uploadPhoto = await hostImages([file as File]);

            updatePayload.profilePhoto = uploadPhoto[0]
        }

        const res = await serverFetch.patch(`/user/update`, {
            body: JSON.stringify(updatePayload),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();
        if (result.success) {
            revalidateTag("user-info", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function changePassword(_prevState: any, formData: FormData) {

    const validationPayload = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(
        validationPayload,
        changePasswordSchema
    );

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        // API Call
        const response = await serverFetch.patch("/user/update", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldPassword: validationPayload.oldPassword,
                newPassword: validationPayload.newPassword,
                confirmPassword: validationPayload.confirmPassword
            }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Password change failed");
        }

        return {
            success: true,
            message: result.message || "Password changed successfully!",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}