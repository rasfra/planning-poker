import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import './Card.css';

interface CardProp {
    value: string
    isSelected: boolean
    votes: number
    clickHandler: (val: string) => void
}

export default class Card extends React.Component<CardProp, any> {
    render() {
        return (
            <Grid item xs={6} md={3} lg={1}>
                <Paper className={`card ${this.props.isSelected ? 'selected' : ''}`}
                       onClick={() => this.props.clickHandler(this.props.value)}>
                    <span>{this.props.value}</span>
                </Paper>
                <div className={`vote-result ${this.props.votes > 0 ? 'positive' : ''}`}>{this.props.votes}</div>
            </Grid>
        )
    }
}