import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import {FaTrash} from "react-icons/all";
import {withRouter} from "react-router-dom";
import {toast, ToastContainer, Zoom} from "react-toastify";
import FavoriteShare from "./FavoriteShare";

class DetailFavorite extends React.Component {
    constructor(props) {
        super(props);
        let checking = 'id' in props.data;
        this.state = {
            data: props.data,
            GuardianChecked: checking,
        };
    }

    clickCard = e => {
        let clickTarget = e.target.localName;
        console.log(clickTarget);
        if (clickTarget === "path" || clickTarget === "span" || clickTarget === "circle" || clickTarget === "svg")
            return;
        let id;
        if (this.state.GuardianChecked)
            id = this.state.data['id'];
        else
            id = this.state.data['web_url'];
        let queryString = "id=" + id;
        this.props.history.push('/article?' + queryString);
    };

    bookmarkUnClick = () => {
        let title;
        let source;
        if (this.state.GuardianChecked) {
            title = this.state.data['webTitle'];
            source = "GUARDIAN";
        } else {
            title = this.state.data['headline']['main'];
            source = "NYTIMES";
        }
        let id;
        if (this.state.GuardianChecked)
            id = "?id=" + this.state.data['id'];
        else
            id = "?id=" + this.state.data['web_url'];
        toast("Removing - " + title);
        let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        console.log(bookmarks);
        let newbookmarks = [];
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i] !== id)
                newbookmarks.push(bookmarks[i]);
        }
        window.localStorage.setItem("bookmarks", JSON.stringify(newbookmarks));
        console.log(JSON.parse(window.localStorage.getItem("bookmarks")));
        this.props.handleDelete();
    };

    render() {
        let title;
        let image;
        let date;
        let url;
        let id;
        let section;
        let sectionClassName;
        let source;
        let sourceClassName;
        if (this.state.GuardianChecked) {
            source = "GUARDIAN";
            sourceClassName = "badge-guardian";
            title = this.state.data['webTitle'];
            date = this.state.data['webPublicationDate'].slice(0, 10);
            url = this.state.data['webUrl'];
            id = this.state.data['id'];
            if ('main' in this.state.data['blocks'] && this.state.data['blocks']['main']['elements']['0']['assets'].length !== 0)
                image = this.state.data['blocks']['main']['elements']['0']['assets'].slice(-1)[0]['file'];
            else
                image = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';

            section = this.state.data['sectionId'].toUpperCase();
            if (section === 'SPORT')
                section = 'SPORTS';
            if (section === 'WORLD')
                sectionClassName = 'badge-world';
            else if (section === 'POLITICS')
                sectionClassName = 'badge-politics';
            else if (section === 'BUSINESS')
                sectionClassName = 'badge-business';
            else if (section === 'TECHNOLOGY')
                sectionClassName = 'badge-technology';
            else if (section === 'SPORTS')
                sectionClassName = 'badge-sports';
            else
                sectionClassName = 'badge-other';

        } else {
            source = "NYTIMES";
            sourceClassName = "badge-nytimes";
            title = this.state.data['headline']['main'];
            date = this.state.data['pub_date'].slice(0, 10);
            url = this.state.data['web_url'];
            id = url;
            if ('multimedia' in this.state.data && this.state.data['multimedia'] !== null && this.state.data['multimedia'].length !== 0) {
                let i = 0;
                for (; i < this.state.data['multimedia'].length; i++) {
                    if (this.state.data['multimedia'][i]['width'] >= 2000)
                        break;
                }
                if (i < this.state.data['multimedia'].length) {
                    let tmpUrl = this.state.data['multimedia'][i]['url'];
                    if (tmpUrl[0] === 'i')
                        image = 'https://www.nytimes.com/' + tmpUrl;
                    else
                        image = tmpUrl;
                } else
                    image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
            } else
                image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
            section = this.state.data['news_desk'].toUpperCase();
            if (section === "NONE")
                section = "";
            if (section === 'WORLD')
                sectionClassName = 'badge-world';
            else if (section === 'POLITICS')
                sectionClassName = 'badge-politics';
            else if (section === 'BUSINESS')
                sectionClassName = 'badge-business';
            else if (section === 'TECHNOLOGY')
                sectionClassName = 'badge-technology';
            else if (section === 'SPORTS')
                sectionClassName = 'badge-sports';
            else
                sectionClassName = 'badge-other';

        }
        return (
            <Card onClick={this.clickCard}>
                <div className="container-fluid" style={{"padding": 0}}>
                    <ToastContainer
                        transition={Zoom}
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable={false}
                        pauseOnHover
                        bodyClassName="toast-body"
                        style={{"font-size": "0.8rem"}}
                    />
                    <Card.Title className="small-card-title">
                        {title}
                        <FavoriteShare url={url} title={title} source={source}/>
                        <FaTrash onClick={this.bookmarkUnClick}/>
                    </Card.Title>
                    <div className="align-items-center justify-content-center"
                         style={{
                             "display": "flex",
                             "width": "100%",
                             "height": "100%",
                             "padding": "1.25rem",
                             "padding-bottom": 0
                         }}>
                        <Image className="img-thumbnail img-fluid" src={image}/>
                    </div>
                    <Card.Body>
                        <Card.Text>
                            <em>{date}</em>
                            <span style={{"float": "right"}}>
                                <Badge className={sectionClassName}
                                       style={{"margin-right": "0.2rem", "float": "none"}}>{section}</Badge>
                                <Badge className={sourceClassName} style={{"float": "none"}}>{source}</Badge>
                            </span>
                        </Card.Text>
                    </Card.Body>
                </div>
            </Card>
        );
    }
}

export default withRouter(DetailFavorite);