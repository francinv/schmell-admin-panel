import React from "react";
import { TableCell, TableHead, TablePagination, TableRow, TableFooter } from "@mui/material";
import { styled } from "@mui/system";

export const CTableCell = styled(TableCell)(({_theme}) => ({
    fontFamily:'Quicksand',
    fontSize:14,
    fontWeight:500,
    color: '#9FA2B4',
}));

export const DTableCell = styled(TableCell)(({_theme}) => ({
    fontFamily:'Quicksand',
    fontSize:14,
    fontWeight:500,
    color: '#141400',
}));

export const TableHeader = ({children}) => {
    return (
        <TableHead>
            <TableRow>
                {children}
            </TableRow>
        </TableHead>
    );
};

export const CustomFooter = ({count, page_size, p, handleChangePage, handleChangeRowsPerPage}) => {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={count}
                    rowsPerPage={page_size}
                    page={p-1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        '& .MuiTablePagination-selectLabel':{
                            fontFamily: 'Quicksand',
                            fontSize: 14,
                            color: '#9FA2B4'
                        },
                        '& .MuiTablePagination-select': {
                            fontFamily: 'Quicksand',
                            color: '#4B506D',
                            fontSize: 14,
                            fontWeight: 500,
                        },
                        '& .MuiTablePagination-selectIcon': {
                            color: '#9FA2B4'
                        },
                        '& .MuiTablePagination-displayedRows': {
                            fontFamily: 'Quicksand',
                            fontSize: 14,
                            color: '#9FA2B4'
                        }
                    }}
                />
            </TableRow>
        </TableFooter> 
    );
};

    