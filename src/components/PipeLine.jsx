import React, {useState} from 'react'
import classNames from 'classnames'

import AddDeal from "./AddDeal";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PipeLineItem from "./PipeLineItem";
import PopupNotification from "./PopupNotification";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {DIALOG_CLEAR_DEALS, REMOVE_ERROR, REMOVE_SUCCESS} from "../types";
import {fetchClearDeals, fetchRemoveDeal, setLoaded} from "../redux/actions/deals";

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
        maxWidth: "312px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        flex: 1,
        marginRight: "10px"
    },
    line: {
        margin: "10px 0",
        height: "3px"
    },
    lineBlue: {
        background: "blue"
    },
    lineYellow: {
        background: "yellow"
    },
    lineOrange: {
        background: "orange"
    },
    lineRed: {
        background: "red"
    },
    iconButton: {
        position: "absolute",
        top: "-10px",
        left: 0
    }
}))

const PipeLine = ({deals, title, pipeLineId, color, showPopup, showDialog, onClickDeleteDeal, onClearDeals}) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {!!deals.totalCount && <IconButton onClick={() => showDialog({...DIALOG_CLEAR_DEALS(title), dialogProps: pipeLineId, handleCloseDialogAgree: onClearDeals})}
                                               className={classes.iconButton}><DeleteIcon
                color={"secondary"}/></IconButton>}
            <Typography variant={"subtitle2"}>
                {title}
            </Typography>
            <Typography variant={"caption"}>
                {`${deals.totalCount} сделок: ${deals.totalSum} руб`}
            </Typography>
            <Divider className={classNames(classes.line, {[classes[`line${color}`]]: color})}/>
            <AddDeal pipeLineId={pipeLineId} showPopup={showPopup}/>
            {deals.items.map(item => {
                return <PipeLineItem {...item} pipeLineId={pipeLineId} showPopup={showPopup}
                                     onClickDeleteDeal={onClickDeleteDeal}/>
            })}
        </Box>
    )
}

export default PipeLine