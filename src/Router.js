import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './index.css'
import PrivateRoutes from '../src/APICalls/PrivateRoutes'
import Notification from './components/notification/notification'
import Signup from './components/authentication/signup/signup.component'
import Login from './components/authentication/login/login.component'
import Add from './components/add/add'
import Home from './components/home/home'
import Profile from './components/profile/profile'

const Routes = () => {
    return (
            <BrowserRouter>
            <Switch>
                <Route path ='/' exact component={Home}/>
                <Route path ='/notification'  exact component={Notification}></Route>
                <Route path ='/signup' exact component={Signup}></Route>
                <Route path='/login' exact component={Login}></Route>
                <PrivateRoutes path='/add' exact component={Add}></PrivateRoutes>
                <PrivateRoutes path="/profile" exact component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes