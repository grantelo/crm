import {connect} from "react-redux";
import {withFormik} from "formik";
import {fetchAddContact, setLoaded} from "../../../redux/actions/contacts";
import {ADD_ERROR, ADD_SUCCESS} from "../../../types";
import AddContactForm from "../../AddContactForm/component/AddContactForm";
import * as yup from "yup";
import {fetchAddEvent, setLoadedEvents} from "../../../redux/actions/finances";
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
            type: 'income',
            sum: 0,
            currency: 'RUB',
            description: '',
        }
    ),

    validationSchema: validationSchema,

    handleSubmit: (values, {props, setSubmitting}) => {
        console.log(props)
        props.dispatch(fetchAddEvent({...values, date: new Date()}))
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
                props.dispatch(setLoadedEvents(true))
                props.showPopup(ADD_ERROR)
            })
    }
})(AddEventForm))