import React from 'react';
import './PokerSession.css';
import {RouteComponentProps} from "react-router";
import axios from 'axios';
import {Client} from '@stomp/stompjs';
import NameDialog from "./NameDialog";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

interface PokerRouterProps extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    code: string
}

interface State {
    name: string | null
    validValues: Array<string>
    votes: Map<string, Vote>
    selected: string | null
}

interface GetSession {
    validValues: Array<string>
    votes: Array<Vote>
}

interface Vote {
    name: string
    value: string
}

interface VoteMessage {
    name: string
    value: string
}

class PokerSession extends React.Component<PokerRouterProps, State> {
    stompClient: Client
    sessionCode: string

    // TODO remove
    makeid(length: number) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    constructor(props: PokerRouterProps) {
        super(props)
        this.sessionCode = this.props.match.params.code
        this.state = {
            name: this.makeid(10), // TODO set null
            validValues: Array(),
            votes: new Map(),
            selected: null
        }
        this.stompClient = new Client({
            brokerURL: "ws://localhost:8080/app",
            debug: msg => console.log(msg),
            onConnect: (frame) => {
                console.log("connected: " + frame)
                // Subscribe to new votes
                this.stompClient.subscribe(`/topic/${this.sessionCode}`, message => {
                    const vote = JSON.parse(message.body) as Vote
                    this.setState(state => {
                        const votes = new Map(state.votes)
                        votes.set(vote.name, vote)
                        return {votes: votes}
                    })
                    console.log("Subscribe message: " + JSON.parse(message.body))
                })
                // Subscribe to clears
                this.stompClient.subscribe(`/topic/clear/${this.sessionCode}`, message => {
                    this.setState({
                        votes: new Map()
                    })
                })
            },
            onStompError: (frame) => {
                console.log(`Broker reported error: ${frame.headers['message']}`);
                console.log(`Additional details: ${frame.body}`);
            }
        })
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.vote = this.vote.bind(this);
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
        const voteMap: Map<string, Vote> = get.votes.reduce((map, b) => map.set(b.name, b), new Map())
        let selectedValue = null // I sure wish js had optionals or null propagation operators
        if (this.state.name != null) {
            const vote = voteMap.get(this.state.name);
            if (vote != null) {
                selectedValue = vote.value
            }
        }
        this.setState({
            validValues: get.validValues,
            votes: voteMap,
            selected: selectedValue
        })
    }

    vote = (value: string) => {
        this.setState({
            selected: value
        });
        const vote = {name: this.state.name, value: value} as VoteMessage
        this.stompClient.publish({
            destination: `/voting/vote/${this.sessionCode}`,
            body: JSON.stringify(vote)
        })
    };

    handleReset = () => {
        this.stompClient.publish({
            destination: `/voting/clear/${this.sessionCode}`
        })
    }

    handleNameSubmit = (name: string) => {
        this.setState({
            name: name
        })
    };

    countVotes(value: string): number {
        return Array.from(this.state.votes.values()).filter((v) => v.value == value).length
    }

    render() {
        if (this.state.name == null) {
            return (
                <NameDialog onSelect={this.handleNameSubmit}/>
            )
        } else {
            return (
                <div id="game">
                    Share the url to others and cast your vote
                    <div className="cards">
                        {this.state.validValues.map((item, i) =>
                            <Card key={item}
                                  value={item}
                                  isSelected={this.state.selected == item}
                                  votes={this.countVotes(item)}
                                  onClick={this.vote}/>
                        )}
                    </div>
                    <div>
                        <Link to={"/"}>
                            <Button variant="contained" color="default">Back</Button>
                        </Link>
                        <Button variant="contained" color={"secondary"} onClick={this.handleReset}>Reset votes</Button>
                    </div>
                </div>
            );
        }
    }
}

interface CardProp {
    value: string
    isSelected: boolean
    votes: number
    onClick: (val: string) => void
}

class Card extends React.Component<CardProp, any> {
    render() {
        return (
            <div>
                <div className={`vote-option ${this.props.isSelected ? 'selected' : ''}`}
                     onClick={() => this.props.onClick(this.props.value)}>
                    <span>{this.props.value}</span>
                </div>
                <div className="vote-result">{this.props.votes}</div>
            </div>
        )
    }
}

export default PokerSession;
