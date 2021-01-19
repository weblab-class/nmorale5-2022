import React, { Component } from "react";

interface Props {
    smiles: number;
}

class Smiles extends Component<Props> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <p>{this.props.smiles}</p>
        )
    }
}

export default Smiles;