import {connect} from "react-redux";
import {withFormik} from "formik";
import {fetchAddContact, setLoaded} from "../../../redux/actions/contacts";
import {ADD_ERROR, ADD_SUCCESS} from "../../../types";
import AddContactForm from "../../AddContactForm/component/AddContactForm";
import * as yup from "yup";
import {fetchAddEvent} from "../../../redux/actions/finances";
import AddEventForm from "../component/AddEventForm";

const validationSchema = yup.object({
    category: yup
        .string()
        .required("Требуется категория"),
    type: yup
        .string()
        .required("Требуется тип"),
    sum: yup
        .number()
        .required("Требуется сумма"),
    currency: yup
        .string(),
    description: yup
        .string()
        .min(5, "Требуется минимум 5 символов!")
        .required("Требуется описание")
})

export default connect()(withFormik({
    mapPropsToValues: () => ({
            category: '',
            type: '',
            sum: '',
            currency: '₽',
            description: '',
        }
    ),

    validationSchema: validationSchema,

    handleSubmit: (values, {props, setSubmitting}) => {
        console.log(values)
    }
})(AddEventForm))