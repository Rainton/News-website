import React, {useState} from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    EmailIcon,
    TwitterIcon,
} from 'react-share';
import ReactTooltip from "react-tooltip";

class DetailShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: "top",
            type: "dark",
            effect: "solid",
        };
    }

    render() {
        let hashtag = new Array(1);
        hashtag[0] = "CSCI_571_NewsApp";
        return (
            <div className="detailShare">
                <FacebookShareButton url={this.props.url} hashtag="#CSCI_571_NewsApp">
                    <p data-tip="Facebook" data-for="FacebookTT" data-offset="{'left' : -5, 'right' : -5}">
                        <FacebookIcon size={30} round/>
                    </p>
                    <ReactTooltip
                        id="FacebookTT"
                        place={this.state.place}
                        effect={this.state.effect}
                        type={this.state.type}
                    />
                </FacebookShareButton>
                <TwitterShareButton url={this.props.url} hashtags={hashtag}>
                    <p data-tip="Twitter" data-for="TwitterTT">
                        <TwitterIcon size={30} round/>
                    </p>
                    <ReactTooltip
                        id="TwitterTT"
                        place={this.state.place}
                        effect={this.state.effect}
                        type={this.state.type}
                    />
                </TwitterShareButton>
                <EmailShareButton url={this.props.url} subject="#CSCI_571_NewsApp">
                    <p data-tip="Email" data-for="EmailTT">
                        <EmailIcon size={30} round/>
                    </p>
                    <ReactTooltip
                        id="EmailTT"
                        place={this.state.place}
                        effect={this.state.effect}
                        type={this.state.type}
                    />
                </EmailShareButton>
            </div>
        );
    }
}

export default DetailShare;