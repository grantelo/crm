import React from 'react'

import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyle = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "500px",
        padding: "30px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 3,
        backgroundColor: "#fff"
    },
    cancelIcon: {
        cursor: "pointer",
        top: "-11px",
        right: "-11px"
    },
    textField: {
        marginBottom: theme.spacing(3)
    }
}))

const AddContactForm = () => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <form className={classes.form}>
                <CancelIcon className={classes.cancelIcon} color={"primary"} fontSize={"large"}/>
                <TextField className={classes.textField} label={"Введите имя"} placeholder={"Ivan"}
                           variant={"outlined"}/>
                <TextField className={classes.textField} label={"Введите телефон"} placeholder={"+7(111)-22-33-444"}
                           variant={"outlined"}/>
                <TextField className={classes.textField} label={"Введите email"} placeholder={"amazon@gmail.com"}
                           variant={"outlined"}/>
                <TextField className={classes.textField} label={"Введите компанию"} placeholder={"Amazon"}
                           variant={"outlined"}/>
                <Button variant={"contained"} color={"primary"}>Добавить контакт</Button>
            </form>
        </Box>
    )
}

export default AddContactForm