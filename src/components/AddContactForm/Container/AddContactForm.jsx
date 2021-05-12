import React from 'react';
import {withFormik} from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";

const validationShema = yup.object({
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

const AddContactForm = withFormik({
    mapPropsToValues: () => (
        {
            title: '',
            name: '',
            phone: '',
            email: '',
            companyTitle: '',
            companyAddress: ''
        }
    ),

    validationSchema: validationShema,

    handleSubmit: (values, {setSubmitting}) => {

    }
})

export default AddContactForm;