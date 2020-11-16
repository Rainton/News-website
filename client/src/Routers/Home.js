import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from "../Components/CardList";
import Row from "react-bootstrap/Row";
import LoadSpinner from "../Components/LoadSpinner";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SwitchChecked: props.checked
        };
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.checked !== nextState.SwitchChecked) {
            return {
                SwitchChecked: nextProps.checked
            };
        }
        return null;
    }

    componentDidMount() {
        let loaderHeight = window.innerHeight - document.getElementsByTagName("nav")[0].clientHeight;
        if (document.getElementsByClassName("load-container").length !== 0) {
            document.getElementsByClassName("load-container")[0].style.height = loaderHeight + "px";
        }
        document.getElementById("switchNY").style.display = "block";
        document.getElementsByClassName("switchbar")[0].style.display = "block";
        document.getElementById("switchG").style.display = "block";
        document.getElementById("bookmarkp").style.display = "block";
        document.getElementById("FaRegBookMark").style.display = "block";
        document.getElementById("nonebookmarkp").style.display = "none";
        document.getElementById("FaBookMark").style.display = "none";
    }

    render() {
        return (
            <CardList checked={this.state.SwitchChecked} section=""/>
        );
    }
}

export default Home;