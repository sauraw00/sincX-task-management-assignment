# Employee Task Tracking System

A full-stack web application for managing employee tasks, built with React frontend and Node.js/Express backend with MongoDB database.

## Features

### Core Requirements ✅
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Task Management**: Each task includes title, description, assigned employee, status, and due date
- **Status Tracking**: Pending, In Progress, Completed
- **Filtering**: Filter tasks by status
- **Sorting**: Sort tasks by due date

### Bonus Features ✅
- **Search Functionality**: Search tasks by title or assignee
- **Authentication**: User registration and login system
- **State Management**: React Context for global state
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Dynamic task list updates

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with responsive design

## Project Structure

```
task-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config.env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js
│   │   │   ├── Register.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── TaskFilters.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Update `config.env` file with your MongoDB connection string
   - Change JWT_SECRET to a secure random string

4. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Ensure your connection string is correct

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Full Application Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. **Setup both backend and frontend** (follow steps above)

3. **Access the application**
   - Open `http://localhost:3000` in your browser
   - Register a new account or login with existing credentials

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | `{name, email, password}` |
| POST | `/login` | Login user | `{email, password}` |
| GET | `/me` | Get current user | Headers: `Authorization: Bearer <token>` |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Body | Query Parameters |
|--------|----------|-------------|------|------------------|
| GET | `/` | Get all tasks | - | `status`, `sort`, `search` |
| GET | `/id` | Get single task | - | - |
| POST | `/` | Create new task | `{title, description, assignedTo, dueDate}` | - |
| PUT | `/id` | Update task | `{title, description, assignedTo, status, dueDate}` | - |
| DELETE | `/id` | Delete task | - | - |

### Query Parameters for GET /api/tasks

- `status`: Filter by status (`Pending`, `InProgress`, `Completed`)
- `sort`: Sort by field (`dueDate`, `createdAt`)
- `search`: Search in title and assignee fields

### Example API Usage

**Create a new task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the new feature",
    "assignedTo": "john.doe@company.com",
    "dueDate": "2024-01-15"
  }'
```

**Get filtered tasks:**
```bash
curl "http://localhost:5000/api/tasks?status=Pending&sort=dueDate&search=documentation" \
  -H "Authorization: Bearer <your-token>"
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  assignedTo: String,
  status: String (enum: ['Pending', 'InProgress', 'Completed']),
  dueDate: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Implementation

### Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- User session management

### Task Management
- Full CRUD operations
- Status tracking with visual indicators
- Due date management with overdue detection
- User-specific task isolation

### Search & Filtering
- Real-time search across title and assignee
- Status-based filtering
- Multiple sorting options
- Combined filter functionality

### User Experience
- Responsive design for all devices
- Loading states and error handling
- Form validation
- Intuitive navigation

## Development Notes

- All API responses follow consistent JSON format
- Error handling implemented throughout the application
- Clean separation of concerns between frontend and backend
- RESTful API design principles followed
- Modern React patterns with hooks and context

## Production Deployment

For production deployment:

1. Set up environment variables properly
2. Use a production MongoDB instance
3. Configure CORS for your domain
4. Use HTTPS for security
5. Set up proper logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of the SincX assignment.
