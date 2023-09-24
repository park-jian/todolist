import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddTodo.module.css";

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      // 빈 값, space를 입력한 값이 목록에 들어가므로 그런 부분은 제거
      return;
    }
    onAdd({ id: uuidv4(), text, status: "active" });
    setText(""); //입력하고 나서도 여전히 input value값이 남아있어서, 그 부분을 초기화 해줌
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodo;
