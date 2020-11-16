import React, {Component} from "react";
import DetailFavorite from "./DetailFavorite";
import LoadSpinner from "./LoadSpinner";
import Col from "react-bootstrap/Col";

class FavoriteList extends Component {
    constructor(props) {
        super(props);
        this.state = {ids: props.ids, isLoaded: false, datas: []};
    }

    callGuardian = (id, idx) => {
        fetch("https://yli59322-hw8-571-backend.appspot.com/guardian/article" + id)
            .then(res => res.json())
            .then(
                res => {
                    let newdata = this.state.datas;
                    newdata.push(res['response']['content']);
                    this.setState({datas: newdata});
                    if (idx === this.props.ids.length - 1)
                        this.setState({isLoaded: true});
                }, error => {
                    this.setState({error});
                })
    };

    callNYTimes = (id, idx) => {
        fetch("https://yli59322-hw8-571-backend.appspot.com/nytimes/article" + id)
            .then(res => res.json())
            .then(
                res => {
                    let newdata = this.state.datas;
                    newdata.push(res['response']['docs'][0]);
                    this.setState({datas: newdata});
                    if (idx === this.props.ids.length - 1)
                        this.setState({isLoaded: true});
                }, error => {
                    this.setState({error});
                })
    };

    static getDerivedStateFromProps(nextProps, nextState) {
        console.log(nextProps);
        console.log(nextState);
        console.log(nextProps.ids === nextState.ids);
        if (nextProps.ids !== nextState.ids) {
            console.log("update");
            return {
                ids: nextProps.ids,
                datas: [],
                isLoaded: false
            };
        }
        return null;
    }

    componentDidMount() {
        let id = this.state.ids;
        for (let i = 0; i < id.length; i++) {
            let checking = id[i].substr(4, 4) !== 'http';
            if (checking)
                this.callGuardian(id[i], i);
            else
                this.callNYTimes(id[i], i);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
        console.log(prevState);
        if(prevState.ids !== this.state.ids){
            if (this.state.isLoaded === false) {
                let id = this.state.ids;
                for (let i = 0; i < id.length; i++) {
                    let checking = id[i].substr(4, 4) !== 'http';
                    if (checking)
                        this.callGuardian(id[i], i);
                    else
                        this.callNYTimes(id[i], i);
                }
            }
        }
    }

    render() {
        if (this.props.ids.length === 0) {
            return null;
        } else if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return (
                <div className="load-container">
                    <LoadSpinner/>
                </div>
            );
        } else {
            let array = [];
            for (let i = 0; i < this.state.datas.length; i++) {
                array.push(
                    <Col md={3} style={{"padding": 0}}>
                        <DetailFavorite key={i} data={this.state.datas[i]} handleDelete={this.props.handleDelete}/>
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

export default FavoriteList;