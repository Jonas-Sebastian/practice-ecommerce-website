import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  TableSortLabel,
  styled,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme, sortable }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.common.white,
  cursor: sortable ? 'pointer' : 'default',
  color: sortable ? theme.palette.primary.main : 'inherit',
}));

export default function CollapsibleTable({
  columns,
  data,
  totalCount,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(columns[0].id);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      const isNumeric = (value) => !isNaN(value) && value !== null && value !== undefined;

      if (isNumeric(aValue) && isNumeric(bValue)) {
        return order === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      }

      const stringA = String(aValue);
      const stringB = String(bValue);

      return order === 'asc'
        ? stringA.localeCompare(stringB, undefined, { sensitivity: 'base' }) || 0
        : stringB.localeCompare(stringA, undefined, { sensitivity: 'base' }) || 0;
    });
  }, [data, order, orderBy]);

  const Row = ({ row }) => {
    const [open, setOpen] = React.useState(false);

    const handleRowClick = (e) => {
      // Only toggle on clicking cells, not buttons
      if (e.target.tagName !== 'BUTTON') {
        setOpen((prevOpen) => !prevOpen);
      }
    };

    return (
      <React.Fragment>
        <TableRow onClick={handleRowClick}>
          <TableCell>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {columns.map((column) => (
            <StyledTableCell key={column.id} sortable={column.sortable ? 'true' : 'false'}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {row[column.id]}
              </Typography>
            </StyledTableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>{row.details}</Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Paper sx={{ border: '2px solid', borderColor: 'grey.400', borderRadius: 2, overflow: 'hidden', boxShadow: 'none' }}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              {columns.map((column) => (
                <StyledTableCell key={column.id} sortable={column.sortable ? 'true' : 'false'}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    <Typography variant="body1">{column.label}</Typography>
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <Row key={row.id || row.display_id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

CollapsibleTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};
