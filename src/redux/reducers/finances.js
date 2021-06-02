import {ADD_EVENT, SET_EVENTS} from "../types";

const initialState = {
    items: [],
    isLoaded: false
}

const finances = (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state
    }
}

export default finances