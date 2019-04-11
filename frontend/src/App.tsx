import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Start from "./Start";
import PokerSession from "./PokerSession";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Start}/>
                <Route path="/session/:code" component={PokerSession}/>
            </Switch>
        )
    }
}

export default App;
