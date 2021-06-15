import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import EventCard from "../components/EventCard";
import {eventApi} from "../utils/api";
import Box from "@material-ui/core/Box";
import {Breadcrumbs, CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import classNames from "classnames";

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: "20px"
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    link: {
        color: "inherit",
        //textDecoration: "none",
    }
}))

const DetailPage = () => {
    const classes = useStyles()
    const [event, setEvent] = useState(null)
    const eventId = useParams().id

    useEffect(() => {
        const getEvent = async () => {
            const response = await eventApi.getEventById(eventId)
            setEvent(response.data)
        }

        getEvent()
    }, [eventId])

    return (
        <Box className={classNames(classes.root, {[classes.loading]: !!!event})}>
            {
                !!!event ? <CircularProgress size={100}/> :
                    <Container>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className={classes.link} to={"/finance"}>Финансы</Link>
                            <Typography color="textPrimary">{event?.type === "income" ? "Доход" : "Расход"}</Typography>
                        </Breadcrumbs>
                        <EventCard event={event}/>
                    </Container>
            }
        </Box>
    )
}

export default DetailPage;