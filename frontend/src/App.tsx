import React from 'react';
import {Route, Switch} from "react-router-dom";
import Start from "./Start";
import PokerSession from "./PokerSession";
import {CssBaseline} from "@material-ui/core";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Switch>
                    <Route exact path="/" component={Start}/>
                    <Route path="/session/:code" component={PokerSession}/>
                </Switch>
            </React.Fragment>
        )
    }
}

export default App;
