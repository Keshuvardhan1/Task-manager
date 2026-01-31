# 🚀 Quick Setup Guide - Task Manager

## What You Have

A complete **Task Management Application** with:
- ✅ Beautiful, modern UI (matches your To-Do List style)
- ✅ Full backend with MongoDB database
- ✅ RESTful API
- ✅ Create, Read, Update, Delete tasks
- ✅ Filter by status
- ✅ Responsive design

---

## 📋 Step-by-Step Setup

### Step 1: Prerequisites

Install these first:

1. **Node.js** - Download from https://nodejs.org/ (get the LTS version)
2. **MongoDB** - Download from https://www.mongodb.com/try/download/community

### Step 2: Start MongoDB

**Windows:** MongoDB starts automatically after installation

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 3: Start Backend

Open Terminal/Command Prompt and run:

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

You should see:
```
Server is running on port 5000
MongoDB Connected
```

### ⚠️ Important: .env File

If you get an error about MongoDB connection being "undefined":

1. Make sure `.env` file exists in the `backend` folder
2. The file should contain:
```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   NODE_ENV=development
```
3. On Windows, enable "Show hidden files" to see the `.env` file
4. Make sure it's named exactly `.env` (not `.env.txt`)

### Step 4: Open Frontend

**Option 1: Simple (Double-click)**
- Go to the `frontend` folder
- Double-click `index.html`
- Done!

**Option 2: Using Local Server (Recommended)**

Open a NEW terminal (keep backend running):

```bash
# Install http-server globally (one time)
npm install -g http-server

# Then run:
cd frontend
http-server -p 8000
```

Then open browser: **http://localhost:8000**

---

## ✨ Using the App

1. **Add a Task**
   - Fill in Title and Description
   - Choose a Status
   - Click "Add Task"

2. **Edit a Task**
   - Click the "Edit" button on any task card
   - Form fills with task details
   - Modify and click "Update Task"

3. **Delete a Task**
   - Click "Delete" button
   - Confirm deletion

4. **Filter Tasks**
   - Click filter buttons: All, Pending, In Progress, Completed
   - List updates automatically

---

## 🎨 Design Features

Your Task Manager now has:
- 🌈 Beautiful gradient colors (purple/indigo theme)
- 💫 Smooth animations and transitions
- 📱 Mobile-friendly responsive design
- ✨ Modern card-based layout
- 🎯 Consistent with your To-Do List style
- 💅 Professional Inter font

---

## 🐛 Troubleshooting

**Backend won't start?**
- Make sure MongoDB is running
- Check if port 5000 is available
- Try: `npm install` again

**Frontend not loading tasks?**
- Make sure backend is running (check terminal)
- Open browser console (F12) to see errors
- Check that you're accessing from correct URL

**MongoDB errors?**
- Start MongoDB service
- Check connection string in `backend/.env`

---

## 📁 Project Structure

```
task-manager/
├── backend/               # Server code
│   ├── config/           # Database config
│   ├── controllers/      # Business logic
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   ├── package.json      # Dependencies
│   └── server.js         # Main server file
│
├── frontend/             # Client code
│   ├── index.html        # Main page
│   ├── style.css         # Unified design
│   └── script.js         # Frontend logic
│
├── README.md             # Full documentation
└── API_DOCUMENTATION.md  # API reference
```

---

## 🎯 Next Steps

1. ✅ **Test it thoroughly** - Add, edit, delete tasks
2. ✅ **Customize colors** - Edit `:root` variables in `style.css`
3. ✅ **Upload to GitHub** - Share your code
4. ✅ **Deploy online** - Use Railway, Render, or Heroku
5. ✅ **Add features** - Search, categories, due dates, etc.

---

## 💡 Quick Commands Reference

**Start Backend:**
```bash
cd backend && npm start
```

**Start Frontend Server:**
```bash
cd frontend && python -m http.server 8000
```

**Access App:**
- Direct: Open `frontend/index.html`
- Server: http://localhost:8000

**API Base URL:**
- http://localhost:5000/api/tasks

---

## 🆘 Need Help?

- Check the full `README.md` for detailed info
- See `API_DOCUMENTATION.md` for API details
- Look at browser console (F12) for errors
- Check terminal for backend errors

---

**You're all set! Start the backend, open the frontend, and you're ready to manage tasks! 🎉**
