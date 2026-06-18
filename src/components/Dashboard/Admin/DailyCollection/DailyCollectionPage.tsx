/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryStringFormatter } from "@/lib/formatters";
import AllDailyExpanse from "./AllDailyExpanse";
import DCManagementHeader from "./DCManagementHeader";
import { getAllDailyExpenses } from "@/service/Dashboard/DailyExpense/DailyExpenseManagement";
import TablePagination from "@/components/Shared/TablePagination";


const DailyCollectionPage = async ({ searchObj }: { searchObj: any }) => {
    const queryString = queryStringFormatter(searchObj);
    const dailyExpanseRes = await getAllDailyExpenses(queryString)
    const totalPages = Math.ceil(
        (dailyExpanseRes?.meta?.total || 1) / (dailyExpanseRes?.meta?.limit || 1)
    );

    return (
        <div className='space-y-5'>
            <DCManagementHeader />
            <AllDailyExpanse dailyExpanses={dailyExpanseRes?.data} />
            <TablePagination
                currentPage={dailyExpanseRes?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default DailyCollectionPage;