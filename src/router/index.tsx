import React from 'react';
import loadable from '@loadable/component';
import { HashRouter, Route, Switch } from 'react-router-dom';

import MainLayout from '../layout/MainLayout'
import SystemLayout from '../layout/SystemLayout'
import UserLayout from '../layout/UserLayout'

const HomeComponent = loadable(() => import('../page/Home'))
const LoginComponent = loadable(() => import('../page/Login'))
const RegisterComponent = loadable(() => import('../page/Register'))
const AdminComponent = loadable(() => import('../page/Admin'))



const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomeComponent}></Route>
                <Route exact path="/login" component={LoginComponent}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
                <Route exact path="/admin" component={AdminComponent}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Router
