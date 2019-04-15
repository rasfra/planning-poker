import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface State {
    open: boolean
    name: string
}

interface Props {
    onSelect: (name: string) => void
}

export default class NameDialog extends React.Component<Props, State> {
    state = {
        open: true,
        name: ""
    };

    submit = () => {
        if (this.state.name.length > 0) {
            this.setState({open: false});
            this.props.onSelect(this.state.name)
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
                name: event.target.value
            }
        )
    };

    render() {
        return (
            <Dialog open={this.state.open}
                    onClose={this.submit}
                    aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Enter name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your name to start planning poker.
                    </DialogContentText>
                    <form onSubmit={this.submit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            required
                            onChange={this.handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.submit} color="primary">
                        Start
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}