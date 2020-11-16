import React, {useState} from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    EmailIcon,
    TwitterIcon,
} from 'react-share';
import {MdShare} from "react-icons/all";
import Modal from "react-bootstrap/Modal";

function Share(props) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    let hashtag = new Array(1);
    hashtag[0] = "CSCI_571_NewsApp";
    return (
        <>
            <MdShare onClick={handleShow} className="share-icon"/>
            <Modal show={show} onHide={handleClose}
                   onClick={(e) => e.stopPropagation()}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{"text-align": "center"}}>
                    Share via:<br/>
                    <div className="justify-content-around d-flex">
                        <FacebookShareButton url={props.url} hashtag="#CSCI_571_NewsApp">
                            <FacebookIcon size={50} round/>
                        </FacebookShareButton>
                        <TwitterShareButton url={props.url} hashtags={hashtag}>
                            <TwitterIcon size={50} round/>
                        </TwitterShareButton>
                        <EmailShareButton url={props.url} subject="#CSCI_571_NewsApp">
                            <EmailIcon size={50} round/>
                        </EmailShareButton>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Share;