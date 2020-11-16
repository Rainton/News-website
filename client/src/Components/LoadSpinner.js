import React from "react";
import {css} from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #637eda;
`;

class LoadSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    render() {
        return (
            <div className="LoadSpinner">
                <BounceLoader css={override} size={60} color="#2d4eca" loading={this.state.loading}/>
                <p style={{"font-size": "20px"}}>Loading</p>
            </div>
        );
    }
}

export default LoadSpinner;