import TRPage from '@/components/Dashboard/Admin/TR/TRPage';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    return (
        <div>
            <TRPage searchObj={searchParamsObj}/>
        </div>
    );
};

export default page;