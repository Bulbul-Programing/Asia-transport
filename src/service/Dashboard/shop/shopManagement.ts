/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";


export const getAllShops = async () => {
    try {
        const response = await serverFetch.get(`/shop`,
            {
                next: {
                    tags: ["shops"],
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