import React from 'react';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green, red} from "@material-ui/core/colors";
import classNames from "classnames";
import {format} from "date-fns";
import {ru} from "date-fns/locale";

const useStyles = makeStyles(theme => ({
    root: {
        color: "#fff",
        padding: "20px",
        backgroundColor: green[500],
        width: "500px",
    },
    consumption: {
        backgroundColor: red[500]
    },

}))

const EventCard = ({event}) => {
    const {sum, description, category, date, currency} = event
    console.log(event)
    const classes = useStyles()

    return (
        <Paper className={classNames(classes.root, {[classes.consumption]: event.type === "consumption"})}>
            <Typography>{`Описание: ${description}`}</Typography>
            <Typography>{`Сумма: ${sum}${currency}`}</Typography>
            <Typography>{`Категория: ${category}`}</Typography>
            <Typography>{format(new Date(date), "dd.MM.yyyy HH:mm")}</Typography>
        </Paper>
    )
}

export default EventCard;