import React from 'react';

const TaskFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: '',
      sort: '',
      search: '',
      view: 'my'
    });
  };

  return (
    <div className="filters">
      <h3 style={{ 
        color: 'var(--text-primary)', 
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: '600'
      }}>
        Filters & Search
      </h3>
      <div className="filters-row">
        <div className="form-group">
          <label>View</label>
          <select
            value={filters.view}
            onChange={(e) => handleFilterChange('view', e.target.value)}
          >
            <option value="my">My Tasks (Created by me)</option>
            <option value="assigned">Assigned to me</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Search by Title or Assignee</label>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Filter by Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Sort by</label>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="">Default</option>
            <option value="dueDate">Due Date (Earliest First)</option>
            <option value="createdAt">Created Date (Newest First)</option>
          </select>
        </div>
        
        <div className="form-group">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
