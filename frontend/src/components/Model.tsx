import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Grid, Paper } from '@mui/material';
import Book from '../type/book';
import { checkoutBook, getBookById, checkInBook } from '../util/bookService';
import { toast } from 'react-toastify';

type propType = {
    bookId: string | undefined, 
    onClose: Function
}

const Model = ({ bookId = undefined, onClose = () => {} }: propType) => {
    const [book, setBook] = useState<Book>();

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const getBook = async () => {
        const bookObject: Book = await getBookById(bookId as string);
        setBook(bookObject);
    }

    const checkout = async () => {
        const flag: boolean = await checkoutBook(bookId as string);
        if (flag) {
            toast.success("Successfully checked out!");
        } else {
            toast.error("Something wen't wrong!");
        }
        onClose();
    }

    const checkIn = async () => {
        const flag: boolean = await checkInBook(bookId as string);
        if (flag) {
            toast.success("Successfully checked in!");
        } else {
            toast.error("Something wen't wrong!");
        }
        onClose();
    }

    useEffect(() => {
        if (bookId) {
            getBook();
        }
    }, [bookId]);

    return (
            <Modal
                open={!!bookId}
                onClose={()=> onClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Book Title: {book?.Title}
                    </Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={checkIn} fullWidth>Check In</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" onClick={checkout} fullWidth>Check Out</Button> 
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
    )
}

export default Model;