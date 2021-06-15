import React from 'react'

import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NumberFormat from "react-number-format";

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "300px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        backgroundColor: "#fff"
    },
    textField: {
        marginBottom: theme.spacing(3)
    }
}))

function NumberFormatCustom(props) {
    const {onChange, ...other} = props

    return (
        <NumberFormat
            {...other}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            format="+# (###) ###-####" mask="-"
        />
    );
}

const AddContactForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props

    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <form className={classes.form}>
                <TextField
                    name={"title"}
                    className={classes.textField}
                    label={"Введите название контакта"}
                    placeholder={"Ivan717"}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && errors.title}
                    helperText={touched.title && errors.title}
                    value={values.title}
                />
                <TextField
                    name={"name"}
                    className={classes.textField}
                    label={"Введите имя"}
                    placeholder={"Ivan"}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                    helperText={touched.name && errors.name}
                    value={values.name}
                />
                <TextField
                    name={"phone"}
                    className={classes.textField}
                    label={"Введите телефон"}
                    autoComplete={"off"}
                    placeholder={"+7(111)-22-33-444"}
                    variant={"outlined"}
                    InputProps={{inputComponent: NumberFormatCustom}}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && errors.phone}
                    helperText={touched.phone && errors.phone}
                    value={values.phone}
                />
                <TextField
                    name={"email"}
                    className={classes.textField}
                    label={"Введите email"}
                    placeholder={"amazon@gmail.com"}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                    value={values.email}
                />
                <TextField
                    name={"companyTitle"}
                    className={classes.textField}
                    label={"Введите компанию"}
                    placeholder={"Amazon"}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.companyTitle && errors.companyTitle}
                    helperText={touched.companyTitle && errors.companyTitle}
                    value={values.companyTitle}
                />
                <TextField
                    name={"companyAddress"}
                    className={classes.textField}
                    label={"Введите адрес компании"}
                    placeholder={"Street Lenina 10d"}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.companyAddress && errors.companyAddress}
                    helperText={touched.companyAddress && errors.companyAddress}
                    value={values.companyAddress}
                />
                <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    type={"submit"}
                    variant={"contained"}
                    color={"primary"}
                >
                    Добавить контакт
                </Button>
            </form>
        </Box>
    )
}

export default AddContactForm