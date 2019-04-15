import React from "react";
import {Route, Switch} from "react-router-dom";
import Start from "./Start";
import PokerSession from "./PokerSession";
import "typeface-roboto"

class App extends React.Component<any, any> {
    body = {
        margin: "20px",
        fontFamily: "Roboto"
    };

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div style={this.body}>
                <Switch>
                    <Route exact path="/" component={Start}/>
                    <Route path="/session/:code" component={PokerSession}/>
                </Switch>
            </div>
        )
    }
}

export default App;
