import React, {useEffect} from 'react'

import {GridOverlay} from "@material-ui/data-grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {DataGrid} from '@material-ui/data-grid';
import {Box, darken} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from "react-redux";
import {fetchContact, fetchRemoveContact} from "../redux/actions/contacts";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import {REMOVE_CONTACT} from "../redux/types";
import {REMOVE_DEAL_ERROR, REMOVE_DEAL_SUCCESS, REMOVE_ERROR, REMOVE_SUCCESS} from "../types";
import {setLoaded} from "../redux/actions/deals";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F5F5F5",
        height: "100%"
    },
    dataGrid: {
        marginTop: "20px",
        backgroundColor: "#fff",
        "& .MuiDataGrid-row": {
            "& .MuiDataGrid-cell": {
                "&:nth-child(2)": {
                    color: "#0B58A8"
                },
                "&:focus": {
                    outline: "none"
                }
            }
        },
        "& .MuiDataGrid-colCellTitle": {
            color: "#B5BDC9",
            textTransform: "uppercase",
        },
        "& .MuiDataGrid-cellCheckbox": {
            "& > span": {
                color: "#E8E8E8",
                "&.Mui-checked": {
                    color: "#3f51b5"
                },
            },
        },
        "& .MuiDataGrid-colCellCheckbox": {
            "& .MuiDataGrid-colCellTitleContainer": {
                "& > span": {
                    color: "#E8E8E8",
                    "&.Mui-checked": {
                        color: "#3f51b5"
                    }
                },

            }
        },
        "& .MuiDataGrid-colCellWrapper": {

            "& .MuiDataGrid-columnSeparator": {
                marginRight: "10px"
            }
        }
    },
    appBar: {
        backgroundColor: "#fff",
        color: "#000",
    },
    title: {
        textTransform: "uppercase",
        fontWeight: 600,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        marginRight: "30px",
        maxWidth: "250px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        flexGrow: 1
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
    inputBase: {
        flexGrow: "1"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        border: '1px solid #fff',
    },
    button: {
        display: "flex",
        marginLeft: "30px",
        backgroundColor: "#4c8bf7",
        whiteSpace: "nowrap",
        color: "#fff",
        "&:hover": {
            backgroundColor: darken("#4c8bf7", 0.1)
        }
    },
    box: {},
    boxDeleteButton: {
        display: "flex",
        justifyContent: "flex-end",
        opacity: 0
    },
    deleteButton: {
        marginTop: "20px",
        marginRight: "24px"
    },
    gridOverlay: {
        flexDirection: "column",
        '& .ant-empty-img-1': {
            fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
        },
        '& .ant-empty-img-2': {
            fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
        },
        '& .ant-empty-img-3': {
            fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
        },
        '& .ant-empty-img-4': {
            fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
        },
        '& .ant-empty-img-5': {
            fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
            fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
        },
    },
    label: {
        marginTop: theme.spacing(1),
    }
}))


function CustomNoRowsOverlay() {
    const classes = useStyles();

    return (
        <GridOverlay className={classes.gridOverlay}>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                    </g>
                </g>
            </svg>
            <div className={classes.label}>No Rows</div>
        </GridOverlay>
    );
}


const Contacts = ({showPopup}) => {
    const columns = [
        {field: 'title', headerName: 'Наименование', flex: 1},
        {field: 'name', headerName: 'Имя', flex: 1},
        {
            field: 'phone',
            headerName: 'Телефон',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {field: 'companyTitle', headerName: 'Компания', flex: 1},
        {
            flex: 1,
            field: 'companyAddress',
            headerName: 'Адрес компании',
        },
        {
            width: 150,
            field: 'actions',
            headerName: "Действие",
            renderCell: params => (
                <Box>
                    <IconButton style={{padding: 0, marginRight: "20px"}} color={"primary"}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleRemoveContact(params.row.id)} style={{padding: 0}}
                                color={"secondary"}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            )
        }
    ];

    const handleRemoveContact = (id) => {
        dispatch(fetchRemoveContact(id))
            .then(({status}) => {
                if (status === 200) {
                    showPopup(REMOVE_SUCCESS)
                    return
                }

                showPopup(REMOVE_ERROR)
            })
            .catch(() => {
                setLoaded(true)
                showPopup(REMOVE_ERROR)
            })
    }

    const classes = useStyles()
    const dispatch = useDispatch()
    const contacts = useSelector(({contacts}) => contacts.items)
    const isLoaded = useSelector(({contacts}) => contacts.isLoaded)

    useEffect(() => {
        dispatch(fetchContact())
    }, []);


    return (
        <Box className={classes.root}>
            <AppBar className={classes.appBar} position={"sticky"}>
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} variant={"h6"}>Контакты</Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                className={classes.inputBase}
                                fullWidth={true}
                                placeholder={"Поиск"}
                                classes={{
                                    input: classes.inputInput
                                }}
                            />
                        </div>
                        <Button
                            classes={classes.button}
                            className={classes.button}
                            variant="contained"
                            startIcon={<AddIcon fontSize={"large"}/>}
                        >
                            Добавить контакт
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container>
                    <DataGrid
                        className={classes.dataGrid}
                        rows={contacts}
                        autoHeight
                        columns={columns}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        checkboxSelection
                        disableColumnMenu
                        disableSelectionOnClick
                        hideFooter
                        disableColumnSelector
                        loading={!isLoaded}
                    />
                </Container>
            </Box>
        </Box>
    )
}

export default Contacts