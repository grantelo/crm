import {ADD_DEAL, CLEAR_DEALS, REMOVE_DEAL, SET_DEAL, SET_LOADED} from "../types";
import {act} from "@testing-library/react";

const initialState = {
    items: {},
    isLoaded: false
}

const getSum = (objs) => objs.reduce((sum, item) => item.sum + sum, 0)

const deals = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEAL:
            const sums = Object.entries(action.payload).map(([key, value]) => {
                return {
                    [key]: getSum(value)
                }
            })

            const items = Object.entries(action.payload).map(([key, value]) => ({
                [key]: {
                    items: [...value],
                    totalSum: Object.values(sums.find(item => Object.keys(item)[0] == key))[0],
                    totalCount: Object.keys(value).length
                }
            }))
            return {
                ...state,
                items: Object.assign({}, ...items),
                isLoaded: true
            }

        case ADD_DEAL: {
            const currentDealItems = !state.items[action.payload.type] ?
                [action.payload.values] :
                [...state.items[action.payload.type].items, action.payload.values]
            const currentDealCount = !state.items[action.payload.type] ? 1
                : state.items[action.payload.type].totalCount + 1
            const currentDealSum = !state.items[action.payload.type]
                ? [action.payload.values.sum]
                : state.items[action.payload.type].totalSum + action.payload.values.sum

            const newItems = {
                ...state.items,
                [action.payload.type]: {
                    items: currentDealItems,
                    totalCount: currentDealCount,
                    totalSum: currentDealSum
                }
            }

            return {
                ...state,
                items: newItems,
                isLoaded: true
            }
        }

        case REMOVE_DEAL: {

            const newItems = {
                ...state.items
            }

            const indexCurrentItem = state.items[action.payload.pipeLineId].items.findIndex(item => item.id === action.payload.dealId)
            const totalCount = state.items[action.payload.pipeLineId].totalCount - 1
            const totalSum = state.items[action.payload.pipeLineId].totalSum - state.items[action.payload.pipeLineId].items[indexCurrentItem].sum
            newItems[action.payload.pipeLineId].items.splice(indexCurrentItem, 1)

            return {
                ...state,
                items: {
                    ...newItems,
                    [action.payload.pipeLineId]: {
                        items: newItems[action.payload.pipeLineId].items,
                        totalCount,
                        totalSum
                    }
                },
                isLoaded: true
            }
        }

        case CLEAR_DEALS:
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: [],
                    totalCount: 0,
                    totalSum: 0
                }
            }

            return {
                ...state,
                items: newItems,
                isLoaded: true
            }

        default:
            return state
    }
}

export default deals