import React from "react";
import FavoriteList from "../Components/FavoriteList";

class Favorite extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let loaderHeight = window.innerHeight - document.getElementsByTagName("nav")[0].clientHeight;
        if (document.getElementsByClassName("load-container").length !== 0) {
            document.getElementsByClassName("load-container")[0].style.height = loaderHeight + "px";
        }
        let bookmarks;
        if (window.localStorage.getItem("bookmarks"))
            bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        else
            bookmarks = [];
        if (bookmarks.length === 0) {
            document.getElementById("yes-bookmark").style.display = "none";
        } else
            document.getElementById("no-bookmark").style.display = "none";

        document.getElementById("switchNY").style.display = "none";
        document.getElementsByClassName("switchbar")[0].style.display = "none";
        document.getElementById("switchG").style.display = "none";
        document.getElementById("bookmarkp").style.display = "none";
        document.getElementById("FaRegBookMark").style.display = "none";
        document.getElementById("nonebookmarkp").style.display = "block";
        document.getElementById("FaBookMark").style.display = "block";
        let homeTag = document.getElementsByClassName("active-home");
        if (homeTag.length > 0) {
            homeTag[0].classList.remove("active");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let bookmarks;
        if (window.localStorage.getItem("bookmarks"))
            bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        else
            bookmarks = [];
        if (bookmarks.length === 0) {
            document.getElementById("yes-bookmark").style.display = "none";
            document.getElementById("no-bookmark").style.display = "block";
        } else
            document.getElementById("no-bookmark").style.display = "none";

        document.getElementById("switchNY").style.display = "none";
        document.getElementsByClassName("switchbar")[0].style.display = "none";
        document.getElementById("switchG").style.display = "none";
        document.getElementById("bookmarkp").style.display = "none";
        document.getElementById("FaRegBookMark").style.display = "none";
        document.getElementById("nonebookmarkp").style.display = "block";
        document.getElementById("FaBookMark").style.display = "block";
        let homeTag = document.getElementsByClassName("active-home");
        if (homeTag.length > 0) {
            homeTag[0].classList.remove("active");
        }
    }

    handleDelete = () => {
        console.log("handle delete");
        this.forceUpdate();
    };

    render() {
        let bookmarks;
        if (window.localStorage.getItem("bookmarks"))
            bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        else
            bookmarks = [];
        console.log(bookmarks);
        return (
            <div className="container-fluid">
                <h4 style={{"margin-left": "0.25rem", "margin-bottom": 0}} id="yes-bookmark">
                    Favorites
                </h4>
                <h4 style={{"margin-left": "0.25rem", "margin-bottom": 0, "text-align": "center"}} id="no-bookmark">
                    You have no saved articles
                </h4>
                <FavoriteList ids={bookmarks} handleDelete={this.handleDelete}/>
            </div>
        );
    }
}

export default Favorite;