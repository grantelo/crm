import React from 'react'

import classNames from 'classnames'

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        color: "#fff",
        marginRight: "10px"
    },
    paper: {
        padding: "10px 0",
        width: "180px",
        background: "rgba(22,43,58,.5)",
        border: "1px solid #BFD0D9",
        color: "inherit",
        borderRadius: "10px"
    },
    paperBottom: {
        padding: "5px 0",
        marginTop: "15px"
    },
    line: {
        height: "3px",
        margin: "5px 0 10px"
    },
    sum: {
        lineHeight: "10px"
    }
}))

const Chart = () => {
    const classes = useStyles();

    return (
    <Box className={classes.root}>
        <Typography variant={"subtitle2"}>
            ПЕРВИЧНЫЙ КОНТАКТ
        </Typography>
        <Typography variant={"caption"}>
            0 сделок, 0 ₽
        </Typography>
        <Divider className={classes.line} style={{backgroundColor: "red"}}/>
        <Paper className={classes.paper}>
            <Typography variant={"h3"}>
                0
            </Typography>
            <Typography className={classes.sum}>
                0 ₽
            </Typography>
        </Paper>
        <Paper className={classNames(classes.paper, classes.paperBottom)}>
            <Typography>
                0 сделок, 0 ₽
            </Typography>
        </Paper>
    </Box>
    )
}

export default Chart