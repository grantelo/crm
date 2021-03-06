import {
    ADD_CONTACT,
    CLEAR_CONTACTS,
    EDIT_CONTACT,
    REMOVE_CONTACT,
    SET_CONTACTS,
    SET_LOADED_CONTACTS
} from "../types";

const initialState = {
    items: [],
    isLoaded: false
}

const contacts = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADED_CONTACTS: {
            return {
                isLoaded: action.payload,
                items: state.items
            }
        }

        case SET_CONTACTS: {
            return {
                items: action.payload,
                isLoaded: true
            }
        }

        case ADD_CONTACT: {
            const newItems = [...state.items, action.payload]

            return {
                items: newItems,
                isLoaded: true
            }
        }

        case EDIT_CONTACT: {
            console.log(action.payload.key)
            console.log(action.payload.value)
            const indexItem = state.items.findIndex(item => item.id === action.payload.id)
            const newItems = state.items
            newItems[indexItem][action.payload.key] = action.payload.value

            return {
                items: newItems,
                isLoaded: true
            }
        }

        case REMOVE_CONTACT: {
            const newItems = state.items.filter(item => item.id !== action.payload)

            return {
                items: newItems,
                isLoaded: true
            }
        }

        case CLEAR_CONTACTS: {
            return {
                items: [],
                isLoaded: true
            }
        }

        default:
            return state
    }
}

export default contacts