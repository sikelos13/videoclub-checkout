import React from 'react';
import Box from '@material-ui/core/Box';
import { Input } from '@material-ui/core';
import PaginationNavBar from '../components/PaginationNavBar';
import { Pagination } from '../api/types/Pagination';

interface ViewHeaderProps {
  handleSearch: (event: any) => void;
  handlePaginate: (pageNumber: number) => void;
  searchTerm: string;
  isSearching: boolean;
  pagination: Pagination;
}

const AppHeader: React.FC<ViewHeaderProps> = (({ handleSearch, handlePaginate, isSearching, pagination }: ViewHeaderProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box component="h2" fontWeight="500" fontSize="2rem" color="#3569b8">Movies Finder</Box>
    <Box display="flex" width="100%" flexDirection="row" justifyContent="space-between" p={1} className="Header_Actions">
      <Input placeholder="Search movies by name..." className="Search_Input" onChange={handleSearch} />
      <PaginationNavBar
          isSearching={isSearching}
          pagination={pagination}
          paginate={handlePaginate}
      />

    </Box>
  </Box>
));

export default AppHeader;