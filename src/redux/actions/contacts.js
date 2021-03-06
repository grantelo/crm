import axios from "axios";
import {
    ADD_CONTACT,
    CLEAR_CONTACTS,
    EDIT_CONTACT,
    REMOVE_CONTACT,
    SET_CONTACTS,
    SET_LOADED_CONTACTS
} from "../types";


export const fetchContact = () => dispatch => {
    dispatch(setLoadedContacts(false))
    axios
        .get("/contacts")
        .then(({data}) => dispatch(setContacts(data)))
}

export const fetchAddContact = (data) => dispatch => {
    dispatch(setLoadedContacts(false))
    return axios
        .post("/contacts", data)
        .then(resolve => {
            dispatch(addContact(resolve.data))
            return resolve
        })
}

export const fetchEditContact = (data) => dispatch => {
    dispatch(setLoadedContacts(false))
    return axios
        .patch(`/contacts/${data.id}/`, {[data.obj.key]: data.obj.value})
        .then(resolve => {
            dispatch(editContact({id: data.id, ...data.obj}))
            return resolve
        })
}


export const fetchRemoveContact = id => dispatch => {
    dispatch(setLoadedContacts(false))
    return axios
        .delete(`/contacts/${id}`)
        .then(resolve => {
            dispatch(removeContact(id))

            return resolve
        })
}

export const fetchClearContacts = () => (dispatch, getState) => {
    const {contacts} = getState()
    dispatch(setLoadedContacts(false))
    return Promise.all(contacts.items.map(item => axios.delete(`contacts/${item.id}`)))
        .then(resolve => {
            dispatch(clearContacts())
            return resolve[0]
        })
}

export const setLoadedContacts = payload => ({
    type: SET_LOADED_CONTACTS,
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

export const editContact = payload => ({
    type: EDIT_CONTACT,
    payload
})

export const removeContact = payload => ({
    type: REMOVE_CONTACT,
    payload
})

export const clearContacts = () => ({
    type: CLEAR_CONTACTS,
})