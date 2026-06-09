/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUser } from "@/types/User/TUserInfo";

export const getUserInfo = async (): Promise<TUser | any> => {
    let userInfo: TUser | any;
    try {

        const response = await serverFetch.get("/auth/me", {
            next: { tags: ["user-info"], revalidate: 180 },
        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE as string) as JwtPayload;

            userInfo = {
                name: result.data.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.name || "Unknown User",
            ...result.data
        };

        return userInfo;
    } catch (error: any) {
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "USER",
        };
    }

}