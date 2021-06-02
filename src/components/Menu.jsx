import React from "react";
import {Link} from 'react-router-dom'

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {darken, lighten, ListItemIcon} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactsIcon from '@material-ui/icons/Contacts';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Finance from "../page/Finance";


const initMap = [
    ["Dashboard", <DashboardIcon/>],
    ["Contacts", <ContactsIcon/>],
    ["Deal", <MonetizationOnIcon/>],
    ["Finance", <AccountBalanceWalletIcon />]
]

const useStyles = makeStyles(theme => ({
    Drawer: {
        paddingTop: "20px",
        width: "100px"
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        cursor: "pointer",
        color: lighten("#000", 0.5),
        "&:hover": {
            color: "#000",
            background: "#f5f5f5"
        },
        transition: "all 0.5s"
    },
    listItemText: {
        textDecoration: "none",
        color: "inherit"
    },

    listItemIcon: {
        display: "flex",
        justifyContent: "center",
        color: "inherit"
    },

    link: {
        width: "100%",
        padding: "15px 0",
        color: "inherit",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
    }

}))


const Menu = () => {
    const classes = useStyles()
    const items = new Map(initMap)

    return (
        <Drawer className={classes.Drawer} variant="permanent">
            <List className={classes.Drawer}>
                {Array.from(items).map(([key, val]) => (
                    <ListItem className={classes.listItem}>
                        <Link className={classes.link} to={`/${key}`}>
                            <ListItemText>{key}</ListItemText>
                            <ListItemIcon className={classes.listItemIcon}>{val}</ListItemIcon>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}


export default Menu