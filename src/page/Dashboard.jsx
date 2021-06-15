import React, {useEffect, useMemo} from 'react'
import {
    Typography,
    Container,
    Box, CircularProgress, TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
} from "@material-ui/core";

import makeStyles from "@material-ui/core/styles/makeStyles";

import StageTotal from "../components/StageTotal";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeals} from "../redux/actions/deals";
import PieChartCustom from "../components/PieChartCustom";
import axios from "axios";
import {fetchEvents} from "../redux/actions/finances";
import Divider from "@material-ui/core/Divider";
import classNames from "classnames";


const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F5F5F5",
        padding: "100px"
    },
    stageBox: {
        marginBottom: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    chartBox: {
        rowGap: "80px",
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "space-between"
    },
    currencyBox: {
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "60px"
    },
    scoreBox: {
        height: "100%",
        padding: "20px",
        flexBasis: "25%"
    },
    scoreItem: {
        marginTop: "30px"
    },
    scoreItemLine: {
        marginTop: "10px",
        height: "3px"
    },
    scoreBoxTitle: {
        margin: 0,
    },
    scoreItemText: {
        fontSize: "1.2rem"
    },
    exchangeCurrencyBox: {
        height: "100%",
        padding: "20px",
        flexBasis: "65%"
    },
    exchangeCurrencyBoxTitle: {
        margin: 0
    },
    loaderBox: {
        display: "flex",
        justifyContent: "space-between",
        height: "250px"
    },
    loaderItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    loaderItem1: {
        flexBasis: "25%"
    },
    loaderItem2: {
        flexBasis: "65%"
    }
}))

const currencies = ["RUB", "USD", "EUR"]
const colors = ["Blue", "Yellow", "Orange", "Red"]
const titles = ["Первичный контракт", "Переговоры", "Принимают решение", "Согласование договора"]


const APIKEY = "d0abb51bc6431dcb124e6359c37c10c9"

const Dashboard = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const [currency, setCurrency] = React.useState(null)

    useEffect(() => {
        const getCurrency = async () => {
            try {
                const request = (await axios.get(`http://data.fixer.io/api/latest?access_key=${APIKEY}&symbols=EUR,USD,RUB`))
                if (request.status !== 200) return
                setCurrency({rates: request.data.rates, date: request.data.date})
            } catch (err) {
                console.log(err)
            }
        }

        getCurrency()
        dispatch(fetchDeals())
        dispatch(fetchEvents())

    }, []);


    const deals = useSelector(({deals}) => deals.items)
    const events = useSelector(({finances}) => finances.items)
    const eventsIsLoaded = useSelector(({finances}) => finances.isLoaded)
    const dealsIsLoaded = useSelector(({deals}) => deals.isLoaded)

    const getScoreBase = currency && events?.reduce((acc, item) => acc + item.sum / currency.rates[item.currency], 0)

    const getScoreCurrency = (value, cur) => {
        return new Intl.NumberFormat("ru-RU", {style: "currency", "currency": cur})
            .format(value)
    }

    const getCurrency = (cur) => +(getScoreBase * currency.rates[cur]).toFixed(2)

    const getDate = (value) => {
        const options = {}

        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'

        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    }


    const dataDealsSum = useMemo(() => {
        return Object.entries(deals).map(([key, val]) => ({name: key, value: val.totalSum, date: new Date(val.date)}))
    }, [dealsIsLoaded])

    const dataDealsCount = useMemo(() => {
        return Object.entries(deals).map(([key, val]) => ({name: key, value: val.totalCount, date: new Date(val.date)}))
    }, [dealsIsLoaded])

    const dataEventIncome = useMemo(() => {
        return events.filter(item => item.type === "income").map(item => ({name: item.currency, value: +item.sum, date: new Date(item.date)}))
    }, [eventsIsLoaded])

    const dataEventConsumption = useMemo(() => {
        return events.filter(item => item.type === "consumption").map(item => ({name: item.currency, value: +item.sum, date: new Date(item.date)}))
    }, [eventsIsLoaded])

    return (
        <Box className={classes.root}>
            <Container>
                {/*<Typography className={classes.title} align={"center"} variant={"body1"}>*/}
                {/*    grantgalaxys321310e*/}
                {/*</Typography>*/}
                {/*<Box className={classes.categoryWrap}>*/}
                {/*    <Category*/}
                {/*        items={[*/}
                {/*            {title: "Сегодня"},*/}
                {/*            {title: "Вчера"},*/}
                {/*            {title: "Неделя"},*/}
                {/*            {title: "Месяц"},*/}
                {/*            {title: "Период", icon: <DateRangeIcon fontSize="small"/>}*/}
                {/*        ]}*/}
                {/*    />*/}
                {/*</Box>*/}
                <Box className={classes.stageBox}>
                    {Object.entries(deals).map(([key, item], index) => (
                        <StageTotal
                            key={key}
                            title={titles[index]}
                            color={colors[index]}
                            totalSum={item.totalSum}
                            totalCount={item.totalCount}
                        />
                    ))}
                </Box>
                {!currency
                    ?
                    <Box className={classes.loaderBox}>
                        <Box className={classNames(classes.loaderItem, classes.loaderItem1)}>
                            <CircularProgress size={200}/>
                        </Box>
                        <Box className={classNames(classes.loaderItem, classes.loaderItem2)}>
                            <CircularProgress size={200}/>
                        </Box>
                    </Box>
                    :
                    <Box className={classes.currencyBox}>
                        <Box className={classes.scoreBox} component={Paper}>
                            <h2 className={classes.scoreBoxTitle}>Счет в валюте</h2>
                            {currencies.map(item => (
                                <Box key={item} className={classes.scoreItem}>
                                    <Typography
                                        className={classes.scoreItemText}>{getScoreCurrency(getCurrency(item), item)}</Typography>
                                    <Divider className={classes.scoreItemLine}/>
                                </Box>
                            ))}
                        </Box>
                        <Box className={classes.exchangeCurrencyBox} component={Paper}>
                            <h2 className={classes.exchangeCurrencyBoxTitle}>Курс валют</h2>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Валюта</TableCell>
                                            <TableCell>Курс</TableCell>
                                            <TableCell>Дата</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            Object.entries(currency.rates).map(([key, value]) => (
                                                <TableRow key={key}>
                                                    <TableCell>{key}</TableCell>
                                                    <TableCell>{value}</TableCell>
                                                    <TableCell>{getDate(currency.date)}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                }
                <Box className={classes.chartBox}>
                    <PieChartCustom title={"Сделки(сумма)"} isLoaded={dealsIsLoaded} data={dataDealsSum} char={"₽"}/>
                    <PieChartCustom title={"Сделки(количество)"} isLoaded={dealsIsLoaded} data={dataDealsCount}
                                    char={"шт."}/>
                    <PieChartCustom title={"Доход"} isLoaded={eventsIsLoaded} data={dataEventIncome}/>
                    <PieChartCustom title={"Расход"} isLoaded={eventsIsLoaded} data={dataEventConsumption}/>
                </Box>
            </Container>
        </Box>
    )
}

export default Dashboard