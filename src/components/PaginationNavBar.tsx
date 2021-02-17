import React from 'react';
import { Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { Pagination } from '../api/types/Pagination';

interface PaginationProps {
    isSearching: boolean;
    pagination: Pagination;
    paginate: (pageNumber: number) => void;
}
const PaginationNavBar: React.FC<PaginationProps> = ({ isSearching, pagination, paginate }: PaginationProps) => {
    return (
        <>
            {pagination.total_pages > 0 &&
                <Box className="Pagination_TableCell">
                    <Box display="flex" alignItems="center">
                        <Box>
                            <IconButton disabled={pagination.page === 1 || isSearching} onClick={() => paginate(pagination.page - 1)}><ArrowBackIcon /></IconButton>
                            Page  {pagination.page} of {pagination.total_pages}
                            <IconButton disabled={!pagination.hasNextPage || isSearching} onClick={() => paginate(pagination.page + 1)}><ArrowForwardIcon /></IconButton>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    )
}

export default PaginationNavBar;
