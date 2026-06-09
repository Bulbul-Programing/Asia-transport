/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        console.log("in", _currentState);
        const redirectTo = formData.get('redirect') || null
        let accessTokenObject: null | any = null
        let refreshTokenObject: null | any = null

        const payload = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        if (zodValidator(payload, loginValidationZodSchema).success === false) {
            return zodValidator(payload, loginValidationZodSchema)
        }

        const validatedPayload = zodValidator(payload, loginValidationZodSchema).data;

        const res = await serverFetch.post('/auth/login', {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await res.json();

        if (result.success === false) {
            return { success: false, message: `${result?.message ? result?.message : "user login Failed!."}` }
        }

        const setCookieHeaders = res.headers.getSetCookie()

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookies: string) => {
                const parsedCookie = parse(cookies)

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        }
        else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.ACCESS_TOKEN_SECRETE as string);

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token");
        }

        const userRole: UserRole = verifiedToken.role;

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` };
    }
}