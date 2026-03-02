# Notes Manager Web Application

A simple, production-ready Notes Manager designed for:

- AWS EC2
- Amazon RDS (MySQL)
- Application Load Balancer
- Auto Scaling

Stateless architecture (safe for scaling).

--------------------------------------------------

## 1. Prerequisites

- Node.js LTS installed
- MySQL running (local or AWS RDS)
- npm installed

--------------------------------------------------

## 2. Database Setup

Login to MySQL:

mysql -u root -p

Run EXACT commands:

CREATE DATABASE notes_db;

USE notes_db;

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------

## 3. Environment Setup

Copy environment file:

cp .env.example .env

Edit .env:

For LOCAL MySQL:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=notes_db
PORT=3000

For AWS RDS:

Just change:

DB_HOST=your-rds-endpoint.amazonaws.com

Keep other values same.

--------------------------------------------------

## 4. Install Dependencies

npm install

--------------------------------------------------

## 5. Start Application

npm start

Server runs on:

http://localhost:3000

--------------------------------------------------

## 6. Verify in Browser

Open:

http://localhost:3000

Add and delete notes.

--------------------------------------------------

## 7. Test API Using curl

Get notes:

curl http://localhost:3000/notes

Create note:

curl -X POST http://localhost:3000/notes \
-H "Content-Type: application/json" \
-d '{"content":"Test note"}'

Delete note:

curl -X DELETE http://localhost:3000/notes/1

--------------------------------------------------

## 8. Test Health Endpoint

curl http://localhost:3000/health

Response:

{"status":"healthy"}

--------------------------------------------------

## 9. Load Testing (Apache Benchmark)

Example:

ab -n 1000 -c 50 http://localhost:3000/health

--------------------------------------------------

## 10. AWS Compatibility

This app:

- Listens on 0.0.0.0 (required for EC2)
- Uses environment variables (required for RDS)
- Is stateless (required for Auto Scaling)
- Provides /health endpoint (required for ALB health checks)
- Uses connection pooling (production safe)
- No in-memory storage

Works with:

- EC2 instances
- RDS MySQL
- Application Load Balancer
- Auto Scaling Groups

--------------------------------------------------

## Production Ready Notes

- Graceful DB failure handling
- Connection pooling
- Global error handler
- Stateless architecture
- Cross-platform (Ubuntu, Windows, EC2)

--------------------------------------------------

END