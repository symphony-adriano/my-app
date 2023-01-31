import React, { useEffect, useState } from "react";
import { DataSource } from "../../DataSource";

class Comment extends React.Component {
  render() {
    return (
      <div>
        <p>Comment: {this.props.comment.text}</p>
      </div>
    )
  }
}


export const CommentList = () => {
  const datasource = new DataSource();

  const [comments, setComments] = useState(datasource.getComments())

  useEffect(() => {
    const handleChange = (comments) => {
      // Update component state whenever the data source changes
      setComments(comments)
    }
    datasource.addChangeListener(handleChange)
  }, [])


  
  return (
    <div>
      <h2>CommentList - hooks</h2>
      <button onClick={() => datasource.update()}>Update</button>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  )
}
