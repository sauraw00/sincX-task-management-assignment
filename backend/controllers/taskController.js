const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const { status, sort, search, view } = req.query;
    let query = {};

    console.log('View:', view, 'User ID:', req.user._id);

    if (view === 'assigned') {
      query = { 'assignedTo.userId': req.user._id };
    } else {
      query = { createdBy: req.user._id };
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'assignedTo.userName': { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = {};
    if (sort === 'dueDate') {
      sortOption = { dueDate: 1 };
    } else if (sort === 'createdAt') {
      sortOption = { createdAt: -1 };
    }

    console.log('Query:', JSON.stringify(query, null, 2));

    const tasks = await Task.find(query).populate('createdBy', 'name email').sort(sortOption);
    console.log('Found tasks:', tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
      return res.status(400).json({ message: 'Please select at least one assignee' });
    }

    const task = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      createdBy: req.user._id
    });

    await task.save();
    const populatedTask = await Task.findById(task._id).populate('createdBy', 'name email');
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, dueDate } = req.body;

    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) {
      if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
        return res.status(400).json({ message: 'Please select at least one assignee' });
      }
      task.assignedTo = assignedTo;
    }
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;

    await task.save();
    const populatedTask = await Task.findById(task._id).populate('createdBy', 'name email');
    res.json(populatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
