'use client';

import MuiPagination from '@mui/material/Pagination';

type Props = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

export default function Pagination({page, totalPages, onChange}: Props) {
    return (
        <MuiPagination
            aria-label="Product pages"
            count={totalPages}
            page={page}
            shape="rounded"
            onChange={(_, nextPage) => onChange(nextPage)}
            sx={{
                '& .MuiPagination-ul': {justifyContent: 'center', rowGap: 1},
                '& .MuiPaginationItem-root': {color: '#e6e9ef'},
                '& .MuiPaginationItem-page, & .MuiPaginationItem-previousNext': {
                    width: 40,
                    height: 40,
                    borderRadius: '4px',
                    backgroundColor: '#0d1117',
                    border: '1px solid #21262d',
                    '&:hover': {backgroundColor: '#21262d'},
                },
                '& .MuiPaginationItem-page.Mui-selected, & .MuiPaginationItem-page.Mui-selected:hover': {
                    background: 'linear-gradient(135deg, #7b5cff, #9d7bff)',
                    borderColor: '#b9a4ff',
                    color: '#0d1117',
                    fontWeight: 700,
                },
                '& .MuiPaginationItem-root.Mui-focusVisible': {
                    outline: '2px solid #b9a4ff',
                    outlineOffset: '2px',
                },
            }}
        />
    );
}
