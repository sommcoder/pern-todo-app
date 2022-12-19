import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListToDo = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      console.log(deleteTodo);

      setTodos(todos.filter((todo) => todo.todo_id !== id)); // state
    } catch (err) {
      console.error("error:", err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData); // state
    } catch (err) {
      console.error("error:", err.message);
    }
  };

  // initilizes the component by pulling the jsonData from our database
  useEffect(() => {
    getTodos();
  }, []); // the [] makes useEffect only work ONCE per render

  console.log(todos);
  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*  <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListToDo;
