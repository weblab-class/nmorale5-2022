import React, { Component } from 'react';

interface Props {
    userId: string;
}

interface State {
    floor: number;
    building: number;
    wage: number;
}

class SingleRoom extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            floor: 0,
            building: 0,
            wage: 0,
        };
    }

    // not in the right spot
    // collectSmiles = () => {
    //     this.setState({
    //         smiles: this.state.smiles + this.state.wage,
    //     });
    // };

    // upgradeWage = () => {
    //     this.setState({
    //         wage: this.state.wage + 1,
    //     });
    // }

    render() {
        return (
            <p>Smiles: <Smiles smiles={this.state.smiles} /></p>
        )
    };
}

export default SingleRoom;