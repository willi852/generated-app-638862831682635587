import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/todos';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !completed
      });
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;