import React, { useState } from 'react';

const AddTaskButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState('');

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    // Logic to save the task can be added here
    console.log(`Task Name: ${taskName}, Task Duration: ${taskDuration}`);
    setIsModalOpen(false);
    setTaskName('');
    setTaskDuration('');
  };

  return (
    <div>
      <button className="add-task-button" onClick={handleAddTaskClick}>
        + Add task
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <label>
              Task Name:
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </label>
            <label>
              Task Duration:
              <input
                type="text"
                value={taskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
              />
            </label>
            <button onClick={handleSaveTask}>Save Task</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskButton;
