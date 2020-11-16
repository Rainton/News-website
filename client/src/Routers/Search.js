import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectBar from "../Components/SelectBar";
import {FaRegBookmark} from "react-icons/all";
import {Link} from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import SearchList from "../Components/SearchList";

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let loaderHeight = window.innerHeight - document.getElementsByTagName("nav")[0].clientHeight;
        if (document.getElementsByClassName("load-container").length !== 0) {
            document.getElementsByClassName("load-container")[0].style.height = loaderHeight + "px";
        }
        document.getElementById("switchNY").style.display = "none";
        document.getElementsByClassName("switchbar")[0].style.display = "none";
        document.getElementById("switchG").style.display = "none";
        document.getElementById("bookmarkp").style.display = "block";
        document.getElementById("FaRegBookMark").style.display = "block";
        document.getElementById("nonebookmarkp").style.display = "none";
        document.getElementById("FaBookMark").style.display = "none";
        let homeTag = document.getElementsByClassName("active-home");
        if(homeTag.length > 0){
            homeTag[0].classList.remove("active");
        }
    }

    render() {
        let checking = this.props.checked;
        return (
            <div className="container-fluid">
                <h4 style={{"margin-left": "0.25rem", "margin-bottom": 0}}>Results</h4>
                <SearchList checked={checking} q={window.location.search}/>
            </div>
        );
    }
}

export default Search;