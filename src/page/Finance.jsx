import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import {fetchEvents} from "../redux/actions/finances";
import {useDispatch, useSelector} from "react-redux";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddEventForm from "../components/AddEventForm/index"

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
    }
}))

const Finance = ({showDialog}) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const finances = useSelector(({finances}) => finances.items)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [])

    const handleAddEvent = () => {
        showDialog({renderComponent: <AddEventForm />})
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
                <TableContainer>
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
                            {finances.map(row => (
                                <TableRow key={row.id}>
                                    {Object.values(row).map(item => (
                                        <TableCell key={item}>{item}</TableCell>
                                    ))}
                                    <TableCell>
                                        <Button
                                            color={"primary"}
                                            variant={"contained"}
                                        >
                                            <OpenInNewIcon/>
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