import React from "react";
import commentBox from "commentbox.io";

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        commentBox('5707416263983104-proj', {defaultBoxId: this.props.id});
    }


    render() {
        return <div className="commentbox" style={{"width": "100%", "margin": "1.25rem"}}/>;
    }
}

export default Comment;