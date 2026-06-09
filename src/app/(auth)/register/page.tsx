
import RegisterForm from '@/components/Auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage = () => {
    return (
        <>
            <div className="flex  min-h-svh w-full items-center justify-center p-6 md:px-10 pt-16">
                <div className="w-full max-w-xl ">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center text-3xl font-bold'>Create an account</CardTitle>
                            <CardDescription className='text-center'>
                                Enter your information below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RegisterForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;