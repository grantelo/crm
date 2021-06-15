import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import {fetchDeleteEvent, fetchEvents, setLoadedEvents} from "../redux/actions/finances";
import {useDispatch, useSelector} from "react-redux";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddEventForm from "../components/AddEventForm/index"
import DeleteIcon from "@material-ui/icons/Delete";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import Paper from "@material-ui/core/Paper";
import {REMOVE_ERROR, REMOVE_SUCCESS} from "../types";

const useStyle = makeStyles(theme => ({
    container: {
        position: "relative"
    },
    title: {
        fontWeight: 500
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(-10),
        right: theme.spacing(1),
    },
    tableContainer: {
        marginTop: "30px",
        maxHeight: "70vh"
    },
    deleteButton: {
        marginLeft: "10px"
    }
}))

const getCurrency = (value, currency) => {
    return new Intl.NumberFormat("ru-RU", {style: "currency", currency}).format(value)
}

const Finance = ({showPopup, showDialog, handleCloseDialog}) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const finances = useSelector(({finances}) => finances.items)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [])

    const handleAddEvent = () => {
        showDialog({
            renderComponent: <AddEventForm
                showPopup={showPopup}
                closeDialog={handleCloseDialog}
            />
        })
    }

    const handleDeleteEvent = (id) => {
        dispatch(fetchDeleteEvent(id))
            .then(({status}) => {
                if (status === 200) {
                    showPopup(REMOVE_SUCCESS)
                    return
                }

                showPopup(REMOVE_ERROR)
            })
            .catch((err) => {
                console.log(err)
                setLoadedEvents(true)
                showPopup(REMOVE_ERROR)
            })
    }

    return (
        <Box>
            <Container className={classes.container}>
                <Typography
                    className={classes.title}
                    variant={"h1"}
                >
                    События
                </Typography>
                <Divider/>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>Сумма</TableCell>
                                <TableCell>Дата</TableCell>
                                <TableCell>Категория</TableCell>
                                <TableCell>Тип</TableCell>
                                <TableCell>Открыть</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {finances?.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{getCurrency(row.sum, row.currency)}</TableCell>
                                    <TableCell>{format(new Date(row.date), "dd.MM.yyyy HH:mm")}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.type === "income" ? "доход" : "расход"}</TableCell>
                                    <TableCell>
                                        <Link to={`/details/${row.id}`}>
                                            <Button
                                                color={"primary"}
                                                variant={"contained"}
                                            >
                                                <OpenInNewIcon/>
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDeleteEvent(row.id)}
                                            className={classes.deleteButton}
                                            color={"secondary"}
                                            variant={"contained"}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Fab
                    size={"large"}
                    className={classes.fab}
                    color="primary"
                    aria-label="add"
                    onClick={handleAddEvent}
                >
                    <AddIcon/>
                </Fab>
            </Container>
        </Box>
    );
};

export default Finance;