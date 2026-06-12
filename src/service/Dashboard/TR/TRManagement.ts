/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { serverFetch } from "@/lib/server-fetch";
import { TRPayload } from "@/types/Dashboard/TRType";
import { createMultipleTRValidationSchema, createTRValidationSchema } from "@/zod/Dashboard/TR.validation";
import { revalidateTag } from "next/cache";

export const getAllTR = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/tr${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "tr",
                        `tr-${page}`,
                        `tr-${searchTerm}`,
                    ],
                    revalidate: 180,
                },
            }
        )

        const result = await response.json()
        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export const createTR = async (_prevState: unknown, formData: FormData): Promise<any> => {
    try {
        const raw = formData.get("trsJson");
        if (!raw || typeof raw !== "string") {
            return { success: false, message: "No TR data received" };
        }

        let trs: TRPayload[];
        try {
            trs = JSON.parse(raw);
        } catch {
            return { success: false, message: "Invalid TR data" };
        }

        const validatedPayload: any = createMultipleTRValidationSchema.safeParse(trs)
        if (!validatedPayload.success) {
            return {
                success: false,
                errors: validatedPayload.error.issues.map((issue: any) => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                })
            }
        }

        const res = await serverFetch.post("/tr/multiple", {
            body: JSON.stringify(validatedPayload.data),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();

        if (result.success) {
            revalidateTag("tr", { expire: 0 });
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

export const updateTR = async (TRID: string, _currentStatus: any, formData: FormData): Promise<any> => {
    try {
        console.log(TRID);
        const raw = formData.get("updateTRsJson");
        console.log(raw);
        if (!raw || typeof raw !== "string") {
            return { success: false, message: "No TR data received" };
        }

        let trs: TRPayload;
        try {
            trs = JSON.parse(raw);
        } catch {
            return { success: false, message: "Invalid TR data" };
        }

        const validatedPayload: any = createTRValidationSchema.safeParse(trs)
        if (!validatedPayload.success) {
            return {
                success: false,
                errors: validatedPayload.error.issues.map((issue: any) => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                })
            }
        }

        const res = await serverFetch.patch(`/tr/${TRID}`, {
            body: JSON.stringify(validatedPayload.data),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();

        if (result.success) {
            revalidateTag("tr", { expire: 0 });
            revalidateTag("tr", { expire: 0 });
        }

        return result;
    } catch (error) {

    }
}

export const deleteTR = async (trid: string) => {

    try {
        const res = await serverFetch.delete(`/tr/${trid}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag('tr', { expire: 0 })
        }
        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete tr. Please try again.",
        };
    }
}