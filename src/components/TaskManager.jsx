import React, { useState, useEffect } from 'react';
import Button from './Button';

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = () => {
  // Initialize state from localStorage or with empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Utility to check for similar tasks (case-insensitive)
  const isSimilarTaskExists = (tasks, newTaskText) => {
    return tasks.some(task => 
      task.text.toLowerCase().trim() === newTaskText.toLowerCase().trim()
    );
  };

  // Add a new task
  const addTask = (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return { success: false, message: 'Task cannot be empty!' };

    if (isSimilarTaskExists(tasks, trimmedText)) {
      return { success: false, message: 'This task already exists!' };
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: trimmedText,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    return { success: true };
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask, isSimilarTaskExists };
};

/**
 * TaskManager component for managing tasks
 */
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Show notification
  const showNotification = (message, type = 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addTask(newTaskText);
    if (result.success) {
      setNewTaskText('');
    } else {
      showNotification(result.message, 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

      {/* Notification */}
      {notification.show && (
        <div className={`mb-4 p-3 rounded-md ${
          notification.type === 'error' 
            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100' 
            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Task input form */}
<form onSubmit={handleSubmit} className="mb-6">
  <div className="flex gap-2">
    <textarea
      value={newTaskText}
      onChange={(e) => setNewTaskText(e.target.value)}
      placeholder="Add a new task..."
      className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
      style={{
        lineHeight: '1.5',       // Adjust line height for consistency
        maxHeight: '4em',       // Show max 2 lines (1.5em per line)
        overflowY: 'auto',      // Enable scroll when content exceeds 2 lines
        whiteSpace: 'pre-wrap', // Preserve line breaks
      }}
      rows={2}                  // Fallback for browsers that don't support maxHeight
    />
    <Button type="submit" variant="primary" className="self-start">
      Add Task
    </Button>
  </div>
</form>
          
      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter !== 'all' ? 'dark:bg-gray-700 dark:hover:bg-gray-600' : ''}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-300 text-center py-4">
            No tasks found
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <span
                  className={`${
                    task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {/* Task stats */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-300">
        <p>
          {tasks.filter((task) => !task.completed).length} tasks remaining
        </p>
      </div>
    </div>
  );
};

export default TaskManager;