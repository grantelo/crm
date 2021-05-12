import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import {Snackbar} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const PopupNotification = ({popup,onClosePopup}) => {
    return (
        <Snackbar
            onClose={onClosePopup}
            anchorOrigin={{vertical: 'top', horizontal: "right"}}
            open={popup.open}
            autoHideDuration={6000}
        >
            <Alert onClose={onClosePopup} severity={popup.type} variant={"filled"} >
                {popup.message}
            </Alert>
        </Snackbar>
    )
}

export default PopupNotification;