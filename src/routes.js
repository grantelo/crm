import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Dashboard from "./page/Dashboard";
import Contacts from "./page/Contacts";
import Deal from "./page/Deal";

const useRoutes = (props) => (
    <Switch>
        <Route path="/dashboard"><Dashboard/></Route>
        <Route path="/contacts"><Contacts {...props}/></Route>
        <Route path="/deal"><Deal {...props}></Deal></Route>
    </Switch>
)

export default useRoutes