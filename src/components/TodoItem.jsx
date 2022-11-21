import React from "react";
import "./TodoItem.less";
import dayjs from "dayjs";

const TodoItem = ({
  isCompleted,
  isEditting,
  title,
  text,
  data,
  file,
  toggleComplete,
  removeTodo,
  editTodo,
  id,
  setTitleEd,
  setTextEd,
  setDataEd,
  todo,
  saveEdit,
}) => {
  const todayData = dayjs().format("YYYY-MM-DDTHH:MM");
  return (
    <li className={isCompleted ? "todo-completed" : "todo-item"}>
      <h2>{title}</h2>
      <p>{text}</p>
      {todayData > data ? (
        <h4>Time's up or enter hours and minutes!!!</h4>
      ) : (
        <span>{data.replace("T", " / ")}</span>
      )}

      <div className="">
        Прикрепленые файлы:{" "}
        <a href={file} target="_blank">
          {file}
        </a>{" "}
      </div>
      <div className="img-block">
        <img
          src="complete.svg"
          alt="#"
          className="icon"
          onClick={() => toggleComplete(todo)}
        />
        <img
          src="edit.svg"
          alt="#"
          className="icon"
          onClick={() => editTodo(todo)}
        />
        <img
          src="cross.svg"
          alt="#"
          className="icon"
          onClick={() => removeTodo(id)}
        />
      </div>
      {isEditting ? (
        <div className="">
          <input
            type="text"
            onChange={(e) => setTitleEd(e.target.value)}
          ></input>
          <input
            type="text"
            onChange={(e) => setTextEd(e.target.value)}
          ></input>
          <input
            type="datetime-local"
            onChange={(e) => setDataEd(e.target.value)}
          ></input>
          <button onClick={() => saveEdit(todo)}>Save changes</button>
        </div>
      ) : null}
    </li>
  );
};

export default TodoItem;
