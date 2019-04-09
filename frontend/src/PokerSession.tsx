import React from 'react';
import './PokerSession.css';
import axios from 'axios';

interface Props {
    validValues: Array<number>
    sessionId: string
}

interface State {
    validValues: Array<number>
    votes: Array<Vote>
}

interface GetSession {
    validValues: Array<number>
    votes: Array<Vote>
}

interface Vote {
    name: string
    value: number
}

class PokerSession extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            validValues: Array(),
            votes: Array()
        }
    }

    componentDidMount(): void {
        axios.get("http://localhost:8080/api/v1/session/" + this.props.sessionId)
            .then(res => this.loadSession(res.data))
            .catch(err => console.log(err))

        // Join websockets
    }

    loadSession(get: GetSession) {
        console.log(get)
        this.setState({
            validValues: get.validValues,
            votes: get.votes
        })
    }

    render() {
        return (
            <div id="game">
                <ul className="options">
                    {this.state.validValues.map((item, i) =>
                        <li className="option" key={item.toString()}>{item}</li>
                    )}
                </ul>
                <div id="votes">
                    {this.state.votes}
                </div>
            </div>
        );
    }
}

export default PokerSession;
