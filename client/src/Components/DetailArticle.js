import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import LoadSpinner from "./LoadSpinner";
import DetailShare from "./DetailShare";
import {FaRegBookmark, FaBookmark, IoIosArrowDown, IoIosArrowUp} from "react-icons/all";
import {Element, animateScroll as scroll, scroller} from 'react-scroll';
import {Events} from "react-scroll";
import ReactTooltip from "react-tooltip";
import {toast, ToastContainer, Zoom} from "react-toastify";
import Comment from "./Comment";

class DetailArticle extends React.Component {
    constructor(props) {
        super(props);
        let isBookmarked = false;
        if (window.localStorage.getItem("bookmarks")) {
            let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
            for (let i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i] === props.id) {
                    isBookmarked = true;
                    break;
                }
            }
        }
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            GuardianChecked: props.checked,
            id: props.id,
            bookmarkChecked: isBookmarked
        };
        this.smallRef = React.createRef();
        this.desRef = React.createRef();
        this.bigRef = React.createRef();
    }

    callGuardian = (id) => {
        fetch("https://yli59322-hw8-571-backend.appspot.com/guardian/article" + id)
            .then(res => res.json())
            .then(
                res => {
                    this.setState({isLoaded: true, data: res['response']['content']});
                }, error => {
                    this.setState({isLoaded: true, error});
                })
            .then(
                () => {
                    this.setState({scrollHeight: this.desRef.current.scrollHeight});
                    this.setState({clientHeight: this.desRef.current.clientHeight});
                    if (this.desRef.current.scrollHeight === this.desRef.current.clientHeight)
                        document.getElementById("arrow-down").style.display = "none";
                    if (this.state.bookmarkChecked) {
                        document.getElementById("small-bookmark-unchecked").style.display = "none";
                        document.getElementById("small-bookmark-checked").style.display = "block";
                        document.getElementById("big-bookmark-unchecked").style.display = "none";
                        document.getElementById("big-bookmark-checked").style.display = "block";
                    }
                }
            )
    };

    callNYTimes = (id) => {
        fetch("https://yli59322-hw8-571-backend.appspot.com/nytimes/article" + id)
            .then(res => res.json())
            .then(
                res => {
                    this.setState({isLoaded: true, data: res['response']['docs']});
                }, error => {
                    this.setState({isLoaded: true, error});
                })
            .then(
                () => {
                    this.setState({scrollHeight: this.desRef.current.scrollHeight});
                    this.setState({clientHeight: this.desRef.current.clientHeight});
                    if (this.desRef.current.scrollHeight === this.desRef.current.clientHeight)
                        document.getElementById("arrow-down").style.display = "none";
                    if (this.state.bookmarkChecked) {
                        document.getElementById("small-bookmark-unchecked").style.display = "none";
                        document.getElementById("small-bookmark-checked").style.display = "block";
                        document.getElementById("big-bookmark-unchecked").style.display = "none";
                        document.getElementById("big-bookmark-checked").style.display = "block";
                    }
                }
            )
    };

    componentDidMount() {
        if (this.state.GuardianChecked)
            this.callGuardian(this.state.id);
        else
            this.callNYTimes(this.state.id);
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
            if (arguments[0] === "scroll-to-element") {
                document.getElementById("small-card").style.display = "flex";
                document.getElementById("big-card").style.display = "none";
            }
        });
    }

    expand = () => {
        document.getElementById("small-card").style.display = "none";
        document.getElementById("big-card").style.display = "flex";
        this.scrollToBottom();
    };

    fold = () => {
        this.scrollUp();
    };

    scrollToBottom = () => {
        scroller.scrollTo('scroll-to-bottom', {
            duration: 800,
            delay: 0,
            smooth: true,
            offset: this.state.clientHeight
        })
    };

    scrollUp = () => {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: true
        })
    };

    bookmarkClick = () => {
        document.getElementById("small-bookmark-unchecked").style.display = "none";
        document.getElementById("small-bookmark-checked").style.display = "block";
        document.getElementById("big-bookmark-unchecked").style.display = "none";
        document.getElementById("big-bookmark-checked").style.display = "block";
        let title;
        if (this.state.GuardianChecked)
            title = this.state.data['webTitle'];
        else
            title = this.state.data[0]['headline']['main'];
        toast("Saving " + title);
        let bookmarks;
        if (window.localStorage.getItem("bookmarks")) {
            bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        } else {
            bookmarks = [];
        }
        bookmarks.push(this.state.id);
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        console.log(JSON.parse(window.localStorage.getItem("bookmarks")));
    };

    bookmarkUnClick = () => {
        document.getElementById("small-bookmark-unchecked").style.display = "block";
        document.getElementById("small-bookmark-checked").style.display = "none";
        document.getElementById("big-bookmark-unchecked").style.display = "block";
        document.getElementById("big-bookmark-checked").style.display = "none";
        let title;
        if (this.state.GuardianChecked)
            title = this.state.data['webTitle'];
        else
            title = this.state.data[0]['headline']['main'];
        toast("Removing - " + title);
        let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
        let newbookmarks = [];
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i] !== this.state.id)
                newbookmarks.push(bookmarks[i]);
        }
        window.localStorage.setItem("bookmarks", JSON.stringify(newbookmarks));
        console.log(JSON.parse(window.localStorage.getItem("bookmarks")));
    };

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
            let title;
            let image;
            let date;
            let url;
            let description;
            if (this.state.GuardianChecked) {
                title = this.state.data['webTitle'];
                date = this.state.data['webPublicationDate'].slice(0, 10);
                description = this.state.data['blocks']['body']['0']['bodyTextSummary'];
                url = this.state.data['webUrl'];
                if ('main' in this.state.data['blocks'] && this.state.data['blocks']['main']['elements']['0']['assets'].length !== 0)
                    image = this.state.data['blocks']['main']['elements']['0']['assets'].slice(-1)[0]['file'];
                else
                    image = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
            } else {
                title = this.state.data[0]['headline']['main'];
                date = this.state.data[0]['pub_date'].slice(0, 10);
                description = this.state.data[0]['abstract'];
                url = this.state.data[0]['web_url'];
                if ('multimedia' in this.state.data[0] && this.state.data[0]['multimedia'] !== null && this.state.data[0]['multimedia'].length !== 0) {
                    let i = 0;
                    for (; i < this.state.data[0]['multimedia'].length; i++) {
                        if (this.state.data[0]['multimedia'][i]['width'] >= 2000)
                            break;
                    }
                    if (i < this.state.data[0]['multimedia'].length) {
                        let tmpUrl = this.state.data[0]['multimedia'][i]['url'];
                        if (tmpUrl[0] === 'i')
                            image = 'https://www.nytimes.com/' + tmpUrl;
                        else
                            image = tmpUrl;
                    } else
                        image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
                } else
                    image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
            }
            return (
                <div style={{boxSizing: "content-box"}}>
                    <Row>
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
                        <Element name="scroll-to-element" className="element"></Element>
                        <Card className="detailCard" ref={this.smallRef} id="small-card">
                            <div className="container-fluid">
                                <Card.Body>
                                    <Card.Title>
                                        <strong><em>{title}</em></strong>
                                    </Card.Title>
                                    <Card.Text style={{"marginBottom": 0}}>
                                        <Row>
                                            <Col md={8} sm={5} xs={5}>
                                                <em>{date}</em>
                                            </Col>
                                            <Col md={3} sm={5} xs={5}>
                                                <DetailShare url={url}/>
                                            </Col>
                                            <Col md={1} sm={2} xs={2}>
                                                <p data-tip="Bookmark"
                                                   data-for="BookmarkDeTT"
                                                   data-offset="{'left' : -5, 'right' : -5}"
                                                   style={{"float": "right"}}
                                                >
                                                    <FaRegBookmark id="small-bookmark-unchecked"
                                                                   onClick={this.bookmarkClick}/>
                                                    <FaBookmark id="small-bookmark-checked"
                                                                onClick={this.bookmarkUnClick}/>
                                                </p>
                                                <ReactTooltip
                                                    id="BookmarkDeTT"
                                                    place="top"
                                                    effect="solid"
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    <div className="align-items-center justify-content-center"
                                         style={{display: "flex", width: "100%", height: "100%"}}
                                         id="scroll-to"
                                    >
                                        <Image className="img-fluid" src={image}/>
                                    </div>
                                    <Card.Text className="detailDescription" ref={this.desRef} id="small-description">
                                        {description}
                                    </Card.Text>
                                    <IoIosArrowDown
                                        style={{"height": "1.5em", "width": "1.5em", "float": "right"}}
                                        onClick={this.expand}
                                        id="arrow-down"
                                    />
                                </Card.Body>
                            </div>
                        </Card>
                        <Card className="detailCard" ref={this.bigRef} id="big-card">
                            <div className="container-fluid">
                                <Card.Body>
                                    <Card.Title>
                                        <strong><em>{title}</em></strong>
                                    </Card.Title>
                                    <Card.Text style={{"marginBottom": 0}}>
                                        <Row>
                                            <Col md={8} sm={5} xs={5}>
                                                <em>{date}</em>
                                            </Col>
                                            <Col md={3} sm={5} xs={5}>
                                                <DetailShare url={url}/>
                                            </Col>
                                            <Col md={1} sm={2} xs={2}>
                                                <p data-tip="Bookmark"
                                                   data-for="BookmarkDeTT"
                                                   data-offset="{'left' : -5, 'right' : -5}"
                                                   style={{"float": "right"}}
                                                >
                                                    <FaRegBookmark id="big-bookmark-unchecked"
                                                                   onClick={this.bookmarkClick}/>
                                                    <FaBookmark id="big-bookmark-checked"
                                                                onClick={this.bookmarkUnClick}/>
                                                </p>
                                                <ReactTooltip
                                                    id="BookmarkDeTT"
                                                    place="top"
                                                    effect="solid"
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    <div className="align-items-center justify-content-center"
                                         style={{display: "flex", width: "100%", height: "100%"}}>
                                        <Image className="img-fluid" src={image}/>
                                    </div>
                                    <Element name="scroll-to-bottom" className="element"></Element>
                                    <Card.Text className="detailDescription" id="big-description">
                                        {description}
                                    </Card.Text>
                                    <IoIosArrowUp
                                        style={{"height": "1.5em", "width": "1.5em", "float": "right"}}
                                        onClick={this.fold}
                                        id="arrow-up"
                                    />
                                </Card.Body>
                            </div>
                        </Card>
                    </Row>
                    <Row>
                        <Comment id={this.props.id}/>
                    </Row>
                </div>
            );
        }
    }
}

export default DetailArticle;