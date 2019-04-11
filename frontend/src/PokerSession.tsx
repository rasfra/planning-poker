import React from 'react';
import './PokerSession.css';
import axios from 'axios';
import {RouteComponentProps} from "react-router";
import {Button} from "reactstrap";

interface PokerRouterProps extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    code: string
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

class PokerSession extends React.Component<PokerRouterProps, State> {
    constructor(props: PokerRouterProps) {
        super(props)
        this.state = {
            validValues: Array(),
            votes: Array()
        }
    }

    componentDidMount(): void {
        axios.get("http://localhost:8080/api/v1/session/" + this.props.match.params.code)
            .then(res => this.loadSession(res.data))
            .catch(err => console.log(err.response))

        // Join websockets
    }

    loadSession(get: GetSession) {
        console.log(get)
        this.setState({
            validValues: get.validValues,
            votes: get.votes
        })
    }

    vote = (value: number) => {
        axios.post("http://localhost:8080/api/v1/session/" + this.props.match.params.code + "/votes",
            {
                name: "rasmus",
                value: value
            }).catch(err => console.log(err.response))
    }

    render() {
        return (
            <div id="game">
                <ul className="options">
                    {this.state.validValues.map((item, i) =>
                        <li className="option" key={item.toString()}>
                            <Button onClick={() => this.vote(item)}>{item}</Button>
                        </li>
                    )}
                </ul>
                <div id="votes">
                    {this.state.votes.map((item, i) =>
                        <span key={item.name}>{item.name}: {item.value}</span>
                    )}
                </div>
            </div>
        );
    }
}

export default PokerSession;
