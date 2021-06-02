import React from 'react'
import classNames from 'classnames'
import {pick} from 'lodash'

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import {InputBase} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as yup from "yup";
import {useFormik} from "formik";
import NumberFormat from 'react-number-format';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import {useDispatch} from "react-redux";
import {ADD_DEAL} from "../redux/types";
import {fetchAddDeal, setLoaded} from "../redux/actions/deals";
import {ADD_ERROR, ADD_SUCCESS} from "../types";
import {fetchAddContact} from "../redux/actions/contacts";
import {pickBy} from "lodash/object";


const useStyle = makeStyles(() => ({
    root: {
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        zIndex: -1,
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        border: "1px dashed #c4c4c4",
        boxSizing: "border-box",
        opacity: "0",
        transition: "opacity 0.5s",
        background: "#f5f5f5"
    },
    active: {
        zIndex: 1,
        opacity: 1
    },
    rootClose: {
        opacity: "1"
    },
    textField: {
        marginBottom: "5px",
        backgroundColor: "#fff",
        borderRadius: "3px",
        border: "1px solid #c4c4c4",
        "& input": {
            paddingLeft: "10px",
        }
    },
    contactBox: {
        marginBottom: "5px",
        padding: "10px",
        border: "1px solid #c4c4c4",
        borderRadius: "4px",
        backgroundColor: "#fff",
    },
    textFieldContact: {
        width: "100%",
        "&+div": {
            marginBottom: "7px"
        },
        "& input": {
            padding: 0
        }
    },
    line: {
        margin: "5px 0"
    },
    boxButton: {
        marginTop: "10px",
        display: "flex",

    },
    button: {
        marginRight: "10px"
    },
    formControl: {
        width: "100%"
    }
}))

const validationShema = yup.object({
    title: yup
        .string()
        .required('Требуется название'),
    sum: yup
        .number()
        .required('Требуется сумма'),
    name: yup
        .string()
        .matches(new RegExp("[a-zA-Zа-яА-Я]+"), "Только буквы русского или латинского алфавита")
        .min(3, "Минимальная длинна имени 3 символа")
        .required("Требуется имя"),
    phone: yup
        .string()
        .min(11, "Укажите телефон полностью")
        .required("Требуется телефон"),
    email: yup
        .string()
        .email("Введите корректный email")
        .required("Требуется Email"),
    companyTitle: yup
        .string()
        .min(3, "Минимальная длинна компании 3 символа")
        .required("Требуется компания"),
    companyAddress: yup
        .string()
        .min(3, "Минимальная длинна адреса 3 символа")
        .required("Требуется адрес компании"),


})

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

function NumberFormatCustomSum(props) {
    const {onChange, ...other} = props
    return (
        <NumberFormat
            {...other}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: +values.value,
                    },
                });
            }}
            thousandSeparator={true}
            suffix={'₽'}
        />
    );
}

const AddDealForm = ({active, onCloseForm, pipeLineId, showPopup}) => {
    const classes = useStyle()
    const dispatch = useDispatch()

    const closeForm = () => {
        setTimeout(formik.resetForm, 500)
        onCloseForm()
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            sum: 0,
            name: '',
            phone: '',
            email: '',
            companyTitle: '',
            companyAddress: ''
        },
        validationSchema: validationShema,
        onSubmit: values => {
            dispatch(fetchAddDeal({
                pipeLineId,
                values: {
                    ...values,
                    date: new Date()
                }
            }))
                .then(resolve => {
                    if (resolve.status === 201) {
                        showPopup(ADD_SUCCESS)
                        closeForm()
                        return resolve
                    }

                    showPopup(ADD_ERROR)

                    return resolve
                })
                .then(resolve => {
                        console.log(resolve)
                        dispatch(fetchAddContact(pickBy(resolve.data, (value, key) => key !== 'sum' && key !== 'date')))
                        return resolve
                    }
                )

                .catch((err) => {
                    console.log(err)
                    setLoaded(true)
                    showPopup(ADD_ERROR)
                })
        }
    })

    return (
        <Box className={classNames(classes.root, {[classes.active]: active})}>
            <form onSubmit={formik.handleSubmit} autoComplete={"off"}>
                <FormControl error className={classes.formControl}>
                    <InputBase
                        {...formik.getFieldProps("title")}
                        className={classes.textField}
                        inputProps={{padding: "10px"}}
                        fullWidth={true}
                        size={"small"}
                        placeholder={"Название"}
                    />
                    <FormHelperText>{formik.touched.title && formik.errors.title}</FormHelperText>
                </FormControl>
                <FormControl error className={classes.formControl}>
                    <InputBase
                        {...formik.getFieldProps("sum")}
                        className={classes.textField}
                        fullWidth={true}
                        size={"small"}
                        placeholder={"0 ₽"}
                        inputComponent={NumberFormatCustomSum}
                    />
                    <FormHelperText>{formik.touched.sum && formik.errors.sum}</FormHelperText>
                </FormControl>
                <Box className={classes.contactBox}>
                    <TextField
                        {...formik.getFieldProps("name")}
                        className={classes.textFieldContact}
                        size={"small"}
                        InputProps={{disableUnderline: true}}
                        placeholder={"Контакт: Имя"}
                        error={formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Divider className={classes.line}/>
                    <TextField
                        id={"phone"}
                        className={classes.textFieldContact}
                        InputProps={{disableUnderline: true, inputComponent: NumberFormatCustom}}
                        size={"small"}
                        placeholder={"Контакт: Телефон"}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        {...formik.getFieldProps('phone')}
                    />
                    <Divider className={classes.line}/>
                    <TextField
                        {...formik.getFieldProps("email")}
                        className={classes.textFieldContact}
                        InputProps={{disableUnderline: true,}}
                        size={"small"}
                        placeholder={"Контакт: Email"}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Box>
                <Box className={classes.contactBox}>
                    <TextField
                        {...formik.getFieldProps("companyTitle")}
                        className={classes.textFieldContact}
                        InputProps={{disableUnderline: true}}
                        size={"small"}
                        placeholder={"Компания: Название"}
                        error={formik.touched.companyTitle && Boolean(formik.errors.companyTitle)}
                        helperText={formik.touched.companyTitle && formik.errors.companyTitle}
                    />
                    <Divider className={classes.line}/>
                    <TextField
                        {...formik.getFieldProps("companyAddress")}
                        className={classes.textFieldContact}
                        InputProps={{disableUnderline: true}}
                        size={"small"}
                        placeholder={"Компания: Адрес"}
                        error={formik.touched.companyAddress && Boolean(formik.errors.companyAddress)}
                        helperText={formik.touched.companyAddress && formik.errors.companyAddress}
                    />
                </Box>
                <Box className={classes.boxButton}>
                    <Button className={classes.button} color={"primary"} variant={"contained"}
                            type={'submit'}>Добавить</Button>
                    <Button color={"secondary"} onClick={closeForm}>Отмена</Button>
                </Box>
            </form>
        </Box>
    )
}

export default AddDealForm