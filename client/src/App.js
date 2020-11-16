import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import Home from "./Routers/Home";
import World from "./Routers/World";
import Politics from "./Routers/Politics";
import Business from "./Routers/Business";
import Technology from "./Routers/Technology";
import Sports from "./Routers/Sports";
import Search from "./Routers/Search";
import Article from "./Routers/Article";
import Favorite from "./Routers/Favorite";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SelectBar from "./Components/SelectBar";
import {FaRegBookmark, FaBookmark} from "react-icons/all";
import ReactSwitch from "react-switch";
import {Link, NavLink} from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import './App.css';
import 'react-toastify/dist/ReactToastify.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        let checking;
        if (window.localStorage.getItem("switchchecked")) {
            checking = (window.localStorage.getItem("switchchecked") === "true");
        } else {
            checking = true;
        }
        this.state = {
            SwitchChecked: checking,
            checkedIcon: false,
            uncheckedIcon: false,
            onColor: '#49f',
            offColor: '#eee'
        };
        console.log(this.state);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = checked => {
        window.localStorage.setItem("switchchecked", checked);
        this.setState({SwitchChecked: checked});
    };

    render() {
        return (
            <main>
                <Navbar className="Navbar" collapseOnSelect expand="lg" variant="dark">
                    <SelectBar/>
                    <Navbar.Toggle aria-controls="responsive-navbar"/>
                    <Navbar.Collapse id="responsive-narbar">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/" exact activeClassName="active active-home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/World">World</Nav.Link>
                            <Nav.Link as={NavLink} to="/Politics">Politics</Nav.Link>
                            <Nav.Link as={NavLink} to="/Business">Business</Nav.Link>
                            <Nav.Link as={NavLink} to="/Technology">Technology</Nav.Link>
                            <Nav.Link as={NavLink} to="/Sports">Sports</Nav.Link>
                        </Nav>
                        <p
                            data-tip="Bookmark"
                            data-for="BookmarkTT"
                            data-offset="{'left' : -5, 'right' : -5}"
                            className="bookmarkbar"
                            id="bookmarkp"
                        >
                            <Link to="/favorites">
                                <FaRegBookmark color="white" className="mr-2" style={{"cursor": "default"}}
                                               id="FaRegBookMark"/>
                            </Link>
                        </p>
                        <p
                            data-tip="Bookmark"
                            data-for="BookmarkTT"
                            data-offset="{'left' : -5, 'right' : -5}"
                            className="bookmarkbar"
                            id="nonebookmarkp"
                            style={{"display": "none"}}
                        >
                            <Link to="/favorites">
                                <FaBookmark color="white" className="mr-2"
                                            style={{"cursor": "default", "display": "none"}} id="FaBookMark"/>
                            </Link>
                        </p>
                        <ReactTooltip
                            id="BookmarkTT"
                            place="bottom"
                            effect="solid"
                            type="dark"/>
                        <Nav style={{color: 'white', padding: 8}} className="mr-2" id="switchNY">NYTimes</Nav>
                        <ReactSwitch
                            onChange={this.handleChange}
                            checked={this.state.SwitchChecked}
                            checkedIcon={this.state.checkedIcon}
                            uncheckedIcon={this.state.uncheckedIcon}
                            onColor={this.state.onColor}
                            offColor={this.state.offColor}
                            className="mr-2 switchbar"
                        />
                        <Navbar style={{color: 'white', padding: 8}} id="switchG">Guardian</Navbar>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/" render={(props) => <Home checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/World" render={(props) => <World checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/Politics"
                           render={(props) => <Politics checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/Business"
                           render={(props) => <Business checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/Technology"
                           render={(props) => <Technology checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/Sports" render={(props) => <Sports checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/Search" render={(props) => <Search checked={this.state.SwitchChecked} {...props}
                                                                     key={window.location.search}/>}/>
                    <Route path="/article"
                           render={(props) => <Article checked={this.state.SwitchChecked} {...props}/>}/>
                    <Route path="/favorites" component={Favorite}/>
                </Switch>
            </main>
        );
    }
}

export default App;
