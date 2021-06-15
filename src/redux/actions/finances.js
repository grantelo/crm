import axios from "axios";
import {ADD_EVENT, DELETE_EVENT, SET_EVENTS, SET_LOADED_EVENTS} from "../types";

export const fetchEvents = () => (dispatch) => {
    dispatch(setLoadedEvents(false))
    return axios
        .get("/events")
        .then(({data}) => {
            dispatch(setEvents(data))
        })
}

export const fetchAddEvent = (data) => (dispatch) => {
    dispatch(setLoadedEvents(false))
    return axios
        .post("/events", data)
        .then(resolve => {
            dispatch(addEvent(resolve.data))
            return resolve
        })
}

export const fetchDeleteEvent = (id) => (dispatch) => {
    dispatch(setLoadedEvents(false))
    return axios
        .delete(`/events/${id}`)
        .then(resolve => {
            dispatch(deleteEvent(id))
            return resolve
        })
}

export const setEvents = payload => ({
    type: SET_EVENTS,
    payload
})

export const addEvent = payload => ({
    type: ADD_EVENT,
    payload
})

export const deleteEvent = payload => ({
    type: DELETE_EVENT,
    payload
})

export const setLoadedEvents = payload => ({
    type: SET_LOADED_EVENTS,
    payload
})