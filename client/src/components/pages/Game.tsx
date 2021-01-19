import React, { Component } from 'react';
import Smiles from "../modules/Smiles"

interface Props {
    userId: string;
}

interface State {
    smiles: number;
    wage: number;
}

class Game extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            smiles: 0,
            wage: 1,
        };
    }

    collectSmiles = () => {
        this.setState({
            smiles: this.state.smiles + this.state.wage,
        });
    };

    upgradeWage = () => {
        this.setState({
            wage: this.state.wage + 1,
        });
    }

    render() {
        return (
            <p>Smiles: <Smiles smiles={this.state.smiles} /></p>
        )
    };
}

export default Game;