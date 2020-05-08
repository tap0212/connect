import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './index.css'
import PrivateRoutes from '../src/APICalls/PrivateRoutes'
import Home from './components/home/home.component'
import Signup from './components/authentication/signup/signup.component'
import Login from './components/authentication/login/login.component'
import Add from './components/add/add'

const Routes = () => {
    return (
            <BrowserRouter>
            <Switch>
                <Route path ='/'  exact component={Home}></Route>
                <Route path ='/signup' exact component={Signup}></Route>
                <Route path='/login' exact component={Login}></Route>
                <PrivateRoutes path='/add' exact component={Add}></PrivateRoutes>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes