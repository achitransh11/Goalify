// import React, { useState, useEffect } from 'react';
// import Modal from '../modal/Modal';
// import { v4 as uuidv4 } from 'uuid';
// import './view.styles.css';

// interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
// }

// const View = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [taskTitle, setTaskTitle] = useState<string>('');
//   const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
//   const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>('');
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const userEmail = localStorage.getItem('userEmail');

//   // Fetch tasks for the logged-in user
//   useEffect(() => {
//     if (userEmail) {
//       const users = JSON.parse(localStorage.getItem('users') || '{}');
      
//       if (users[userEmail]) {
//         const userTasks = users[userEmail].tasks || [];
//         setTasks(userTasks);
//       } else {
//         setError('No tasks found for this user.');
//       }
//     }
//   }, [userEmail]);

//   // Save tasks to localStorage whenever tasks change
//   useEffect(() => {
//     if (userEmail) {
//       const users = JSON.parse(localStorage.getItem('users') || '{}');
      
//       if (users[userEmail]) {
//         users[userEmail].tasks = tasks;  // Update tasks for this user
//         localStorage.setItem('users', JSON.stringify(users)); // Save updated users object
//       }
//     }
//   }, [tasks, userEmail]);

//   const handleAddTask = () => {
//     if (taskTitle.trim() === '') {
//       setError('Task title cannot be empty.');
//       setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
//       return;
//     }

//     const newTask: Task = {
//       id: uuidv4(),
//       title: taskTitle,
//       completed: false,
//     };

//     setTasks([...tasks, newTask]);
//     setTaskTitle('');
//   };

//   const toggleTaskCompletion = (id: string) => {
//     const updatedTasks = tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };

//   const handleEditTask = (id: string, newTitle: string) => {
//     const updatedTasks = tasks.map(task =>
//       task.id === id ? { ...task, title: newTitle } : task
//     );
//     setTasks(updatedTasks);
//     setIsModalOpen(false);
//   };

//   const handleDeleteTask = (id: string) => {
//     const updatedTasks = tasks.filter(task => task.id !== id);
//     setTasks(updatedTasks);
//   };

//   const openEditModal = (id: string, title: string) => {
//     setSelectedTaskId(id);
//     setSelectedTaskTitle(title);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!userEmail) {
//     return <div>Please log in to see your tasks.</div>;
//   }

//   return (
//     <div className="task-list-container">
//       <h2>Your Tasks</h2>

//       <div className="task-input-section">
//         <input
//           type="text"
//           value={taskTitle}
//           onChange={(e) => setTaskTitle(e.target.value)}
//           placeholder="Enter task title"
//         />
//         <button onClick={handleAddTask}>Add Task</button>
//       </div>

//       {error && <div className="error-message">{error}</div>}

//       <ul className="view-list">
//         {tasks.map(task => (
//           <li key={task.id} className={task.completed ? 'completed' : ''}>
//             <span>{task.title}</span>
//             <div>
//               <button className="completed" onClick={() => toggleTaskCompletion(task.id)}>
//                 {task.completed ? 'Unmark' : 'Mark as Completed'}
//               </button>
//               <button className="edit" onClick={() => openEditModal(task.id, task.title)}>
//                 Edit
//               </button>
//               <button className="delete" onClick={() => handleDeleteTask(task.id)}>
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSave={(newTitle) => handleEditTask(selectedTaskId!, newTitle)}
//         currentTitle={selectedTaskTitle}
//       />
//     </div>
//   );
// };

// export default View;


import React, { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import './view.styles.css';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const View = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[userEmail]) {
        const userTasks = users[userEmail].tasks || [];
        setTasks(userTasks);
      } else {
        setError('No tasks found for this user.');
      }
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail && tasks.length > 0) {
      // Fetch the current users object from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      
      // If user exists, update their tasks, otherwise initialize the user
      if (users[userEmail]) {
        users[userEmail].tasks = tasks; // Update tasks for the logged-in user
      } else {
        users[userEmail] = { password: '', tasks }; // Initialize user with tasks
      }

      // Save the updated users object back to localStorage
      localStorage.setItem('users', JSON.stringify(users));

    }
  }, [tasks, userEmail]); // Only run when tasks change or userEmail is set

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      setError('Task title cannot be empty.');
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: taskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle('');
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (id: string, newTitle: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const openEditModal = (id: string, title: string) => {
    setSelectedTaskId(id);
    setSelectedTaskTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!userEmail) {
    return <div>Please log in to see your tasks.</div>;
  }

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>

      <div className="task-input-section">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <ul className="view-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.title}</span>
            <div>
              <button className="completed" onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Unmark' : 'Mark as Completed'}
              </button>
              <button className="edit" onClick={() => openEditModal(task.id, task.title)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={(newTitle: string) => handleEditTask(selectedTaskId!, newTitle)}
        currentTitle={selectedTaskTitle}
      />
    </div>
  );
};

export default View;

