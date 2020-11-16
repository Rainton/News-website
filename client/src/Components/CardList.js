import React, {Component} from "react";
import DetailCard from "./DetailCard";
import LoadSpinner from "./LoadSpinner";

class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            GuardianChecked: props.checked,
            section: props.section
        };
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.checked !== nextState.GuardianChecked) {
            return {
                GuardianChecked: nextProps.checked,
                isLoaded: false
            };
        }
        return null;
    }

    callGuardian(s) {
        if (s === "") {
            fetch("https://yli59322-hw8-571-backend.appspot.com/guardian")
                .then(res => res.json())
                .then(
                    res => {
                        this.setState({isLoaded: true, data: res});
                    }, error => {
                        this.setState({isLoaded: true, error});
                    })
        } else {
            fetch("https://yli59322-hw8-571-backend.appspot.com/guardian/" + s)
                .then(res => res.json())
                .then(
                    res => {
                        this.setState({isLoaded: true, data: res});
                    }, error => {
                        this.setState({isLoaded: true, error});
                    })
        }
    }

    callNYTimes(s) {
        if (s === "") {
            fetch("https://yli59322-hw8-571-backend.appspot.com/nytimes")
                .then(res => res.json())
                .then(
                    res => {
                        this.setState({isLoaded: true, data: res});
                    }, error => {
                        this.setState({isLoaded: true, error});
                    })
        } else {
            fetch("https://yli59322-hw8-571-backend.appspot.com/nytimes/" + s)
                .then(res => res.json())
                .then(
                    res => {
                        this.setState({isLoaded: true, data: res});
                    }, error => {
                        this.setState({isLoaded: true, error});
                    })
        }
    }

    componentDidMount() {
        if (this.state.GuardianChecked)
            this.callGuardian(this.state.section);
        else
            this.callNYTimes(this.state.section);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isLoaded === false) {
            if (this.state.GuardianChecked)
                this.callGuardian(this.state.section);
            else
                this.callNYTimes(this.state.section);
        }
    }

    render() {
        console.log(this.state);
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return(
                <div className="load-container">
                    <LoadSpinner/>
                </div>
            );
        } else {
            let array = [];
            for (let i = 0; i < this.state.data.length; i++) {
                array.push(
                    <DetailCard key={i} data={this.state.data[i]} checked={this.state.GuardianChecked}/>
                );
            }
            return (
                <div style={{boxSizing: "content-box"}}>
                    {array}
                </div>
            );
        }
    };
}

export default CardList;