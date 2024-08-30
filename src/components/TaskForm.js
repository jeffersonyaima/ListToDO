import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded, onCancel }) => {
  const [name, setName] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5007/api/tasks', {
        name,
        isComplete
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Call the parent component's callback to refresh the task list
      if (onTaskAdded) {
        onTaskAdded();
      }

      // Clear the form fields
      setName('');
      setIsComplete(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Agregar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            Completada
          </label>
        </div>
        <button type="submit">Agregar Tarea</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default TaskForm;
