import React from "react";

class Comment extends React.Component {
  render() {
    return (
      <div>
        <p>Comment: {this.props.comment.text}</p>
      </div>
    )
  }
}

export class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h2>CommentList</h2>        
        {this.props.comments?.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
