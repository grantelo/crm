import axios from "axios";
import {ADD_DEAL, CLEAR_DEALS, REMOVE_DEAL, SET_DEAL,SET_LOADED_DEALS} from "../types";

export const fetchDeals = () => (dispatch) => {
    dispatch(setLoadedDeals(false))
    Promise.all(
        [
            axios.get("/primaryContact"),
            axios.get("/conversation"),
            axios.get("/makeDecisions"),
            axios.get("/accept")
        ]
    )
        .then(resolve => {
            dispatch(setDeal({
                primaryContact: resolve[0].data,
                conversation: resolve[1].data,
                makeDecisions: resolve[2].data,
                accept: resolve[3].data
            }))
        })
    //  axios
    //      .get("/deals")
    //      .then(({data}) => {
    //          console.log(data)
    //          dispatch(setDeal(data))
    //
    //      })
 }

export const fetchAddDeal = (data) => (dispatch) => {
    dispatch(setLoadedDeals(false))
    return axios
        .post(`/deals/${data.pipeLineId}`, {...data.values})
        .then(resolve => {
            dispatch(addDeal({
                type: data.pipeLineId,
                values: resolve.data
            }))

            return resolve
        })
}

export const fetchRemoveDeal = (pipeLineId, dealId) => dispatch => {
    dispatch(setLoadedDeals(false))
    return axios
        .delete(`/deals/${pipeLineId}/${dealId}`)
        .then(resolve => {
            dispatch(removeDeal({pipeLineId, dealId}))
            return resolve
        })
}

export const fetchClearDeals = (pipeLineId) => (dispatch, getState) => {
    const {deals} = getState()
    dispatch(setLoadedDeals(false))
    return Promise.all(deals.items[pipeLineId].items.map(item => axios.delete(`/deals/${pipeLineId}/${item.id}`)))
        .then(resolve => {
            dispatch(clearDeals(pipeLineId))
            return resolve[0]
        })
}

export const setLoadedDeals = payload => ({
    type: SET_LOADED_DEALS,
    payload
})

export const setDeal = payload => ({
    type: SET_DEAL,
    payload
})

export const addDeal = payload => ({
    type: ADD_DEAL,
    payload
})

export const removeDeal = payload => ({
    type: REMOVE_DEAL,
    payload
})

export const clearDeals = payload => ({
    type: CLEAR_DEALS,
    payload
})