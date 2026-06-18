import AdminDashboardPage from '@/components/Dashboard/DashboardHome/AdminDashboardPage';
import React from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    return (
        <div>
            <AdminDashboardPage searchObj={searchParamsObj} />
        </div>
    );
};

export default page;