import React from 'react';
import './PokerSession.css';
import {RouteComponentProps} from "react-router";
import axios from 'axios';
import {Button} from "reactstrap";
import {Client} from '@stomp/stompjs';

interface PokerRouterProps extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    code: string
}

interface State {
    name: string
    validValues: Array<number>
    votes: Map<string, Vote>
}

interface GetSession {
    validValues: Array<number>
    votes: Array<Vote>
}

interface Vote {
    name: string
    value: number
}

interface VoteMessage {
    name: string
    value: number
}

class PokerSession extends React.Component<PokerRouterProps, State> {
    stompClient: Client // Does this need any cleanup? On some event
    sessionCode: string

    constructor(props: PokerRouterProps) {
        super(props)
        this.sessionCode = this.props.match.params.code
        this.state = {
            name: "Rasmus",
            validValues: Array(),
            votes: new Map()
        }
        this.stompClient = new Client({
            brokerURL: "ws://localhost:8080/app",
            debug: msg => console.log(msg),
            onConnect: (frame) => {
                console.log("connected: " + frame)
                this.stompClient.subscribe(`/topic/${this.sessionCode}`, message => {
                    const vote = JSON.parse(message.body) as Vote
                    this.setState(state => {
                        const votes = new Map(state.votes)
                        votes.set(vote.name, vote)
                        return {votes: votes}
                    })
                    console.log("Subscribe message: " + JSON.parse(message.body))
                })
            },
            onStompError: (frame) => {
                console.log(`Broker reported error: ${frame.headers['message']}`);
                console.log(`Additional details: ${frame.body}`);
            }
        })
    }

    componentDidMount(): void {
        axios.get(`http://localhost:8080/api/v1/session/${this.sessionCode}`)
            .then(res => {
                this.loadSession(res.data)
                this.stompClient.activate()

            })
            .catch(err => console.log(err.response))
    }

    componentWillUnmount(): void {
        this.stompClient.deactivate()
    }

    loadSession(get: GetSession) {
        const voteMap = get.votes.reduce((map, b) => map.set(b.name, b.value), new Map())
        this.setState({
            validValues: get.validValues,
            votes: voteMap
        })
    }

    vote = (value: number) => {
        const vote = {name: this.state.name, value: value} as VoteMessage
        this.stompClient.publish({
            destination: `/voting/vote/${this.sessionCode}`,
            body: JSON.stringify(vote)
        })
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
                    {Array.from(this.state.votes.values()).map((item, i) =>
                        <span key={item.name}>{item.name}: {item.value}</span>
                    )}
                </div>
            </div>
        );
    }
}

export default PokerSession;
