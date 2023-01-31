import React from "react";

import { DataSource } from "../../DataSource";

export function withSubscription(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.datasource = new DataSource()
      this.state = {
        comments: this.datasource.getComments()
      }
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

    render = () => <>
      <button onClick={() => this.datasource.update()}>Update</button>
      <WrappedComponent comments={this.state.comments} {...this.props} />
    </>
  }
}
