import React from 'react';
import {Box, CircularProgress} from "@material-ui/core";
import {PieChart} from "recharts";
import {Cell, Legend, Pie, ResponsiveContainer, Tooltip} from "recharts";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";

import Typography from "@material-ui/core/Typography";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import DateRange from "./DateRange";
import moment from "moment";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) - 15;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (+(percent * 100).toFixed(0) === 0) return null
    return (
        <text x={x} y={y} fill="white" dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const useStyle = makeStyles(() => ({
    root: {
        height: "345px",
        width: "47%",
        display: "flex",
        flexDirection: "column"
    },
    circularProgress: {
        width: "445px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    boxTitle: {
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        margin: 0
    },
    line: {
        width: "100%"
    },
    boxChart: {
        width: "100%",
        height: "80%"
    },
    emptyData: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    }
}))

const currencies = {
    "RUB": "₽",
    "USD": "$",
    "EUR": "€"
}

const isEmpty = data => {
    return data.reduce((acc, item) => acc + item.value, 0)
}


const PieChartCustom = React.memo(({title, isLoaded, data, char}) => {
    const classes = useStyle()
    const [filterDate, setFilterDate] = React.useState(null)

    const handleClose = (dateObj) => {
        const filterDate = data.filter(item => moment(item.date).isBetween(dateObj.start, dateObj.end))
        setFilterDate(filterDate)
    }


    return (
        !isLoaded ? <Box className={classes.circularProgress}><CircularProgress size={200}/></Box> :
            (
                <Box className={classes.root} component={Paper}>
                    <Box className={classes.boxTitle}>
                        <h2 className={classes.title}>{title}</h2>
                        <DateRange title={title} onClose={handleClose}/>
                    </Box>
                    <Divider/>
                    {
                        isEmpty(data) === 0 ?
                            <Box className={classes.emptyData}>
                                <Typography
                                    variant={"h1"}
                                    color={"primary"}>0%
                                </Typography>
                            </Box>
                            :
                            (<Box className={classes.boxChart}>
                                <ResponsiveContainer width="100%" height={"100%"}>
                                    <PieChart height={300}>
                                        <Pie
                                            data={filterDate || data}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={120}
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {(filterDate || data).map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Legend verticalAlign="middle" align={"right"} height={36} layout={"vertical"}/>
                                        <Tooltip formatter={(value, name) => value + (char ?? currencies[name])}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>)
                    }
                </Box>
            )
    )
})

export default PieChartCustom;