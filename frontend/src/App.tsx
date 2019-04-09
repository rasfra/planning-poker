import React from 'react';
import './App.css';
import axios from 'axios';
import {Button} from 'reactstrap';

interface MyState {
    url: string | null
}

class App extends React.Component<any, MyState> {
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
                    <Button color="primary" onClick={this.startSession}>Start session</Button>
                    {this.state.url != null &&
                    <a href="http://localhost:3000/{this.state.url}">http://localhost:3000/{this.state.url}</a>
                    }
                </header>
            </div>
        );
    }

    componentDidMount(): void {

    }
}

export default App;
