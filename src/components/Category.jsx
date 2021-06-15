import React from 'react'
import {Box, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import classNames from 'classnames'


const useStyle = makeStyles( () => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    list: {
        display: "flex",
        border: "2px solid gray",
        borderRadius: "3px"
    },
    listItem: {
        width: "200px",
        padding: "5px",
        "&:hover": {
            backgroundColor: "red"
        },
        "&+$listItem": {
            borderLeft: "1px solid gray"
        }
    }
}))

const Category = ({className, items}) => {
    const classes = useStyle()

    return (
        <Box className={classNames(classes.root, className)}>
            <List className={classes.list} disablePadding={true}>
                {items.map((item) => (
                    <ListItem key={item.title} button className={classes.listItem}>
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