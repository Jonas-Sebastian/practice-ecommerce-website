import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    styled,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme, sortable }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.grey[200],
    cursor: sortable ? 'pointer' : 'default',
    color: sortable ? theme.palette.primary.main : 'inherit',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

export default function GenericTable ({ columns, data, onSort, pagination, onPageChange, onRowsPerPageChange }) {
    return (
        <Paper
            sx={{
                border: '2px solid',
                borderColor: 'grey.400',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 'none',
            }}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    onClick={() => column.sortable && onSort(column.id)}
                                    sortable={column.sortable}
                                    sx={column.sx}
                                >
                                    {column.label}
                                    {column.sortable && column.isSorted && (column.direction === 'ascending' ? ' ▲' : ' ▼')}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={pagination.count}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            )}
        </Paper>
    );
};