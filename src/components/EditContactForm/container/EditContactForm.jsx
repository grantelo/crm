import React from 'react';
import {withFormik} from "formik";
import * as yup from "yup";
import {connect} from "react-redux";
import AddContactForm from "../component/AddContactForm";
import {fetchAddContact, setLoaded} from "../../../redux/actions/contacts";
import {ADD_ERROR, ADD_SUCCESS} from "../../../types";

const validationSchema = yup.object({
    title: yup
        .string()
        .required('Требуется название'),
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



export default connect()(withFormik({
    mapPropsToValues: () => ({
            title: '',
            name: '',
            phone: '',
            email: '',
            companyTitle: '',
            companyAddress: ''
        }
    ),

    validationSchema: validationSchema,

    handleSubmit: (values, {props, setSubmitting}) => {
            props.dispatch(fetchAddContact(values))
            .then(({status}) => {
                props.closeDialog()
                if (status === 201) {
                    props.showPopup(ADD_SUCCESS)
                    setSubmitting(false)
                    return
                }

                props.showPopup(ADD_ERROR)
            })
            .catch(err => {
                console.log(err)
                props.closeDialog()
                props.dispatch(setLoaded(true))
                props.showPopup(ADD_ERROR)
            })
    }
})(AddContactForm))
