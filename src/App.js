import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WhatsApp from "./Whatsapp";

const App = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={WhatsApp}/>
                    <Route exact={true} path="/whatsapp" component={WhatsApp}/>
                </Switch>
            </BrowserRouter>
        </>
    )
};

export default App;