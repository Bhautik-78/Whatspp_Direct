import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import WhatsApp from "./Whatsapp";
import CallBack from "./Callback";

const App = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/login" component={Login}/>
                    <Route exact={true} path="/" component={Login}/>
                    <Route path="/callback" component={CallBack}/>
                    <Route path="/whatsapp" component={WhatsApp}/>
                </Switch>
            </BrowserRouter>
        </>
    )
};

export default App;