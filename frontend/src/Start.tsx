import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";

interface State {
    sessionCode: string | null
}

class Start extends React.Component<any, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionCode: null
        }
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item>
                    <Button variant={"contained"} color="primary" onClick={this.createAndJoinSession}>New poker
                        session</Button>
                </Grid>
                {this.state.sessionCode != null &&
                <Redirect to={`/session/${this.state.sessionCode}`}/>
                }
            </Grid>
        );
    }

    createAndJoinSession = () => {
        axios.post('http://localhost:8080/api/v1/session')
            .then(res => this.setState({sessionCode: res.data}))
            .catch(err => console.log(err))
    };
}

export default Start;
