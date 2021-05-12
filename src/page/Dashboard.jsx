import React from 'react'
import {AppBar, Toolbar, Button, InputBase, darken, Typography, Container, Box} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import SortIcon from '@material-ui/icons/Sort'
import DateRangeIcon from '@material-ui/icons/DateRange';

import logo from '../assets/img/logo.svg'
import makeStyles from "@material-ui/core/styles/makeStyles";

import Category from '../components/Category'
import Chart from "../components/Chart";

const useStyle = makeStyles((theme) => ({
    dashboard: {
        height: "100%",
        backgroundColor: "#2C9AD2",
        color: '#fff',
    },
    appBar: {
        backgroundColor: "transparent"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        border: '1px solid #fff',
    },
    logo: {
        marginRight: '27px',
    },
    button: {
        cursor: "pointer",
        marginLeft: "32px",
        padding: "6px 32px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 0px",
        borderRadius: "10px",
        backgroundColor: "#14314A",
        color: "#fff",
        "&:hover": {
            backgroundColor: darken("#14314A", 0.3)
        }
    },
    SortIcon: {
        transform: "scaleX(-1)"
    },
    container: {
        paddingTop: "40px",
        textAlign: "center"
    },
    title: {
        marginBottom: "30px",
        fontWeight: "700",
        fontSize: "40px",
        textShadow: "0 2px 3px rgb(0 0 0 / 25%)"
    },
    tabs: {
        display: "inline-flex",
        border: "1px solid #fff",
        borderRadius: "10px"
    },
    categoryWrap: {
        display: "flex",
        justifyContent: "center"
    },
    category: {
        marginRight: theme.spacing(2)
    },
    chartBox: {
        marginTop: "60px"
    },
    chartItems: {
        display: "flex",
        justifyContent: "center"
    },
}))

const Dashboard = () => {
    const classes = useStyle()

    return (
        <div className={classes.dashboard}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <img className={classes.logo} src={logo} alt=""/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            classes={{
                                input: classes.inputInput
                            }}
                            fullWidth={true}
                            placeholder="Поиск"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <Button
                        classes={classes.button}
                        variant="contained"
                        className={classes.button}
                        startIcon={<SortIcon/>}
                    >
                        СОБЫТИЯ
                    </Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container className={classes.container}>
                    <Typography className={classes.title} align={"center"} variant={"body1"}>
                        grantgalaxys321310e
                    </Typography>
                    <Box className={classes.categoryWrap}>
                        <Category
                            className={classes.category}
                            items={[
                                {title: "Сегодня"},
                                {title: "Вчера"},
                                {title: "Неделя"},
                                {title: "Месяц"},
                                {title: "Период", icon: <DateRangeIcon fontSize="small"/>}
                            ]}
                        />
                        <Category
                            items={[
                                {title: "Все"},
                                {title: "Мои"}
                            ]}
                        />
                    </Box>
                </Container>
            </Box>
            <Box className={classes.chartBox}>
                <Container>
                    <Box className={classes.chartItems}>
                        <Chart />
                        <Chart />
                        <Chart />
                        <Chart />
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default Dashboard