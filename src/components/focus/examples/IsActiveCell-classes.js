import React, { Component } from "react";

import "./styles/Container.css";

const people = [
  { id: 0, name: "Adriano" },
  { id: 1, name: "Bruna" },
  { id: 2, name: "Carlo" },
];

const getIsActive = (isActive) => (isActive ? "isActive" : "");

class NavListItem extends Component {
  render() {
    return (
      <h3
        className={'nav-list-item' + ' ' + getIsActive(this.props.isActive)}
        onClick={() => this.props.setActiveId(this.props.person.id)}
      >
        {this.props.person.name}
      </h3>
    );
  }
}

class Cell extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.focusIfActive()
  }

  componentDidUpdate() {
    this.focusIfActive()
  }

  focusIfActive() {
    if (this.props.isActive) {
      this.myRef.current.focus();
    }
  }

  render() {
    return (
      <div
        key={this.props.person.id}
        className={getIsActive(this.props.isActive)}
        onClick={() => this.props.setActiveId(this.props.person.id)}
      >
        <h4>
          Chatta con <em>{this.props.person.name}</em>.
        </h4>
        <input type="text" ref={this.myRef} />
        <button type="submit">ENTER</button>
      </div>
    );
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { activeCellId: 0 };
  }

  setActiveId = (id) => {
    this.setState({
      activeCellId: id,
    });
  };

  getIsActive = (id) => this.state.activeCellId === id;

  person2list = (person) => (
    <NavListItem
      key={person.id}
      person={person}
      isActive={this.getIsActive(person.id)}
      setActiveId={this.setActiveId}
    />
  );

  person2cell = (person) => (
    <Cell
      key={person.id}
      person={person}
      isActive={this.getIsActive(person.id)}
      setActiveId={this.setActiveId}
    />
  );

  render() {
    return (
      <div>
        <em>
          <h3>IsActiveCell:</h3>
        </em>
        <div className="container">
          <div className="left-nav">
            {/* <p>Active Cell Id: {this.state.activeCellId}</p> */}
            {people.map(this.person2list)}
          </div>
          <div className="cell-container">
            {people.map(this.person2cell)}
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
