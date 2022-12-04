import React from 'react'
import { Alert, Snackbar } from '@mui/material';

type propType = {
    open: boolean,
    autoHideDuration?: number,
    onClose?: Function
    message: string
}

const SnackBar = ({ open = false, autoHideDuration = 6000, onClose = () => {}, message }: propType) => (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={() => onClose}>
        <Alert onClose={() => onClose} severity="success" sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
)

export default SnackBar;
