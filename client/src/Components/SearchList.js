import React, {Component} from "react";
import DetailSearch from "./DetailSearch";
import LoadSpinner from "./LoadSpinner";
import Col from "react-bootstrap/Col";

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            GuardianChecked: props.checked,
            q: props.q
        };
    }

    callGuardian(q) {
        fetch("https://yli59322-hw8-571-backend.appspot.com/guardian/search" + q)
            .then(res => res.json())
            .then(
                res => {
                    this.setState({isLoaded: true, data: res});
                }, error => {
                    this.setState({isLoaded: true, error});
                })
    }

    callNYTimes(q) {
        fetch("https://yli59322-hw8-571-backend.appspot.com/nytimes/search" + q)
            .then(res => res.json())
            .then(
                res => {
                    this.setState({isLoaded: true, data: res});
                }, error => {
                    this.setState({isLoaded: true, error});
                })
    }

    componentDidMount() {
        if (this.state.GuardianChecked)
            this.callGuardian(this.state.q);
        else
            this.callNYTimes(this.state.q);
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return (
                <div className="load-container">
                    <LoadSpinner/>
                </div>
            );
        } else {
            let array = [];
            for (let i = 0; i < this.state.data.length; i++) {
                array.push(
                    <Col md={3} style={{"padding": 0}}>
                        <DetailSearch key={i} data={this.state.data[i]} checked={this.state.GuardianChecked}/>
                    </Col>
                );
            }
            return (
                <div style={{"display": "flex", "flex-wrap": "wrap"}}>
                    {array}
                </div>
            );
        }
    };
}

export default SearchList;