import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Book from '../type/book';

type props = {
    books: Book[],
    onBookSelect: Function
}

const BookTable = ({ books = [], onBookSelect }: props) => (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell  align="right">Author</TableCell>
            <TableCell  align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow
              key={book.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => onBookSelect(book.ID)}
            >
              <TableCell component="th" scope="row">{book.Title}</TableCell>
              <TableCell align="right">{book.Author}</TableCell>
              <TableCell align="right">{book.Quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

export default BookTable;