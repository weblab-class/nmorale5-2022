import React, { Component } from 'react';
import { RouteComponentProps } from "@reach/router";
import Smiles from '../modules/Smiles';
import SingleRoom from '../modules/SingleRoom';
import { get, post } from '../../utilities'

interface Props {
    userId: String;
}

interface State {
    smiles: number;
    rooms: SingleRoom[]
}

class Game extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            smiles: 0,
            rooms: new Array<SingleRoom>(),
        };
    }

    getUserData = () => {
        get(`/api/smiles`, { userId: this.props.userId }).then((smile) => this.setState({smiles: smile}));
    }

    componentDidMount() {
        this.getUserData();
    }

    collectIncome = () => {
        post(`/api/smiles`, { userId: this.props.userId, smiles: this.state.smiles + 100 })
        this.setState({smiles: this.state.smiles + 100});
    }

    render() {
        return (
            <button onClick={this.collectIncome} >My Smiles: {this.state.smiles}</button>
        )
    }
}

export default Game;