import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './index.css'

import Home from './components/home/home.component'
import Signup from './components/authentication/signup/signup.component'
import Login from './components/authentication/login/login.component'

const Routes = () => {
    return (
            <BrowserRouter>
            <Switch>
                <Route path ='/'  exact component={Home}></Route>
                <Route path ='/signup' exact component={Signup}></Route>
                <Route path='/login' exact component={Login}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes