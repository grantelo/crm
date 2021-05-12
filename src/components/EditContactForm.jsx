import React from 'react';
import {TextField} from "@material-ui/core";

const EditContactForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                name={"title"}
                label={"title"}
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                variant={"outlined"}
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name={"name"}
                label={"name"}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                variant={"outlined"}
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                name={"phone"}
                label={"phone"}
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                variant={"outlined"}
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name={"email"}
                label={"email"}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                variant={"outlined"}
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyTitle}
                name={"companyTitle"}
                label={"companyTitle"}
                error={touched.companyTitle && !!errors.companyTitle}
                helperText={touched.companyTitle && errors.companyTitle}
                variant={"outlined"}
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyAddress}
                name={"companyAddress"}
                label={"companyAddress"}
                error={touched.companyAddress && !!errors.companyAddress}
                helperText={touched.companyAddress && errors.companyAddress}
                variant={"companyAddress"}
            />
        </form>
    )
}

export default EditContactForm;