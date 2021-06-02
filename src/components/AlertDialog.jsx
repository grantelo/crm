import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const AlertDialog = ({open, message, title, onCloseDialog, handleCloseDialogAgree, dialogProps, renderComponent}) => {
    console.log(renderComponent)
    return (
        <Dialog
            open={open}
            onClose={onCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {
                !renderComponent ?
                (
                    <>
                        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onCloseDialog} color="primary" autoFocus>
                                Отмена
                            </Button>
                            <Button onClick={() => handleCloseDialogAgree(dialogProps)} color="primary">
                                Подтвержаю
                            </Button>
                        </DialogActions>
                    </>)
                    :
                    <DialogContent>{renderComponent}</DialogContent>
            }
        </Dialog>
    )
}

export default AlertDialog;