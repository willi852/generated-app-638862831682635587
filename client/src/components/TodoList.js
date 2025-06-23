import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="no-todos">No todos yet. Add one above!</li>
      ) : (
        todos.map(todo => (
          <TodoItem 
            key={todo._id} 
            todo={todo} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
          />
        ))
      )}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default TodoList;