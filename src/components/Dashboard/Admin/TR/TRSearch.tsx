import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';
import DateSearch from './DateSearch';
import TRCollection from './TRCollection';

const TRSearch = () => {
    return (
        <div className='flex items-center justify-between w-full'>
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search TR..." />
                <RefreshButton />
                <DateSearch />
            </div>
            <TRCollection />
        </div>
    );
};

export default TRSearch;