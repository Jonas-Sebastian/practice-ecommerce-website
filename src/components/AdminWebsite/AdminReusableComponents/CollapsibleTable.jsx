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
  useTheme,
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

const CollapsibleTable = ({ columns, data, totalCount, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  const Row = ({ row }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {columns.map((column) => (
            <StyledTableCell key={column.id}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {row[column.id]}
              </Typography>
            </StyledTableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, bgcolor: theme.palette.grey[50], borderRadius: 1, boxShadow: 1 }}>
                {row.details}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  Row.propTypes = {
    row: PropTypes.object.isRequired,
  };

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
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              {columns.map((column) => (
                <StyledTableCell key={column.id} sortable={column.sortable}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {column.label}
                    {column.sortable && column.isSorted && (column.direction === 'ascending' ? ' ▲' : ' ▼')}
                  </Typography>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.id} row={row} />
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
        sx={{ padding: 2 }}
      />
    </Paper>
  );
};

CollapsibleTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default CollapsibleTable;
