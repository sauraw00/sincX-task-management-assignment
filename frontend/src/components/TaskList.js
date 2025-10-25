import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'InProgress':
        return 'status-inprogress';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'Completed') return false;
    return new Date(dueDate) < new Date();
  };

  if (tasks.length === 0) {
    return (
      <div className="task-card">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '16px', fontWeight: '500' }}>
          No tasks found. Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="task-card">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <span className={`task-status ${getStatusClass(task.status)}`}>
              {task.status}
            </span>
          </div>
          
          <div className="task-meta">
            <div>
              <strong>Assigned to:</strong> {task.assignedTo.map(assignee => assignee.userName).join(', ')}
            </div>
            <div style={{ color: isOverdue(task.dueDate, task.status) ? 'var(--accent-danger)' : 'var(--text-secondary)' }}>
              <strong>Due:</strong> {formatDate(task.dueDate)}
              {isOverdue(task.dueDate, task.status) && ' (Overdue)'}
            </div>
            <div>
              <strong>Created by:</strong> {task.createdBy?.name || 'Unknown'}
            </div>
            <div>
              <strong>Created:</strong> {formatDate(task.createdAt)}
            </div>
          </div>
          
          <div className="task-description">
            {task.description}
          </div>
          
          {task.createdBy?._id === user?.id && (
            <div className="task-actions">
              <button 
                className="btn btn-sm btn-success"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
