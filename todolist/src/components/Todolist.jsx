import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Todo from "./Todo";

function Todolist() {
  const [todolist, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/add", { task: inputTodo })
      .then((result) => {
        setCount((prev) => prev + 1);
        console.log(result);
      })
      .catch((err) => console.log(err));
    setInputTodo("");
  };  

  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => {
        setTodoList(result.data);
        console.log("result", result.data);
        console.log("list", todolist);
      })
      .catch((err) => console.log(err));
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center w-screen p-4">
      <h1 className="text-4xl font-bold text-black">Todo List</h1>
      {/*input field*/}
      <div className="pt-10">
        <input
          type="text"
          className="border-2 border-black h-10 p-4 w-[10rem] md:w-[20rem]"
          onChange={(e) => setInputTodo(e.target.value)}
          placeholder="Enter task"
        ></input>
        <button
          className="p-2 text-white bg-black rounded-l-none rounded-r-md ring-1 ring-black"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-2 pt-10">
        {todolist.map((item, index) => (
          <Todo
            count={count}
            setCount={setCount}
            key={index}
            item={item}
          ></Todo>
        ))}
      </div>

      {/*mapping of todos*/}
    </div>
  );
}

export default Todolist;
