import React, {useEffect, useState} from 'react'
import axios from "axios";

import PipeLine from "../components/PipeLine";
import AddDeal from "../components/AddDeal";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddDealForm from "../components/AddDealForm";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchClearDeals,
    fetchDeals,
    fetchRemoveDeal,
    setLoadedDeals
} from "../redux/actions/deals";
import PopupNotification from "../components/PopupNotification";
import {DIALOG_CLEAR_DEALS, REMOVE_DEAL_ERROR, REMOVE_DEAL_SUCCESS, REMOVE_ERROR, REMOVE_SUCCESS} from "../types";
import AlertDialog from "../components/AlertDialog";

const titles = ['ПЕРВИЧНЫЙ КОНТАКТ', 'ПЕРЕГОВОРЫ', 'ПРИНИМАЮТ РЕШЕНИЕ', 'СОГЛАСОВАНИЕ ДОГОВОРА']
const ids = ["primaryContact", "conversation", "makeDecisions", "accept"]
const colors = ["Blue", "Yellow", "Orange", "Red"]

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        paddingTop: "30px",
    },
    pipeLineBox: {
        display: "flex"
    }
}))

const Deal = ({showDialog, showPopup, handleCloseDialog}) => {
    const classes = useStyles()
    // const [popup, setPopup] = useState({})
    const dispatch = useDispatch()
    const deals = useSelector(({deals}) => deals.items)
    const isLoaded = useSelector(({deals}) => deals.isLoaded)

    useEffect(() => {
        dispatch(fetchDeals());
    }, [])

    const handleDeleteDeal = (pipeLineId, dealId) => {
        dispatch(fetchRemoveDeal(pipeLineId, dealId))
            .then(({status}) => {
                if (status === 200) {
                    showPopup(REMOVE_SUCCESS)
                    return
                }

                showPopup(REMOVE_ERROR)
            })
            .catch(() => {
                setLoadedDeals(true)
                showPopup(REMOVE_ERROR)
            })
    }

    const handleClearDeals = (pipeLineId) => {
        handleCloseDialog()
        dispatch(fetchClearDeals(pipeLineId))
            .then(({status}) => {
                if (status === 200) {
                    showPopup(REMOVE_SUCCESS)
                    return
                }

                showPopup(REMOVE_ERROR)
            })
            .catch((err) => {
                console.log(err)
                setLoadedDeals(true)
                showPopup(REMOVE_ERROR)
            })
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Box className={classes.pipeLineBox}>
                    {isLoaded && titles?.map((item, index) => (
                        <PipeLine
                            key={item}
                            deals={deals[ids[index]]}
                            title={item}
                            pipeLineId={ids[index]}
                            color={colors[index]}
                            showDialog={showDialog}
                            showPopup={showPopup}
                            onClickDeleteDeal={handleDeleteDeal}
                            onClearDeals={handleClearDeals}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export default Deal