import React from 'react'
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: "pointer",
        position: "relative",
        margin: `${theme.spacing(1)}px 0`,
        height: "70px",
        padding: "5px",
        border: "1px solid #ccc",
        "&:hover $actions": {
            opacity: 1
        }
    },
    actions: {
        position: "absolute",
        background: "#fff",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        transition: "all 0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0
    },
    content: {
        color: "#707070",
        padding: 0
    },
    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        color: "#000"
    },
    title: {
        color: "#0B57A8"
    }
}))

const PipeLineItem = ({pipeLineId, id, title, sum, name, titleCompany, date, onClickDeleteDeal}) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActions className={classes.actions}>
                <IconButton color={"primary"}><InfoIcon fontSize={"large"}/></IconButton>
                <IconButton onClick={() => onClickDeleteDeal(pipeLineId, id)} color={"secondary"}><DeleteIcon fontSize={"large"}/></IconButton>
            </CardActions>
            <CardContent className={classes.content}>
                <Box className={classes.box}>
                    <Box>
                        <Typography className={classes.name} variant={"caption"} component={"span"}>{`${name}, `}</Typography>
                        <Typography variant={"caption"}>{titleCompany}</Typography>
                    </Box>
                    <Typography variant={"caption"}>{formatRelative(new Date(date), Date.now(), {locale: ru})}</Typography>
                </Box>
                <Typography className={classes.title} align={"left"}>{title}</Typography>
                <Typography align={"left"}>{`${sum} ₽`}</Typography>
            </CardContent>
        </Card>
    )
}

export default PipeLineItem