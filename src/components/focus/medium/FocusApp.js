import React, { FormEvent, useState } from "react";

import { ListItem } from "./ListItem";

export const FocusApp = () => {
  const [list, setList] = useState([
    "Build app",
    "Improve accessibility",
    "Write gists",
    "Write article",
    "Publish story",
  ]);

  const [status, setStatus] = useState("");

  const handleDelete = (text) => {
    setList((prevState) => prevState.filter((item) => item !== text));
    setStatus(`Todo "${text}" deleted.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.currentTarget.todo.value;
    setList((prevState) => [...prevState, todo]);
    setStatus(`Todo "${todo}" added.`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Enter a todo</label>
        <input type="text" name="todo" id="todo" />
        <button type='submit'>ENTER</button>
      </form>

      <p role="status">{status}</p>

      <ol tabIndex={-1}>
        {list.map((item) => (
          <ListItem key={item} text={item} handleDelete={handleDelete} />
        ))}
      </ol>
    </>
  );
};
