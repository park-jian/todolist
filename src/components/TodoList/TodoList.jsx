import React, { useState, useEffect } from "react";
import AddTodo from "../AddTodo/AddTodo";
import styles from "./TodoList.module.css";

import Todo from "../Todo/Todo";

function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
  //위를 아래처럼 축약할 수 있다.
  //﻿const [todos, setTodos] = useState(readTodosFromLocalStorage);
  const handleAdd = (todo) => setTodos([...todos, todo]);
  const handleUpdate = (updated) =>
    //기존todo item의 id가 우리가 update 하고자 하는 id와 동일하면 updated된 객체로 map해줌. 그렇지 않다면 기존 t를 그대로 사용한다.
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  //todo의 id와 deleted가 다른 경우만 가져온다.
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  //json으로 변환해서 저장해야 한다.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
function readTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
export default TodoList;
