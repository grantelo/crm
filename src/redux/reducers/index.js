import {combineReducers} from "redux";
import deals from "./deals";
import contacts from "./contacts";

const rootReducer = combineReducers({
    contacts,
    deals
})

export default rootReducer