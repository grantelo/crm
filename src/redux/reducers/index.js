import {combineReducers} from "redux";
import deals from "./deals";
import contacts from "./contacts";
import finances from "./finances";

const rootReducer = combineReducers({
    contacts,
    deals,
    finances
})

export default rootReducer