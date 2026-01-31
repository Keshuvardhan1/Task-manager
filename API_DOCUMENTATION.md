# Task Manager API Documentation

## Overview

This is a RESTful API for managing tasks. It provides endpoints for creating, reading, updating, and deleting tasks.

**Base URL:** `http://localhost:5000/api`

**Version:** 1.0.0

## Authentication

Currently, this API does not require authentication. All endpoints are publicly accessible.

## Response Format

All API responses follow this structure:

```json
{
  "success": true/false,
  "data": {}, // Present on successful requests
  "error": "" // Present on failed requests
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success - Request completed successfully |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

## Endpoints

### 1. Get All Tasks

Retrieve all tasks from the database.

**Endpoint:** `GET /tasks`

**Query Parameters:**
- `status` (optional) - Filter by status: `pending`, `in-progress`, or `completed`

**Example Request:**
```bash
GET /api/tasks
GET /api/tasks?status=pending
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the task manager project",
      "status": "in-progress",
      "createdAt": "2025-01-31T10:00:00.000Z",
      "updatedAt": "2025-01-31T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Review code",
      "description": "Review pull requests",
      "status": "pending",
      "createdAt": "2025-01-31T11:00:00.000Z",
      "updatedAt": "2025-01-31T11:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Task

Retrieve a specific task by ID.

**Endpoint:** `GET /tasks/:id`

**URL Parameters:**
- `id` (required) - MongoDB ObjectId of the task

**Example Request:**
```bash
GET /api/tasks/507f1f77bcf86cd799439011
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task manager project",
    "status": "in-progress",
    "createdAt": "2025-01-31T10:00:00.000Z",
    "updatedAt": "2025-01-31T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

---

### 3. Create Task

Create a new task.

**Endpoint:** `POST /tasks`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task manager project",
  "status": "pending"
}
```

**Field Validation:**
- `title` (required) - String, max 100 characters
- `description` (required) - String, max 500 characters
- `status` (optional) - Enum: `pending`, `in-progress`, `completed` (default: `pending`)

**Example Request:**
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "This is a new task",
  "status": "pending"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "New Task",
    "description": "This is a new task",
    "status": "pending",
    "createdAt": "2025-01-31T10:00:00.000Z",
    "updatedAt": "2025-01-31T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": [
    "Please add a title",
    "Please add a description"
  ]
}
```

---

### 4. Update Task

Update an existing task.

**Endpoint:** `PUT /tasks/:id`

**URL Parameters:**
- `id` (required) - MongoDB ObjectId of the task

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

**Example Request:**
```bash
PUT /api/tasks/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Task",
    "description": "Updated description",
    "status": "completed",
    "createdAt": "2025-01-31T10:00:00.000Z",
    "updatedAt": "2025-01-31T12:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

---

### 5. Delete Task

Delete a task permanently.

**Endpoint:** `DELETE /tasks/:id`

**URL Parameters:**
- `id` (required) - MongoDB ObjectId of the task

**Example Request:**
```bash
DELETE /api/tasks/507f1f77bcf86cd799439011
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

---

## Error Handling

The API uses standard HTTP status codes and provides descriptive error messages.

### Common Errors

**400 Bad Request**
- Missing required fields
- Invalid data format
- Validation errors

**404 Not Found**
- Task ID doesn't exist
- Invalid MongoDB ObjectId format

**500 Internal Server Error**
- Database connection issues
- Unexpected server errors

### Error Response Format

```json
{
  "success": false,
  "error": "Error message or array of messages"
}
```

---

## Task Status Values

| Status | Description |
|--------|-------------|
| `pending` | Task is created but not started |
| `in-progress` | Task is currently being worked on |
| `completed` | Task is finished |

---

## Examples with cURL

### Get all tasks
```bash
curl http://localhost:5000/api/tasks
```

### Get filtered tasks
```bash
curl http://localhost:5000/api/tasks?status=completed
```

### Create a task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "pending"
  }'
```

### Update a task
```bash
curl -X PUT http://localhost:5000/api/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "status": "completed"
  }'
```

### Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

---

## Rate Limiting

Currently, there are no rate limits implemented. This may be added in future versions.

---

## Changelog

### Version 1.0.0 (2025-01-31)
- Initial API release
- CRUD operations for tasks
- Filter by status
- Input validation
- Error handling

---

## Support

For issues or questions, please create an issue in the GitHub repository.
