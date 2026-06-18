/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AdminDashboardHome from './AdminDashboardHome';
import { queryStringFormatter } from '@/lib/formatters';
import { getDashboardHomeData } from '@/service/Dashboard/dashboardHome';

const AdminDashboardPage = async ({ searchObj }: { searchObj: any }) => {
    const queryString = queryStringFormatter(searchObj);
    const dashboardHomeRes = await getDashboardHomeData()

    return (
        <div>
            <AdminDashboardHome data={dashboardHomeRes.data} />
        </div>
    );
};

export default AdminDashboardPage;