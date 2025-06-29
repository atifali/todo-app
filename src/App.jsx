import { useState, useEffect } from "react";
import Header from "./components/Header";
import Actions from "./components/Actions";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  const [todosId, setTodosId] = useState("");
  const [todos, setTodos] = useState([]);

  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  useEffect(() => {
    const currentPathName = window.location.pathname;
    if (currentPathName != '/') {
      const todosId = currentPathName.slice(1);
      console.log("fetching now...");
      fetch(apiEndpoint + '/api/todos?id=' + todosId)
        .then(response => response.json())
        .then(data => {
          setTodos(data.todos);
          setTodosId(todosId);
        })
        .catch(error => console.error('Error fetching data:', error));
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-r from-purple-600 to-emerald-400 p-16" >
      <div className="bg-white shadow-lg rounded-3xl p-16 my-16 mx-96">
        <Header />
        {todos.length != 0 && <Actions todosId={todosId} setTodosId={setTodosId} todos={todos} setTodos={setTodos} />}
        <TodoAdd todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div >
  )
}

export default App
