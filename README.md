# 📝 Task Management Web Application

**Created by:** Keshuvardhan Vuddanti  
**Purpose:** Full-stack task management application for organizing daily tasks  
**Tech Stack:** Node.js, Express, MongoDB, HTML, CSS, JavaScript
**GitHub:** [github.com/Keshuvardhan1](https://github.com/Keshuvardhan1)  
**Live Demo:** [Task Manager](https://keshuvardhantaskmanager.netlify.app/)

A full-stack task management application built with Node.js, Express, MongoDB, and vanilla JavaScript. Create, view, update, and delete tasks with a clean, responsive interface.

![Task Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 🌟 Features

### Core Features
- ✅ **Create Tasks** - Add new tasks with title, description, and status
- 📖 **View Tasks** - Display all tasks in a responsive card layout
- ✏️ **Update Tasks** - Edit existing task details
- 🗑️ **Delete Tasks** - Remove tasks with confirmation
- 🔍 **Filter Tasks** - Filter by status (All, Pending, In Progress, Completed)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Technical Features
- RESTful API with proper HTTP methods
- MongoDB database for persistent storage
- Input validation on both frontend and backend
- Error handling and user notifications
- Clean, modern UI with smooth animations
- XSS protection with HTML escaping

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **JavaScript (ES6+)** - Client-side logic
- **Fetch API** - HTTP requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- npm (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Keshuvardhan1/task-manager.git
cd task-manager
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
# Update MongoDB connection string if needed
```

**.env Configuration:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Start the Backend Server

```bash
# From the backend directory
npm start

# For development with auto-reload
npm run dev
```

The server will start on `http://localhost:5000`

### 5. Start the Frontend

Open `frontend/index.html` in your web browser, or use a local server:

**Using Python:**
```bash
# Navigate to frontend directory
cd ../frontend

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
# Install http-server globally (if not installed)
npm install -g http-server

# Navigate to frontend directory
cd frontend

# Start server
http-server -p 8000
```

Access the application at `http://localhost:8000`

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   └── taskController.js   # Task CRUD operations
│   ├── models/
│   │   └── Task.js             # Task schema
│   ├── routes/
│   │   └── tasks.js            # API routes
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server setup
│
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── style.css               # Styles
│   └── script.js               # Client-side JavaScript
│
└── README.md                   # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Get all tasks | - |
| GET | `/?status=pending` | Get filtered tasks | - |
| GET | `/:id` | Get single task | - |
| POST | `/` | Create new task | `{title, description, status}` |
| PUT | `/:id` | Update task | `{title, description, status}` |
| DELETE | `/:id` | Delete task | - |

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "createdAt": "2025-01-31T10:30:00.000Z",
    "updatedAt": "2025-01-31T10:30:00.000Z"
  }
}
```

## 💾 Database Schema

### Task Model

```javascript
{
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Features Walkthrough

### Adding a Task
1. Fill in the task title and description
2. Select a status (optional, defaults to "Pending")
3. Click "Add Task"
4. Task appears in the list immediately

### Editing a Task
1. Click the "Edit" button on any task card
2. Form at the top populates with task details
3. Modify the fields as needed
4. Click "Update Task" to save changes
5. Click "Cancel" to discard changes

### Deleting a Task
1. Click the "Delete" button on any task card
2. Confirm the deletion in the popup
3. Task is removed from the list

### Filtering Tasks
1. Click any filter button (All, Pending, In Progress, Completed)
2. Task list updates to show only matching tasks

## 🔧 Configuration

### Changing the Port

**Backend:**
Edit `backend/.env`:
```env
PORT=3000  # Change to your preferred port
```

**Frontend:**
Edit `frontend/script.js`:
```javascript
const API_URL = 'http://localhost:3000/api/tasks';
```

### Using MongoDB Atlas (Cloud Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

## 🧪 Testing

### Testing the API with cURL

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing the API","status":"pending"}'
```

**Update a task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/<task-id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description","status":"completed"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/<task-id>
```

### Testing with Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:5000/api/tasks`
3. Test each CRUD operation
4. Verify responses and status codes

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`
- Check `.env` file configuration

### Frontend can't connect to backend
- Verify backend is running on correct port
- Check browser console for errors
- Ensure CORS is enabled (already configured)
- Verify API_URL in `script.js` matches backend URL

### Database connection errors
- Ensure MongoDB service is running
- Check MongoDB connection string in `.env`
- Verify database permissions
- Try connecting with MongoDB Compass

### Tasks not displaying
- Open browser DevTools (F12) and check Console
- Verify backend is returning data: `curl http://localhost:5000/api/tasks`
- Check Network tab for failed requests

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [REST API Best Practices](https://restfulapi.net/)

## 🚀 Future Enhancements

Potential features to add:
- [ ] User authentication and authorization
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Search functionality
- [ ] Drag-and-drop task reordering
- [ ] Export tasks to CSV/PDF
- [ ] Dark mode toggle
- [ ] Task attachments
- [ ] Collaborative features (task sharing)

## 📝 License

ISC

## 👤 Author

Keshuvardhan Vuddanti

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Task Managing! 📝✨**
