import React from 'react';
import loadable from '@loadable/component';
import { HashRouter, Route, Switch } from 'react-router-dom';

const HomeComponent = loadable(() => import('../page/Home'))
const LoginComponent = loadable(() => import('../page/Login'))
const RegisterComponent = loadable(() => import('../page/Register'))



const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomeComponent}></Route>
                <Route exact path="/login" component={LoginComponent}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Router
