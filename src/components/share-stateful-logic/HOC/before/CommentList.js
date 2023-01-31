import React from "react";
import { DataSource } from "../DataSource";

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

    this.datasource = new DataSource();
    this.state = {
      // "DataSource" is some global data source
      comments: this.datasource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    this.datasource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    this.datasource.removeChangeListener(this.handleChange);
  }

  handleChange = () => {
    // Update component state whenever the data source changes
    this.setState({
      comments: this.datasource.getComments()
    });
  }

  render() {
    return (
      <div>
        <h2>CommentList</h2>
        <button onClick={() => this.datasource.update()}>Update</button>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
