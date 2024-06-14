import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [sections, setSections] = useState({
    "Recently assigned": [
      { name: "Schedule kickoff meeting", startDate: new Date(), endDate: new Date(), project: "Cross-functional project", completed: false, priority: "Medium" },
      { name: "Draft project brief", startDate: new Date(), endDate: new Date(), project: "Cross-functional project", completed: false, priority: "Medium" }
    ],
    "Do today": [],
    "Do next week": [],
    "Do later": []
  });

  const addTask = (sectionTitle) => {
    const newTask = { name: "New Task", startDate: new Date(), endDate: new Date(), project: "Set a project", completed: false, priority: "Medium" };
    setSections((prevSections) => ({
      ...prevSections,
      [sectionTitle]: [...prevSections[sectionTitle], newTask]
    }));
  };

  const toggleTaskCompletion = (sectionTitle, index) => {
    setSections((prevSections) => {
      const newTasks = prevSections[sectionTitle].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );
      return { ...prevSections, [sectionTitle]: newTasks };
    });
  };

  const updateTaskField = (sectionTitle, index, field, value) => {
    setSections((prevSections) => {
      const newTasks = prevSections[sectionTitle].map((task, i) =>
        i === index ? { ...task, [field]: value } : task
      );
      return { ...prevSections, [sectionTitle]: newTasks };
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="user-initials">BP</div>
        <div className="header-text">My List</div>
      </header>
      <div className="main-content">
        <button className="add-task-button" onClick={() => addTask("Recently assigned")}>+ Add task</button>
        {Object.keys(sections).map((sectionTitle) => (
          <TaskSection
            key={sectionTitle}
            title={sectionTitle}
            tasks={sections[sectionTitle]}
            addTask={addTask}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTaskField={updateTaskField}
          />
        ))}
        <button className="add-section-button">+ Add section</button>
      </div>
    </div>
  );
}

function TaskSection({ title, tasks, addTask, toggleTaskCompletion, updateTaskField }) {
  return (
    <div className="task-section">
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onToggle={() => toggleTaskCompletion(title, index)}
          onUpdate={(field, value) => updateTaskField(title, index, field, value)}
        />
      ))}
      <div className="add-task" onClick={() => addTask(title)}>Add task...</div>
    </div>
  );
}

function TaskItem({ task, onToggle, onUpdate }) {
  const priorityClass = {
    Low: 'priority-low',
    Medium: 'priority-medium',
    High: 'priority-high'
  }[task.priority];

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      <input
        type="text"
        className="task-name"
        value={task.name}
        onChange={(e) => onUpdate('name', e.target.value)}
      />
      <DatePicker
        selected={task.startDate}
        onChange={(date) => onUpdate('startDate', date)}
        dateFormat="MM/dd/yyyy"
        className="task-date-picker"
      />
      <DatePicker
        selected={task.endDate}
        onChange={(date) => onUpdate('endDate', date)}
        dateFormat="MM/dd/yyyy"
        className="task-date-picker"
      />
      <input
        type="text"
        className="task-project"
        value={task.project}
        onChange={(e) => onUpdate('project', e.target.value)}
      />
      <select
        className={`task-priority ${priorityClass}`}
        value={task.priority}
        onChange={(e) => onUpdate('priority', e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}

export default App;
