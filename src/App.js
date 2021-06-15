import React, {useState} from "react";

import useRoutes from "./routes";
import Menu from "./components/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box} from "@material-ui/core";
import PopupNotification from "./components/PopupNotification";
import AlertDialog from "./components/AlertDialog";


const useStyles = makeStyles(() => ({
    root: {
        display: "flex"
    },
    box: {
        flexGrow: 1
    }
}))

function App() {

    const handleClosePopup = (event, reason) => {
        if (reason === "clickway") return
        setPopup(prevState => ({...prevState, open: false}))
    }

    const handleCloseDialog = () => {
        setDialog(prevState => ({...prevState, open: false}))
    }

    const showPopup = ({type, message}) => {
        setPopup({open: true, type, message})
    }

    const showDialog = ({title, message, dialogProps, handleCloseDialogAgree, renderComponent}) => {
        console.log(renderComponent)
        setDialog({open: true, message, title, dialogProps, handleCloseDialogAgree, renderComponent})
    }

    const classes = useStyles()
    const routes = useRoutes({showPopup, showDialog, handleCloseDialog, handleClosePopup})
    const [dialog, setDialog] = useState({})
    const [popup, setPopup] = useState({})


    return (
        <div className={classes.root}>
            <Menu/>
            <Box className={classes.box}>
                {routes}
            </Box>
            <PopupNotification
                popup={popup}
                onClosePopup={handleClosePopup}
            />
            <AlertDialog
                {...dialog}
                onCloseDialog={handleCloseDialog}
            />
        </div>
    );
}

export default App;
