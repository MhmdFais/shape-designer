# Shape Designer Application

A full-stack web application for creating, visualizing, modifying, and persisting geometric shapes.

Built with React, Java Spring Boot, and MySQL.

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. MySQL Database Setup](#1-mysql-database-setup)
  - [2. Backend Setup](#2-backend-setup-spring-boot)
  - [3. Frontend Setup](#3-frontend-setup-react)
  - [4. Running Both Servers](#4-running-both-servers)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Data Models](#data-models)
  - [Endpoints](#endpoints)
  - [Validation Rules](#validation-rules)
  - [Error Response Format](#error-response-format)

---

## Technology Stack

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Frontend         | React 18, Vite, Tailwind CSS v3, Axios |
| Canvas Rendering | HTML5 Canvas API                       |
| Backend          | Java Spring Boot 3, Spring Data JPA    |
| Database         | MySQL 8                                |
| ORM              | Hibernate                              |
| Build Tool       | Maven                                  |
| API Style        | RESTful JSON                           |

---

## Prerequisites

| Requirement | Version            |
| ----------- | ------------------ |
| Java JDK    | 17 or higher       |
| Maven       | 3.8 or higher      |
| MySQL       | 8.0 or higher      |
| Node.js     | 18 or higher       |
| npm         | 9 or higher        |
| Git         | Any recent version |

---

## Setup Instructions

### 1. MySQL Database Setup

**Install MySQL (Ubuntu / Linux)**

```bash
sudo apt update
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql
sudo mysql_secure_installation
```

**Create the database and user**

```sql
sudo mysql -u root -p

CREATE DATABASE shape_designer;
CREATE USER 'shapeuser'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON shape_designer.* TO 'shapeuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

> Replace `yourpassword` with a secure password of your choice. You will need this same password in the backend configuration step.

---

### 2. Backend Setup (Spring Boot)

**Clone the repository**

```bash
git clone https://github.com/your-username/shape-designer.git
cd shape-designer/server
```

**Configure the database connection**

Open `src/main/resources/application.properties` and fill in your credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shape_designer
spring.datasource.username=shapeuser
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

**Run the backend**

```bash
mvn clean install
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**.

On first startup, the application automatically creates the database tables and seeds three default shapes: Default Rectangle (100x100), Default Circle (radius 50), and Default Triangle (base 100, height 80).

> If port 8080 is already in use, add `server.port=8081` to `application.properties`.

---

### 3. Frontend Setup (React)

**Navigate to the client directory**

```bash
cd ../client
```

**Install dependencies**

```bash
npm install
```

**Run the frontend**

```bash
npm run dev
```

The React application starts on **http://localhost:5173**. Open this URL in your browser to use the application.

---

### 4. Running Both Servers

Open two separate terminal windows and run each server simultaneously.

**Terminal 1 — Backend**

```bash
cd shape-designer/server
mvn spring-boot:run
```

**Terminal 2 — Frontend**

```bash
cd shape-designer/client
npm run dev
```

> The frontend at `localhost:5173` communicates with the backend at `localhost:8080`. Both must be running at the same time.

---

## Project Structure

**Backend**

```
server/src/main/java/com/example/shapedesigner/
  entity/
    Shape.java                    JPA entity mapped to the shapes table
    ShapeType.java                Enum — RECTANGLE, CIRCLE, TRIANGLE
  repository/
    ShapeRepository.java          Spring Data JPA repository
  dto/
    ShapeRequestDTO.java          Incoming request payload
    ShapeResponseDTO.java         Outgoing response payload
  validator/
    ShapeValidator.java           Business logic and dimension validation
  service/
    ShapeService.java             Core application logic
  controller/
    ShapeController.java          REST endpoint definitions
  exception/
    GlobalExceptionHandler.java   Centralised error handling
    ErrorResponse.java            Structured error response model
  config/
    DataSeeder.java               Default shape seed data on startup
```

**Frontend**

```
client/src/
  components/
    ShapeSelector.jsx             Shape type dropdown
    ShapeCanvas.jsx               HTML5 Canvas renderer
    DimensionPanel.jsx            Dimension sliders
    ShapeProperties.jsx           Calculated area and perimeter display
    ShapeForm.jsx                 Name input and save / update button
    ShapeList.jsx                 Saved shapes list with edit and delete
    LoadingSpinner.jsx            Reusable loading animation
  hooks/
    useShape.js                   Shared state management and API logic
  services/
    shapeService.js               Axios API calls
  App.jsx                         Root component
```

---

## API Documentation

### Base URL

```
http://localhost:8080/api/shapes
```

All requests and responses use `Content-Type: application/json`.

---

### Data Models

**Shape Response Object**

```json
{
  "id": 1,
  "name": "My Rectangle",
  "type": "RECTANGLE",
  "dimensionData": {
    "width": 100,
    "height": 200
  },
  "createdAt": "2026-02-19T10:30:00"
}
```

**Shape Types and Required Dimension Fields**

| Type        | Required Fields | Example dimensionData             |
| ----------- | --------------- | --------------------------------- |
| `RECTANGLE` | `width, height` | `{ "width": 100, "height": 200 }` |
| `CIRCLE`    | `radius`        | `{ "radius": 50 }`                |
| `TRIANGLE`  | `base, height`  | `{ "base": 100, "height": 80 }`   |

---

### Endpoints

| Method   | Endpoint           | Description              | Success Response |
| -------- | ------------------ | ------------------------ | ---------------- |
| `POST`   | `/api/shapes`      | Create a new shape       | `201 Created`    |
| `GET`    | `/api/shapes`      | Retrieve all shapes      | `200 OK`         |
| `GET`    | `/api/shapes/{id}` | Retrieve a shape by ID   | `200 OK`         |
| `PUT`    | `/api/shapes/{id}` | Update an existing shape | `200 OK`         |
| `DELETE` | `/api/shapes/{id}` | Delete a shape by ID     | `204 No Content` |

---

#### POST /api/shapes — Create Shape

**Request Body**

```json
{
  "name": "My Rectangle",
  "type": "RECTANGLE",
  "dimensionData": {
    "width": 150,
    "height": 100
  }
}
```

**Response — 201 Created**

```json
{
  "id": 4,
  "name": "My Rectangle",
  "type": "RECTANGLE",
  "dimensionData": { "width": 150, "height": 100 },
  "createdAt": "2026-02-19T10:30:00"
}
```

---

#### GET /api/shapes — Get All Shapes

**Response — 200 OK**

```json
[
  {
    "id": 1,
    "name": "Default Rectangle",
    "type": "RECTANGLE",
    "dimensionData": { "width": 100, "height": 100 },
    "createdAt": "2026-02-19T08:00:00"
  },
  {
    "id": 2,
    "name": "Default Circle",
    "type": "CIRCLE",
    "dimensionData": { "radius": 50 },
    "createdAt": "2026-02-19T08:00:00"
  },
  {
    "id": 3,
    "name": "Default Triangle",
    "type": "TRIANGLE",
    "dimensionData": { "base": 100, "height": 80 },
    "createdAt": "2026-02-19T08:00:00"
  }
]
```

---

#### GET /api/shapes/{id} — Get Shape by ID

**Path Parameter** — `id` (Long): the ID of the shape

**Response — 200 OK**

```json
{
  "id": 1,
  "name": "Default Rectangle",
  "type": "RECTANGLE",
  "dimensionData": { "width": 100, "height": 100 },
  "createdAt": "2026-02-19T08:00:00"
}
```

**Response — 404 Not Found**

```json
{
  "status": 404,
  "message": "Shape not found with id: 99",
  "errors": null
}
```

---

#### PUT /api/shapes/{id} — Update Shape

**Path Parameter** — `id` (Long): the ID of the shape to update

**Request Body**

```json
{
  "name": "Updated Rectangle",
  "type": "RECTANGLE",
  "dimensionData": {
    "width": 250,
    "height": 180
  }
}
```

**Response — 200 OK**

```json
{
  "id": 1,
  "name": "Updated Rectangle",
  "type": "RECTANGLE",
  "dimensionData": { "width": 250, "height": 180 },
  "createdAt": "2026-02-19T08:00:00"
}
```

---

#### DELETE /api/shapes/{id} — Delete Shape

**Path Parameter** — `id` (Long): the ID of the shape to delete

**Response — 204 No Content**

No response body is returned on a successful delete.

**Response — 404 Not Found**

```json
{
  "status": 404,
  "message": "Shape not found with id: 99",
  "errors": null
}
```

---

### Validation Rules

| Field           | Rule                                    | Error Message                      |
| --------------- | --------------------------------------- | ---------------------------------- |
| `name`          | Not blank, maximum 100 characters       | Shape name cannot be empty         |
| `type`          | Not null, must be a valid enum value    | Shape type cannot be null          |
| `dimensionData` | Not null                                | Dimension data cannot be null      |
| `width`         | Greater than zero (RECTANGLE)           | 'width' must be greater than zero  |
| `height`        | Greater than zero (RECTANGLE, TRIANGLE) | 'height' must be greater than zero |
| `radius`        | Greater than zero (CIRCLE)              | 'radius' must be greater than zero |
| `base`          | Greater than zero (TRIANGLE)            | 'base' must be greater than zero   |

---

### Error Response Format

All errors return a consistent JSON structure regardless of the cause.

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Shape name cannot be empty"
  }
}
```

| HTTP Status | When It Occurs                                                  |
| ----------- | --------------------------------------------------------------- |
| `400`       | Validation failure — missing fields or invalid dimension values |
| `404`       | No shape exists with the given ID                               |
| `500`       | Unexpected server-side error                                    |
