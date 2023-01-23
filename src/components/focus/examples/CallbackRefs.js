import React from "react";

import "./styles/Container.css";

const people = [
  { id: 0, name: "Adriano" },
  { id: 1, name: "Bruna" },
  { id: 2, name: "Carlo" },
];

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.myRefArray = [];
  }

  handleClick = (id) => {
    this.myRefArray[id].focus();
  };

  person2list = (person) =>
    <h3 onClick={() => this.handleClick(person.id)}>{person.name}</h3>


  person2cell = (person) => {
    const setInputRef = (element) => {
      this.myRefArray[person.id] = element
    }
    return (
      <div key={person.id}>
        <h4>
          Chatta con <em>{person.name}</em>.
        </h4>
        <input
          type="text"
          ref={setInputRef}
        ></input>
      </div>
    )
  }

    render() {
      return (
        <div>
          <em><h3>Container</h3></em>
          <div className="container">
            <div className="left-nav">
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
