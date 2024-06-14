import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Create({ title }) {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [priority, setPriority] = useState('');
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleTaskNameChange = (e) => {
      setNewTaskName(e.target.value);
    };
  
    const handlePriorityChange = (e) => {
      setPriority(e.target.value);
    };
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    const toggleDatePicker = () => {
      setShowDatePicker(!showDatePicker);
    };
  
    const handleAddTask = () => {
      if (newTaskName && priority  && startDate && endDate) {
        const newTask = {
          id: Math.random().toString(36).substr(2, 9),
          name: newTaskName,
          priority: priority,
          startDate: startDate,
          endDate: endDate,
        };
  
        setTasks([...tasks, newTask]);
  
        setNewTaskName('');
        setPriority('');
        setStartDate(null);
        setEndDate(null);
        setShowTaskInput(false);
      } else {
        alert('Please enter task name, priority, start date, and end date.');
      }
    };
  
    const getPriorityClass = (taskPriority) => {
      switch (taskPriority) {
        case 'low':
          return 'badge low-priority';
        case 'medium':
          return 'badge medium-priority';
        case 'high':
          return 'badge high-priority';
        default:
          return 'badge';
      }
    };
  
  
    return (
      <>
          <div className="card">
            <div className="card-heading">
              <div className="heading">
                <h3>{title} ({tasks.length})</h3>
              </div>
              <div className="card-icon" onClick={() => setShowTaskInput(true)}>
                <img src="/add.png" alt="add" />
              </div>
            </div>
            {showTaskInput && (
              <div className="selectors">
                <div className="task-input">
                  <input
                    type="text"
                    placeholder="Enter task name"
                    value={newTaskName}
                    onChange={handleTaskNameChange}
                  />
                </div>
                <div className="task-options">
                  <h4>Select Priority:</h4>
                  <select value={priority} onChange={handlePriorityChange}>
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select> 
                  <div className="date-picker">
                    <h4>Duration:</h4>
                    {showDatePicker ? (
    <>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        dateFormat="dd/MM/yyyy"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        dateFormat="dd/MM/yyyy"
      />
    </>
  ) : (
    <img
      src="/calender.jpeg"
      alt="calendar"
      className="calendar-icon"
      onClick={toggleDatePicker}
    />
  )}
  
                  </div>
                  <button onClick={handleAddTask}>Add Task</button>
                </div>
              </div>
            )}
            {tasks.length > 0 && (
              <div className="task">
                {tasks.map((task) => (
                  <div className="add-task-card" key={task.id}>
                    <div className="task-card-name">
                      <img src="/check.png" alt="check" />
                      <p>{task.name}</p>
                    </div>
                    <div className="status">
                      <div className="sub-container">
                      <div className={`badge ${getPriorityClass(task.priority)}`}>{task.priority}</div>
                      </div>
                      
                      {task.startDate && task.endDate && (
                        <div className="duration">
                          Duration: {`${task.startDate.toLocaleDateString()} - ${task.endDate.toLocaleDateString()}`}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tasks.length === 0 && !showTaskInput && (
              <div className="task">
                <div className="add-task-card">
                  <div className="task-card-name">
                    <p>No tasks added yet.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
      </>
    );
  }
  
