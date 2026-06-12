import TRPage from '@/components/Dashboard/Admin/TR/TRPage';
import TRPageSkeleton from '@/skeleton/TR/TRPageSkeleton';
import { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    return (
        <div>
            <Suspense fallback={<TRPageSkeleton />}>
                <TRPage searchObj={searchParamsObj} />
            </Suspense>

        </div>
    );
};

export default page;