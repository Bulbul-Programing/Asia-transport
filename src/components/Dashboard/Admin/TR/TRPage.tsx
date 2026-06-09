/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryStringFormatter } from '@/lib/formatters';
import { getAllShops } from '@/service/Dashboard/shop/shopManagement';
import React from 'react';
import TRManagementHeader from './TRManagementHeader';
import AllTR from './AllTR';
import { getAllTR } from '@/service/Dashboard/TR/TRManagement';
import TablePagination from '@/components/Shared/TablePagination';
import TRSearch from './TRSearch';

const TRPage = async ({ searchObj }: { searchObj: any }) => {
    const queryString = queryStringFormatter(searchObj);
    const shops = await getAllShops()
    const TRS = await getAllTR(queryString)
    const totalPages = Math.ceil(
        (TRS?.data?.meta?.total || 1) / (TRS?.data?.meta?.limit || 1)
    );
    return (
        <div className='space-y-5'>
            <TRManagementHeader shops={shops.data} />
            <TRSearch />
            <AllTR TRS={TRS?.data?.data} />
            <TablePagination
                currentPage={TRS?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default TRPage;