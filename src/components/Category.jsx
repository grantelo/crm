import React from 'react'
import {Box, List, ListItem, ListItemIcon, ListItemText, fade} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import classNames from 'classnames'


const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    list: {
        overflow: "hidden",
        display: "flex",
        border: "1px solid #fff",
        borderRadius: "50px",
    },
    listItem: {
        padding: "2px 20px",
        "&.active": {
            fontWeight: "600",
            backgroundColor: fade("#fff", 0.15)
        }
    },
    listItemIcon: {
        minWidth: "auto",
        marginRight: "10px"
    },
    listItemText: {
        "& span": {
            fontWeight: "inherit"
        }
    }
}))

const Category = ({className, items}) => {
    const classes = useStyle()

    return (
        <Box className={classNames(classes.root, className)}>
            <List className={classes.list} disablePadding={true}>
                {items.map((item) => (
                    <ListItem button className={classes.listItem}>
                        {item?.icon &&
                        <ListItemIcon className={classes.listItemIcon}>
                            {item.icon}
                        </ListItemIcon>
                        }
                        <ListItemText primary={item.title}/>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Category