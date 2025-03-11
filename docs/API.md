# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All API endpoints except login and register require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

Request body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "success": true,
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

#### Login User
```http
POST /auth/login
```

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "success": true,
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### ASI Data

#### Get All ASI Data
```http
GET /asi/data
```

Query Parameters:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `startDate` (optional): Filter by start date
- `endDate` (optional): Filter by end date

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "timestamp": "string",
      "value": "number",
      "location": "string",
      "sensorId": "string"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "pages": "number"
  }
}
```

#### Get Single ASI Data
```http
GET /asi/data/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "timestamp": "string",
    "value": "number",
    "location": "string",
    "sensorId": "string"
  }
}
```

#### Create ASI Data
```http
POST /asi/data
```

Request body:
```json
{
  "value": "number",
  "location": "string",
  "sensorId": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "timestamp": "string",
    "value": "number",
    "location": "string",
    "sensorId": "string"
  }
}
```

#### Update ASI Data
```http
PUT /asi/data/:id
```

Request body:
```json
{
  "value": "number",
  "location": "string",
  "sensorId": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "timestamp": "string",
    "value": "number",
    "location": "string",
    "sensorId": "string"
  }
}
```

#### Delete ASI Data
```http
DELETE /asi/data/:id
```

Response:
```json
{
  "success": true,
  "message": "Data deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error message"
}
``` 