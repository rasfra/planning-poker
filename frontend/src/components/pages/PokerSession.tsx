import React from "react";
import {RouteComponentProps} from "react-router";
import axios from "axios";
import {Client} from "@stomp/stompjs";
import NameDialog from "../forms/NameDialog";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "./Card";

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
    stompClient: Client;
    sessionCode: string;
    cardsStyle = {
        display: "flex"
    };

    constructor(props: PokerRouterProps) {
        super(props);
        this.sessionCode = this.props.match.params.code;
        this.state = {
            name: null,
            validValues: Array(),
            votes: new Map(),
            selected: null
        };
        this.stompClient = this.createWSClient();
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.vote = this.vote.bind(this);
    }

    componentDidMount(): void {
        axios.get(`/api/v1/session/${this.sessionCode}`)
            .then(res => {
                this.loadSessionState(res.data);
                this.stompClient.activate()

            })
            .catch(err => console.log(err.response));
    }

    componentWillUnmount(): void {
        this.stompClient.deactivate()
    }

    private createWSClient() {
        return new Client({
            brokerURL: "ws://localhost:8080/app",
            onConnect: () => {
                this.subscribeVotes();
                this.subscribeResets();
            },
            onStompError: (frame) => {
                console.log(`Broker reported error: ${frame.headers["message"]}`);
                console.log(`Additional details: ${frame.body}`);
            }
        });
    }

    private subscribeResets() {
        this.stompClient.subscribe(`/topic/clear/${this.sessionCode}`, message => {
            this.setState({
                votes: new Map()
            })
        })
    }

    private subscribeVotes() {
        this.stompClient.subscribe(`/topic/${this.sessionCode}`, message => {
            const vote = JSON.parse(message.body) as Vote;
            this.setState(state => {
                const votes = new Map(state.votes);
                votes.set(vote.name, vote);
                return {votes: votes}
            });
        })
    }

    private loadSessionState(get: GetSession) {
        // Convert to Map with users as key to easily avoid duplicates
        const voteMap: Map<string, Vote> = get.votes.reduce((map, b) => map.set(b.name, b), new Map());

        // Did user have a preselected value? (e.g. session left and rejoined)
        let selectedValue = null; // I sure wish js had optionals or null propagation operators
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

    private vote = (value: string) => {
        this.setState({
            selected: value
        });
        const vote = {name: this.state.name, value: value} as VoteMessage;
        this.stompClient.publish({
            destination: `/voting/vote/${this.sessionCode}`,
            body: JSON.stringify(vote)
        })
    };

    private handleReset = () => {
        this.stompClient.publish({
            destination: `/voting/clear/${this.sessionCode}`
        });
        this.setState({
            selected: null
        })
    };

    private handleNameSubmit = (name: string) => {
        this.setState({
            name: name
        })
    };

    private voteCount(value: string): number {
        return Array.from(this.state.votes.values())
            .filter((v) => v.value == value).length
    }

    private BackLink = (props: any) => <Link to="/" {...props} />;

    render() {
        if (this.state.name == null) {
            return (
                <NameDialog onSelect={this.handleNameSubmit}/>
            )
        } else {
            return (
                <Grid container justify={"center"}>
                    Share the url to others and cast your vote
                    <Grid container spacing={16} style={this.cardsStyle} justify="center">
                        {this.state.validValues.map((item, i) =>
                            <Card key={item}
                                  value={item}
                                  isSelected={this.state.selected == item}
                                  votes={this.voteCount(item)}
                                  clickHandler={this.vote}/>
                        )}
                    </Grid>
                    <Grid container justify="center" spacing={16}>
                        <Grid item>
                            <Button variant="contained" color="default" component={this.BackLink}>Back</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={this.handleReset}>Reset</Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default PokerSession;
