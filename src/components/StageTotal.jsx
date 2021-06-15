import React from 'react'

import classNames from 'classnames'

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
    root: {
        padding: "30px 20px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    paper: {
        padding: "10px 0",
        width: "180px",
        background: "rgba(22,43,58,.5)",
        border: "1px solid #BFD0D9",
        color: "inherit",
        borderRadius: "10px",
        backgroundColor: "rebeccapurple"
    },
    title: {
        color: "#000"
    },
    line: {
        height: "3px",
        margin: "5px 0 10px"
    },
    lineBlue: {
        backgroundColor: "#0800FF"
    },
    lineYellow: {
        backgroundColor: "#FFFF00"
    },
    lineOrange: {
        backgroundColor: "#FDA500"
    },
    lineRed: {
        backgroundColor: "#FC0000"
    },
    sum: {
        lineHeight: "10px"
    }
}))

const StageTotal = ({title, color, totalSum, totalCount}) => {
    const classes = useStyles();

    return (
    <Box className={classes.root} component={Paper}>
        <Typography className={classes.title} variant={"subtitle2"}>
            {title}
        </Typography>
        <Typography className={classes.title} variant={"caption"}>
            {totalCount} сделок, {totalSum} ₽
        </Typography>
        <Divider className={classNames(classes.line, {[classes[`line${color}`]]: color})}/>
        <Paper className={classes.paper}>
            <Typography variant={"h3"}>
                {totalCount}
            </Typography>
            <Typography className={classes.sum}>
                {totalSum} ₽
            </Typography>
        </Paper>
    </Box>
    )
}

export default StageTotal