import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';
import DateSearch from './DateSearch';

const TRSearch = () => {
    return (
        <div>
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search TR..." />
                <RefreshButton />
                <DateSearch />
            </div>
        </div>
    );
};

export default TRSearch;