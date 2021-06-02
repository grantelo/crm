import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Dashboard from "./page/Dashboard";
import Contacts from "./page/Contacts";
import Deal from "./page/Deal";
import Finance from "./page/Finance";

const useRoutes = (props) => (
    <Switch>
        <Route path="/dashboard"><Dashboard/></Route>
        <Route path="/contacts"><Contacts {...props}/></Route>
        <Route path="/deal"><Deal {...props}></Deal></Route>
        <Route path="/finance"><Finance {...props}></Finance></Route>
    </Switch>
)

export default useRoutes