import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailArticle from "../Components/DetailArticle";

class Article extends React.Component {
    constructor(props) {
        super(props);
        let checking = window.location.search.substr(4, 4) === "http";
        this.state = {
            SwitchChecked: !checking
        };
        console.log(this.state);
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
        if (homeTag.length > 0) {
            homeTag[0].classList.remove("active");
        }
    }

    render() {
        return (
            <DetailArticle id={window.location.search} checked={this.state.SwitchChecked}/>
        );
    }
}

export default Article;