import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

export default function TodoList() {
  let [todos, settodos] = useState("");

  let [newTodo, setnewTodo] = useState("");

  let addNewTask = () => {
    if(newTodo.trim() !== ""){
      settodos((prevTodos) => {
        return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
      });
      setnewTodo("");
    }
    
  };

  let updateTodoValue = (event) => {
    setnewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    settodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
  };

  let UpperCaseAll = () => {
    settodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      })
    );
  };

  let UpperCaseOne = (id) => {
    settodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAsDone = (id) => {
    settodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let MarkAllASDone = () => {
    settodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  

  return (
    <div>
      <input className="input"
        placeholder="Add a task"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br />
      <br />
      <button onClick={addNewTask} >Add Task</button>
      <br />
      <br />
      <br />
      <br />
      {todos.length > 0 && (

      
      <div className="Main">
        <hr />
        <h4>Todo List</h4>
        <ul>

          {todos.map((todo,index) => (
              <div key={todo.id}>

              <li key={todo.id}>

                <span  style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
                  {todo.task}
                </span>{" "}

                &nbsp;&nbsp;&nbsp;

                <button onClick={() => deleteTodo(todo.id)}>Delete</button>{" "}

                &nbsp;&nbsp;&nbsp;

                <button onClick={() => UpperCaseOne(todo.id)}>
                  UpperCase One
                </button>{" "}
                
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => markAsDone(todo.id)}>
                  <FontAwesomeIcon icon={faCircleCheck} style={{ color: todo.isDone ? "green" : "" }} />
                </button>

                {/* {<button onClick={() => markAsDone(todo.id)}>Mark As Done</button>} */}
              
              </li>
              {index < todos.length - 1 && <br></br>} {/* Add <hr /> except after the last item */}
              </div>
            ))}

          </ul>
          <br />
          <button onClick={UpperCaseAll}>Upper Case</button> &nbsp;&nbsp;&nbsp;
          <button onClick={MarkAllASDone}>          
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: todos.some((todo) => todo.isDone) ? "green" : "" }}/>
          </button>
        </div>
      )}
    </div>

  );
}
