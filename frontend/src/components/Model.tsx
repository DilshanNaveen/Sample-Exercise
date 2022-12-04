import { Modal, Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Book from '../type/book'
import { checkoutBook, getBookById, checkInBook } from '../util/bookService'

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
        const res: boolean = await checkoutBook(bookId as string);
        alert(`res: ${res}`);
        onClose();
    }

    const checkIn = async () => {
        const res: boolean = await checkInBook(bookId as string);
        alert(`res: ${res}`);
        onClose();
    }

    useEffect(() => {
        if (bookId) {
            getBook();
        }
    }, [bookId]);

    return (
        <>
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
                    <Button variant="contained" onClick={checkIn}>Check In</Button>
                    <Button variant="outlined" onClick={checkout}>Check Out</Button>
                </Box>
            </Modal>
        </>
    )
}

export default Model;