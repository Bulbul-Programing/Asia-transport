import DailyCollectionPage from '@/components/Dashboard/Admin/DailyCollection/DailyCollectionPage';
import React from 'react';

const page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParamsObj = await searchParams;

    return (
        <div>
            <DailyCollectionPage searchObj={searchParamsObj} />
        </div>
    );
};

export default page;