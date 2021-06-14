import {ADD_EVENT, DELETE_EVENT, SET_EVENT_TO_ID, SET_EVENTS, SET_LOADED, SET_LOADED_EVENTS} from "../types";

const initialState = {
    items: [],
    isLoaded: false
}

const finances = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADED_EVENTS: {
            return {
                isLoaded: action.payload,
                items: state.items
            }
        }

        case SET_EVENTS: {
            return {
                items: action.payload,
                isLoaded: true
            }
        }

        case ADD_EVENT: {
            const newItems = [...state.items, action.payload]
            return {
                items: newItems,
                isLoaded: true
            }
        }

        case DELETE_EVENT: {
            const newItems = state.items.filter(item => item.id !== action.payload)
            console.log(action.payload)
            return {
                items: newItems,
                isLoaded: true
            }
        }

        default:
            return state
    }
}

export default finances