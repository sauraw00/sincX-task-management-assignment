import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: [],
    dueDate: '',
    status: 'Pending'
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo || [],
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        status: task.status || 'Pending'
      });
    }
  }, [task]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserSelect = (userId, userName, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        assignedTo: [...formData.assignedTo, { userId, userName }]
      });
    } else {
      setFormData({
        ...formData,
        assignedTo: formData.assignedTo.filter(user => user.userId !== userId)
      });
    }
  };

  const isUserSelected = (userId) => {
    return formData.assignedTo.some(user => user.userId === userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.assignedTo.length === 0) {
      alert('Please select at least one assignee');
      return;
    }
    onSubmit(task?._id, formData);
  };

  return (
    <div className="task-card">
      <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <div className="assigned-to-container">
            {users.map(user => (
              <div key={user._id} className="user-checkbox-item">
                <input
                  type="checkbox"
                  id={`user-${user._id}`}
                  checked={isUserSelected(user._id)}
                  onChange={(e) => handleUserSelect(user._id, user.name, e.target.checked)}
                  className="user-checkbox"
                />
                <label htmlFor={`user-${user._id}`} className="user-label">
                  {user.name} ({user.email})
                </label>
              </div>
            ))}
          </div>
          {formData.assignedTo.length > 0 && (
            <div className="selected-users">
              Selected: {formData.assignedTo.map(user => user.userName).join(', ')}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        {task && (
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary">
            {task ? 'Update Task' : 'Create Task'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
