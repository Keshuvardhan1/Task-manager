const API_URL = "https://task-manager-backend-k6f5.onrender.com/api/tasks";

let currentFilter = "all";
let editingTaskId = null;

const taskForm = document.getElementById("taskForm");
const editTaskForm = document.getElementById("editTaskForm");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");
const editModal = document.getElementById("editModal");
const closeModal = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const submitBtnText = document.getElementById("submitBtnText");

document.addEventListener("DOMContentLoaded", loadTasks);
taskForm.addEventListener("submit", handleTaskSubmit);
editTaskForm.addEventListener("submit", handleEditSubmit);
filterButtons.forEach((btn) =>
  btn.addEventListener("click", handleFilterClick),
);
closeModal.addEventListener("click", () => (editModal.style.display = "none"));
cancelBtn.addEventListener("click", cancelEdit);

window.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
});

async function loadTasks() {
  try {
    taskList.innerHTML = '<div class="loading">Loading tasks...</div>';

    const url =
      currentFilter === "all" ? API_URL : `${API_URL}?status=${currentFilter}`;

    const response = await fetch(url);
    const result = await response.json();

    if (result.success) {
      displayTasks(result.data);
    } else {
      throw new Error("Failed to load tasks");
    }
  } catch (error) {
    console.error("Error:", error);
    taskList.innerHTML =
      '<div class="empty-state">❌ Failed to load tasks. Make sure the backend is running!</div>';
  }
}

function displayTasks(tasks) {
  if (tasks.length === 0) {
    taskList.innerHTML =
      '<div class="empty-state">📭 No tasks found. Add your first task!</div>';
    return;
  }

  taskList.innerHTML = tasks
    .map(
      (task) => `
        <div class="task-card">
            <h3>${escapeHtml(task.title)}</h3>
            <p>${escapeHtml(task.description)}</p>
            <span class="task-status ${task.status}">${formatStatus(task.status)}</span>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask('${task._id}')">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">🗑️ Delete</button>
            </div>
            <div class="task-date">Created: ${formatDate(task.createdAt)}</div>
        </div>
    `,
    )
    .join("");
}

async function handleTaskSubmit(e) {
  e.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    status: document.getElementById("status").value,
  };

  try {
    if (editingTaskId) {
      const response = await fetch(`${API_URL}/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showNotification("Task updated successfully!", "success");
        cancelEdit();
      } else {
        throw new Error(result.error);
      }
    } else {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showNotification("Task added successfully!", "success");
        taskForm.reset();
      } else {
        throw new Error(result.error);
      }
    }

    loadTasks();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to save task: " + error.message, "error");
  }
}

async function editTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();

    if (result.success) {
      const task = result.data;

      document.getElementById("title").value = task.title;
      document.getElementById("description").value = task.description;
      document.getElementById("status").value = task.status;

      editingTaskId = id;
      submitBtnText.textContent = "Update Task";
      cancelBtn.style.display = "inline-block";

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      throw new Error("Failed to fetch task");
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to load task for editing", "error");
  }
}

function cancelEdit() {
  editingTaskId = null;
  taskForm.reset();
  submitBtnText.textContent = "Add Task";
  cancelBtn.style.display = "none";
}

async function handleEditSubmit(e) {
  e.preventDefault();

  const formData = {
    title: document.getElementById("editTitle").value,
    description: document.getElementById("editDescription").value,
    status: document.getElementById("editStatus").value,
  };

  try {
    const response = await fetch(`${API_URL}/${editingTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      showNotification("Task updated successfully!", "success");
      editModal.style.display = "none";
      loadTasks();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to update task: " + error.message, "error");
  }
}

async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      showNotification("Task deleted successfully!", "success");
      loadTasks();
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to delete task", "error");
  }
}

function handleFilterClick(e) {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");
  currentFilter = e.target.dataset.filter;
  loadTasks();
}

function formatStatus(status) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === "success" ? "#4CAF50" : "#f44336"};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
