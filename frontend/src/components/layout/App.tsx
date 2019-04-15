import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Start from "../pages/Start";
import PokerSession from "../pages/PokerSession";
import "typeface-roboto"
import {CssBaseline} from "@material-ui/core";

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
            <React.Fragment>
                <CssBaseline/>
                <BrowserRouter>
                    <div style={this.body}>
                        <Switch>
                            <Route exact path="/" component={Start}/>
                            <Route path="/session/:code" component={PokerSession}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}

export default App;
