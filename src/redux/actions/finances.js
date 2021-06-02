import axios from "axios";
import {ADD_EVENT, SET_EVENTS, SET_LOADED} from "../types";

export const fetchEvents = () => (dispatch) => {
    dispatch(setLoaded(false))
    return axios
        .get("/events")
        .then(({data}) => {
            console.log(data)
            dispatch(setEvents(data))
        })
}

export const fetchAddEvent = (data) => (dispatch) => {
    dispatch(setLoaded(false))
    return axios
        .post("/events", data)
        .then(resolve => {
            dispatch(setEvents(resolve.data))
            return resolve
        })
}

export const setEvents = payload => ({
    type: SET_EVENTS,
    payload
})

export const addEvents = payload => ({
    type: ADD_EVENT,
    payload
})

export const setLoaded = payload => ({
    type: SET_LOADED,
    payload
})