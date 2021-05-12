import {ADD_CONTACT, REMOVE_CONTACT, SET_CONTACTS} from "../types";

const initialState = {
    items: [],
    isLoaded: false
}

const contacts = (state = initialState, action) => {
    switch (action.type) {
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

        case REMOVE_CONTACT: {
            const newItems = state.items.filter(item => item.id !== action.payload)

            return {
                items: newItems,
                isLoaded: true
            }
        }

        default:
            return state
    }
}

export default contacts