import React, { useEffect, useState } from 'react';
import "./modal.styles.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTitle: string) => void;
  currentTitle: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, currentTitle }) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  useEffect(() => {
    setNewTitle(currentTitle);
  }, [currentTitle]);

  // Handle Save
  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle);
    }
  };

  if (!isOpen) return null;
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new task title"
          />
          <div className="modal-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}
export default Modal;
