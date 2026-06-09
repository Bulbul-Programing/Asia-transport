'use client'

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useActionState, } from 'react';
import InputFieldError from '../Shared/InputFieldError';
import { registerUser } from '@/service/Auth/registerUser';

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    return (
        <form action={formAction} >
            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">

                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                        />
                        <InputFieldError field="name" state={state} />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Shop name */}
                    <Field>
                        <FieldLabel htmlFor="name">Shop Name</FieldLabel>
                        <Input
                            id="shopName"
                            name="shopName"
                            type="text"
                            placeholder="New multi Electric"
                        />
                        <InputFieldError field="shopName" state={state} />
                    </Field>


                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******"
                        />
                        <InputFieldError field="password" state={state} />
                    </Field>
                </div>

                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Registering..." : "Register"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Already have an account?{" "}
                            <Link href="/login" className="hover:underline">
                                Login
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;