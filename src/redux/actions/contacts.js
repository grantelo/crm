import axios from "axios";
import {ADD_CONTACT, REMOVE_CONTACT, SET_CONTACTS, SET_LOADED} from "../types";


export const fetchContact = () => dispatch => {
    axios
        .get("/contacts")
        .then(({data}) => dispatch(setContacts(data)))
}

export const fetchAddContact = (data) => dispatch => {
    dispatch(setLoaded(false))
    return axios
        .post("/contacts", data)
        .then(resolve => {
            dispatch(addContact(resolve.data))

            return resolve
        })
}

export const fetchRemoveContact = id => dispatch => {
    dispatch(setLoaded(false))
    return axios
        .delete(`/contacts/${id}`)
        .then(resolve => {
            dispatch(removeContact(id))

            return resolve
        })
}

export const setLoaded = payload => ({
    type: SET_LOADED,
    payload
})

export const setContacts = payload => ({
    type: SET_CONTACTS,
    payload
})

export const addContact = payload => ({
    type: ADD_CONTACT,
    payload
})

export const removeContact = payload => ({
    type: REMOVE_CONTACT,
    payload
})