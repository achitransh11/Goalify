import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskCompletion: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const userEmail = localStorage.getItem('userEmail');
  const tasksKey = userEmail ? `tasks_${userEmail}` : '';  // Key for storing tasks

  // Fetch tasks from localStorage on initial render
  useEffect(() => {
    if (userEmail && tasksKey) {
      const storedTasks = localStorage.getItem(tasksKey);
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);

        // Ensure each task has a unique id, even if it was missing in localStorage
        const tasksWithUniqueIds = parsedTasks.map((task) => ({
          ...task,
          id: task.id || uuidv4(),
        }));

        setTasks(tasksWithUniqueIds);
      } else {
        console.log(`No tasks found for user: ${userEmail}`);
      }
    }
  }, [userEmail, tasksKey]);

  // Store tasks in localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 && tasksKey) {
      localStorage.setItem(tasksKey, JSON.stringify(tasks));  // Save tasks for this user

      // Optionally, update the user's object with tasks (if needed)
      if (userEmail) {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[userEmail]) {
          users[userEmail].tasks = tasks;
        } else {
          // If the user doesn't exist, initialize it
          users[userEmail] = { password: '', tasks };
        }
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }, [tasks, tasksKey, userEmail]);

  const addTask = (title: string) => {
    if (title.trim() === '') {
      setError('Task title cannot be empty.');
      return;
    }
    const newTask: Task = { id: uuidv4(), title, completed: false };
    setTasks([...tasks, newTask]);
    setError(null);
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (id: string, newTitle: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const contextValue = useMemo(
    () => ({ tasks, addTask, toggleTaskCompletion, editTask, deleteTask, error, setError }),
    [tasks, error]  // Only recalculate when tasks or error change
  );

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
