import React from 'react'

import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import AddDealForm from "./AddDealForm";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
    root: {
        cursor: "pointer",
        border: "1px dashed #d7d8db",
        position: "relative"
    },
    button: {
        cursor: "inherit",
        lineHeight: "50px",
        fontSize: "12px",
        fontWeight: "400",
        padding: "0",
        width: "100%",
        opacity: "1",
        transition: "opacity 0.5s"
    },
    buttonClose: {
        opacity: "0"
    }
}))

const  AddDeal = ({pipeLineId, showPopup}) => {
    const [visibleForm, setVisibleForm] = React.useState(false)
    const classes = useStyles()

    const toggleVisibleForm = () => {
        setVisibleForm(!visibleForm)
        console.log(visibleForm)
    }

    return (
        <Box className={classes.root}>
            <Button className={classes.button} onClick={toggleVisibleForm}>Добавить сделку</Button>
            <AddDealForm showPopup={showPopup} pipeLineId={pipeLineId} active={visibleForm} onCloseForm={toggleVisibleForm}/>
        </Box>
    )

}

export default AddDeal