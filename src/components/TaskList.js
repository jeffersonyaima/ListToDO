import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ name: '', isComplete: false });
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(response.data);
      setFilteredTasks(response.data); // Initialize filtered tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = tasks.filter(task => task.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5007/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskForm({ name: task.name, isComplete: task.isComplete });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5007/api/tasks/${editingTask.id}`, taskForm, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEditingTask(null);
      setTaskForm({ name: '', isComplete: false });
      fetchTasks(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: name === 'isComplete' ? checked : value
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <button onClick={() => setShowForm(true)}>+</button>

      {showForm && (
        <TaskForm 
          onTaskAdded={() => {
            setShowForm(false);
            fetchTasks();
          }} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar tarea..."
        />
      </div>

      {filteredTasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.isComplete ? 'Complete' : 'Incomplete'}</td>
                <td>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Tarea no encontrada</p>
      )}

      {editingTask && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            name="name"
            value={taskForm.name}
            onChange={handleChange}
            placeholder="Task Name"
          />
          <label>
            <input
              type="checkbox"
              name="isComplete"
              checked={taskForm.isComplete}
              onChange={handleChange}
            />
            Completed
          </label>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
