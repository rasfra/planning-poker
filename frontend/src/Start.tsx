import React from 'react';
import './App.css';
import axios from 'axios';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";

interface MyState {
    url: string | null
}

class Start extends React.Component<any, MyState> {
    constructor(props: any) {
        super(props)
        this.state = {
            url: null
        }
    }

    startSession = () => {
        axios.post('http://localhost:8080/api/v1/session')
            .then(res => this.setState({url: res.data}))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Button color="primary" onClick={this.startSession}>New poker session</Button>
                    {this.state.url != null &&
                    <Link to={`/session/${this.state.url}`}>http://localhost:3000/{this.state.url}</Link>
                    }
                </header>
            </div>
        );
    }

    componentDidMount(): void {

    }
}

export default Start;
