import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";

function Todo({ item, count, setCount }) {
  const handleMarkAsDone = (id) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then((result) => {
        setCount((prev) => prev + 1);
        console.log("pressed");
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then((result) => {
        setCount((prev) => prev + 1);
        console.log("deleted");
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center bg-black w-[10rem] md:w-[23rem] justify-between p-2 rounded-md">
      <div className="flex items-center gap-3">
        {item.done ? (
          <BsFillCheckCircleFill className="text-white"></BsFillCheckCircleFill>
        ) : (
          <BsCircleFill
            className="text-white"
            onClick={() => {
              handleMarkAsDone(item._id);
            }}
          />
        )}
        <h1 className={`text-white ${item.done ? "line-through" : ""}`}>
          {item.task}
        </h1>
      </div>

      <BsFillTrashFill className="text-white" onClick={()=>{handleDelete(item._id)}}/>
    </div>
  );
}

export default Todo;
