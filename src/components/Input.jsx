import React, { useState } from "react";
import TodoItem from "./TodoItem";

import "../components/Input.less";
const Input = (props) => {
  return (
    <div className="input-block">
      <input
        type="text"
        className="input"
        placeholder="Enter a title"
        value={props.title}
        onChange={(e) => {
          props.setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        className="input"
        placeholder="Enter a text"
        value={props.text}
        onChange={(e) => {
          props.setText(e.target.value);
        }}
      />

      <input
        type="datetime-local"
        value={props.data}
        onChange={(e) => props.setData(e.target.value)}
      />
      <input
        type="file"
        
        onChange={(e) => props.setFile(e.target.value)}
      />
      <button className="button" onClick={() => props.addTodo()}>
        Add
      </button>
    </div>
  );
};

export default Input;
