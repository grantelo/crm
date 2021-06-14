import React from 'react';
import {Box, CircularProgress, MenuItem} from "@material-ui/core";
import {PieChart} from "recharts";
import {Cell, Legend, Pie, ResponsiveContainer, Tooltip} from "recharts";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Menu} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
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

const useStyle = makeStyles(theme => ({
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

const options = [
    "Сегодня",
    "Вчера",
    "Неделя",
    "Месяц",
    "Год",
]

const currencies = {
    "RUB": "₽",
    "USD": "$",
    "EUR": "€"
}

const isEmpty = data => {
    return data.reduce((acc, item) => acc + item.value, 0)
}


const PieChartCustom = ({title, isLoaded, data, char, noTooltip}) => {
    const classes = useStyle()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e, index) => {
        if(index === "backdropClick") {
            setAnchorEl(null);
            return
        }

        setSelectedIndex(index)
        setAnchorEl(null);
    };

    return (
        !isLoaded ? <Box className={classes.circularProgress}><CircularProgress size={200}/></Box> :
            (
                <Box className={classes.root} component={Paper}>
                    <Box className={classes.boxTitle}>
                        <h2 className={classes.title}>{title}</h2>
                        <Box>
                            <Button onClick={handleClick}>
                                Show: <Typography color={"primary"}>{options[selectedIndex]}</Typography>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {options.map((item, index) => (
                                    <MenuItem
                                        key={item}
                                        onClick={(event) => handleClose(event, index)}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
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
                                            data={data}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={120}
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {data.map((entry, index) => (
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
}

export default PieChartCustom;