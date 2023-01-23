import React, { useEffect, useState, useRef } from "react";

import "./styles/Container.css";

const people = [
  { id: 0, name: "Adriano" },
  { id: 1, name: "Bruna" },
  { id: 2, name: "Carlo" },
];

const getIsActive = (isActive) => (isActive ? "isActive" : "");

const NavListItem = (props) => (
  <h3
    className={'nav-list-item' + ' ' + getIsActive(props.isActive)}
    onClick={() => props.setActiveId(props.person.id)}
  >
    {props.person.name}
  </h3>
);

const Cell = (props) => {
  const myRef = useRef();

  useEffect(() => {
    focusIfActive()
  }, [props.isActive])

  const focusIfActive = () => {
    if (props.isActive) {
      myRef.current.focus();
    }
  }

  return (
    <div
      key={props.person.id}
      className={getIsActive(props.isActive)}
      onClick={() => props.setActiveId(props.person.id)}
    >
      <h4>
        Chatta con <em>{props.person.name}</em>.
      </h4>
      <input type="text" ref={myRef} />
      <button type="submit">ENTER</button>
    </div>
  );

}

const Container = () => {
  const [activeCellId, setActiveId] = useState(0)

  const getIsActive = (id) => activeCellId === id;

  const person2list = (person) => (
    <NavListItem
      key={person.id}
      person={person}
      isActive={getIsActive(person.id)}
      setActiveId={setActiveId}
    />
  );

  const person2cell = (person) => (
    <Cell
      key={person.id}
      person={person}
      isActive={getIsActive(person.id)}
      setActiveId={setActiveId}
    />
  );


  return (
    <div>
      <em>
        <h3>IsActiveCell (functions):</h3>
      </em>
      <div className="container">
        <div className="left-nav">
          {/* <p>Active Cell Id: {this.state.activeCellId}</p> */}
          {people.map(person2list)}
        </div>
        <div className="cell-container">
          {people.map(person2cell)}
        </div>
      </div>
    </div>
  );
}

export default Container;
