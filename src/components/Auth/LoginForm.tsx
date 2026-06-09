'use client'
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginUser } from "@/service/Auth/loginUser";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import InputFieldError from "../Shared/InputFieldError";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
        if (state && state.success && state.message) {
            toast.success(state.message);
        }
    }, [state]);
    return (
        <form action={formAction}>
            {redirect && <input type="hidden" name="redirect" value={redirect} />}
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                        //   required
                        />

                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        //   required
                        />
                        <InputFieldError field="password" state={state} />
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" className="text-white" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;