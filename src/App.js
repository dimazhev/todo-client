import React, { useEffect, useState } from 'react';
import todoApi from './api/todoApi';
import './App.css';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';

function App() {
  // useState is a hook that helps you manage the state (i.e. the values in the component).
  // useState returns two things 1. the data, 2. a function to update the data
  // in this case the state is the `todos` and the way  to update the state is using `setTodos`
  const [todos, setTodos] = useState([])

  // useEffect is called when the component is being `mounted`
  useEffect(() => {
    // load the todos from the server
    const data = todoApi.getAll();
    // update the state of the component -> will cause the componet to redraw themselves
    setTodos(data);
  }, []);

  const addTodo = name => {
    const newTodo = {
      name, // same as writing `name: name`
      description: "N/A",
      isCompleted: false
    }
    // Call todoApi.add to update the todos
    todoApi.add(newTodo);

    // Get the latest todos and update the state;
    // The reason we use the ... operator is to copy the data over
    // so that react can "notice" there was a change
    setTodos([...todoApi.getAll()]);
  };

  // TODO: Alex L - try to redo the logic using todoApi
  const completeTodo = index => {
    const currentTodos = [...todoApi.getAll()];
    const todoToUpdate = currentTodos[index];
    todoApi.updateByID(todoToUpdate.id, { isCompleted: true })
    setTodos([...todoApi.getAll()]);
  };

  const uncompleteTodo = index => {
    // Left as exercise
  }

  const removeTodo = index => {
    const currentTodos = [...todoApi.getAll()];
    const todoToDelete = currentTodos[index];
    todoApi.deleteByID(todoToDelete.id);
    setTodos([...todoApi.getAll()]);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            uncompleteTodo={uncompleteTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}


export default App;
