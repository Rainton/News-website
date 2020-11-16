import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import {withRouter} from "react-router-dom";
import Share from "./Share";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class DetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            GuardianChecked: props.checked,
        };
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.checked !== nextState.GuardianChecked && nextProps.data.length !== 0 && nextProps.data !== nextState.data) {
            return {
                GuardianChecked: nextProps.checked,
                data: nextProps.data
            };
        }
        return null;
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
            id = this.state.data['url'];
        let queryString = "id=" + id;
        this.props.history.push('/article?' + queryString);
    };

    render() {
        let title;
        let image;
        let description;
        let date;
        let section;
        let sectionClassName;
        let url;
        if (this.state.GuardianChecked) {
            if ('main' in this.state.data['blocks'] && this.state.data['blocks']['main']['elements']['0']['assets'].length !== 0)
                image = this.state.data['blocks']['main']['elements']['0']['assets'].slice(-1)[0]['file'];
            else
                image = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
            title = this.state.data['webTitle'];
            description = this.state.data['blocks']['body']['0']['bodyTextSummary'];
            date = this.state.data['webPublicationDate'].slice(0, 10);
            url = this.state.data['webUrl'];
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
            title = this.state.data['title'];
            description = this.state.data['abstract'];
            date = this.state.data['published_date'].slice(0, 10);
            section = this.state.data['section'].toUpperCase();
            if (section === "NONE")
                section = "";
            url = this.state.data['url'];
            if ('multimedia' in this.state.data && this.state.data['multimedia'] !== null && this.state.data['multimedia'].length !== 0)
                image = this.state.data['multimedia']['0']['url'];
            else
                image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
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
                <div className="container-fluid">
                    <Row>
                        <Col md={3}>
                            <div className="align-items-center justify-content-center"
                                 style={{display: "flex", width: "100%", height: "100%", padding: "1.25rem"}}>
                                <Image className="img-thumbnail img-fluid" src={image}/>
                            </div>
                        </Col>
                        <Col md={9}>
                            <Card.Body>
                                <Card.Title>
                                    <strong><em>{title}</em></strong>
                                    <Share url={url} title={title}/>
                                </Card.Title>
                                <Card.Text className="description">
                                    {description}
                                </Card.Text>
                                <Card.Text>
                                    <em>{date}</em>
                                    <Badge className={sectionClassName}>{section}</Badge>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </div>
            </Card>
        );
    }
}

export default withRouter(DetailCard);