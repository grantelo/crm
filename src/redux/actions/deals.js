import axios from "axios";
import {ADD_DEAL, CLEAR_DEALS, REMOVE_DEAL, SET_DEAL, SET_LOADED} from "../types";

export const fetchDeals = () => (dispatch) => {
    dispatch(setLoaded(false))
    axios
        .get("/deals")
        .then(({data}) => dispatch(setDeal(data)))
}

export const fetchAddDeal = (data) => (dispatch) => {
    dispatch(setLoaded(false))
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
    dispatch(setLoaded(false))
    return axios
        .delete(`/deals/${pipeLineId}/${dealId}`)
        .then(resolve => {
            dispatch(removeDeal({pipeLineId, dealId}))
            return resolve
        })
}

export const fetchClearDeals = (pipeLineId) => (dispatch, getState) => {
    const {deals} = getState()
    dispatch(setLoaded(false))
        return Promise.all(deals.items[pipeLineId].items.map(item => axios.delete(`/deals/${pipeLineId}/${item.id}`)))
        .then(resolve => {
            dispatch(clearDeals(pipeLineId))
            return resolve[0]
        })
}

export const setLoaded = payload => ({
    type: SET_LOADED,
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